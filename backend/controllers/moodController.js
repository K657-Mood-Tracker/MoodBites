const { Mood_Entry, Mood_Types } = require('../models');

const saveMood = async (req, res) => {
    try {
        const { mood } = req.body;
        const userId = 1; // Assuming demo user
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        // Check if entry already exists for today
        let moodEntry = await Mood_Entry.findOne({
            where: { userId, date }
        });

        if (!moodEntry) {
            moodEntry = await Mood_Entry.create({ userId, date });
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
        const date = new Date().toISOString().split('T')[0];

        const moodEntry = await Mood_Entry.findOne({
            where: { userId, date },
            include: [{ model: Mood_Types }]
        });

        if (moodEntry && moodEntry.Mood_Types) {
            res.json({ mood: moodEntry.Mood_Types.label });
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