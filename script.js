const API_URL = "https://jsonplaceholder.typicode.com/users";

const searchInput = document.getElementById("search-input");
const reloadButton = document.getElementById("reload-button");
const message = document.getElementById("message");
const userList = document.getElementById("user-list");
const controls = document.getElementById("directory-controls");

let allUsers = [];

function setMessage(text, type) {
  message.textContent = text;
  message.className = "message " + type;
  message.hidden = text === "";
}

function createDetail(label, value, link) {
  const detail = document.createElement("p");
  detail.className = "user-detail";

  const labelElement = document.createElement("span");
  labelElement.className = "detail-label";
  labelElement.textContent = label;

  const valueElement = document.createElement(link ? "a" : "span");
  valueElement.className = "detail-value";
  valueElement.textContent = value;

  if (link) {
    valueElement.href = link;
  }

  detail.append(labelElement, valueElement);
  return detail;
}

function displayUsers(users) {
  userList.replaceChildren();

  users.forEach(function (user) {
    const card = document.createElement("article");
    card.className = "user-card";

    const name = document.createElement("h2");
    name.className = "user-name";
    name.textContent = user.name || "Unknown name";

    const email = user.email || "No email address";
    const city = user.address && user.address.city ? user.address.city : "Unknown city";
    const organization = user.company && user.company.name ? user.company.name : "Unknown organization";

    card.append(
      name,
      createDetail("Email", email, user.email ? "mailto:" + user.email : ""),
      createDetail("City", city),
      createDetail("Organization", organization)
    );

    userList.append(card);
  });
}

function searchUsers() {
  const query = searchInput.value.trim();
  const normalizedQuery = query.toLowerCase();

  const matches = normalizedQuery
    ? allUsers.filter(function (user) {
        const name = String(user.name || "").toLowerCase();
        const email = String(user.email || "").toLowerCase();
        return name.includes(normalizedQuery) || email.includes(normalizedQuery);
      })
    : allUsers.slice();

  displayUsers(matches);

  if (matches.length === 0 && normalizedQuery) {
    setMessage("No users match \"" + query + "\".", "empty");
    return;
  }

  if (matches.length === 0) {
    setMessage("The directory did not return any users.", "empty");
    return;
  }

  const countLabel = matches.length === 1 ? "1 user" : matches.length + " users";

  if (normalizedQuery) {
    setMessage("Showing " + countLabel + " matching \"" + query + "\".", "success");
    return;
  }

  setMessage("Showing " + countLabel + ".", "success");
}

async function loadUsers() {
  reloadButton.disabled = true;
  searchInput.disabled = true;
  userList.replaceChildren();
  setMessage("Loading users…", "loading");

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("The server returned status " + response.status + ".");
    }

    const users = await response.json();

    if (!Array.isArray(users)) {
      throw new Error("The server did not return a list of users.");
    }

    allUsers = users;
    reloadButton.textContent = "Reload users";

    if (allUsers.length === 0) {
      displayUsers([]);
      setMessage("The directory did not return any users.", "empty");
      return;
    }

    searchInput.disabled = false;
    searchUsers();
  } catch (error) {
    allUsers = [];
    userList.replaceChildren();
    searchInput.disabled = true;
    setMessage("Could not load users. " + error.message, "error");
  } finally {
    reloadButton.disabled = false;
  }
}

reloadButton.addEventListener("click", loadUsers);

searchInput.addEventListener("input", searchUsers);

controls.addEventListener("submit", function (event) {
  event.preventDefault();
  searchUsers();
});

loadUsers();
