import Event from "../models/Event.js";
import Registration from "../models/Registration.js";
import User from "../models/User.js";
import Club from "../models/Club.js";
import Community from "../models/Community.js";

/**
 * MCP (Model Context Protocol) Server for MongoDB
 * Provides tools for the AI to fetch data from MongoDB based on user prompts
 */

// ─── Event Tools ──────────────────────────────────────────────────────────────

export const fetchEvents = async (filters = {}) => {
    try {
        const query = { status: 'approved', ...filters };
        const events = await Event.find(query)
            .populate('createdBy', 'name email department')
            .sort({ eventDate: 1 })
            .limit(20)
            .lean();

        return {
            success: true,
            data: events,
            count: events.length,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

export const fetchEventsByCategory = async (category) => {
    return fetchEvents({ category });
};

export const fetchEventsByDepartment = async (department) => {
    return fetchEvents({ department });
};

export const fetchUpcomingEvents = async (limit = 10) => {
    try {
        const events = await Event.find({
            status: 'approved',
            eventDate: { $gte: new Date() },
        })
            .populate('createdBy', 'name email department')
            .sort({ eventDate: 1 })
            .limit(limit)
            .lean();

        return {
            success: true,
            data: events,
            count: events.length,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

export const fetchEventById = async (eventId) => {
    try {
        const event = await Event.findById(eventId)
            .populate('createdBy', 'name email department')
            .lean();

        return {
            success: true,
            data: event,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

// ─── Registration Tools ───────────────────────────────────────────────────────

export const fetchEventRegistrations = async (eventId) => {
    try {
        const registrations = await Registration.find({ event: eventId })
            .populate('student', 'name email department')
            .lean();

        const stats = {
            total: registrations.length,
            withTeams: registrations.filter(r => r.teamSize > 1).length,
            individuals: registrations.filter(r => r.teamSize === 1).length,
        };

        return {
            success: true,
            data: registrations,
            stats,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

export const fetchUserRegistrations = async (userId) => {
    try {
        const registrations = await Registration.find({ student: userId })
            .populate('event', 'title eventDate venue category')
            .sort({ registeredAt: -1 })
            .lean();

        return {
            success: true,
            data: registrations,
            count: registrations.length,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

// ─── Club Tools ───────────────────────────────────────────────────────────────

export const fetchClubs = async () => {
    try {
        const clubs = await Club.find()
            .sort({ name: 1 })
            .lean();

        return {
            success: true,
            data: clubs,
            count: clubs.length,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

export const fetchClubById = async (clubId) => {
    try {
        const club = await Club.findById(clubId).lean();

        return {
            success: true,
            data: club,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

// ─── Community Tools ──────────────────────────────────────────────────────────

export const fetchCommunities = async () => {
    try {
        const communities = await Community.find()
            .sort({ name: 1 })
            .lean();

        return {
            success: true,
            data: communities,
            count: communities.length,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

// ─── User Tools ───────────────────────────────────────────────────────────────

export const fetchUserProfile = async (userId) => {
    try {
        const user = await User.findById(userId)
            .select('-password -otp -otpExpires')
            .lean();

        return {
            success: true,
            data: user,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

// ─── Analytics Tools ──────────────────────────────────────────────────────────

export const fetchEventStatistics = async () => {
    try {
        const totalEvents = await Event.countDocuments({ status: 'approved' });
        const upcomingEvents = await Event.countDocuments({
            status: 'approved',
            eventDate: { $gte: new Date() },
        });
        const totalRegistrations = await Registration.countDocuments();

        const eventsByCategory = await Event.aggregate([
            { $match: { status: 'approved' } },
            { $group: { _id: '$category', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
        ]);

        return {
            success: true,
            data: {
                totalEvents,
                upcomingEvents,
                totalRegistrations,
                eventsByCategory,
            },
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
        };
    }
};

// ─── Search Tools ─────────────────────────────────────────────────────────────

export const searchEvents = async ({ query = '', category = '', department = '' }) => {
    try {
        const mongoQuery = { status: 'approved' };
        if (query) mongoQuery.title = { $regex: query, $options: 'i' };
        if (category) mongoQuery.category = category;
        if (department) mongoQuery.department = department;

        const events = await Event.find(mongoQuery)
            .sort({ eventDate: 1 })
            .limit(10)
            .lean();

        return { success: true, data: events, count: events.length };
    } catch (error) {
        return { success: false, error: error.message };
    }
};

// ─── MCP Tool Router ──────────────────────────────────────────────────────────

export const executeMCPTool = async (toolName, params = {}) => {
    const tools = {
        fetchEvents,
        fetchEventsByCategory: (p) => fetchEventsByCategory(p.category),
        fetchEventsByDepartment: (p) => fetchEventsByDepartment(p.department),
        fetchUpcomingEvents: (p) => fetchUpcomingEvents(p.limit),
        fetchEventById: (p) => fetchEventById(p.eventId),
        fetchEventRegistrations: (p) => fetchEventRegistrations(p.eventId),
        fetchUserRegistrations: (p) => fetchUserRegistrations(p.userId),
        fetchClubs,
        fetchClubById: (p) => fetchClubById(p.clubId),
        fetchCommunities,
        fetchUserProfile: (p) => fetchUserProfile(p.userId),
        fetchEventStatistics,
        searchEvents,
    };

    const tool = tools[toolName];
    if (!tool) {
        return {
            success: false,
            error: `Tool '${toolName}' not found`,
        };
    }

    return await tool(params);
};

export const listAvailableMCPTools = () => {
    return [
        {
            name: 'fetchEvents',
            description: 'Fetch all approved events with optional filters',
            parameters: ['filters (optional)'],
        },
        {
            name: 'fetchEventsByCategory',
            description: 'Fetch events by category (e.g., hackathon, workshop)',
            parameters: ['category'],
        },
        {
            name: 'fetchEventsByDepartment',
            description: 'Fetch events by department',
            parameters: ['department'],
        },
        {
            name: 'fetchUpcomingEvents',
            description: 'Fetch upcoming events (future dates only)',
            parameters: ['limit (optional)'],
        },
        {
            name: 'fetchEventById',
            description: 'Fetch a specific event by ID',
            parameters: ['eventId'],
        },
        {
            name: 'fetchEventRegistrations',
            description: 'Fetch all registrations for an event',
            parameters: ['eventId'],
        },
        {
            name: 'fetchUserRegistrations',
            description: 'Fetch all events a user has registered for',
            parameters: ['userId'],
        },
        {
            name: 'fetchClubs',
            description: 'Fetch all clubs',
            parameters: [],
        },
        {
            name: 'fetchClubById',
            description: 'Fetch a specific club by ID',
            parameters: ['clubId'],
        },
        {
            name: 'fetchCommunities',
            description: 'Fetch all communities',
            parameters: [],
        },
        {
            name: 'fetchUserProfile',
            description: 'Fetch user profile information',
            parameters: ['userId'],
        },
        {
            name: 'fetchEventStatistics',
            description: 'Fetch overall event statistics and analytics',
            parameters: [],
        },
    ];
};
