//'https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=30';

const API_URL = "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=200"

const usersContainer = document.getElementById("users-container");
const refreshBtn = document.getElementById("refresh-btn");
const searchInput = document.getElementById("search-input");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");
const pageNumbersContainer = document.getElementById("page-numbers");


let allUsers = [];
let filteredUsers = [];
let currentPage = 1;
const usersPerPage = 10;

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
        filteredUsers = users;
        currentPage = 1;
        renderUsers();

    }
    catch (error) {
        console.error("Error Fetching Users :", error);
        usersContainer.innerHTML = "<p>Error fetching users. Please try again later.</p>";
    }


}
const renderUsers = () => {


    if (filteredUsers.length === 0) {
        usersContainer.innerHTML = "<p>No users found.</p>";
        pageNumbersContainer.innerHTML = "";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }

    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;

    const paginatedUsers = filteredUsers.slice(startIndex, endIndex);

    const userHTML = paginatedUsers.map(user => `
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
    updatedPaginationInfo();

    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: "smooth"

    });
};

function updatedPaginationInfo() {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    // Disable Prev/Next properly
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;

    // Clear old page numbers
    pageNumbersContainer.innerHTML = "";

    // Create numbered buttons
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement("button");
        pageBtn.textContent = i;

        if (i === currentPage) {
            pageBtn.classList.add("active-page");
        }

        pageBtn.addEventListener("click", () => {
            currentPage = i;
            renderUsers();
        });

        pageNumbersContainer.appendChild(pageBtn);
    }
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderUsers();
    }
});

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        renderUsers();
    }
});

refreshBtn.addEventListener("click", () => {
    getUsers();
});

function debounce(callback, delay) {
    let timer;

    return function (event) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            callback(event);
        }, delay);
    };
}

const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();

    filteredUsers = allUsers.filter(user =>
        user?.name?.first?.toLowerCase().includes(searchTerm) ||
        user?.name?.last?.toLowerCase().includes(searchTerm) ||
        user?.email?.toLowerCase().includes(searchTerm) ||
        user?.location?.country?.toLowerCase().includes(searchTerm) ||
        user?.gender?.toLowerCase().includes(searchTerm)
    );

    currentPage = 1;  // important
    renderUsers();
}

searchInput.addEventListener("input", debounce(handleSearch, 300));
getUsers();

