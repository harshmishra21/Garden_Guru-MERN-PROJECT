const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Plant = require('./models/Plant');
const Post = require('./models/Post');
const UserGarden = require('./models/UserGarden');

dotenv.config();

// reliable images are handled in frontend utils, here we just ensure names match keys
const masterPlants = [
    { name: 'Rose', instructions: 'Water deeply but infrequently.', sunlight: 'Direct Sun', fertilizer: 'Bi-weekly', difficulty: 'Medium' },
    { name: 'Tulip', instructions: 'Keep soil moist, not wet.', sunlight: 'Full Sun', fertilizer: 'Once in Spring', difficulty: 'Medium' },
    { name: 'Sunflower', instructions: 'Water regularly.', sunlight: 'Direct Sun', fertilizer: 'Monthly', difficulty: 'Easy' },
    { name: 'Orchid', instructions: 'Mist roots, do not overwater.', sunlight: 'Bright Indirect', fertilizer: 'Weekly', difficulty: 'Hard' },
    { name: 'Lily', instructions: 'Keep moist.', sunlight: 'Partial Shade', fertilizer: 'Monthly', difficulty: 'Medium' },
    { name: 'Daisy', instructions: 'Water when dry.', sunlight: 'Full Sun', fertilizer: 'Monthly', difficulty: 'Easy' },
    { name: 'Fern', instructions: 'Keep moist and humid.', sunlight: 'Shade', fertilizer: 'Bi-weekly', difficulty: 'Medium' },
    { name: 'Cactus', instructions: 'Water rarely.', sunlight: 'Direct Sun', fertilizer: 'Monthly', difficulty: 'Easy' },
    { name: 'Succulent', instructions: 'Water when completely dry.', sunlight: 'Bright Light', fertilizer: 'Monthly', difficulty: 'Easy' },
    { name: 'Snake Plant', instructions: 'Ignore it mostly.', sunlight: 'Any', fertilizer: 'Rarely', difficulty: 'Easy' },
    { name: 'Aloe Vera', instructions: 'Water deeply, let dry.', sunlight: 'Bright Indirect', fertilizer: 'Yearly', difficulty: 'Easy' },
    { name: 'Monstera', instructions: 'Water weekly.', sunlight: 'Indirect', fertilizer: 'Monthly', difficulty: 'Medium' },
    { name: 'Ficus', instructions: 'Consistent watering.', sunlight: 'Bright Indirect', fertilizer: 'Monthly', difficulty: 'Hard' },
    { name: 'Lavender', instructions: 'Keep dry.', sunlight: 'Direct Sun', fertilizer: 'None', difficulty: 'Medium' },
    { name: 'Basil', instructions: 'Water daily.', sunlight: 'Direct Sun', fertilizer: 'Weekly', difficulty: 'Easy' },
    { name: 'Mint', instructions: 'Keep moist.', sunlight: 'Partial Sun', fertilizer: 'Monthly', difficulty: 'Easy' },
    { name: 'Spider Plant', instructions: 'Water weekly.', sunlight: 'Indirect', fertilizer: 'Monthly', difficulty: 'Easy' },
    { name: 'Peace Lily', instructions: 'Keep moist.', sunlight: 'Low Light', fertilizer: 'Monthly', difficulty: 'Easy' }
];

const connectDB = require('./config/db');

const seedData = async () => {
    await connectDB();

    try {
        // Clear all data
        await User.deleteMany();
        await Plant.deleteMany();
        await Post.deleteMany();
        await UserGarden.deleteMany();
        console.log('Old Data Destroyed...');

        // 1. Create Users
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password', salt);
        const adminPassword = await bcrypt.hash('adminpassword', salt);

        const users = await User.insertMany([
            { name: 'Admin User', email: 'admin@gardenguru.com', password: adminPassword, role: 'admin' },
            { name: 'Alex Gardener', email: 'alex@example.com', password: hashedPassword, role: 'gardener' }, // Log in with this one!
            { name: 'Sarah Green', email: 'sarah@example.com', password: hashedPassword, role: 'gardener' },
            { name: 'Mike Soil', email: 'mike@example.com', password: hashedPassword, role: 'gardener' }
        ]);

        const alex = users[1];
        const sarah = users[2];
        const mike = users[3];
        console.log('Users Created (Login: alex@example.com / password)...');

        // 2. Create Master Plants
        await Plant.insertMany(masterPlants);
        console.log(`Master Database populated with ${masterPlants.length} plants...`);

        // 3. Populate Alex's Garden (Add 10 Random Plants)
        const myGarden = masterPlants.slice(0, 10).map(p => ({
            user: alex._id,
            name: p.name,
            waterReq: p.instructions,
            sunlight: p.sunlight,
            fertilizer: p.fertilizer
        }));
        await UserGarden.insertMany(myGarden);
        console.log("Added 10 plants to Alex's personal garden...");

        // 4. Create Community Posts
        const posts = [
            { user: sarah._id, content: "My Monstera just got a new leaf! 🌿 I love watching it unfurl. Does anyone use a moss pole?", likes: 12 },
            { user: mike._id, content: "Harvested so much Basil today 🌿 Making pesto tonight! Who else loves growing herbs?", likes: 8 },
            { user: alex._id, content: "Just bought a Snake Plant. They say it's impossible to kill, let's see! 😂 #NewPlant", likes: 25 },
            { user: sarah._id, content: "Warning: found aphids on my roses 🌹 used neem oil and it worked wonders!", likes: 15 },
            { user: mike._id, content: "My Ficus is dropping leaves... help! Is it too much water?", likes: 3 },
            { user: sarah._id, content: "Succulents are the best office plants. So low maintenance. 🌵", likes: 9 },
            { user: alex._id, content: "Lavender smells amazing in the garden after rain ☔", likes: 18 }
        ];
        await Post.insertMany(posts);
        console.log('Community populated with diverse posts...');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
