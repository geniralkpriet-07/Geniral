import Club from "../models/Club.js";
import { upsertToVectorStore } from "../utils/vectorStore.js";

export const getClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ isApproved: true });
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateJoinCount = async (req, res) => {
  try {
    const { clubId } = req.params;
    await Club.findByIdAndUpdate(clubId, { $inc: { membersCount: 1 } });
    res.json({ message: "Welcome to the community!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createClub = async (req, res) => {
  try {
    const club = new Club({
      ...req.body,
      leads: [req.user._id]
    });
    await club.save();

    const vectorText = `Club: ${club.name}. Category: ${club.category}. Description: ${club.description}. Community Link: ${club.joinLink}`;
    await upsertToVectorStore(club._id, vectorText, { type: 'club', id: club._id });

    res.status(201).json({ message: "Club registered for approval", club });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a club (admin only)
export const deleteClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ success: false, message: "Club not found" });
    res.json({ success: true, message: "Club deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};