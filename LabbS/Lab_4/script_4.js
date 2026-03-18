// Task 1
function task1() {
    console.log("Task 1")
    let fruits = ["банан", "яблуко", "апельсин", "персик"]
    console.log("Starter array: ", fruits)

    fruits.pop()
    console.log("1. Delete last element:", fruits)

    fruits.unshift("ананас")
    console.log("2. Add ananas to begin:", fruits)

    fruits.sort().reverse()
    console.log("3. Revers array sort:", fruits)

    let appleIndex = fruits.indexOf("яблуко")
    console.log("4. Index 'яблуко':", appleIndex)
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
}


task1()


// Task 2
function task2() {
    console.log("Task 2")


    let colors = ["червоний", "світло-синій", "жовтий", "темно-синій", "зелений", "синій"]
    console.log("Starter array:", colors)


    let longest = colors[0]
    let shortest = colors[0]


    for (let color of colors) {
        if (color.length > longest.length) {
            longest = color
        }
        if (color.length < shortest.length) {
            shortest = color
        }
    }
    console.log("The longest word:", longest)
    console.log("The shortest word:", shortest)


    let blueColors = colors.filter(function (color) {
        return color.includes("синій")
    })
    console.log("Only different kind blues:", blueColors)


    let joinedColors = blueColors.join(", ")
    console.log("Joined string:", joinedColors)
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
}


task2()


// Task 3
function task3() {
    console.log("Task 3")


    let employees = [
        {name: "Олена", age: 25, position: "дизайнер"},
        {name: "Андрій", age: 32, position: "розробник"},
        {name: "Богдан", age: 45, position: "менеджер"},
        {name: "Вікторія", age: 28, position: "розробник"},
    ]
    console.log("Starter array:", employees)


    employees.sort(function (a, b) {
        return a.name.localeCompare(b.name)
    })
    console.log("Sort by names:", employees)


    let developers = employees.filter(function (emp) {
        return emp.position === "розробник"
    })
    console.log("Only rozrobniki:", developers)


    let indexToRemove = employees.findIndex(function (emp) {
        return emp.name === "Богдан"
    })


    if (indexToRemove !== -1) {
        employees.splice(indexToRemove, 1)
    }
    console.log("No BOGDANS:", employees)


    employees.push({name: "Тарас", age: 22, position: "тестувальник"})
    console.log("Array with new person:", employees)
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
}


task3()

// Task 4
function task4() {
    console.log("Task 4")


    let students = [
        {name: "Марія", age: 19, course: 2},
        {name: "Олексій", age: 21, course: 4},
        {name: "Іван", age: 18, course: 1},
        {name: "Софія", age: 20, course: 3},
    ]
    console.log("Starter array:", students)


    let ivanIndex = students.findIndex(function (student) {
        return student.name === "Іван"
    })

    if (ivanIndex !== -1) {
        students.splice(ivanIndex, 1)
    }
    console.log("Without Ivan:", students)


    students.push({name: "Дмитро", age: 22, course: 5})
    console.log("With new student:", students)


    students.sort(function (a, b) {
        return b.age - a.age
    })
    console.log("Sort by age (descending):", students)


    let thirdCourseStudent = students.find(function (student) {
        return student.course === 3
    })
    console.log("Third course student:", thirdCourseStudent)
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
}


task4()


// Task 5
function task5() {
    console.log("Task 5")


    let numbers = [1, 2, 3, 4, 5]
    console.log("Початковий масив:", numbers)


    let squared = numbers.map(function (num) {
        return num * num
    })
    console.log("Kvadratik (map):", squared)


    let evens = numbers.filter(function (num) {
        return num % 2 === 0
    })
    console.log("Parni numbers (filter):", evens)


    let totalSum = numbers.reduce(function (sum, current) {
        return sum + current
    }, 0)
    console.log("Sum (reduce):", totalSum)


    let extraNumbers = [6, 7, 8, 9, 10]
    numbers = numbers.concat(extraNumbers)
    console.log("With extra numbers:", numbers)


    numbers.splice(0, 3)
    console.log("Without first 3:", numbers)
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")
}


task5()


// Task 6

function task6_libraryManagement() {
    console.log("Task 6")


    let books = [
        {title: "Академія Вампірів", author: "Рейчел Мід", genre: "Фентезі", pages: 332, isAvailable: true},
        {title: "Гаррі Поттер", author: "Дж. К. Роулінг", genre: "Фентезі", pages: 400, isAvailable: false},
        {title: "1984", author: "Джордж Оруелл", genre: "Антиутопія", pages: 328, isAvailable: true},
    ]


    function addBook(title, author, genre, pages) {

        let newBook = {
            title: title,
            author: author,
            genre: genre,
            pages: pages,
            isAvailable: true,
        }
        books.push(newBook)
        console.log(`Added book: "${title}"`)
    }


    function removeBook(title) {
        let index = books.findIndex(function (book) {
            return book.title === title
        })

        if (index !== -1) {
            books.splice(index, 1)
            console.log(`Книгу "${title}" видалено.`)
        }
    }


    function findBooksByAuthor(author) {
        return books.filter(function (book) {
            return book.author === author
        })
    }


    function toggleBookAvailability(title, isBorrowed) {
        let book = books.find(function (b) {
            return b.title === title
        })

        if (book) {

            book.isAvailable = !isBorrowed
            console.log(`Статус книги "${title}" змінено. Доступна: ${book.isAvailable}`)
        }
    }


    function sortBooksByPages() {
        books.sort(function (a, b) {
            return a.pages - b.pages
        })
        console.log("Sorted by amount of pages. (ascending)")
    }


    function getBooksStatistics() {
        let total = books.length

        let available = books.filter(function (book) {
            return book.isAvailable === true
        }).length

        let borrowed = total - available


        let totalPages = books.reduce(function (sum, book) {
            return sum + book.pages
        }, 0)

        let average = total === 0 ? 0 : totalPages / total


        return {
            totalBooks: total,
            availableBooks: available,
            borrowedBooks: borrowed,
            averagePages: Math.round(average),
        }
    }


    //Test

    addBook("Кобзар", "Тарас Шевченко", "Поезія", 600)

    removeBook("1984")

    toggleBookAvailability("Академія Вампірів", true) // Беремо книгу (isBorrowed = true)

    sortBooksByPages()

    console.log("Книги Рейчел Мід:", findBooksByAuthor("Рейчел Мід"))

    console.log("Всі книги зараз:", books)

    console.log("Статистика:", getBooksStatistics())
    console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

}


task6_libraryManagement()


// Task 7

function task7() {
    console.log("Task 7")


    let student = {
        name: "Максим",
        age: 19,
        course: 2,
    }
    console.log("Starter object:", student)


    student.subjects = ["Веб-дизайн", "Програмування", "Англійська мова"]
    console.log("After add:", student)


    delete student.age

    
    console.log("Final object:", student)
}


task7()
