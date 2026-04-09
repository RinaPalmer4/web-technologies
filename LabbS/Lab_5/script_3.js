// 1. Часікі
let hoursSpan = document.getElementById('hours')
let minutesSpan = document.getElementById('minutes')
let secondsSpan = document.getElementById('seconds')

let colonSpan = document.getElementById('colon')
let colon2Span = document.getElementById('colon2')

function updateClock() {

    let now = new Date()

    hoursSpan.textContent = String(now.getHours()).padStart(2, '0')
    minutesSpan.textContent = String(now.getMinutes()).padStart(2, '0')
    secondsSpan.textContent = String(now.getSeconds()).padStart(2, '0')

}

setInterval(updateClock, 1000)
updateClock()

setInterval(function () {

    colonSpan.classList.toggle("hidden")
    colon2Span.classList.toggle("hidden")

}, 500)


// 2. Таймер
let btnTimer = document.getElementById('btn-timer')
let timerInput = document.getElementById('timer-input')
let timerResult = document.getElementById('timer-result')

let countdownInterval

btnTimer.onclick = function () {

    clearInterval(countdownInterval)

    let targetDate = new Date(timerInput.value)

    if (isNaN(targetDate)) {
        timerResult.textContent = "Оберіть дату і час"
        return
    }

    countdownInterval = setInterval(function () {

        let now = new Date()
        let diffMs = targetDate - now

        if (diffMs <= 0) {
            clearInterval(countdownInterval)
            timerResult.textContent = "Час вийшов!"
            return
        }

        let d = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        let h = Math.floor((diffMs / (1000 * 60 * 60)) % 24)
        let m = Math.floor((diffMs / (1000 * 60)) % 60)
        let s = Math.floor((diffMs / 1000) % 60)

        timerResult.textContent =
            `Залишилось: ${d} дн ${h} год ${m} хв ${s} сек`

    }, 1000)
}


// 3. Календарік

let calendarInput = document.getElementById("calendar-input")
let calendarResult = document.getElementById("calendar-result")


let now = new Date()

let currentMonth =
    now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0")

calendarInput.value = currentMonth

updateCalendar()

calendarInput.onchange = updateCalendar

function updateCalendar() {

    let date = new Date(calendarInput.value)

    let month = date.getMonth() + 1
    let year = date.getFullYear()

    calendarResult.textContent =
        `Місяць: ${month}, рік: ${year}`

}


// 4. День народження

let btnBday = document.getElementById('btn-bday')
let bdayInput = document.getElementById('bday-input')
let bdayResult = document.getElementById('bday-result')

let bdayInterval

btnBday.onclick = function () {

    clearInterval(bdayInterval)

    let inputDate = new Date(bdayInput.value)

    if (isNaN(inputDate)) {
        bdayResult.textContent = "Оберіть дату"
        return
    }

    bdayInterval = setInterval(function () {

        let now = new Date()

        let nextBday =
            new Date(now.getFullYear(),
                inputDate.getMonth(),
                inputDate.getDate())

        if (now > nextBday) {
            nextBday.setFullYear(now.getFullYear() + 1)
        }

        let diffMs = nextBday - now

        let s = Math.floor((diffMs / 1000) % 60)
        let m = Math.floor((diffMs / (1000 * 60)) % 60)
        let h = Math.floor((diffMs / (1000 * 60 * 60)) % 24)

        let totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
        let months = Math.floor(totalDays / 30)
        let days = totalDays % 30

        bdayResult.textContent =
            `До дня народження:
        ${months} міс
        ${days} дн
        ${h} год
        ${m} хв
        ${s} сек`

    }, 1000)

}
