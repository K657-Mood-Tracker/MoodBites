const { Focus_Session, Mood_Types } = require('../models');

const saveSessionMood = async (req, res) => {
    try {
        const { sessionId, beforeMood, afterMood } = req.body;
        const userId = req.user.id;

        // Find the focus session
        const session = await Focus_Session.findOne({
            where: {
                id: sessionId,
                userId: userId
            }
        });

        if (!session) {
            return res.status(404).json({ error: 'Focus session not found' });
        }

        // Update the session with mood data
        await session.update({
            before_mood: beforeMood,
            after_mood: afterMood
        });

        res.json({ success: true, session });
    } catch (error) {
        console.error('Error saving session mood:', error);
        res.status(500).json({ error: 'An error occurred while saving session mood.' });
    }
};

const getSessionMoods = async (req, res) => {
    try {
        const userId = req.user.id;

        const sessions = await Focus_Session.findAll({
            where: { userId },
            order: [['start_time', 'DESC']]
        });

        const formatted = sessions.map(session => {
            const moodOrder = { 'Awful': 1, 'Bad': 2, 'Okay': 3, 'Good': 4, 'Great': 5 };
            const beforeValue = session.before_mood ? moodOrder[session.before_mood] : null;
            const afterValue = session.after_mood ? moodOrder[session.after_mood] : null;
            let improvement = null;
            if (beforeValue !== null && afterValue !== null) {
                if (afterValue > beforeValue) improvement = 'improved';
                else if (afterValue < beforeValue) improvement = 'declined';
                else improvement = 'same';
            }
            return {
                id: session.id,
                startTime: session.start_time,
                endTime: session.end_time,
                focusTime: session.focus_time,
                beforeMood: session.before_mood,
                afterMood: session.after_mood,
                improvement: improvement
            };
        });

        res.json(formatted);
    } catch (error) {
        console.error('Error fetching session moods:', error);
        res.status(500).json({ error: 'Failed to fetch session moods' });
    }
};

const getCurrentSessionMood = async (req, res) => {
    try {
        const userId = req.user.id;

        const latestSession = await Focus_Session.findOne({
            where: { userId },
            order: [['start_time', 'DESC']]
        });

        if (latestSession && (latestSession.before_mood || latestSession.after_mood)) {
            res.json({
                sessionId: latestSession.id,
                beforeMood: latestSession.before_mood,
                afterMood: latestSession.after_mood,
                focusTime: latestSession.focus_time,
                startTime: latestSession.start_time,
                endTime: latestSession.end_time
            });
        } else {
            res.json({ sessionId: null, beforeMood: null, afterMood: null });
        }
    } catch (error) {
        console.error('Error fetching current session mood:', error);
        res.status(500).json({ error: 'An error occurred while fetching current session mood.' });
    }
};

const getSessionMoodHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        const sessions = await Focus_Session.findAll({
            where: { userId },
            order: [['start_time', 'DESC']]
        });

        const formatted = sessions.map(session => ({
            id: session.id,
            date: session.start_time.toISOString().split('T')[0],
            startTime: session.start_time,
            endTime: session.end_time,
            focusTime: session.focus_time,
            beforeMood: session.before_mood,
            afterMood: session.after_mood
        }));

        res.json(formatted);
    } catch (error) {
        console.error('Error fetching session mood history:', error);
        res.status(500).json({ error: 'Failed to fetch session mood history' });
    }
};

module.exports = {
    saveSessionMood,
    getSessionMoods,
    getCurrentSessionMood,
    getSessionMoodHistory
};