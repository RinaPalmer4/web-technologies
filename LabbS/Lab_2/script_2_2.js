// Diapazon (operator AND)
function isInRange(num, min, max) {


    if (num >= min && num <= max) {
        return true
    } else {
        return false
    }
}


console.log("Diapazon is from 1 to 10 ")
console.log("Number is: 5 ")
console.log(isInRange(5, 1, 10))  // true
console.log("Number is: 0 ")
console.log(isInRange(0, 1, 10))  // false

console.log("-------------------------------------")


// Operator NOT
let isActive = true

console.log("Булеве перед інверсією:", isActive)

isActive = !isActive

console.log("Після логічного NOT (!):", isActive)
