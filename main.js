'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height;
const toggleBtn = document.querySelector(".navbar__toggle__btn");

document.addEventListener("scroll", () => {
    if(window.scrollY > navbarHeight) {
        navbar.classList.add("navbar--dark");
        toggleBtn.classList.add("translate");
    }else {
        navbar.classList.remove("navbar--dark");
        toggleBtn.classList.remove("translate");
    }
})

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");

navbarMenu.addEventListener("click", (event) => {
    const link = event.target.dataset.link;
    if(link == null) {
        return;
    }
    navbarMenu.classList.remove("visible");
    scrollIntoView(link);
})

// Navbar toggle button for small screen
toggleBtn.addEventListener("click", () => {
    navbarMenu.classList.toggle("visible");
})

/*const navbarItem = document.querySelectorAll(".navbar__menu__item");
const home = document.querySelector("#home");
const skills = document.querySelector("#skills");
const work = document.querySelector("#work");
const testimonial = document.querySelector("#testimonials");
const contact = document.querySelector("#contact");

navbarItem[0].onclick = function() {
    window.scroll({top:home.offsetTop, behavior: 'smooth'});
}*/

// Handle click on "contact me" button on home
const contact__btn = document.querySelector(".home__contact");
const contact = document.querySelector("#contact");


contact__btn.addEventListener("click", ()=> {
    window.scroll({top:contact.offsetTop, behavior: "smooth"});
})

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector(".home__container");
const homeHeight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => {
    home.style.opacity = 1 - window.scrollY / homeHeight;
})

document.addEventListener("scroll", opacityControl);
contact__btn.addEventListener("mouseleave", opacityControl);
contact__btn.addEventListener("mouseenter", () => {
    contact__btn.style.opacity = 1;
})

/*document.addEventListener("scroll", () => {
    if(window.scrollY > homeHeight / 4) {
        home.classList.add("home--transparent");
    }else if(window.scrollY > homeHeight /2) {
        home.classList.add("home--dark");
        home.classList.remove("home--transparent");
    }else {
        home.classList.remove("home--transparent");
        home.classList.remove("home--dark");
    }
})*/

// Show "arrow up" button when scrolling down
const arrow = document.querySelector(".arrow__up");

document.addEventListener("scroll", () => {
    if(window.scrollY > homeHeight / 2) {
        arrow.classList.add("visible");
    }else {
        arrow.classList.remove("visible");
    }
})

// Handle click on the "arrow up" button
arrow.addEventListener("click", () => {
    scrollIntoView("#home");
})

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (event) => {
    const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
    if(filter == null) {
        return;
    }

    // Remove selection from the previous item and select the new one
    const active = document.querySelector(".category__btn.selected");
    active.classList.remove("selected");
    const target = event.target.nodeName === "BUTTON" ? event.target : event.target.parentNode;
    target.classList.add("selected");

    projectContainer.classList.add("ani-out");
    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type) {
                project.classList.remove("invisible");
            }else {
                project.classList.add("invisible");
            }
        })
        projectContainer.classList.remove("ani-out");
    }, 300);
})

// Universal

function scrollIntoView(selector) {
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior: "smooth"});    
}

function opacityControl() {
    contact__btn.style.opacity = 1 - window.scrollY / homeHeight;
}