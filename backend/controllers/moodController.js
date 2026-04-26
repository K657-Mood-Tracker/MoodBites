const { Mood_Entry, Mood_Types } = require('../models');
const { Op } = require('sequelize');

const saveMood = async (req, res) => {
    try {
        const { mood } = req.body;
        const userId = 1; // Assuming demo user
        const today = new Date();
        const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1));

        // Check if entry already exists for today
        let moodEntry = await Mood_Entry.findOne({
            where: {
                userId,
                date: {
                    [Op.gte]: startOfDay,
                    [Op.lt]: endOfDay
                }
            }
        });

        if (!moodEntry) {
            moodEntry = await Mood_Entry.create({ userId, date: today });
        }

        // Update or create mood type
        await Mood_Types.upsert({
            moodEntryId: moodEntry.id,
            label: mood
        });

        res.json({ success: true, moodEntry });
    } catch (error) {
        console.error('Error saving mood:', error);
        res.status(500).json({ error: 'An error occurred while saving mood.' });
    }
};

const getMood = async (req, res) => {
    try {
        const userId = 1;
        const today = new Date();
        const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1));

        const moodEntry = await Mood_Entry.findOne({
            where: {
                userId,
                date: {
                    [Op.gte]: startOfDay,
                    [Op.lt]: endOfDay
                }
            },
            include: [{ model: Mood_Types }]
        });

        if (moodEntry && moodEntry.Mood_Types && moodEntry.Mood_Types.length > 0) {
            res.json({ mood: moodEntry.Mood_Types[0].label });
        } else {
            res.json({ mood: null });
        }
    } catch (error) {
        console.error('Error fetching mood:', error);
        res.status(500).json({ error: 'An error occurred while fetching mood.' });
    }
};

module.exports = {
    saveMood,
    getMood
};