const { Habit, Habit_Entry, User } = require('../models');
const { Op } = require('sequelize');

const getHabits = async (req, res) => {
    try {
        const userId = req.user.id;
        const habits = await Habit.findAll({
            where: { userId },
            include: [{
                model: Habit_Entry,
                where: {
                    date: new Date().toISOString().split('T')[0] // Today's date
                },
                required: false
            }]
        });

        // Transform to frontend format
        const transformedHabits = habits.map(habit => ({
            id: habit.id,
            name: habit.title,
            days: [false, false, false, false, false, false, false], // Initialize all false
            icon: 'CheckSquare', // Default icon
            completedToday: habit.Habit_Entries.length > 0 && habit.Habit_Entries[0].status === 'completed'
        }));

        // Set today's completion
        const currentDayIndex = (() => {
            const day = new Date().getDay();
            return day === 0 ? 6 : day - 1;
        })();

        transformedHabits.forEach(habit => {
            habit.days[currentDayIndex] = habit.completedToday;
        });

        res.json(transformedHabits);
    } catch (error) {
        console.error('Error fetching habits:', error);
        res.status(500).json({ error: 'An error occurred while fetching habits.' });
    }
};

const addHabit = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user.id;
        const habit = await Habit.create({ userId, title: name, score: 0 });
        res.json({ id: habit.id, name: habit.title, days: [false, false, false, false, false, false, false], icon: 'CheckSquare' });
    } catch (error) {
        console.error('Error adding habit:', error);
        res.status(500).json({ error: 'An error occurred while adding habit.' });
    }
};

const toggleHabit = async (req, res) => {
    try {
        const { habitId } = req.body;
        const userId = req.user.id;
        const date = new Date().toISOString().split('T')[0];

        // Verify the habit belongs to the user
        const habit = await Habit.findOne({ where: { id: habitId, userId } });
        if (!habit) {
            return res.status(403).json({ error: 'Habit not found or access denied.' });
        }

        // Check if entry exists
        let entry = await Habit_Entry.findOne({
            where: { habitId, date }
        });

        if (entry) {
            // Toggle status
            entry.status = entry.status === 'completed' ? 'skipped' : 'completed';
            await entry.save();
        } else {
            // Create new entry
            entry = await Habit_Entry.create({ habitId, date, status: 'completed' });
        }

        res.json({ success: true, status: entry.status });
    } catch (error) {
        console.error('Error toggling habit:', error);
        res.status(500).json({ error: 'An error occurred while toggling habit.' });
    }
};

const updateHabit = async (req, res) => {
    try {
        const { habitId, name } = req.body;
        const userId = req.user.id;

        // Verify the habit belongs to the user
        const habit = await Habit.findOne({ where: { id: habitId, userId } });
        if (!habit) {
            return res.status(403).json({ error: 'Habit not found or access denied.' });
        }

        await Habit.update({ title: name }, { where: { id: habitId } });
        res.json({ success: true });
    } catch (error) {
        console.error('Error updating habit:', error);
        res.status(500).json({ error: 'An error occurred while updating habit.' });
    }
};

const deleteHabit = async (req, res) => {
    try {
        const { habitId } = req.body;
        const userId = req.user.id;

        // Verify the habit belongs to the user
        const habit = await Habit.findOne({ where: { id: habitId, userId } });
        if (!habit) {
            return res.status(403).json({ error: 'Habit not found or access denied.' });
        }

        await Habit.destroy({ where: { id: habitId } });
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting habit:', error);
        res.status(500).json({ error: 'An error occurred while deleting habit.' });
    }
};

const getHabitHistory = async (req, res) => {
    try {
        const userId = req.user.id;

        // Calculate current week (Monday to Sunday) in local timezone
        const today = new Date();
        const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

        // Find Monday of current week
        const monday = new Date(today);
        monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
        monday.setHours(0, 0, 0, 0); // Set to start of day

        // Find Sunday of current week
        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999); // Set to end of day

        const habits = await Habit.findAll({
            where: { userId },
            include: [{
                model: Habit_Entry,
                required: false,
                where: {
                    date: {
                        [Op.between]: [monday, sunday]
                    }
                }
            }]
        });

        const result = habits.map(habit => {
            const days = [false, false, false, false, false, false, false];

            habit.Habit_Entries.forEach(entry => {
                const entryDate = new Date(entry.date);
                const daysDiff = Math.floor((entryDate - monday) / (1000 * 60 * 60 * 24));

                // Only set days within this week (0-6)
                if (daysDiff >= 0 && daysDiff <= 6) {
                    days[daysDiff] = entry.status === "completed";
                }
            });

            return {
                id: habit.id,
                name: habit.title,
                days,
                icon: "CheckSquare"
            };
        });

        res.json(result);

    } catch (error) {
        console.error("Habit history error:", error);

        res.status(500).json({
            error: "Failed to fetch habit history"
        });
    }
};

module.exports = {
    getHabits,
    addHabit,
    toggleHabit,
    updateHabit,
    deleteHabit,
    getHabitHistory
};