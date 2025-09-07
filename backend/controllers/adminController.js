import Event from "../models/Event.js";
import User from "../models/User.js";

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ createdAt: -1 }).populate('createdBy', 'email');
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const createEvent = async (req, res) => {
  try {
    const { 
      title, 
      startDate, 
      endDate, 
      startTime, 
      endTime, 
      location, 
      category, 
      imageUrl, 
      description, 
      featured, 
      registrationLink,
      isRegistrationOpen 
    } = req.body;
    
    const event = new Event({
      title,
      startDate,
      endDate,
      startTime,
      endTime,
      location,
      category,
      imageUrl,
      description,
      featured: featured || false,
      registrationLink: registrationLink || "",
      isRegistrationOpen: isRegistrationOpen !== undefined ? isRegistrationOpen : true,
      createdBy: req.user._id
    });

    await event.save();
    res.status(201).json({ message: "Event created successfully", event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    
    res.json({ message: "Event updated successfully", event });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    
    res.json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete event" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const { isActive } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isActive },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    res.json({ message: "User status updated successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    
    if (user.role === 'admin') {
      return res.status(403).json({ error: "Cannot delete admin user" });
    }
    
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};