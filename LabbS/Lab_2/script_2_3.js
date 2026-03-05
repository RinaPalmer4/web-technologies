// Transform otsinka to word
//if / else
function gradeInWordsIf(score) {
    if (score >= 90 && score <= 100) {
        return "Відмінно"
    } else if (score >= 70 && score < 90) {
        return "Добре"
    } else if (score >= 50 && score < 70) {
        return "Задовільно"
    } else if (score >= 0 && score < 50) {
        return "Незадовільно"
    } else {
        return "Недійсна оцінка"
    }
}

console.log("Оцінка 95 :", gradeInWordsIf(95))
console.log("Оцінка 82 :", gradeInWordsIf(82))
console.log("Оцінка 69 :", gradeInWordsIf(69))
console.log("Оцінка 40 :", gradeInWordsIf(40))
console.log("Оцінка 150 :", gradeInWordsIf(150))

console.log("****************************************")


// тернарний оператор
function gradeInWordsTernary(score) {
    return (score >= 90 && score <= 100) ? "Відмінно"
        : (score >= 70 && score < 90) ? "Добре"
            : (score >= 50 && score < 70) ? "Задовільно"
                : (score >= 0 && score < 50) ? "Незадовільно"
                    : "Недійсна оцінка"
}

console.log("Оцінка 95 :", gradeInWordsTernary(95))
console.log("Оцінка 82 :", gradeInWordsTernary(82))
console.log("Оцінка 69 :", gradeInWordsTernary(69))
console.log("Оцінка 40 :", gradeInWordsTernary(40))
console.log("Оцінка 150 :", gradeInWordsTernary(150))


console.log("---------------------------------------------")

// Month to season
// if / else

function getSeasonIf(month) {
    month = month.toLowerCase()
    if (month === "грудень" || month === "січень" || month === "лютий") {
        return "Зима"
    } else if (month === "березень" || month === "квітень" || month === "травень") {
        return "Весна"
    } else if (month === "червень" || month === "липень" || month === "серпень") {
        return "Літо"
    } else if (month === "вересень" || month === "жовтень" || month === "листопад") {
        return "Осінь"
    } else {
        return "Недійсний місяць"
    }
}

console.log("грудень:", getSeasonIf("грудень"))
console.log("Січень:", getSeasonIf("Січень"))
console.log("Травень:", getSeasonIf("Травень"))
console.log("Серпень:", getSeasonIf("Серпень"))
console.log("Котик:", getSeasonIf("Котик"))

console.log("****************************************")


// тернарний оператор
function getSeasonByMonthTernary(month) {
    month = month.toLowerCase()

    return (month === "грудень" || month === "січень" || month === "лютий") ? "Зима"
        : (month === "березень" || month === "квітень" || month === "травень") ? "Весна"
            : (month === "червень" || month === "липень" || month === "серпень") ? "Літо"
                : (month === "вересень" || month === "жовтень" || month === "листопад") ? "Осінь"
                    : "Такого місяця не існує"
}


console.log("Березень:", getSeasonByMonthTernary("Березень"))
console.log("Липень:", getSeasonByMonthTernary("липень"))
console.log("Січень:", getSeasonByMonthTernary("січень"))
console.log("Жовтень:", getSeasonByMonthTernary("жовтень"))
console.log("Котик:", getSeasonByMonthTernary("місяць"))
