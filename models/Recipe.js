// models/Recipe.js
const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ingredients: { type: [String], required: true },
  steps: { type: [String], required: true },
  image: { type: String },      // 图片 URL 或文件名
  cuisine: { type: String },
  difficulty: { type: String },
  user_id: { type: String }     // 上传者 ID
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);
