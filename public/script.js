// public/script.js

let recipes = [];
let currentRecipe = null; // 当前选中的食谱（用于模态框显示）

// 页面加载时获取所有食谱
document.addEventListener('DOMContentLoaded', () => {
  loadRecipes();
});

// 监听上传表单提交
document.getElementById('recipe-form').addEventListener('submit', async function(e) {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const ingredients = document.getElementById('ingredients').value.split(',').map(item => item.trim());
  const steps = document.getElementById('steps').value.split('\n').map(item => item.trim());
  const image = document.getElementById('image').value.trim();
  const cuisine = document.getElementById('cuisine').value.trim();
  const difficulty = document.getElementById('difficulty').value;
  const user_id = document.getElementById('user_id').value;

  const recipe = { title, ingredients, steps, image, cuisine, difficulty, user_id };

  const res = await fetch('/recipes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipe)
  });
  if (res.ok) {
    alert('Recipe submitted successfully!');
    document.getElementById('recipe-form').reset();
    loadRecipes();
  } else {
    alert('Error submitting recipe.');
  }
});

// 过滤按钮点击事件
document.getElementById('filterBtn').addEventListener('click', () => {
  loadRecipes();
});

// 加载食谱数据
async function loadRecipes() {
  // 获取筛选参数
  const search = document.getElementById('searchInput').value.trim();
  const cuisine = document.getElementById('cuisineFilter').value;
  const difficulty = document.getElementById('difficultyFilter').value;
  
  let query = '/recipes?';
  if (search) query += `search=${encodeURIComponent(search)}&`;
  if (cuisine) query += `cuisine=${encodeURIComponent(cuisine)}&`;
  if (difficulty) query += `difficulty=${encodeURIComponent(difficulty)}&`;

  const res = await fetch(query);
  recipes = await res.json();
  displayRecipes();
}

// 渲染食谱卡片
function displayRecipes() {
  const recipeList = document.getElementById('recipe-list');
  recipeList.innerHTML = '';
  recipes.forEach(recipe => {
    const col = document.createElement('div');
    col.className = 'col';
    col.innerHTML = `
      <div class="card h-100">
        ${recipe.image ? `<img src="${recipe.image}" class="card-img-top" alt="${recipe.title}">` : ''}
        <div class="card-body">
          <h5 class="card-title">${recipe.title}</h5>
          <p class="card-text">Cuisine: ${recipe.cuisine || 'N/A'}<br>Difficulty: ${recipe.difficulty}</p>
        </div>
        <div class="card-footer text-end">
          <button class="btn btn-outline-primary btn-sm" onclick="openRecipeModal('${recipe._id}')">View Details</button>
        </div>
      </div>
    `;
    recipeList.appendChild(col);
  });
}

// Called when clicking a category button
function setCuisineFilter(cuisine) {
  // 将分类值赋给下拉框，或者在加载时传参
  document.getElementById('cuisineFilter').value = cuisine;
  loadRecipes();
}

// 打开模态框显示详情
async function openRecipeModal(id) {
  currentRecipe = recipes.find(r => r._id === id);
  if (!currentRecipe) return;
  
  // 动态填充模态框内容
  let detailsHtml = `
    <h3>${currentRecipe.title}</h3>
    ${currentRecipe.image ? `<img src="${currentRecipe.image}" class="img-fluid mb-3" alt="${currentRecipe.title}">` : ''}
    <p><strong>Cuisine:</strong> ${currentRecipe.cuisine || 'N/A'}</p>
    <p><strong>Difficulty:</strong> ${currentRecipe.difficulty}</p>
    <h5>Ingredients:</h5>
    <ul>${currentRecipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul>
    <h5>Steps:</h5>
    <ol>${currentRecipe.steps.map(step => `<li>${step}</li>`).join('')}</ol>
  `;
  document.getElementById('recipeDetails').innerHTML = detailsHtml;

  // 显示模态框（利用 Bootstrap Modal）
  const recipeModal = new bootstrap.Modal(document.getElementById('recipeModal'));
  recipeModal.show();
}

// 添加收藏
document.getElementById('addFavoriteBtn').addEventListener('click', async () => {
  if (!currentRecipe) return;
  const user_id = document.getElementById('user_id').value;
  const res = await fetch('/users/favorites', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id, recipe_id: currentRecipe._id })
  });
  if (res.ok) {
    alert('Added to favorites!');
  } else {
    alert('Error adding to favorites.');
  }
});
