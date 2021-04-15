console.log('Hello from main.js')

// DOM SELECTORS
const allLinks = document.querySelectorAll('.navLink')
const homeLink = document.querySelector('#homeLink')
const loginLink = document.querySelector('#loginLink')
const signupLink = document.querySelector('#signupLink')
const logoutLink = document.querySelector('#logoutLink')
const showLink = document.querySelector('#showLink')
const profileLink = document.querySelector('#profileLink')

const allViews = document.querySelectorAll('.view')
const homeView = document.querySelector('#home')
const signupView = document.querySelector('#signup')
const loginView = document.querySelector('#login')
const showAllView = document.querySelector('#allBusinesses')
const showOneView = document.querySelector('#oneBusiness')
const profileView = document.querySelector('#profile')

const searchBar = document.querySelectorAll('.searchBar')
const signupForm = document.querySelector('#signupForm')
const loginForm = document.querySelector('#loginForm')
const editBusinessForm = document.querySelector('#editBusinessForm')
const editUserForm = document.querySelector('#editUserForm')
// NAV LINKS
homeLink.addEventListener('click', () => {
    hideViews()
    homeView.classList.remove('hidden')
})
loginLink.addEventListener('click', () => {
    hideViews()
    loginView.classList.remove('hidden')
})
signupLink.addEventListener('click', () => {
    hideViews()
    signupView.classList.remove('hidden')
})
showLink.addEventListener('click', () => {
    hideViews()
    showAllView.classList.remove('hidden')
})
profileLink.addEventListener('click', () => {
    hideViews()
    profileView.classList.remove('hidden')
})


// USER

// BUSINESS

// REUSABLE FUNCTIONS
function hideViews() {
    allViews.forEach(view => {
        view.classList.add('hidden')
    })
}