//'https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=30';

const API_URL = "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=100"

const usersContainer = document.getElementById("users-container");
const refreshBtn = document.getElementById("refresh-btn");

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

        renderUsers(users);

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


getUsers();

