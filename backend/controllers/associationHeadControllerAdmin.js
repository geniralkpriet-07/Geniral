import AssociationHead from '../models/AssociationMember.js';
import { invalidateAssociationMemberCache } from '../utils/cacheInvalidation.js';

export const getAllAssociationHeads = async (req, res) => {
  try {
    const heads = await AssociationHead.find().sort({ role: 1 });
    res.status(200).json(heads);
  } catch (error) {
    console.error('Error fetching association heads:', error);
    res.status(500).json({ message: 'Failed to fetch association heads' });
  }
};

export const getAssociationHeadById = async (req, res) => {
  try {
    const head = await AssociationHead.findOne({ id: req.params.id });
    if (!head) {
      return res.status(404).json({ message: 'Association head not found' });
    }
    res.status(200).json(head);
  } catch (error) {
    console.error('Error fetching association head:', error);
    res.status(500).json({ message: 'Failed to fetch association head' });
  }
};

export const createAssociationHead = async (req, res) => {
  try {
    const { id, name, role, avatarBase64, handle, status, class: className, year, linkedin } = req.body;

    const existingHead = await AssociationHead.findOne({ 
      $or: [{ id }, { handle }] 
    });
    
    if (existingHead) {
      return res.status(400).json({ 
        message: existingHead.id === id 
          ? 'Association head with this ID already exists' 
          : 'Association head with this handle already exists' 
      });
    }

    const newHead = new AssociationHead({
      id,
      name,
      role,
      avatarBase64,
      handle,
      status,
      class: className,
      year,
      linkedin
    });

    const savedHead = await newHead.save();
    
    await invalidateAssociationMemberCache();
    
    res.status(201).json(savedHead);
  } catch (error) {
    console.error('Error creating association head:', error);
    res.status(500).json({ message: 'Failed to create association head', error: error.message });
  }
};

export const updateAssociationHead = async (req, res) => {
  try {
    const { name, role, avatarBase64, handle, status, class: className, year, linkedin } = req.body;
    
    if (handle) {
      const existingHead = await AssociationHead.findOne({ 
        handle, 
        id: { $ne: req.params.id } 
      });
      
      if (existingHead) {
        return res.status(400).json({ message: 'Handle already in use by another association head' });
      }
    }

    const updatedHead = await AssociationHead.findOneAndUpdate(
      { id: req.params.id },
      { 
        name,
        role,
        avatarBase64,
        handle,
        status,
        class: className,
        year,
        linkedin
      },
      { new: true, runValidators: true }
    );

    if (!updatedHead) {
      return res.status(404).json({ message: 'Association head not found' });
    }

    // Invalidate cache after updating association head
    await invalidateAssociationMemberCache(req.params.id);
    
    res.status(200).json(updatedHead);
  } catch (error) {
    console.error('Error updating association head:', error);
    res.status(500).json({ message: 'Failed to update association head', error: error.message });
  }
};

export const deleteAssociationHead = async (req, res) => {
  try {
    const deletedHead = await AssociationHead.findOneAndDelete({ id: req.params.id });
    
    if (!deletedHead) {
      return res.status(404).json({ message: 'Association head not found' });
    }
    
    // Invalidate cache after deleting association head
    await invalidateAssociationMemberCache(req.params.id);
    
    res.status(200).json({ message: 'Association head deleted successfully' });
  } catch (error) {
    console.error('Error deleting association head:', error);
    res.status(500).json({ message: 'Failed to delete association head' });
  }
};