import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import { notifyAdminOnEventCreation, sendRegistrationEmailToAdmin } from "../utils/emailService.js";
import { autoAssignVipReward } from "./vipController.js";

const TEAM_CONFIG = {
  hackathon: { isTeamEvent: true, minMembers: 2, maxMembers: 6 },
  paper_presentation: { isTeamEvent: true, minMembers: 1, maxMembers: 4 },
  project_expo: { isTeamEvent: true, minMembers: 2, maxMembers: 4 },
  quiz_competition: { isTeamEvent: true, minMembers: 1, maxMembers: 4 },
  debate: { isTeamEvent: true, minMembers: 1, maxMembers: 3 },
  coding_challenge: { isTeamEvent: true, minMembers: 1, maxMembers: 3 },
  workshop: { isTeamEvent: false, minMembers: 1, maxMembers: 1 },
  cultural_fest: { isTeamEvent: false, minMembers: 1, maxMembers: 1 },
  sports_tournament: { isTeamEvent: true, minMembers: 2, maxMembers: 11 },
  photography_contest: { isTeamEvent: false, minMembers: 1, maxMembers: 1 },
  business_plan_competition: { isTeamEvent: true, minMembers: 1, maxMembers: 5 },
  open_mic: { isTeamEvent: false, minMembers: 1, maxMembers: 1 },
};

export const createEvent = async (req, res) => {
  try {
    const {
      title, description, category, department, venue,
      eventDate, registrationDeadline, registrationLink,
      totalSlots, tags, communityLink,
      isTeamEvent, minMembers, maxMembers
    } = req.body;

    const teamConfig = {
      isTeamEvent: isTeamEvent === 'true' || isTeamEvent === true,
      minMembers: parseInt(minMembers) || 1,
      maxMembers: parseInt(maxMembers) || 1,
    };

    const referralCode = Math.random().toString(36).substring(2, 8).toUpperCase();

    const event = new Event({
      title,
      description,
      category,
      department,
      venue,
      eventDate,
      registrationDeadline,
      registrationLink,
      totalSlots: totalSlots || 100,
      teamConfig,
      tags: tags ? (Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim())) : [],
      communityLink,
      posterUrl: req.file ? req.file.path : '',
      createdBy: req.user.userId,
      referralCode,
      status: 'pending',
    });

    await event.save();

    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      try {
        await notifyAdminOnEventCreation(adminEmail, {
          title: event.title,
          department: event.department || 'Not specified',
          venue: event.venue,
          startTime: eventDate ? new Date(eventDate).toLocaleString('en-IN') : 'TBD',
          endTime: registrationDeadline ? new Date(registrationDeadline).toLocaleString('en-IN') : 'TBD',
          registrationLink: event.registrationLink || 'N/A'
        }, req.user.email);
      } catch (e) {
        console.error('Admin notify error:', e.message);
      }
    }

    res.status(201).json({ success: true, message: "Event submitted for approval", data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllApprovedEvents = async (req, res) => {
  try {
    const events = await Event.find({ status: 'approved' })
      .populate('createdBy', 'name email department')
      .sort({ eventDate: 1 });
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('createdBy', 'name email department');
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyEvents = async (req, res) => {
  try {
    const events = await Event.find({ createdBy: req.user.userId }).sort({ createdAt: -1 });
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const registerForEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    if (event.status !== 'approved') {
      return res.status(400).json({ success: false, message: "Event is not open for registration" });
    }
    if (event.filledSlots >= event.totalSlots) {
      return res.status(400).json({ success: false, message: "Event is fully booked" });
    }

    const existing = await Registration.findOne({ event: req.params.id, student: req.user.userId });
    if (existing) {
      return res.status(409).json({ success: false, message: "You are already registered for this event" });
    }

    const { teamMembers, referredBy, teamLeader } = req.body;
    const parsedMembers = typeof teamMembers === 'string' ? JSON.parse(teamMembers) : (teamMembers || []);
    const parsedLeader = typeof teamLeader === 'string' ? JSON.parse(teamLeader) : (teamLeader || null);

    // Industry-standard referral parsing: "CODE-REFERRERID"
    let referrerId = null;
    if (referredBy && referredBy.includes('-')) {
      const parts = referredBy.split('-');
      referrerId = parts[parts.length - 1]; // Take the last part (the UserId)
      // Check if ID is valid MongoDB ID
      if (!referrerId.match(/^[0-9a-fA-F]{24}$/)) {
        referrerId = null;
      }
    }

    const registration = new Registration({
      event: req.params.id,
      student: req.user.userId,
      teamLeader: parsedLeader,
      teamMembers: parsedMembers,
      teamSize: parsedMembers.length + 1,
      referredBy: referredBy || null,
      referrer: referrerId,
    });
    await registration.save();

    await Event.findByIdAndUpdate(req.params.id, {
      $inc: { registrationCount: 1, filledSlots: 1 },
    });

    if (referredBy && referrerId) {
      // Extract the event's base code from the combined string (CODE-userId)
      const baseCode = referredBy.substring(0, referredBy.lastIndexOf('-'));
      await Event.findOneAndUpdate({ referralCode: baseCode }, { $inc: { referralCount: 1 } });
      // Auto-assign VIP reward if referrer has reached 3 total referrals
      try {
        await autoAssignVipReward(referrerId);
      } catch (e) {
        console.error('VIP reward auto-assign error:', e.message);
      }
    }

    try {
      await sendRegistrationEmailToAdmin({
        eventTitle: event.title,
        studentName: req.user.name || req.user.email,
        studentEmail: req.user.email,
        department: req.user.department || 'N/A',
      });
    } catch (e) {
      console.error('Admin registration notify error:', e.message);
    }

    const count = await Registration.countDocuments({ event: req.params.id });
    res.status(201).json({ success: true, message: "Registered successfully!", registrationCount: count });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ success: false, message: "Already registered" });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getEventCount = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).select('registrationCount');
    if (!event) return res.status(404).json({ success: false, message: "Event not found" });
    res.json({ success: true, count: event.registrationCount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const checkRegistration = async (req, res) => {
  try {
    const existing = await Registration.findOne({ event: req.params.id, student: req.user.userId });
    res.json({ success: true, registered: !!existing });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get referral count for a specific user on a specific event
export const getReferralCount = async (req, res) => {
  try {
    const { id: eventId, userId } = req.params;

    // Count registrations that were referred by this user for THIS specific event
    const count = await Registration.countDocuments({
      event: eventId,
      referrer: userId
    });

    res.json({ success: true, count });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
