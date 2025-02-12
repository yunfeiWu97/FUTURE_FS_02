// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const Recipe = require('./models/Recipe');
const User = require('./models/User');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件设置
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 连接 MongoDB 数据库
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// 提供前端静态文件
app.use(express.static(path.join(__dirname, 'public')));

/* ================================
   API 接口定义
================================ */

// 1. 上传新食谱 POST /recipes
app.post('/recipes', async (req, res) => {
  try {
    const { title, ingredients, steps, image, cuisine, difficulty, user_id } = req.body;
    const newRecipe = new Recipe({ title, ingredients, steps, image, cuisine, difficulty, user_id });
    await newRecipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 2. 获取所有食谱 GET /recipes
// 支持通过查询参数过滤：cuisine, difficulty, search（标题模糊搜索）
app.get('/recipes', async (req, res) => {
  try {
    const { cuisine, difficulty, search } = req.query;
    let filter = {};
    if (cuisine) filter.cuisine = cuisine;
    if (difficulty) filter.difficulty = difficulty;
    if (search) {
      filter.title = { $regex: search, $options: 'i' };
    }
    const recipes = await Recipe.find(filter).sort({ createdAt: -1 });
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 3. 获取单个食谱详情 GET /recipes/:id
app.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 4. 添加收藏 POST /users/favorites
// 这里简单实现：传入 user_id 与 recipe_id
app.post('/users/favorites', async (req, res) => {
  try {
    const { user_id, recipe_id } = req.body;
    let user = await User.findById(user_id);
    if (!user) {
      // 简单处理：如果用户不存在则创建（实际项目中应有完整注册流程）
      user = new User({ _id: user_id, username: `User${user_id}`, favorites: [] });
    }
    if (!user.favorites.includes(recipe_id)) {
      user.favorites.push(recipe_id);
    }
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 5. 获取用户收藏列表 GET /users/favorites/:user_id
app.get('/users/favorites/:user_id', async (req, res) => {
  try {
    const user = await User.findById(req.params.user_id).populate('favorites');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user.favorites);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
