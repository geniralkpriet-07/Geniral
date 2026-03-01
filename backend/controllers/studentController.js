import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import Community from "../models/Community.js";

export const getStudentAnalytics = async (req, res) => {
    try {
        const userId = req.user.userId;
        const eventsCreated = await Event.countDocuments({ createdBy: userId });

        const registrations = await Registration.find({ student: userId }).populate('event');
        const eventsRegistered = registrations.length;

        // Referral count (events created by me that others used referral code for)
        const myEvents = await Event.find({ createdBy: userId });
        const referralCount = myEvents.reduce((acc, curr) => acc + (curr.referralCount || 0), 0);

        const categoryBreakdown = registrations.reduce((acc, reg) => {
            const cat = reg.event.category;
            acc[cat] = (acc[cat] || 0) + 1;
            return acc;
        }, {});

        res.status(200).json({
            success: true,
            data: {
                eventsCreated,
                eventsRegistered,
                referralCount,
                categoryBreakdown
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
