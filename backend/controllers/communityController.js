import Community from "../models/Community.js";

export const getAllCommunities = async (req, res) => {
    try {
        const communities = await Community.find();
        res.status(200).json({ success: true, data: communities });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const createCommunity = async (req, res) => {
    try {
        const community = new Community(req.body);
        await community.save();
        res.status(201).json({ success: true, data: community });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const joinCommunity = async (req, res) => {
    try {
        const community = await Community.findByIdAndUpdate(req.params.id, { $inc: { joinCount: 1 } }, { new: true });
        if (!community) return res.status(404).json({ success: false, message: "Community not found" });
        res.status(200).json({ success: true, message: "Join tracked", data: community });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteCommunity = async (req, res) => {
    try {
        await Community.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Community deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
