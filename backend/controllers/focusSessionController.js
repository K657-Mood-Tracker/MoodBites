const { Focus_Session } = require('../models');

const createFocusSession = async (req, res) => {
    try {
        console.log('Creating focus session for user:', req.user.id);
        console.log('Request body:', req.body);

        const {
            startTime,
            endTime,
            focusTime,
            restTime,
            totalFocus,
            deepFocus,
            beforeMood,
            afterMood
        } = req.body;
        const userId = req.user.id;

        const session = await Focus_Session.create({
            userId,
            start_time: startTime,
            end_time: endTime,
            focus_time: focusTime,
            rest_time: restTime || 0,
            total_focus: totalFocus || focusTime,
            deep_focus: deepFocus || false,
            before_mood: beforeMood,
            after_mood: afterMood
        });

        console.log('Session created successfully:', session.id);
        res.json({ success: true, session });
    } catch (error) {
        console.error('Error creating focus session:', error);
        res.status(500).json({ error: error.message || 'An error occurred while creating focus session.', details: error.stack });
    }
};

const getFocusSessions = async (req, res) => {
    try {
        const userId = req.user.id;

        const sessions = await Focus_Session.findAll({
            where: { userId },
            order: [['start_time', 'DESC']]
        });

        res.json(sessions);
    } catch (error) {
        console.error('Error fetching focus sessions:', error);
        res.status(500).json({ error: 'Failed to fetch focus sessions' });
    }
};

module.exports = {
    createFocusSession,
    getFocusSessions
};