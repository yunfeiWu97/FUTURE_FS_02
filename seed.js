require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // 注意：路径需与实际项目结构匹配

// 连接 MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('MongoDB connected');
    return seedData();
  })
  .then(() => {
    console.log('Seed data inserted successfully!');
    process.exit(); // 插入完成后退出
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// 定义示例食谱数据
async function seedData() {
  // 清空当前集合，避免重复数据
  await Recipe.deleteMany({});

  const recipes = [
    {
      title: 'Spaghetti Carbonara',
      ingredients: [
        'Spaghetti',
        'Pancetta',
        'Eggs',
        'Parmesan Cheese',
        'Black Pepper'
      ],
      steps: [
        'Boil the spaghetti until al dente.',
        'Fry pancetta in a pan until crisp.',
        'Whisk eggs with grated Parmesan cheese and black pepper.',
        'Combine hot spaghetti with pancetta and egg mixture.',
        'Serve immediately.'
      ],
      image: 'https://media.istockphoto.com/id/943785646/photo/spaghetti-carbonara-with-garlic-bread.jpg?s=1024x1024&w=is&k=20&c=nW0ncFd0_iMR4AFWSdNkXF1q_GQZc8zoMSpzUPagUqg=',
      cuisine: 'Italian',
      difficulty: 'Medium',
      user_id: 'seedUser'
    },
    {
      title: 'Kung Pao Chicken',
      ingredients: [
        'Chicken Breast',
        'Dried Chili Peppers',
        'Peanuts',
        'Garlic',
        'Soy Sauce',
        'Vinegar'
      ],
      steps: [
        'Marinate chicken in soy sauce and cornstarch.',
        'Stir-fry dried chili peppers, garlic, and chicken.',
        'Add sauce mixture and peanuts.',
        'Cook until sauce thickens.',
        'Serve hot with steamed rice.'
      ],
      image: '',
      cuisine: 'Chinese',
      difficulty: 'Medium',
      user_id: 'seedUser'
    },
    {
      title: 'Tandoori Chicken',
      ingredients: [
        'Chicken Legs',
        'Yogurt',
        'Tandoori Masala',
        'Lemon Juice',
        'Garlic',
        'Ginger'
      ],
      steps: [
        'Marinate chicken with yogurt, tandoori masala, garlic, ginger, and lemon juice.',
        'Let it rest in the fridge for at least 4 hours.',
        'Preheat oven to 200°C.',
        'Bake or grill the chicken until fully cooked.',
        'Garnish with lemon wedges and coriander.'
      ],
      image: '',
      cuisine: 'Indian',
      difficulty: 'Hard',
      user_id: 'seedUser'
    },
    {
      title: 'Pad Thai',
      ingredients: [
        'Rice Noodles',
        'Shrimp or Tofu',
        'Bean Sprouts',
        'Eggs',
        'Tamarind Paste',
        'Fish Sauce',
        'Peanuts'
      ],
      steps: [
        'Soak rice noodles in warm water until soft.',
        'Stir-fry shrimp or tofu with garlic.',
        'Push aside and scramble eggs in the pan.',
        'Add noodles, tamarind paste, fish sauce, and sugar.',
        'Mix in bean sprouts and top with crushed peanuts.'
      ],
      image: '',
      cuisine: 'Thai',
      difficulty: 'Medium',
      user_id: 'seedUser'
    },
    {
      title: 'Guacamole',
      ingredients: [
        'Avocados',
        'Onion',
        'Tomato',
        'Lime Juice',
        'Cilantro',
        'Salt'
      ],
      steps: [
        'Mash avocados in a bowl.',
        'Add chopped onion, tomato, cilantro, and lime juice.',
        'Season with salt and mix well.',
        'Serve with tortilla chips or as a side dish.'
      ],
      image: '',
      cuisine: 'Mexican',
      difficulty: 'Easy',
      user_id: 'seedUser'
    },
    {
      title: 'Sushi Rolls',
      ingredients: [
        'Sushi Rice',
        'Nori Sheets',
        'Fish or Vegetables',
        'Rice Vinegar',
        'Soy Sauce',
        'Wasabi'
      ],
      steps: [
        'Cook sushi rice and season with rice vinegar.',
        'Lay nori on a bamboo mat and spread rice evenly.',
        'Add fish or vegetables in the center.',
        'Roll tightly and slice into pieces.',
        'Serve with soy sauce and wasabi.'
      ],
      image: '',
      cuisine: 'Japanese',
      difficulty: 'Hard',
      user_id: 'seedUser'
    },
    {
      title: 'French Toast',
      ingredients: [
        'Bread',
        'Eggs',
        'Milk',
        'Cinnamon',
        'Butter',
        'Maple Syrup'
      ],
      steps: [
        'Whisk eggs, milk, and cinnamon together.',
        'Dip bread slices in the mixture.',
        'Cook on a buttered pan until golden brown on both sides.',
        'Serve with maple syrup.'
      ],
      image: '',
      cuisine: 'French',
      difficulty: 'Easy',
      user_id: 'seedUser'
    },
    {
      title: 'Hamburger',
      ingredients: [
        'Ground Beef',
        'Salt',
        'Pepper',
        'Buns',
        'Lettuce',
        'Tomato',
        'Cheese'
      ],
      steps: [
        'Season ground beef with salt and pepper, form patties.',
        'Grill patties until desired doneness.',
        'Assemble on buns with lettuce, tomato, cheese, and condiments.',
        'Serve hot.'
      ],
      image: '',
      cuisine: 'American',
      difficulty: 'Easy',
      user_id: 'seedUser'
    },
    {
      title: 'Paella',
      ingredients: [
        'Rice',
        'Chicken',
        'Chorizo',
        'Shrimp',
        'Saffron',
        'Bell Peppers',
        'Onion'
      ],
      steps: [
        'Sauté chicken and chorizo with onions and peppers.',
        'Add rice and saffron-infused stock.',
        'Let it simmer until rice is almost done.',
        'Add shrimp on top and cook until pink.',
        'Serve hot with lemon wedges.'
      ],
      image: '',
      cuisine: 'Spanish',
      difficulty: 'Medium',
      user_id: 'seedUser'
    },
    {
      title: 'Pho',
      ingredients: [
        'Rice Noodles',
        'Beef Broth',
        'Beef Slices',
        'Onion',
        'Ginger',
        'Basil',
        'Bean Sprouts'
      ],
      steps: [
        'Simmer beef broth with charred onion and ginger.',
        'Cook rice noodles separately.',
        'Place noodles in a bowl, top with raw beef slices.',
        'Pour hot broth over to cook the beef.',
        'Garnish with basil, bean sprouts, and lime.'
      ],
      image: '',
      cuisine: 'Vietnamese',
      difficulty: 'Medium',
      user_id: 'seedUser'
    }
  ];

  // 将示例食谱插入数据库
  await Recipe.insertMany(recipes);
}
