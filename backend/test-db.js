const { User, Habit, Habit_Entry } = require('./models');

async function test() {
  try {
    // 1. Create a test user
    const user = await User.create({ username: 'tester', email: 'test@test.com', password_hash: 'hashedpassword' });
    
    // 2. Create a habit for that user
    const habit = await Habit.create({ title: 'Drink Water', userId: user.id });
    
    // 3. Create an entry for that habit
    await Habit_Entry.create({ habitId: habit.id, date: new Date(), status: 'skipped' });

    // 4. Query it back with associations
    const foundUser = await User.findOne({
      where: { id: user.id },
      include: [{ model: Habit, include: [Habit_Entry] }]
    });

    console.log('User Habit:', foundUser.Habits[0].title);
    console.log('Entries Count:', foundUser.Habits[0].Habit_Entries.length);
    
    console.log("Everything works!");
  } catch (error) {
    console.error("Something is wrong:", error);
  }
}
test();