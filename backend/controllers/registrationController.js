import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import User from "../models/User.js";
import { sendRegistrationEmailToAdmin } from "../utils/emailService.js";


export const registerForEvent = async (req, res) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    const user = await User.findById(req.user._id);

 
    const existing = await Registration.findOne({ event: eventId, user: req.user._id });
    if (existing) {
      return res.status(409).json({ error: "You have already registered for this event" });
    }

    const registration = new Registration({
      event: eventId,
      user: req.user._id,
      name: user.name || req.user.email,
      email: req.user.email,
      department: user.department || "N/A"
    });
    await registration.save();

    // Increment registrations count on the event
    await Event.findByIdAndUpdate(eventId, { $inc: { registrations: 1 } });

    // Notify admin by email
    try {
      await sendRegistrationEmailToAdmin({
        eventTitle: event.title,
        studentName: user.name || req.user.email,
        studentEmail: req.user.email,
        department: user.department || "N/A"
      });
    } catch (emailErr) {
      console.error("Admin email notification failed:", emailErr.message);
      // Non-fatal — don't fail the whole request
    }

    // Return updated count
    const count = await Registration.countDocuments({ event: eventId });

    res.status(201).json({
      message: "Registered successfully!",
      registration,
      registrationCount: count
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "You have already registered for this event" });
    }
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// GET /api/registrations/:eventId/count — public: get count for an event
export const getEventRegistrationCount = async (req, res) => {
  try {
    const count = await Registration.countDocuments({ event: req.params.eventId });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/registrations/:eventId/check — check if logged-in user is registered
export const checkMyRegistration = async (req, res) => {
  try {
    const reg = await Registration.findOne({
      event: req.params.eventId,
      user: req.user._id
    });
    res.json({ registered: !!reg });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/registrations/admin/all — admin: all registrations across all events
export const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await Registration.find()
      .populate('event', 'title date venue')
      .populate('user', 'email name department')
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/registrations/admin/event/:eventId — admin: registrations for a specific event
export const getRegistrationsForEvent = async (req, res) => {
  try {
    const registrations = await Registration.find({ event: req.params.eventId })
      .populate('user', 'email name department')
      .sort({ createdAt: -1 });
    res.json(registrations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
