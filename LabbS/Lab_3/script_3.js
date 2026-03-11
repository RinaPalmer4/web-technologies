// Task 1, fibonacci sequence
function task1() {
    let a = 0 // Перше число Фібоначчі
    let b = 1 // Друге число Фібоначчі
    let sum = 0 // Змінна для збереження суми
    let count = 0 // Лічильник для циклу while

    // Цикл працюватиме, поки лічильник менший за 10
    while (count < 10) {
        sum += a
        let next = a + b
        a = b
        console.log(b)
        b = next
        count++
    }

    console.log("Task 1, fibonacci sequence: ", sum)
    console.log("*************************************************")
}

task1()


// Task 2, sum of 1000 prime numbers
function task2() {
    let sum = 0

    for (let i = 2; i <= 1000; i++) {
        let isPrime = true

        for (let j = 2; j < i; j++) {
            if (i % j == 0) {
                isPrime = false
                break
            }
        }

        if (isPrime) {
            sum += i
        }
    }


    console.log("Task 2, sum of 1000 prime numbers:", sum)
    console.log("*************************************************")
}

task2()


// Task 3, day
function task3() {
    let userInput = prompt("Put number of day here:")
    let dayNumber = Number(userInput)
    let dayName


    switch (dayNumber) {
        case 1:
            dayName = "Понеділок"
            break
        case 2:
            dayName = "Вівторок"
            break
        case 3:
            dayName = "Середа"
            break
        case 4:
            dayName = "Четвер"
            break
        case 5:
            dayName = "П'ятниця"
            break
        case 6:
            dayName = "Субота"
            break
        case 7:
            dayName = "Неділя"
            break
        default:
            dayName = "ви написали якийсь бред"
    }

    console.log("Task 3, day with number", dayNumber, "is -", dayName)
    console.log("*************************************************")
}

task3()


// Task 4, arrays with neparna lenght
function task4(stringsArray) {
    let resultArray = []
    for (let i = 0; i < stringsArray.length; i++) {
        let currentString = stringsArray[i]

        if (currentString.length % 2 !== 0) {
            resultArray.push(currentString)
        }
    }

    return resultArray
}

let myWords = ["love", "heart", "star", "books", "programming"]
let oddWords = task4(myWords)
console.log("Task 4, arrays with neparna lenght:", oddWords)
console.log("*************************************************")


// Task 5, strilkova function
const task5 = (numbersArray) => {
    let resultArray = []


    for (let i = 0; i < numbersArray.length; i++) {
        let currentNumber = numbersArray[i]
        resultArray.push(currentNumber + 1)
    }

    return resultArray
}


let myNumbers = [1, 5, 10, 42]
let increasedNumbers = task5(myNumbers)

console.log("Task 5,  Origin array is:", myNumbers)
console.log("New array is:", increasedNumbers)
console.log("*************************************************")


// Task 6, sum OR difference = 10???
function task6(a, b) {
    if (a + b === 10 || a - b === 10 || b - a === 10) {
        return true
    } else {
        return false
    }
}

let test1 = task6(5, 5)
let test2 = task6(15, 5)
let test3 = task6(2, 3)

console.log("Task 6 results are:")
console.log("Checking (5 and 5):", test1)
console.log("Checking (15 and 5):", test2)
console.log("Checking (2 and 3):", test3)
