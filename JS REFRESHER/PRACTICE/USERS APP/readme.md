### Random User Directory 

- A dynamic, responsive User Directory built with Vanilla JavaScript that fetches data from a   public API. This project demonstrates asynchronous data handling, client-side filtering, and custom pagination logic.

### 🚀 Features

- Asynchronous Data Fetching: Uses the fetch API with async/await to retrieve 200 users from a remote server.

- Live Search & Filtering: Filter users by name, email, location, or gender in real-time.

- Smart Debouncing: Implements a debounce function on the search input to optimize performance and reduce unnecessary re-renders.

- Custom Pagination: * Dynamically calculates page numbers.

- Prev/Next navigation.

- Jump to specific pages via numbered buttons.

- Smooth UX: Automatically scrolls back to the top when switching pages.

### 🛠️ Code Architecture

1. Data Management :

- The app maintains two primary states for data:

- allUsers: The "source of truth" containing the full dataset from the API.

- filteredUsers: A subset of users currently being viewed (updated via the search bar).

2. The Pagination Logic :

- The app displays a fixed number of users per page (10). The view is calculated using the following formula:

```js
startIndex = (currentPage - 1) \times usersPerPage$$$$endIndex = startIndex + usersPerPage$$
```

- The code uses `.slice(startIndex, endIndex)` to extract only the users needed for the current view.

### Function,Description :

- `getUsers()`,An async function that fetches data and handles loading/error states.

- `renderUsers()`,Maps the user data into HTML cards and updates the DOM.

- `debounce()`,A higher-order function that delays the search execution until the user stops typing for 300ms.

- `handleSearch()`,"Filters the allUsers array based on multiple criteria (name, email, etc.) and resets the view to page 1."


### 📖 How to Use

- `Initialize`: On page load, getUsers() is called automatically.

- `Search`: Type in the search bar. The list updates as you type (with a slight delay for performance).

- `Navigate`: Use the "Previous" and "Next" buttons or click on a specific page number at the bottom.

- `Refresh`: Click the refresh button to pull a fresh set of random users from the API.

### 📡 API Reference

- This project uses the FreeAPI public endpoint:

`https://api.freeapi.app/api/v1/public/randomusers`

### 💡 Tech Stack

- HTML5 - Semantic structure.

- CSS3 - Card layouts and "Active" state styling for pagination.

- JavaScript (ES6+) - Fetch API, DOM Manipulation, and Array methods (map, filter, slice).