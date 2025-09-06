import Event from "../models/Event.js";

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
    const { title, date, time, location, category, imageUrl, description, featured, registrationOpen } = req.body;
    
    const event = new Event({
      title,
      date,
      time,
      location,
      category,
      imageUrl,
      description,
      featured: featured || false,
      registrationOpen: registrationOpen !== undefined ? registrationOpen : true,
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

export const getFeaturedEvents = async (req, res) => {
  try {
    const events = await Event.find({ featured: true }).sort({ createdAt: -1 });
    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch featured events" });
  }
};