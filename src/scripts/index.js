import { users, posts, suggestUsers } from './database.js';
  
// Renderiza a lista de usuários sugeridos
const renderSuggestedUsers = () => {
    const suggestUsersContainer = document.querySelector(".container__suggestions");
    suggestUsers.forEach((user) => {
        const userItem = document.createElement("div");
        userItem.classList.add("container__list--user");
        userItem.classList.add("container__list--user-li");
        userItem.innerHTML = `
        <div class="user-details">
            <img src="${user.img}" alt="user-icon" class="suggested__user-icon profilesSuggestion"/>
            <div class="user-info">
                <h2>${user.user}</h2>
                <p>${user.stack}</p>
            </div>
        </div>
        <button class="btnNotFollowing">Seguir</button>
    `;

      const followBtn = userItem.querySelector(".btnNotFollowing");
      followBtn.addEventListener("click", () => {
        followBtn.classList.toggle("btnNotFollowing");
        followBtn.classList.toggle("btnFollowing");
        followBtn.textContent = followBtn.classList.contains("btnFollowing") ? "Seguindo" : "Seguir";
      });
  
      suggestUsersContainer.appendChild(userItem);
    });
};

const modal = document.getElementById("modal");
const closeButton = document.getElementById("closeButton");

const showModal = () => {
    modal.style.display = "block";
};
  
const hideModal = () => {
    modal.style.display = "none";
};
  
closeButton.addEventListener("click", hideModal);
window.addEventListener("click", (event) => {
    if (event.target === modal) {
      hideModal();
    }
});
  
const showPost = (postsArray, postId) => {
const post = postsArray.find((post) => post.id_post === postId);
    if (post) {
      document.querySelector(".modal-user-img").src = post.img;
      document.querySelector(".modal-user").textContent = post.user;
      document.querySelector(".modal-stack").textContent = post.stack;
      document.querySelector(".modal-title").textContent = `${post.title}`;
      document.querySelector(".modal-text").textContent = `${post.text}`;
      showModal();
    } else {
      console.log(`Post with ID ${postId} does not exist`);
    }
};
  
// Renderiza a lista de posts
const renderPosts = () => {
    const postsContainer = document.querySelector(".container__posts");
    posts.forEach((post) => {
      const postItem = document.createElement("div");
      postItem.classList.add("card");
      postItem.innerHTML = `
        <div class="post__header">
          <img src="${post.img}" alt="user-icon" class="post__user-icon" />
          <div class="post__user-info">
            <p class="post__user-name">${post.user}</p>
            <p class="post__user-stack">${post.stack}</p>
          </div>
        </div>
        <h2 class="post__title">${post.title}</h2>
        <p class="post__text">${post.text}</p>
        <div class="actions-container">
          <button class="custom-btn btnOpenModal" data-post-id="${post.id_post}">Abrir Post</button>
          <img src="src/assets/img/Vector.svg" alt="Likes" class="likes-icon" />
          ${post.likes}
        </div>
      `;
      postsContainer.appendChild(postItem);
  
      const openModalButton = postItem.querySelector(".btnOpenModal");
      openModalButton.addEventListener("click", () => {
        const postId = parseInt(openModalButton.dataset.postId, 10);
        const postExists = posts.find((post) => post.id_post === postId);
  
        if (postExists) {
          showPost(posts, postId);
        } else {
          console.log(`Post with ID ${postId} does not exist`);
        }
      });
    });
};

renderSuggestedUsers();
renderPosts();