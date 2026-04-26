const models = require('../models');
const { Journal_Entry, Mood_Entry } = models;
const { Op } = require('sequelize');

const saveJournal = async (req, res) => {
    try {
        const { content, mood } = req.body;
        const userId = 1; // Assuming demo user
        const today = new Date();
        const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1));

        // Find mood type for today with the specified mood
        let moodType = await models.Mood_Types.findOne({
            where: { label: mood },
            include: [{
                model: Mood_Entry,
                where: {
                    userId,
                    date: {
                        [Op.gte]: startOfDay,
                        [Op.lt]: endOfDay
                    }
                }
            }]
        });

        if (!moodType) {
            // Create mood entry if it doesn't exist
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
            // Create mood type
            moodType = await models.Mood_Types.create({
                moodEntryId: moodEntry.id,
                label: mood
            });
        }

        // Update or create journal entry
        const [journalEntry, created] = await Journal_Entry.findOrCreate({
            where: { moodTypeId: moodType.id },
            defaults: { content: content }
        });
        if (!created) {
            journalEntry.content = content;
            await journalEntry.save();
        }

        res.json({ success: true });
    } catch (error) {
        console.error('Error saving journal:', error);
        res.status(500).json({ error: 'An error occurred while saving journal entry.' });
    }
};

const getJournal = async (req, res) => {
    try {
        const userId = 1;
        const { mood } = req.query; // Get mood from query parameter
        const today = new Date();
        const startOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
        const endOfDay = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate() + 1));

        // Find mood type for today with the specified mood
        const moodType = await models.Mood_Types.findOne({
            where: { label: mood },
            include: [{
                model: Mood_Entry,
                where: {
                    userId,
                    date: {
                        [Op.gte]: startOfDay,
                        [Op.lt]: endOfDay
                    }
                }
            }]
        });

        if (!moodType) {
            return res.json({ content: null });
        }

        // Find the journal entry for this mood type
        const journalEntry = await Journal_Entry.findOne({
            where: { moodTypeId: moodType.id }
        });

        if (journalEntry) {
            res.json({ content: journalEntry.content });
        } else {
            res.json({ content: null });
        }
    } catch (error) {
        console.error('Error fetching journal:', error);
        res.status(500).json({ error: 'An error occurred while fetching journal entry.' });
    }
};

module.exports = {
    saveJournal,
    getJournal
};