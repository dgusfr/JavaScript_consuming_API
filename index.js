const baseUrl = "http://localhost:3000";
let authToken = null;
let editArticleId = null;

// Recupera o token armazenado
authToken = localStorage.getItem("authToken");

document.addEventListener("DOMContentLoaded", () => {
  const articleForm = document.getElementById("articleForm");
  const createBtn = document.getElementById("createBtn");
  const editBtn = document.getElementById("editBtn");
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const articlesList = document.getElementById("articlesList");
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const response = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        authToken = data.token;
        localStorage.setItem("authToken", authToken); // Salva o token
        alert("Login realizado com sucesso!");
        window.location.href = "index.html";
      } else {
        alert("Erro no login. Verifique suas credenciais.");
      }
    });
  }

  if (articlesList) {
    loadArticles();
  }

  if (articleForm) {
    createBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      if (!editArticleId) {
        await fetch(`${baseUrl}/articles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            title: titleInput.value,
            content: contentInput.value,
          }),
        });
        titleInput.value = "";
        contentInput.value = "";
        loadArticles();
      }
    });

    editBtn.addEventListener("click", async () => {
      if (editArticleId) {
        await fetch(`${baseUrl}/articles/${editArticleId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            title: titleInput.value,
            content: contentInput.value,
          }),
        });
        titleInput.value = "";
        contentInput.value = "";
        editArticleId = null;
        createBtn.classList.remove("d-none");
        editBtn.classList.add("d-none");
        loadArticles();
      }
    });
  }
});

async function loadArticles() {
  const response = await fetch(`${baseUrl}/articles`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  const articlesList = document.getElementById("articlesList");
  articlesList.innerHTML = "";

  if (response.ok) {
    const articles = await response.json();
    articles.forEach((article) => {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.innerHTML = `
        <h5>${article.title}</h5>
        <p>${article.content}</p>
        <div data-id="${article.id}">
          <button class="btn btn-sm btn-warning me-2" 
            onclick="populateForm(${article.id}, '${encodeURIComponent(
        article.title
      )}', '${encodeURIComponent(article.content)}')">
            Editar
          </button>
          <button class="btn btn-sm btn-danger" onclick="deleteArticle(${
            article.id
          })">Excluir</button>
        </div>
      `;
      articlesList.appendChild(li);
    });
  } else if (response.status === 401) {
    alert("Você não está autorizado. Faça login novamente.");
    localStorage.removeItem("authToken");
    window.location.href = "login.html";
  } else {
    articlesList.innerHTML =
      '<li class="list-group-item">Erro ao carregar artigos</li>';
  }
}

function populateForm(id, title, content) {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const createBtn = document.getElementById("createBtn");
  const editBtn = document.getElementById("editBtn");

  titleInput.value = decodeURIComponent(title);
  contentInput.value = decodeURIComponent(content);

  editArticleId = id;
  createBtn.classList.add("d-none");
  editBtn.classList.remove("d-none");
}

async function deleteArticle(id) {
  const confirmDelete = confirm("Deseja realmente excluir este artigo?");
  if (confirmDelete) {
    try {
      const response = await fetch(`${baseUrl}/articles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        alert("Artigo excluído com sucesso.");
        loadArticles(); // Atualiza a lista de artigos
      } else if (response.status === 401) {
        alert("Você não está autorizado. Faça login novamente.");
        localStorage.removeItem("authToken");
        window.location.href = "login.html";
      } else {
        alert("Erro ao excluir o artigo. Verifique os logs do servidor.");
      }
    } catch (error) {
      console.error("Erro na exclusão:", error);
      alert("Ocorreu um erro. Tente novamente.");
    }
  }
}

function logout() {
  localStorage.removeItem("authToken");
  authToken = null;
  window.location.href = "login.html";
}
