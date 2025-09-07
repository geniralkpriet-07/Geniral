import Event from "../models/Event.js";
import { invalidateEventCache } from "../utils/cacheInvalidation.js";

export const getAllEvents = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = category && category !== 'all' ? { category } : {};
    
    const events = await Event.find(filter).sort({ createdAt: -1 });
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }
    res.json({ event });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event" });
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
    
    // Invalidate cache after creating a new event
    await invalidateEventCache();
    
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
    
    // Invalidate cache after updating an event
    await invalidateEventCache(req.params.id);
    
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

export const getFeaturedEvents = async (req, res) => {
  try {
    const events = await Event.find({ featured: true }).sort({ createdAt: -1 });
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch featured events" });
  }
};