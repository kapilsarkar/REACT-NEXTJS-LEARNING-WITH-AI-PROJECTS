//'https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=30';

const API_URL = "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=100"

const usersContainer = document.getElementById("users-container");
const refreshBtn = document.getElementById("refresh-btn");
const searchInput = document.getElementById("search-input");

let allUsers = [];

const getUsers = async () => {
    try {
        usersContainer.innerHTML = "<p>Loading users...</p>";
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Network Response was not ok")
        }
        const result = await response.json();
        console.log(result);
        const users = result?.data?.data;

        if (!users || users.length === 0) {
            usersContainer.innerHTML = "<p>No users found.</p>";
            return;
        }

        allUsers = users || [];
        renderUsers(allUsers);




    }
    catch (error) {
        console.error("Error Fetching Users :", error);
        usersContainer.innerHTML = "<p>Error fetching users. Please try again later.</p>";
    }


}
const renderUsers = (users) => {

    const userHTML = users.map(user => `
        <div class="user-card">
            <img src="${user?.picture?.large}" 
                 alt="${user?.name?.first} ${user?.name?.last}" />
            <h3>${user?.name?.first} ${user?.name?.last}</h3>
            <p>Email: ${user?.email}</p>
            <p>Location: ${user?.location?.country} - ${user?.location?.city}</p>
            <p>Gender: ${user?.gender}</p>
        </div>
    `).join("");

    usersContainer.innerHTML = userHTML;
};


refreshBtn.addEventListener("click", () => {
    getUsers();
});

function debounce(callback, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback.apply(this, args);
        }, delay);
    };
}

const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredUsers = allUsers.filter(user => {
        return (
            user?.name?.first?.toLowerCase().includes(searchTerm) ||
            user?.name?.last?.toLowerCase().includes(searchTerm) ||
            user?.email?.toLowerCase().includes(searchTerm) ||
            user?.location?.country?.toLowerCase().includes(searchTerm) ||
            user?.gender?.toLowerCase().includes(searchTerm)

        )
    });
    renderUsers(filteredUsers);
}

searchInput.addEventListener("input", debounce(handleSearch, 300));
getUsers();

