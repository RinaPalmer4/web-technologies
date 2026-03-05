// Min and max

function findMinMax(arr) {


    if (arr.length === 0) {
        console.log("Масив порожній")
        return
    }

    let min = arr[0]
    let max = arr[0]

    for (let i = 1; i < arr.length; i++) {


        if (arr[i] < min) {
            min = arr[i]
        }

        if (arr[i] > max) {
            max = arr[i]
        }
    }

    console.log("Array:", arr)
    console.log("Min:", min)
    console.log("Max", max)
}

let numbers = [10, 3, 25, -5, 8]
findMinMax(numbers)

console.log("-------------------------------------")


// Comparison
function compareObjects(obj1, obj2) {

    let keys1 = Object.keys(obj1)
    let keys2 = Object.keys(obj2)


    if (keys1.length !== keys2.length) {
        return false
    }

    for (let key of keys1) {


        if (obj1[key] !== obj2[key]) {
            return false
        }
    }

    return true
}

let person1 = {name: "Ірина", age: 19}
let person2 = {name: "Ірина", age: 19}
let person3 = {name: "Ірина", age: 20}

console.log("person1 і person2 рівні:", compareObjects(person1, person2))
console.log("person1 і person3 рівні:", compareObjects(person1, person3))
console.log("person1 і person3 рівні:", compareObjects(person2, person3))
