import Club from "../models/Club.js";
import mongoose from 'mongoose';

// Admin controller functions - require authentication
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
    // First try to find by MongoDB _id
    let club = null;
    
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      club = await Club.findById(req.params.id);
    }
    
    // If not found, try by custom id field
    if (!club) {
      club = await Club.findOne({ id: req.params.id });
    }
    
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }
    
    res.status(200).json({ club });
  } catch (error) {
    console.error('Error fetching club:', error);
    res.status(500).json({ message: 'Failed to fetch club' });
  }
};

export const createClub = async (req, res) => {
  try {
    const { 
      id, 
      name, 
      description, 
      logoBase64, 
      content,
      members,
      faculty,
      head,
      memberList,
      achievements,
      events
    } = req.body;
    
    // Check if ID already exists
    const existingClub = await Club.findOne({ id });
    if (existingClub) {
      return res.status(400).json({ 
        message: 'Club with this ID already exists'
      });
    }
    
    // Also check if name already exists
    const existingClubName = await Club.findOne({ name });
    if (existingClubName) {
      return res.status(400).json({ 
        message: 'Club with this name already exists'
      });
    }
    
    const newClub = new Club({
      id,
      name,
      description,
      logoBase64,
      content: content || '',
      members: members || memberList?.length || 0,
      faculty: faculty || [],
      head,
      memberList: memberList || [],
      achievements: achievements || [],
      events: events || []
    });
    
    const savedClub = await newClub.save();
    res.status(201).json({ 
      message: 'Club created successfully',
      club: savedClub 
    });
  } catch (error) {
    console.error('Error creating club:', error);
    res.status(400).json({ 
      message: 'Failed to create club', 
      error: error.message 
    });
  }
};

export const updateClub = async (req, res) => {
  try {
    const { 
      name, 
      description, 
      logoBase64, 
      content,
      members,
      faculty,
      head,
      memberList,
      achievements,
      events
    } = req.body;
    
    // Check if name already exists and doesn't belong to this club
    if (name) {
      let query = { name };
      
      // Try to exclude current club from name check
      if (mongoose.Types.ObjectId.isValid(req.params.id)) {
        query._id = { $ne: req.params.id };
      } else {
        query.id = { $ne: req.params.id };
      }
      
      const existingClubName = await Club.findOne(query);
      
      if (existingClubName) {
        return res.status(400).json({ 
          message: 'Another club with this name already exists'
        });
      }
    }
    
    const updateData = {
      name,
      description,
      content,
      members: members || memberList?.length || 0
    };
    
    // Only update these fields if they are provided
    if (logoBase64) updateData.logoBase64 = logoBase64;
    if (faculty) updateData.faculty = faculty;
    if (head) updateData.head = head;
    if (memberList) updateData.memberList = memberList;
    if (achievements) updateData.achievements = achievements;
    if (events) updateData.events = events;
    
    let updatedClub = null;
    
    // First try to update by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      updatedClub = await Club.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true, runValidators: false }
      );
    }
    
    // If not found by _id, try by custom id field
    if (!updatedClub) {
      updatedClub = await Club.findOneAndUpdate(
        { id: req.params.id },
        updateData,
        { new: true, runValidators: false }
      );
    }
    
    if (!updatedClub) {
      return res.status(404).json({ 
        message: 'Club not found',
        requestedId: req.params.id
      });
    }
    
    res.status(200).json({ 
      message: 'Club updated successfully',
      club: updatedClub 
    });
  } catch (error) {
    console.error('Error updating club:', error);
    res.status(400).json({ 
      message: 'Failed to update club', 
      error: error.message 
    });
  }
};

export const deleteClub = async (req, res) => {
  try {
    let deletedClub = null;
    
    // First try to delete by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      deletedClub = await Club.findByIdAndDelete(req.params.id);
    }
    
    // If not found by _id, try by custom id field
    if (!deletedClub) {
      deletedClub = await Club.findOneAndDelete({ id: req.params.id });
    }
    
    if (!deletedClub) {
      return res.status(404).json({ message: 'Club not found' });
    }
    
    res.status(200).json({ message: 'Club deleted successfully' });
  } catch (error) {
    console.error('Error deleting club:', error);
    res.status(500).json({ message: 'Failed to delete club' });
  }
};

// Member CRUD operations
export const addClubMember = async (req, res) => {
  try {
    const { name, class: className, role, imageBase64 } = req.body;
    
    let club = null;
    
    // First try to find by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      club = await Club.findById(req.params.id);
    }
    
    // If not found, try by custom id field
    if (!club) {
      club = await Club.findOne({ id: req.params.id });
    }
    
    if (!club) {
      return res.status(404).json({ 
        message: 'Club not found',
        requestedId: req.params.id
      });
    }
    
    // Check if member already exists
    const memberExists = club.memberList.some(member => member.name === name);
    if (memberExists) {
      return res.status(400).json({ message: 'Member already exists in this club' });
    }
    
    // Use findOneAndUpdate with runValidators: false to avoid validation issues
    const updatedClub = await Club.findByIdAndUpdate(
      club._id,
      {
        $push: {
          memberList: {
            name,
            class: className,
            role: role || 'Member',
            imageBase64: imageBase64 || ''
          }
        },
        $set: { members: club.memberList.length + 1 }
      },
      { new: true, runValidators: false }
    );
    
    if (!updatedClub) {
      return res.status(500).json({ message: 'Failed to add member' });
    }
    
    res.status(201).json({ 
      message: 'Member added successfully',
      member: { name, class: className, role }
    });
  } catch (error) {
    console.error('Error adding club member:', error);
    res.status(400).json({ 
      message: 'Failed to add club member', 
      error: error.message 
    });
  }
};

export const updateClubMember = async (req, res) => {
  try {
    const { memberName } = req.params;
    const { name, class: className, role, imageBase64 } = req.body;
    
    let club = null;
    
    // First try to find by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      club = await Club.findById(req.params.id);
    }
    
    // If not found, try by custom id field
    if (!club) {
      club = await Club.findOne({ id: req.params.id });
    }
    
    if (!club) {
      return res.status(404).json({ 
        message: 'Club not found',
        requestedId: req.params.id
      });
    }
    
    const memberIndex = club.memberList.findIndex(member => member.name === memberName);
    if (memberIndex === -1) {
      return res.status(404).json({ message: 'Member not found in this club' });
    }
    
    // Use findOneAndUpdate with runValidators: false to avoid validation issues
    const updatedMember = {
      name: name || club.memberList[memberIndex].name,
      class: className || club.memberList[memberIndex].class,
      role: role || club.memberList[memberIndex].role,
      imageBase64: imageBase64 || club.memberList[memberIndex].imageBase64
    };
    
    // MongoDB update with $ positional operator
    const updatedClub = await Club.findByIdAndUpdate(
      club._id,
      { $set: { [`memberList.${memberIndex}`]: updatedMember } },
      { new: true, runValidators: false }
    );
    
    if (!updatedClub) {
      return res.status(500).json({ message: 'Failed to update member' });
    }
    
    res.status(200).json({ 
      message: 'Member updated successfully',
      member: updatedClub.memberList[memberIndex]
    });
  } catch (error) {
    console.error('Error updating club member:', error);
    res.status(400).json({ 
      message: 'Failed to update club member', 
      error: error.message 
    });
  }
};

export const removeClubMember = async (req, res) => {
  try {
    const { memberName } = req.params;
    
    let club = null;
    
    // First try to find by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      club = await Club.findById(req.params.id);
    }
    
    // If not found, try by custom id field
    if (!club) {
      club = await Club.findOne({ id: req.params.id });
    }
    
    if (!club) {
      return res.status(404).json({ 
        message: 'Club not found',
        requestedId: req.params.id
      });
    }
    
    const initialLength = club.memberList.length;
    const memberExists = club.memberList.some(member => member.name === memberName);
    
    if (!memberExists) {
      return res.status(404).json({ message: 'Member not found in this club' });
    }
    
    // Use findOneAndUpdate with runValidators: false to avoid validation issues
    const updatedClub = await Club.findByIdAndUpdate(
      club._id,
      { 
        $pull: { memberList: { name: memberName } },
        $set: { members: initialLength - 1 }
      },
      { new: true, runValidators: false }
    );
    
    if (!updatedClub) {
      return res.status(500).json({ message: 'Failed to remove member' });
    }
    
    res.status(200).json({ message: 'Member removed successfully' });
  } catch (error) {
    console.error('Error removing club member:', error);
    res.status(500).json({ message: 'Failed to remove club member' });
  }
};

// Faculty CRUD operations
export const addFaculty = async (req, res) => {
  try {
    const { name, dept, role, imageBase64 } = req.body;
    
    let club = null;
    
    // First try to find by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      club = await Club.findById(req.params.id);
    }
    
    // If not found, try by custom id field
    if (!club) {
      club = await Club.findOne({ id: req.params.id });
    }
    
    if (!club) {
      return res.status(404).json({ 
        message: 'Club not found',
        requestedId: req.params.id
      });
    }
    
    // Check if faculty already exists
    const facultyExists = club.faculty.some(f => f.name === name);
    if (facultyExists) {
      return res.status(400).json({ message: 'Faculty already exists in this club' });
    }
    
    // Use findOneAndUpdate with runValidators: false to avoid validation issues
    const updatedClub = await Club.findByIdAndUpdate(
      club._id,
      {
        $push: {
          faculty: {
            name,
            dept,
            role: role || 'Coordinator',
            imageBase64: imageBase64 || ''
          }
        }
      },
      { new: true, runValidators: false }
    );
    
    if (!updatedClub) {
      return res.status(500).json({ message: 'Failed to add faculty' });
    }
    
    res.status(201).json({ 
      message: 'Faculty added successfully',
      faculty: { name, dept, role }
    });
  } catch (error) {
    console.error('Error adding faculty:', error);
    res.status(400).json({ 
      message: 'Failed to add faculty', 
      error: error.message 
    });
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const { facultyName } = req.params;
    const { name, dept, role, imageBase64 } = req.body;
    
    let club = null;
    
    // First try to find by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      club = await Club.findById(req.params.id);
    }
    
    // If not found, try by custom id field
    if (!club) {
      club = await Club.findOne({ id: req.params.id });
    }
    
    if (!club) {
      return res.status(404).json({ 
        message: 'Club not found',
        requestedId: req.params.id
      });
    }
    
    const facultyIndex = club.faculty.findIndex(f => f.name === facultyName);
    if (facultyIndex === -1) {
      return res.status(404).json({ message: 'Faculty not found in this club' });
    }
    
    const updatedFaculty = {
      name: name || club.faculty[facultyIndex].name,
      dept: dept || club.faculty[facultyIndex].dept,
      role: role || club.faculty[facultyIndex].role,
      imageBase64: imageBase64 || club.faculty[facultyIndex].imageBase64
    };
    
    // MongoDB update with $ positional operator
    const updatedClub = await Club.findByIdAndUpdate(
      club._id,
      { $set: { [`faculty.${facultyIndex}`]: updatedFaculty } },
      { new: true, runValidators: false }
    );
    
    if (!updatedClub) {
      return res.status(500).json({ message: 'Failed to update faculty' });
    }
    
    res.status(200).json({ 
      message: 'Faculty updated successfully',
      faculty: updatedClub.faculty[facultyIndex]
    });
  } catch (error) {
    console.error('Error updating faculty:', error);
    res.status(400).json({ 
      message: 'Failed to update faculty', 
      error: error.message 
    });
  }
};

export const removeFaculty = async (req, res) => {
  try {
    const { facultyName } = req.params;
    
    let club = null;
    
    // First try to find by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      club = await Club.findById(req.params.id);
    }
    
    // If not found, try by custom id field
    if (!club) {
      club = await Club.findOne({ id: req.params.id });
    }
    
    if (!club) {
      return res.status(404).json({ 
        message: 'Club not found',
        requestedId: req.params.id
      });
    }
    
    const facultyExists = club.faculty.some(f => f.name === facultyName);
    
    if (!facultyExists) {
      return res.status(404).json({ message: 'Faculty not found in this club' });
    }
    
    // Use findOneAndUpdate with runValidators: false to avoid validation issues
    const updatedClub = await Club.findByIdAndUpdate(
      club._id,
      { $pull: { faculty: { name: facultyName } } },
      { new: true, runValidators: false }
    );
    
    if (!updatedClub) {
      return res.status(500).json({ message: 'Failed to remove faculty' });
    }
    
    res.status(200).json({ message: 'Faculty removed successfully' });
  } catch (error) {
    console.error('Error removing faculty:', error);
    res.status(500).json({ message: 'Failed to remove faculty' });
  }
};

// Club head
export const updateClubHead = async (req, res) => {
  try {
    const { name, class: className, position, email, imageBase64 } = req.body;
    
    let club = null;
    
    // First try to find by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      club = await Club.findById(req.params.id);
    }
    
    // If not found, try by custom id field
    if (!club) {
      club = await Club.findOne({ id: req.params.id });
    }
    
    if (!club) {
      return res.status(404).json({ 
        message: 'Club not found',
        requestedId: req.params.id
      });
    }
    
    // Use findOneAndUpdate with runValidators: false to avoid validation issues
    const updatedClub = await Club.findByIdAndUpdate(
      club._id,
      {
        $set: {
          head: {
            name: name || club.head?.name,
            class: className || club.head?.class,
            position: position || club.head?.position,
            email: email || club.head?.email,
            imageBase64: imageBase64 || club.head?.imageBase64
          }
        }
      },
      { new: true, runValidators: false }
    );
    
    if (!updatedClub) {
      return res.status(500).json({ message: 'Failed to update club head' });
    }
    
    res.status(200).json({ 
      message: 'Club head updated successfully',
      head: updatedClub.head
    });
  } catch (error) {
    console.error('Error updating club head:', error);
    res.status(400).json({ 
      message: 'Failed to update club head', 
      error: error.message 
    });
  }
};

// Club content
export const updateClubContent = async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    
    let club = null;
    
    // First try to find by MongoDB _id
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      club = await Club.findById(req.params.id);
    }
    
    // If not found, try by custom id field
    if (!club) {
      club = await Club.findOne({ id: req.params.id });
    }
    
    if (!club) {
      return res.status(404).json({ 
        message: 'Club not found',
        requestedId: req.params.id
      });
    }
    
    // Use findOneAndUpdate with runValidators: false to avoid validation issues
    const updatedClub = await Club.findByIdAndUpdate(
      club._id,
      { $set: { content } },
      { new: true, runValidators: false }
    );
    
    if (!updatedClub) {
      return res.status(500).json({ message: 'Failed to update club content' });
    }
    
    res.status(200).json({ 
      message: 'Club content updated successfully'
    });
  } catch (error) {
    console.error('Error updating club content:', error);
    res.status(400).json({ 
      message: 'Failed to update club content', 
      error: error.message 
    });
  }
};