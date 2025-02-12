// seed.js
require('dotenv').config();
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe'); // 注意路径需与实际项目相匹配

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
  // 先清空当前集合，避免重复
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
      image: 'https://images.unsplash.com/photo-1572441710436-7601fd1352bb?auto=format&w=934&h=700&q=80&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1590987031627-f02d5fbc5422?auto=format&w=934&h=700&q=80&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1633614231874-1fa8d0f8d455?auto=format&w=934&h=700&q=80&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1584270354949-d0b68f3c2426?auto=format&w=934&h=700&q=80&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1591407614370-22cc20c3d42b?auto=format&w=934&h=700&q=80&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1562158077-28f44a3f0c99?auto=format&w=934&h=700&q=80&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1533089860892-a7d6f1c6a9d9?auto=format&w=934&h=700&q=80&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1570472016468-1f76c5f65b16?auto=format&w=934&h=700&q=80&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1605018413695-1fd36f18c9ac?auto=format&w=934&h=700&q=80&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1601049535325-6a5e4de34c9e?auto=format&w=934&h=700&q=80&fit=crop',
      cuisine: 'Vietnamese',
      difficulty: 'Medium',
      user_id: 'seedUser'
    }
  ];

  // 将示例食谱插入数据库
  await Recipe.insertMany(recipes);
}
