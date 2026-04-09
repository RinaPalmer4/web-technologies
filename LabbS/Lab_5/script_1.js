let lamp = document.getElementById("lamp")

let timer


function turnOn() {

    lamp.classList.remove("off")
    lamp.classList.add("on")

    resetTimer()

}


function turnOff() {

    lamp.classList.remove("on")
    lamp.classList.add("off")

}


function changeBrightness() {

    let brightness = prompt("Введіть яскравість від 0 до 100")

    if (brightness !== null) {

        lamp.style.filter = "brightness(" + brightness + "%)"

    }

    resetTimer()

}

function changeType() {

    let type = document.getElementById("lampType").value

    lamp.textContent = type + " лампочка"

    resetTimer()

}


function resetTimer() {

    clearTimeout(timer)

    timer = setTimeout(function () {

        turnOff()


    }, 7000)


}
