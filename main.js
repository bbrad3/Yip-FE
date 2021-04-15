console.log('Hello from main.js')

// GLOBAL VARIABLES
const backendUrl = 'http://localhost:3001'

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
logoutLink.addEventListener('click', logoutUser)
showLink.addEventListener('click', () => {
    hideViews()
    showAllView.classList.remove('hidden')
})
profileLink.addEventListener('click', () => {
    hideViews()
    profileView.classList.remove('hidden')
})

// USER
// --LOGIN
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const email = document.querySelector('#loginEmail').value
        const password = document.querySelector('#loginPassword').value

        const response = await axios.post(`${backendUrl}/users/login`, {
            email: email,
            password: password
        })
        console.log('login response', response.data)
        if(response.status === 200) {
            localStorage.setItem('userId', response.data.user.id)
            checkLoggedIn()
            goHome()
        }
    } catch (error) {
        console.log('Can not login user')
    }
})

// --SIGNUP
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    try {
        const name = document.querySelector('#signupName').value
        const email = document.querySelector('#signupEmail').value
        const password = document.querySelector('#signupPassword').value

        const response = await axios.post(`${backendUrl}/users/new`, {
            name: name,
            email: email,
            password: password
        })
        console.log('signup response', response.data)
        if(response.status === 200) {
            localStorage.setItem('userId', response.data.user[0].id)
            checkLoggedIn()
            goHome()
        }
    } catch (error) {
        console.log('Can not login user')
    }
})

// --LOGOUT
function logoutUser() {
    localStorage.removeItem('userId')
    checkLoggedIn()
    goHome()
}

// BUSINESS

// REUSABLE FUNCTIONS
function hideViews() {
    allViews.forEach(view => {
        view.classList.add('hidden')
    })
}

function goHome() {
    hideViews()
    homeView.classList.remove('hidden')
}

function checkLoggedIn() {
    if(localStorage.getItem('userId')) {
        loginLink.classList.add('hidden')
        signupLink.classList.add('hidden')
        logoutLink.classList.remove('hidden')
        profileLink.classList.remove('hidden')
    } else {
        loginLink.classList.remove('hidden')
        signupLink.classList.remove('hidden')
        logoutLink.classList.add('hidden')
        profileLink.classList.add('hidden')
    }
}
checkLoggedIn()