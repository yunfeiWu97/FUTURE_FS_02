let recipes = [];
let currentRecipe = null; // 用于存储当前显示的食谱信息

// 页面加载完成后获取食谱数据
document.addEventListener('DOMContentLoaded', () => {
  loadRecipes();
});

// 上传食谱表单提交事件
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

  // 使用 /api/recipes 接口提交数据
  const res = await fetch('/api/recipes', {
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

// 筛选按钮事件
document.getElementById('filterBtn').addEventListener('click', () => {
  loadRecipes();
});

// 从服务器加载食谱数据
async function loadRecipes() {
  const searchValue = document.getElementById('searchInput').value.trim();
  const cuisineValue = document.getElementById('cuisineFilter').value;
  const difficultyValue = document.getElementById('difficultyFilter').value;

  // 构建查询字符串
  let query = '/api/recipes?';
  if (searchValue) query += `search=${encodeURIComponent(searchValue)}&`;
  if (cuisineValue) query += `cuisine=${encodeURIComponent(cuisineValue)}&`;
  if (difficultyValue) query += `difficulty=${encodeURIComponent(difficultyValue)}&`;

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
          <p class="card-text">
            Cuisine: ${recipe.cuisine || 'N/A'}<br>
            Difficulty: ${recipe.difficulty || 'N/A'}
          </p>
        </div>
        <div class="card-footer text-end">
          <button class="btn btn-outline-primary btn-sm" onclick="openRecipeModal('${recipe._id}')">View Details</button>
        </div>
      </div>
    `;
    recipeList.appendChild(col);
  });
}

// 点击分类按钮时调用，设置筛选条件并重新加载数据
function setCuisineFilter(cuisine) {
  document.getElementById('cuisineFilter').value = cuisine;
  loadRecipes();
}

// 打开模态框显示食谱详情
function openRecipeModal(id) {
  currentRecipe = recipes.find(r => r._id === id);
  if (!currentRecipe) return;

  const recipeDetails = document.getElementById('recipeDetails');
  recipeDetails.innerHTML = `
    <h3>${currentRecipe.title}</h3>
    ${currentRecipe.image ? `<img src="${currentRecipe.image}" class="img-fluid mb-3" alt="${currentRecipe.title}">` : ''}
    <p><strong>Cuisine:</strong> ${currentRecipe.cuisine || 'N/A'}</p>
    <p><strong>Difficulty:</strong> ${currentRecipe.difficulty}</p>
    <h5>Ingredients:</h5>
    <ul>
      ${currentRecipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
    </ul>
    <h5>Steps:</h5>
    <ol>
      ${currentRecipe.steps.map(step => `<li>${step}</li>`).join('')}
    </ol>
  `;

  // 显示 Bootstrap 模态框
  const modal = new bootstrap.Modal(document.getElementById('recipeModal'));
  modal.show();
}

// “添加到收藏”按钮事件
document.getElementById('addFavoriteBtn').addEventListener('click', async () => {
  if (!currentRecipe) return;
  const user_id = document.getElementById('user_id').value;

  const res = await fetch('/api/users/favorites', {
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
