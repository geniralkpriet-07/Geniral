import ExecutiveMember from '../models/ExecutiveMember.js';
import mongoose from 'mongoose';
import { invalidateExecutiveMemberCache } from '../utils/cacheInvalidation.js';

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

export const createExecutiveMember = async (req, res) => {
  try {
    const { name, class: memberClass, role, year, avatarBase64, status, linkedin } = req.body;
    
    if (!name || !memberClass) {
      return res.status(400).json({
        success: false,
        message: 'Name and class are required fields'
      });
    }
    
    if (avatarBase64 && !avatarBase64.startsWith('data:image')) {
      return res.status(400).json({
        success: false,
        message: 'Avatar must be a valid base64 encoded image'
      });
    }
    
    const newMember = new ExecutiveMember({
      name,
      class: memberClass,
      role: role || 'Member',
      year,
      avatarBase64,
      status: status || 'Offline',
      linkedin: linkedin || ''
    });
    
    await newMember.save();
    
    // Invalidate cache after creating a new executive member
    await invalidateExecutiveMemberCache();
    
    res.status(201).json({
      success: true,
      member: newMember
    });
  } catch (error) {
    console.error('Error creating executive member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create executive member',
      error: error.message
    });
  }
};

export const updateExecutiveMember = async (req, res) => {
  try {
    const { name, class: memberClass, role, year, avatarBase64, status, linkedin } = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid member ID'
      });
    }
    
    if (avatarBase64 && !avatarBase64.startsWith('data:image')) {
      return res.status(400).json({
        success: false,
        message: 'Avatar must be a valid base64 encoded image'
      });
    }
    
    const updateData = {};
    if (name) updateData.name = name;
    if (memberClass) updateData.class = memberClass;
    if (role) updateData.role = role;
    if (year) updateData.year = year;
    if (avatarBase64) updateData.avatarBase64 = avatarBase64;
    if (status) updateData.status = status;
    if (linkedin !== undefined) updateData.linkedin = linkedin;
    
    updateData.updatedAt = Date.now();
    
    const updatedMember = await ExecutiveMember.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    
    if (!updatedMember) {
      return res.status(404).json({
        success: false,
        message: 'Executive member not found'
      });
    }
    
    // Invalidate cache after updating executive member
    await invalidateExecutiveMemberCache(req.params.id);
    
    res.status(200).json({
      success: true,
      member: updatedMember
    });
  } catch (error) {
    console.error('Error updating executive member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update executive member',
      error: error.message
    });
  }
};

export const deleteExecutiveMember = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid member ID'
      });
    }
    
    const deletedMember = await ExecutiveMember.findByIdAndDelete(req.params.id);
    
    if (!deletedMember) {
      return res.status(404).json({
        success: false,
        message: 'Executive member not found'
      });
    }
    
    // Invalidate cache after deleting executive member
    await invalidateExecutiveMemberCache(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Executive member deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting executive member:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete executive member',
      error: error.message
    });
  }
};