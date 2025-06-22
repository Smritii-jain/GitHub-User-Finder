let searchBtn = document.getElementById("searchBtn");
let usernameInput = document.getElementById("usernameInput");
let card = document.getElementById("profileCard");
let error = document.getElementById("error");

function getProfileData(username) {
    return fetch(`https://api.github.com/users/${username}`).then(res => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
    });
}

function getReposData(username) {
    return fetch(`https://api.github.com/users/${username}/repos?sort=updated`).then(res => {
        if (!res.ok) throw new Error("Repos not found");
        return res.json();
    });
}

function decorateProfileData(details) {
    console.log(details);
    let data = `<div class="w-28 h-25 shrink-0 rounded-full overflow-hidden border-2 border-gray-300 shadow-md">
          <img src="${details.avatar_url}" alt="User Avatar" class="w-full h-full object-cover" />
        </div>

        <div class="text-center lg:text-left space-y-2 w-full">
          <h2 class="text-2xl font-semibold text-gray-900">${details.name}</h2>
          <p class="text-gray-800 text-sm">@${details.login}</p>
          <p class="text-gray-700 text-sm">${details.location}</p>
          <p class="text-gray-700 text-sm" mt-2>${details.bio || ""}</p>

          <div class="flex flex-wrap gap-4 mt-4 text-sm text-gray-700 justify-center lg:justify-start">
            <div>
                <span class="font-semibold">Public Repos: </span>${details.public_repos}
            </div>
            <div>
                <span class="font-semibold">Followers: </span>${details.followers}
            </div>
            <div>
                <span class="font-semibold">Following: </span>${details.following}
            </div>
          </div>
        </div>`;

    card.innerHTML = data;
}

searchBtn.addEventListener("click", () => {
  let username = usernameInput.value.trim();
  card.innerHTML = "";
  error.classList.add("hidden");

  if (!username) {
    error.textContent = "⚠️Please enter a GitHub username.";
    error.classList.remove("hidden");
    return;
  }

  getProfileData(username)
    .then(data => decorateProfileData(data))
    .catch(() => {
      error.textContent = "🚫User not found. Please try again.";
      error.classList.remove("hidden");
    });
});