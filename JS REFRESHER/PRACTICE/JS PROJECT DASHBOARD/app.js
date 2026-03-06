const frame = document.getElementById("project-frame")
const welcome = document.getElementById("welcome-screen")
const backBtn = document.getElementById("back-btn")
const sidebar = document.getElementById("sidebar")
const menuBtn = document.getElementById("menu-btn")

function loadProject(path){

welcome.style.display = "none"
frame.style.display = "block"
backBtn.style.display = "inline-block"

frame.src = path

if(window.innerWidth < 768){
sidebar.classList.remove("active")
menuBtn.textContent = "☰"
}

}

function goHome(){

frame.removeAttribute("src")

frame.style.display = "none"
backBtn.style.display = "none"
welcome.style.display = "block"

sidebar.classList.remove("active")
menuBtn.textContent = "☰"

}

function toggleSidebar(){

const isOpen = sidebar.classList.toggle("active")

menuBtn.textContent = isOpen ? "✕" : "☰"

}

function toggleDarkMode(){
document.body.classList.toggle("dark")
}

document.addEventListener("click", function(event){

if(window.innerWidth < 768){

const clickedOutsideSidebar = !sidebar.contains(event.target)
const clickedMenuButton = menuBtn.contains(event.target)

if(clickedOutsideSidebar && !clickedMenuButton){
sidebar.classList.remove("active")
menuBtn.textContent = "☰"
}

}

})