import Club from "../models/Club.js";

// Public controller functions - no authentication required
export const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find().sort({ name: 1 });
    res.status(200).json({ clubs });
  } catch (error) {
    console.error('Error fetching clubs:', error);
    res.status(500).json({ message: 'Failed to fetch clubs' });
  }
};

export const getClubById = async (req, res) => {
  try {
    const club = await Club.findOne({ id: req.params.id });
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    res.status(200).json({ club });
  } catch (error) {
    console.error('Error fetching club:', error);
    res.status(500).json({ message: 'Failed to fetch club' });
  }
};

export const getClubMembers = async (req, res) => {
  try {
    const club = await Club.findOne({ id: req.params.id });
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    
    const members = club.memberList || [];
    res.status(200).json({ 
      clubId: club.id,
      clubName: club.name,
      members
    });
  } catch (error) {
    console.error('Error fetching club members:', error);
    res.status(500).json({ message: 'Failed to fetch club members' });
  }
};

export const getFacultyByClub = async (req, res) => {
  try {
    const club = await Club.findOne({ id: req.params.id });
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    
    const faculty = club.faculty || [];
    res.status(200).json({ 
      clubId: club.id,
      clubName: club.name,
      faculty
    });
  } catch (error) {
    console.error('Error fetching club faculty:', error);
    res.status(500).json({ message: 'Failed to fetch club faculty' });
  }
};