const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.insertMany([
        {
            username: 'test1',
            email: 'test1@test.com',
        },
        {
            username: 'test2',
            email: 'test2@test.com',
        }
    ])
    console.info('Seeding complete! 🌱');
    process.exit(0);
})