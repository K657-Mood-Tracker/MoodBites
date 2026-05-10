const { User, Focus_Session, Mood_Types } = require('./models');

async function testSessionMoods() {
  try {
    // Find existing user or create one
    let user = await User.findOne({ where: { email: 'test@test.com' } });
    if (!user) {
      user = await User.create({
        username: 'tester',
        email: 'test@test.com',
        password_hash: 'hashedpassword'
      });
    }

    // Create some focus sessions with mood data
    const sessions = [
      { before: 'Bad', after: 'Good', focusTime: 25 },
      { before: 'Okay', after: 'Great', focusTime: 45 },
      { before: 'Good', after: 'Okay', focusTime: 30 },
    ];

    for (const sessionData of sessions) {
      await Focus_Session.create({
        userId: user.id,
        start_time: new Date(Date.now() - 3600000), // 1 hour ago
        end_time: new Date(),
        focus_time: sessionData.focusTime,
        rest_time: 5,
        total_focus: sessionData.focusTime,
        deep_focus: false,
        before_mood: sessionData.before,
        after_mood: sessionData.after
      });
    }

    console.log('Test data created successfully!');

    // Query back the data
    const foundSessions = await Focus_Session.findAll({
      where: { userId: user.id }
    });

    console.log('Found sessions:', foundSessions.length);
    foundSessions.forEach(session => {
      console.log(`Session ${session.id}: ${session.before_mood} -> ${session.after_mood}`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

testSessionMoods();