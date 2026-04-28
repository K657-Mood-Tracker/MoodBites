const { Habit, Habit_Entry, User } = require('../models');

const getDemoUser = async () => {
    const [user] = await User.findOrCreate({
        where: { email: 'demo@moodbites.local' },
        defaults: {
            username: 'Demo User',
            email: 'demo@moodbites.local'
        }
    });
    return user;
};

const getHabits = async (req, res) => {
    try {
        const user = await getDemoUser();
        const userId = user.id;
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
        const user = await getDemoUser();
        const habit = await Habit.create({ userId: user.id, title: name, score: 0 });
        res.json({ id: habit.id, name: habit.title, days: [false, false, false, false, false, false, false], icon: 'CheckSquare' });
    } catch (error) {
        console.error('Error adding habit:', error);
        res.status(500).json({ error: 'An error occurred while adding habit.' });
    }
};

const toggleHabit = async (req, res) => {
    try {
        const { habitId } = req.body;
        const user = await getDemoUser();
        const date = new Date().toISOString().split('T')[0];

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
        await Habit.destroy({ where: { id: habitId } });
        res.json({ success: true });
    } catch (error) {
        console.error('Error deleting habit:', error);
        res.status(500).json({ error: 'An error occurred while deleting habit.' });
    }
};

module.exports = {
    getHabits,
    addHabit,
    toggleHabit,
    updateHabit,
    deleteHabit
};