import AssociationHead from "../models/AssociationMember.js";

export const getAllAssociationMembers = async (req, res) => {
  try {
    const members = await AssociationHead.find().sort({ role: 1, name: 1 });
    res.status(200).json({ members });
  } catch (error) {
    console.error('Error fetching association members:', error);
    res.status(500).json({ message: 'Failed to fetch association members' });
  }
};

export const getAssociationMemberById = async (req, res) => {
  try {
    const member = await AssociationHead.findOne({ id: req.params.id });
    if (!member) {
      return res.status(404).json({ message: 'Association member not found' });
    }
    res.status(200).json({ member });
  } catch (error) {
    console.error('Error fetching association member:', error);
    res.status(500).json({ message: 'Failed to fetch association member' });
  }
};

export const getAssociationMembersByRole = async (req, res) => {
  try {
    const role = req.params.role;
    const members = await AssociationHead.find({ role }).sort({ name: 1 });
    res.status(200).json({ members });
  } catch (error) {
    console.error('Error fetching association members by role:', error);
    res.status(500).json({ message: 'Failed to fetch association members by role' });
  }
};