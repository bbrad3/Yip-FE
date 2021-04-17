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

const businessesContainer = document.querySelector('#businessesContainer')
const singleBusinessName = document.querySelector('#singleBusinessName')
const singleBusinessType = document.querySelector('#singleBusinessType')
const singleBusinessImg = document.querySelector('#singleBusinessImg')
const singleBusinessDescription = document.querySelector('#singleBusinessDescription')
const singleBusinessAddress = document.querySelector('#singleBusinessAddress')

const editBusinessName = document.querySelector('#editBusinessName')
const editBusinessType = document.querySelector('#editBusinessType')
const editBusinessImg = document.querySelector('#editBusinessImg')
const editBusinessDesc = document.querySelector('#editBusinessDesc')
const editBusinessAddress = document.querySelector('#editBusinessAddress')

const userName = document.querySelector('#userName')
const userEmail = document.querySelector('#userEmail')

const editUserName = document.querySelector('#editUserName')
const editUserEmail = document.querySelector('#editUserEmail')
const editUserPassword = document.querySelector('#editUserPassword')
const editProfileBtn = document.querySelector('#editProfileBtn')
const deleteProfileBtn = document.querySelector('#deleteProfileBtn')

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
const deleteBusinessBtn = document.querySelector('#deleteBusinessBtn')
const updateBusinessBtn = document.querySelector('#updateBusinessBtn')
const editBusinessBtn = document.querySelector('#editBusinessBtn')
const editBusinessForm = document.querySelector('#editBusinessForm')
const editUserForm = document.querySelector('#editUserForm')
const editUserBtn = document.querySelector('#editUserBtn')
const reviewSubmitBtn = document.querySelector('#reviewSubmitBtn')
const addBusiness = document.querySelector('#addBusiness')

const reviewContainer = document.querySelector('#reviewContainer')


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
    populateCompanies()
})
profileLink.addEventListener('click', () => {
    hideViews()
    profileView.classList.remove('hidden')
    populateProfile()
})

// USER
// --LOGIN
loginForm.addEventListener('submit', async(e) => {
    e.preventDefault()
    try {
        const email = document.querySelector('#loginEmail').value
        const password = document.querySelector('#loginPassword').value

        const response = await axios.post(`${backendUrl}/users/login`, {
            email: email,
            password: password
        })
        console.log('login response', response.data)
        if (response.status === 200) {
            localStorage.setItem('userId', response.data.userId)
            checkLoggedIn()
            goHome()
        }
    } catch (error) {
        console.log('Can not login user')
    }
})

// --SIGNUP
signupForm.addEventListener('submit', async(e) => {
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
        if (response.status === 200) {
            localStorage.setItem('userId', response.data.userId)
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
async function populateCompanies() {
    const response = await axios.get(`${backendUrl}/companies/all`)
    console.log(response.data.companies)
    while (businessesContainer.firstChild) {
        businessesContainer.firstChild.remove()
    }
    for (let company of response.data.companies) {

        let businessDiv = document.createElement('div')
        businessDiv.setAttribute('class', 'businessDiv')
        businessesContainer.append(businessDiv)

        let businessImg = document.createElement('img')
        businessImg.setAttribute('class', 'businessImg')
        businessImg.setAttribute('src', company.image)
        businessDiv.append(businessImg)

        let textDiv = document.createElement('div')
        textDiv.setAttribute('class', 'textDiv')
        businessDiv.append(textDiv)

        let businessName = document.createElement('h3')
        businessName.setAttribute('class', 'businessName')
        businessName.innerHTML = company.name
        textDiv.append(businessName)

        let businessType = document.createElement('p')
        businessType.setAttribute('class', 'businessType')
        businessType.innerHTML = company.type
        textDiv.append(businessType)

    }

}

// --SINGLE BUSINESS
businessesContainer.addEventListener('click', async(event) => {
    // console.log(event.target.children[1].children[0].innerHTML)
    // console.log(event.target)

    if (event.target.classList.contains('businessDiv')) {
        const businessName = event.target.children[1].children[0].innerHTML

        hideViews()
        showOneView.classList.remove('hidden')
        editBusinessForm.classList.add('hidden')

        const response = await axios.get(`${backendUrl}/companies/${businessName}`)
        console.log(response)

        singleBusinessName.innerHTML = response.data.oneCompany.name
        singleBusinessType.innerHTML = response.data.oneCompany.type
        singleBusinessImg.setAttribute('src', response.data.oneCompany.image)
        singleBusinessDescription.innerHTML = response.data.oneCompany.description
        singleBusinessAddress.innerHTML = response.data.oneCompany.address
            // if(localStorage.getItem('userId')){
        fillInEditBusinessForm(response.data.oneCompany)
            // if userId matches company's userId => show edit button
            // }
        checkAuthorization(false)
        populateReviews(response.data.foundReview)
        newReview(response.data.oneCompany.id)
    }

})
async function checkAuthorization(company) {
    const userId = localStorage.getItem('userId')
    console.log(userId);
    let response = null

    if(company !== false && userId.length > 20) { // only run if user is logged in properly && company not false
        console.log('not null', userId, company);
        response = await axios.get(`${backendUrl}/users/findOne`, {
            headers: {
                authorization: userId
            }
        })
        if(company.userId === response.data.user.id && userId !== null){
            console.log('super nested');
            editBusinessBtn.classList.remove('hidden')
        }
    }
    if(userId.length > 20 && company === false) { // !== null/undefined was not working
        console.log('here', company)
        document.querySelector('#reviewForm').classList.remove('hidden')
    }
}
// --EDIT BUSINESS
function fillInEditBusinessForm(data) {
    checkAuthorization(data)
    editBusinessBtn.addEventListener('click', () => {
        editBusinessForm.classList.remove('hidden')
        editBusinessName.value = data.name
        editBusinessType.value = data.type
        editBusinessImg.value = data.image
        editBusinessDesc.value = data.description
        editBusinessAddress.value = data.address

        updateBusinessBtn.addEventListener('click', async(e) => {
            e.preventDefault()
            const response = await axios.put(`${backendUrl}/companies/update`, {
                id: data.id,
                name: editBusinessName.value,
                type: editBusinessType.value,
                image: editBusinessImg.value,
                description: editBusinessDesc.value,
                address: editBusinessAddress.value
            })
            console.log('UPDATE BUSINESS RESPONSE', response)
        })
        deleteBusinessBtn.addEventListener('click', async(e) => {
            e.preventDefault()
            const response = await axios.delete(`${backendUrl}/companies/delete/${data.id}`)
            console.log('DELETE COMPANY RESPONSE', response);
        })
    })
}

//---Create Business---//

addBusiness.addEventListener('click', () => {
    document.querySelector('#newBusinessForm').classList.remove('hidden')
})

document.getElementById('newBusinessBtn').addEventListener('click', async() => {

    const userId = localStorage.getItem('userId')

    const response = await axios.post(`${backendUrl}/companies/new/${userId}`, {

        name: newBusinessName.value,
        type: newBusinessType.value,
        image: newBusinessImg.value,
        description: newBusinessDesc.value,
        address: newBusinessAddress.value
    })
    console.log(response, 'you have created a business');


})

// PROFILE
// --READ
async function populateProfile() {
    const userId = localStorage.getItem('userId')
    const response = await axios.get(`${backendUrl}/users/findOne`, {
            headers: {
                authorization: userId
            }
        })
        // console.log(response);
    userEmail.innerHTML = response.data.user.email
    userName.innerHTML = response.data.user.name
}

// --UPDATE
editUserBtn.addEventListener('click', () => {

    editUserForm.classList.remove('hidden')
    const userId = localStorage.getItem('userId')

    editProfileBtn.addEventListener("click", async(e) => {
            e.preventDefault()

            try {
                const response = await axios.post(`${backendUrl}/users/update/${userId}`, {
                    name: editUserName.value,
                    email: editUserEmail.value,
                    password: editUserPassword.value
                })
                console.log(response)
            } catch (error) {
                console.log(error)
            }
        })
        // --DELETE
    deleteProfileBtn.addEventListener('click', async(e) => {
        e.preventDefault()

        const response = await axios.delete(`${backendUrl}/users/delete/${userId}`)
        console.log(response, "Deleted")
        goHome()
        localStorage.removeItem('userId')
        checkLoggedIn()
    })
})

//-- Business Reviews --//

function populateReviews(reviews) {
    reviews.forEach(rev => {
        const div = document.createElement('div')
        div.classList.add('reviewDiv')
        reviewContainer.append(div)

        const rating = document.createElement('p')
        rating.classList.add("reviewRating")
        div.innerHTML = rev.rating
        div.append(rating)

        const content = document.createElement('p')
        content.classList.add('reviewContent')
        content.innerHTML = rev.content
        div.append(content)

    })


}

function newReview(companyId) {
    reviewSubmitBtn.addEventListener('click', async(e) => {
        e.preventDefault()
        const reviewContentInput = document.querySelector('#reviewContentInput')
        const reviewRatingInput = document.querySelector('#reviewRatingInput')
        const userId = await localStorage.getItem('userId')
        const response = await axios.post(`${backendUrl}/reviews/${companyId}/create/${userId}`, {
            rating: reviewRatingInput.value,
            content: reviewContentInput.value

        })
        console.log(response, "newReview works!")
    })
}

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
    if (localStorage.getItem('userId')) {
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

homeLink.addEventListener('load', (event) => {
    setTimein(function() {
        homeLink.classList.add('hidden')
    }, 0);
    setTimein(function() {
        homeLink.classList.remove('hidden')
    }, 5000);
})

