import Event from "../models/Event.js";
import User from "../models/User.js";
import Registration from "../models/Registration.js";
import { upsertToVectorStore, removeFromVectorStore } from "../utils/vectorStore.js";
import { sendEmail, sendStudentCredentialsEmail } from "../utils/emailService.js";

export const approveEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true }).populate('createdBy', 'email');
        if (!event) return res.status(404).json({ success: false, message: "Event not found" });

        // Sync to Qdrant
        await upsertToVectorStore(event._id, `Event: ${event.title}. Category: ${event.category}. Venue: ${event.venue}. Date: ${event.eventDate}`, { id: event._id, type: 'event' });

        // Notify Student
        try {
            await sendEmail({
                to: event.createdBy.email,
                subject: "🎉 Your Event has been Approved!",
                html: `<div style="font-family:sans-serif;"><h3>Great News!</h3><p>Your event <strong>${event.title}</strong> has been approved and is now live.</p></div>`
            });
        } catch (e) { console.error("Notify student error", e); }

        res.status(200).json({ success: true, message: "Event approved", data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const rejectEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true }).populate('createdBy', 'email');
        if (!event) return res.status(404).json({ success: false, message: "Event not found" });

        // Notify Student
        try {
            await sendEmail({
                to: event.createdBy.email,
                subject: "Update on your Event Submission",
                html: `<div style="font-family:sans-serif;"><h3>Event Update</h3><p>Your event <strong>${event.title}</strong> was not approved for the hub.</p></div>`
            });
        } catch (e) { console.error("Notify student error", e); }

        res.status(200).json({ success: true, message: "Event rejected", data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const updateEvent = async (req, res) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (event && event.status === 'approved') {
            await upsertToVectorStore(event._id, `Event: ${event.title}. Category: ${event.category}. Venue: ${event.venue}. Date: ${event.eventDate}`, { id: event._id, type: 'event' });
        }
        res.status(200).json({ success: true, data: event });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        await removeFromVectorStore(req.params.id);
        res.status(200).json({ success: true, message: "Event deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllEventsAdmin = async (req, res) => {
    try {
        const events = await Event.find().populate('createdBy', 'name email');
        res.status(200).json({ success: true, data: events });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'student' });
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "User deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getAllRegistrations = async (req, res) => {
    try {
        const registrations = await Registration.find()
            .populate('student', 'name email department')
            .populate('event', 'title category eventDate')
            .sort({ registeredAt: -1 });
        res.status(200).json({ success: true, data: registrations });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getEventRegistrations = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id).populate('createdBy', 'name email department');
        if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

        const registrations = await Registration.find({ event: id })
            .populate('student', 'name email department')
            .sort({ registeredAt: -1 });

        const stats = {
            total: registrations.length,
            totalSlots: event.totalSlots || 100,
            filledSlots: event.filledSlots || 0,
            teamCount: registrations.filter(r => (r.teamSize || 1) > 1).length,
        };

        res.status(200).json({ success: true, data: { event, registrations, stats } });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const getOverviewAnalytics = async (req, res) => {
    try {
        const totalEvents = await Event.countDocuments();
        const totalUsers = await User.countDocuments({ role: 'student' });
        const totalRegistrations = await Registration.countDocuments();
        const pendingApprovals = await Event.countDocuments({ status: 'pending' });

        const categoryBreakdown = await Event.aggregate([
            { $group: { _id: "$category", count: { $sum: 1 } } }
        ]);

        const registrationTrend = await Registration.aggregate([
            {
                $match: {
                    registeredAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
                }
            },
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$registeredAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json({
            success: true,
            data: { totalEvents, totalUsers, totalRegistrations, pendingApprovals, categoryBreakdown, registrationTrend }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
export const createStudent = async (req, res) => {
    try {
        const { name, email, password, department } = req.body;
        const existing = await User.findOne({ email: email.toLowerCase() });
        if (existing) return res.status(400).json({ success: false, message: "Email already registered" });

        const student = new User({
            name,
            email: email.toLowerCase(),
            password,
            department,
            role: 'student',
            isVerified: true
        });

        await student.save();

        // Send credentials email
        try {
            await sendStudentCredentialsEmail(email, name, password);
        } catch (e) { console.error("Notify student error", e); }

        res.status(201).json({ success: true, message: "Student account created successfully", data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
