let languages = [
    {id: 1, name: 'JavaScript', desc: 'веб / скрипти', img: 'pic_1.jpg'},
    {id: 2, name: 'Python', desc: 'дані / AI', img: 'pic_2.jpg'},
    {id: 3, name: 'Java', desc: 'бекенд / ентерпрайз', img: 'pic_3.jpg'},
    {id: 4, name: 'TypeScript', desc: 'типізований JS', img: 'pic_4.jpg'},
    {id: 5, name: 'Rust', desc: 'системи / швидкість', img: 'pic_5.jpg'},
    {id: 6, name: 'Go', desc: 'хмара / мікросервіси', img: 'pic_6.jpg'},
    {id: 7, name: 'Kotlin', desc: 'Android / JVM', img: 'pic_7.jpg'},
    {id: 8, name: 'Swift', desc: 'iOS / macOS', img: 'pic_8.jpg'},
    {id: 9, name: 'C++', desc: 'ігри / системи', img: 'pic_9.jpg'},
    {id: 10, name: 'PHP', desc: 'веб сервер', img: 'pic_10.jpg'},
]

let isEditMode = false
const grid = document.getElementById('card-grid')
const editBtn = document.getElementById('edit-btn')
const instruction = document.getElementById('instruction')


function render() {
    grid.innerHTML = ''
    languages.forEach(lang => {
        const card = document.createElement('div')
        card.className = 'card-item'
        card.draggable = isEditMode
        card.dataset.id = lang.id

        card.innerHTML = `
            <div class="delete-x" onclick="deleteCard(${lang.id})">×</div>
            <img src="${lang.img}" alt="${lang.name}">
            <h4>${lang.name}</h4>
            <p>${lang.desc}</p>
        `


        card.addEventListener('dragstart', () => card.classList.add('dragging'))


        card.addEventListener('dragend', () => {
            card.classList.remove('dragging')
            updateArrayOrder()
        })

        grid.appendChild(card)
    })
}


function updateArrayOrder() {
    const currentDOMCards = grid.querySelectorAll('.card-item')
    const newLanguagesArray = []

    currentDOMCards.forEach(cardDOM => {
        const id = parseInt(cardDOM.dataset.id)
        const langObj = languages.find(l => l.id === id)
        if (langObj) {
            newLanguagesArray.push(langObj)
        }
    })

    languages = newLanguagesArray
}


editBtn.addEventListener('click', () => {
    isEditMode = !isEditMode
    document.body.classList.toggle('edit-mode', isEditMode)

    if (isEditMode) {
        editBtn.textContent = 'Готово'
        instruction.textContent = 'Перетягуйте картки або натискайте × щоб видалити'
    } else {
        editBtn.textContent = 'Редагувати'
        instruction.textContent = 'Натисніть «Редагувати» для керування картками'
    }
    render()
})


function deleteCard(id) {
    languages = languages.filter(l => l.id !== id)
    render()
}


grid.addEventListener('dragover', (e) => {
    if (!isEditMode) return
    e.preventDefault()

    const draggingCard = document.querySelector('.dragging')
    const afterElement = getDragAfterElement(grid, e.clientX, e.clientY)

    if (afterElement == null) {
        grid.appendChild(draggingCard)
    } else {
        grid.insertBefore(draggingCard, afterElement)
    }
})

function getDragAfterElement(container, x, y) {
    const draggableElements = [...container.querySelectorAll('.card-item:not(.dragging)')]

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offsetX = x - box.left - box.width / 2
        const offsetY = y - box.top - box.height / 2

        if (Math.abs(offsetX) < box.width / 2 && Math.abs(offsetY) < box.height / 2) {
            return {element: child}
        }
        return closest
    }, {element: null}).element
}


render()
