function switchTab(tabName) {
    const buttons = document.querySelectorAll('.tab-btn')
    buttons.forEach(btn => btn.classList.remove('active'))


    const forms = document.querySelectorAll('.auth-form')
    forms.forEach(form => form.classList.remove('active-form'))


    buttons.forEach(btn => {
        if (btn.innerText.toLowerCase().includes(tabName)) {
            btn.classList.add('active')
        }
    })


    const targetForm = document.getElementById(tabName + 'Form')
    if (targetForm) {
        targetForm.classList.add('active-form')
    }
}

function togglePassword(inputId) {
    const input = document.getElementById(inputId)
    const btn = input.parentElement.querySelector('.toggle-pwd')

    if (input.type === "password") {
        input.type = "text"
        btn.innerHTML = "👁️"
    } else {
        input.type = "password"
        btn.innerHTML = `<span style="position: relative; display: inline-block;">
            👁️
            <span style="position: absolute; top: 50%; left: -10%; width: 120%; height: 2px; background-color: #555; transform: translateY(-50%) rotate(-45deg);"></span>
        </span>`
    }
}


const cityData = {
    "Ukraine": ["Chernivtsi", "Kyiv", "Lviv", "Odesa"],
    "UK": ["London", "Manchester", "Liverpool"],
    "USA": ["New York", "Los Angeles", "Chicago"],
}

const countrySelect = document.getElementById('country')
const citySelect = document.getElementById('city')

countrySelect.addEventListener('change', function () {
    const selectedCountry = this.value


    citySelect.innerHTML = '<option value="">Choose...</option>'

    if (selectedCountry && cityData[selectedCountry]) {
        citySelect.disabled = false
        cityData[selectedCountry].forEach(city => {
            const option = document.createElement('option')
            option.value = city
            option.textContent = city
            citySelect.appendChild(option)
        })
    } else {

        citySelect.disabled = true
        citySelect.innerHTML = '<option value="">Please select a country first</option>'
    }
})


function showError(input, message) {
    input.classList.remove('valid')
    input.classList.add('invalid')
    const errorSpan = input.parentElement.querySelector('.error-text')
    if (errorSpan) errorSpan.innerText = message
}


function showSuccess(input) {
    input.classList.remove('invalid')
    input.classList.add('valid')
    const errorSpan = input.parentElement.querySelector('.error-text')
    if (errorSpan) errorSpan.innerText = ''
}


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^\+380\d{9}$/


const signupForm = document.getElementById('signupForm')

signupForm.addEventListener('submit', function (event) {
    event.preventDefault()

    let isValid = true


    const firstName = document.getElementById('firstName')
    if (firstName.value.length < 3 || firstName.value.length > 15) {
        showError(firstName, "First name must be between 3 and 15 characters.")
        isValid = false
    } else {
        showSuccess(firstName)
    }


    const lastName = document.getElementById('lastName')
    if (lastName.value.length < 3 || lastName.value.length > 15) {
        showError(lastName, "Last name must be between 3 and 15 characters.")
        isValid = false
    } else {
        showSuccess(lastName)
    }


    const email = document.getElementById('email')
    if (!emailRegex.test(email.value)) {
        showError(email, "Please enter a valid email (@).")
        isValid = false
    } else {
        showSuccess(email)
    }


    const password = document.getElementById('signupPassword')
    if (password.value.length < 6) {
        showError(password, "Password must be at least 6 characters.")
        isValid = false
    } else {
        showSuccess(password)
    }


    const confirmPassword = document.getElementById('confirmPassword')
    if (confirmPassword.value !== password.value || confirmPassword.value === "") {
        showError(confirmPassword, "Passwords do not match.")
        isValid = false
    } else {
        showSuccess(confirmPassword)
    }


    const phone = document.getElementById('phone')
    if (!phoneRegex.test(phone.value)) {
        showError(phone, "Format must be +380XXXXXXXXX.")
        isValid = false
    } else {
        showSuccess(phone)
    }


    const dob = document.getElementById('dob')
    if (!dob.value) {
        showError(dob, "Please select your date of birth.")
        isValid = false
    } else {
        const birthDate = new Date(dob.value)
        const today = new Date()


        let age = today.getFullYear() - birthDate.getFullYear()
        const monthDiff = today.getMonth() - birthDate.getMonth()
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }

        if (birthDate > today) {
            showError(dob, "Date of birth cannot be in the future.")
            isValid = false
        } else if (age < 12) {
            showError(dob, "You must be at least 12 years old to register.")
            isValid = false
        } else {
            showSuccess(dob)
        }
    }


    const sex = document.getElementById('sex')
    if (sex.value === "") {
        showError(sex, "Please select your sex.")
        isValid = false
    } else {
        showSuccess(sex)
    }


    const country = document.getElementById('country')
    if (country.value === "") {
        showError(country, "Please select a country.")
        isValid = false
    } else {
        showSuccess(country)
    }


    const city = document.getElementById('city')
    if (city.value === "") {
        showError(city, "Please select a city.")
        isValid = false
    } else {
        showSuccess(city)
    }


    if (isValid) {

        const formData = new FormData(signupForm)

        console.log("Signup Form is VALID! Data to send:")
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`)
        }


        signupForm.reset()


        signupForm.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'))


        document.getElementById('city').innerHTML = '<option value="">Please select a country first</option>'
        document.getElementById('city').disabled = true


        const successMsg = document.getElementById('signupSuccess')
        successMsg.innerText = "You have successfully registered!"
        setTimeout(() => {
            successMsg.innerText = ""
        }, 5000)
    }
})


const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit', function (event) {
    event.preventDefault()
    let isValid = true


    const loginUsername = document.getElementById('loginUsername')
    if (loginUsername.value.trim() === "") {
        showError(loginUsername, "Please enter your username.")
        isValid = false
    } else {
        showSuccess(loginUsername)
    }


    const loginPassword = document.getElementById('loginPassword')
    if (loginPassword.value.length < 6) {
        showError(loginPassword, "Password must be at least 6 characters.")
        isValid = false
    } else {
        showSuccess(loginPassword)
    }


    if (isValid) {
        const formData = new FormData(loginForm)

        console.log("Login Form is VALID! Data to send:")
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`)
        }

        loginForm.reset()
        loginForm.querySelectorAll('.valid').forEach(el => el.classList.remove('valid'))

        const successMsg = document.getElementById('loginSuccess')
        successMsg.innerText = "You have successfully logged in!"
        setTimeout(() => {
            successMsg.innerText = ""
        }, 5000)
    }
})
