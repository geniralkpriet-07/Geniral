import Club from "../models/Club.js";

// ─── Public: Get all active clubs ────────────────────────────────────────────
export const getClubs = async (req, res) => {
  try {
    const { department } = req.query;
    const filter = { isActive: true };
    if (department) filter.department = department;
    const clubs = await Club.find(filter).sort({ name: 1 });
    res.json({ success: true, data: clubs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Public: Get single club ──────────────────────────────────────────────────
export const getClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id).lean();
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });
    res.json({ success: true, data: club });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Admin: Create club ───────────────────────────────────────────────────────
export const createClub = async (req, res) => {
  try {
    const {
      name, description, department,
      founder, president, vicePresident, departmentPresident,
      treasurer, jointTreasurer, memberCount,
      whatsappLink, telegramLink, discordLink, websiteLink,
    } = req.body;

    const club = new Club({
      name,
      description,
      department,
      posterUrl: req.file ? req.file.path : '',
      founder: founder || '',
      president: president || '',
      vicePresident: vicePresident || '',
      departmentPresident: departmentPresident || '',
      treasurer: treasurer || '',
      jointTreasurer: jointTreasurer || '',
      memberCount: parseInt(memberCount) || 0,
      whatsappLink: whatsappLink || '',
      telegramLink: telegramLink || '',
      discordLink: discordLink || '',
      websiteLink: websiteLink || '',
      createdBy: req.user.userId,
    });

    await club.save();
    res.status(201).json({ success: true, message: 'Club created', data: club });
  } catch (error) {
    if (error.code === 11000)
      return res.status(409).json({ success: false, message: 'A club with this name already exists' });
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Admin: Update club ───────────────────────────────────────────────────────
export const updateClub = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.posterUrl = req.file.path;
    if (updates.memberCount !== undefined) updates.memberCount = parseInt(updates.memberCount) || 0;

    const club = await Club.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });
    res.json({ success: true, message: 'Club updated', data: club });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ─── Admin: Delete club ───────────────────────────────────────────────────────
export const deleteClub = async (req, res) => {
  try {
    const club = await Club.findByIdAndDelete(req.params.id);
    if (!club) return res.status(404).json({ success: false, message: 'Club not found' });
    res.json({ success: true, message: 'Club deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
