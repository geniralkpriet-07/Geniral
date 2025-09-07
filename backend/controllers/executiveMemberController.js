import ExecutiveMember from '../models/ExecutiveMember.js';

// Get all executive members - Public access
export const getAllExecutiveMembers = async (req, res) => {
  try {
    const members = await ExecutiveMember.find()
      .sort({ createdAt: -1 })
      .select('-__v');
    
    res.status(200).json({ 
      success: true, 
      count: members.length,
      members 
    });
  } catch (error) {
    console.error('Error fetching executive members:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch executive members' 
    });
  }
};

// Get executive member by ID - Public access
export const getExecutiveMemberById = async (req, res) => {
  try {
    const member = await ExecutiveMember.findById(req.params.id).select('-__v');
    
    if (!member) {
      return res.status(404).json({ 
        success: false, 
        message: 'Executive member not found' 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      member 
    });
  } catch (error) {
    console.error('Error fetching executive member:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch executive member' 
    });
  }
};