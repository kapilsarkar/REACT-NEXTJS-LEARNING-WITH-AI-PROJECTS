const frame = document.getElementById("project-frame")
const welcome = document.getElementById("welcome-screen")
const backBtn = document.getElementById("back-btn")
const sidebar = document.getElementById("sidebar")
const menuBtn = document.getElementById("menu-btn")

function loadProject(path) {

    welcome.style.display = "none"
    frame.style.display = "block"
    backBtn.style.display = "inline-block"

    frame.src = path
    frame.classList.add("frame-open")

    if (window.innerWidth < 768) {
        sidebar.classList.remove("active")
        menuBtn.textContent = "☰"
    }
}

function goHome() {

    frame.removeAttribute("src")

    frame.style.display = "none"
    backBtn.style.display = "none"
    welcome.style.display = "block"

    sidebar.classList.remove("active")
    menuBtn.textContent = "☰"
}

function toggleSidebar() {

    const isOpen = sidebar.classList.toggle("active")
    menuBtn.textContent = isOpen ? "✕" : "☰"
}

function toggleDarkMode() {

    const btn = document.getElementById("dark-toggle")

    document.body.classList.toggle("dark")

    const isDark = document.body.classList.contains("dark")

    btn.textContent = isDark ? "☀️" : "🌙"

    localStorage.setItem("darkMode", isDark)

}

document.addEventListener("click", function (event) {

    if (window.innerWidth < 768) {

        const clickedOutsideSidebar = !sidebar.contains(event.target)
        const clickedMenuButton = menuBtn.contains(event.target)

        if (clickedOutsideSidebar && !clickedMenuButton) {
            sidebar.classList.remove("active")
            menuBtn.textContent = "☰"
        }
    }
})
const savedMode = localStorage.getItem("darkMode")

if (savedMode === "true") {
    document.body.classList.add("dark")
    document.getElementById("dark-toggle").textContent = "☀️"
}
/* LOAD PROJECTS */

document.querySelectorAll("[data-project]").forEach((item) => {

    item.addEventListener("click", () => {

        const projectPath = item.getAttribute("data-project")

        /* remove old highlight */
        document.querySelectorAll("[data-project]").forEach(btn => {
            btn.classList.remove("active-project")
        })

        /* highlight clicked project */
        item.classList.add("active-project")

        loadProject(projectPath)

    })

})