let red = document.getElementById("red")
let yellow = document.getElementById("yellow")
let green = document.getElementById("green")

let text = document.getElementById("stateText")

let state = 0
let timer


let redTime = 5000
let yellowTime = 3000
let greenTime = 7000


function startTraffic() {
    changeState()
}


function changeState() {

    clearLights()

    if (state === 0) {

        red.classList.add("redOn")
        text.textContent = "Стан: червоний"

        timer = setTimeout(function () {
            state = 1
            changeState()
        }, redTime)

    } else if (state === 1) {

        yellow.classList.add("yellowOn")
        text.textContent = "Стан: жовтий"

        timer = setTimeout(function () {
            state = 2
            changeState()
        }, yellowTime)

    } else if (state === 2) {

        green.classList.add("greenOn")
        text.textContent = "Стан: зелений"

        timer = setTimeout(function () {
            state = 3
            blinkYellow(0)
        }, greenTime)

    }


}

function blinkYellow() {
    clearLights()
    text.textContent = "Стан: миготливий жовтий"

    let blinksCount = 0

    // Запускаємо інтервал і записуємо його в твою глобальну змінну timer
    timer = setInterval(function () {

        // toggle автоматично додає або забирає клас "yellowOn"
        yellow.classList.toggle("yellowOn")
        blinksCount++

        // 6 перемикань = 3 повних блимання (увімкнувся-вимкнувся)
        if (blinksCount >= 6) {
            clearInterval(timer) // Зупиняємо таймер миготіння

            state = 0     // Повертаємо стан на 0 (червоний)
            changeState() // Запускаємо весь цикл світлофора з самого початку
        }

    }, 500)
}


function clearLights() {

    red.classList.remove("redOn")
    yellow.classList.remove("yellowOn")
    green.classList.remove("greenOn")

}


// зміна часу
function changeTime() {

    let r = prompt("Час червоного (сек)")
    let y = prompt("Час жовтого (сек)")
    let g = prompt("Час зеленого (сек)")

    if (r) redTime = r * 1000
    if (y) yellowTime = y * 1000
    if (g) greenTime = g * 1000

}


// ручне переключення
function nextState() {

    // Зупиняємо будь-які поточні таймери (і setTimeout, і setInterval)
    clearTimeout(timer)
    clearInterval(timer)

    if (state === 0) {
        state = 1
    } else if (state === 1) {
        state = 2
    } else if (state === 2) {
        state = 3
        blinkYellow()
        return // Виходимо з функції, бо blinkYellow сама керує процесом
    } else if (state === 3) {
        // Якщо натиснули кнопку під час миготіння, переходимо одразу на червоний
        state = 0
    }

    changeState()

}
