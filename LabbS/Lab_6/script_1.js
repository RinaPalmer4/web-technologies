let state = {
    products: [
        {
            id: 'B-1102',
            name: 'Шістка воронів',
            price: 450,
            category: 'Фентезі',
            image: 'https://static.yakaboo.ua/media/catalog/product/1/1/116_12_1.jpg',
            createdAt: Date.now() - 10000,
            updatedAt: Date.now() - 10000,
        },
        {
            id: 'B-4491',
            name: 'Відьмак: Останнє бажання',
            price: 380,
            category: 'Фентезі',
            image: 'https://upload.wikimedia.org/wikipedia/uk/0/0d/Ostannie_Bazhannia.jpg',
            createdAt: Date.now() - 9000,
            updatedAt: Date.now() - 9000,
        },
        {
            id: 'B-8231',
            name: 'Етюд у багряних тонах',
            price: 320,
            category: 'Детектив',
            image: 'https://book-ye.com.ua/media/catalog/product/cache/274ba2bb1664e69238223826e1132b42/0/5/05b20dd5-d249-11ee-8193-00505684ea69_4b00ec26-dfb7-11ee-8194-00505684ea69.jpg',
            createdAt: Date.now() - 8000,
            updatedAt: Date.now() - 8000,
        },
        {
            id: 'B-1922',
            name: 'Вбивство у "Східному експресі"',
            price: 310,
            category: 'Детектив',
            image: 'https://static.yakaboo.ua/media/catalog/product/1/8/181_1_2.jpg',
            createdAt: Date.now() - 7000,
            updatedAt: Date.now() - 7000,
        },
        {
            id: 'B-5563',
            name: 'До зустрічі з тобою',
            price: 280,
            category: 'Романтика',
            image: 'https://upload.wikimedia.org/wikipedia/uk/f/fd/Me_Before_You_%28film%29.jpg',
            createdAt: Date.now() - 6000,
            updatedAt: Date.now() - 6000,
        },
        {
            id: 'B-2290',
            name: 'Гіпотеза кохання',
            price: 340,
            category: 'Романтика',
            image: 'https://ksd.ua/storage/products/gallery/medium_x2/eXYTlKaoLh56YStnSCtlNml06Zks5IW0ZxbF3Est.jpg.webp?v=1733321538',
            createdAt: Date.now() - 5000,
            updatedAt: Date.now() - 5000,
        },
        {
            id: 'B-7712',
            name: 'Мовчання ягнят',
            price: 410,
            category: 'Триллер',
            image: 'https://upload.wikimedia.org/wikipedia/uk/9/95/The_Silence_Of_The_Lambs.jpg',
            createdAt: Date.now() - 4000,
            updatedAt: Date.now() - 4000,
        },
        {
            id: 'B-3004',
            name: 'Ловець тіні',
            price: 395,
            category: 'Триллер',
            image: 'https://static.yakaboo.ua/media/catalog/product/6/1/612_1_2.jpg',
            createdAt: Date.now() - 3000,
            updatedAt: Date.now() - 3000,
        },
    ],
    filter: null,
    sort: null,
}


const addProductPure = (products, newProduct) => [...products, newProduct]

const removeProductPure = (products, id) => products.filter(p => p.id !== id)

const editProductPure = (products, updatedProduct) =>
    products.map(p => p.id === updatedProduct.id ? updatedProduct : p)

const calculateTotalPure = (products) =>
    products.reduce((sum, p) => sum + Number(p.price), 0)

const filterByGenrePure = (products, genre) =>
    genre ? products.filter(p => p.category === genre) : products

const sortProductsPure = (products, sortType) => {
    if (!sortType) return products
    const sorted = [...products]
    return sorted.sort((a, b) => {
        if (sortType === 'price') return a.price - b.price
        if (sortType === 'createdAt') return a.createdAt - b.createdAt
        if (sortType === 'updatedAt') return b.updatedAt - a.updatedAt
        return 0
    })
}


function render() {
    const listContainer = document.getElementById('product-list')
    const emptyMsg = document.getElementById('empty-state')
    const totalSumEl = document.getElementById('total-sum')


    let itemsToShow = filterByGenrePure(state.products, state.filter)
    itemsToShow = sortProductsPure(itemsToShow, state.sort)


    totalSumEl.textContent = calculateTotalPure(itemsToShow)


    if (itemsToShow.length === 0) {
        listContainer.innerHTML = ''
        emptyMsg.style.display = 'block'
        return
    }
    emptyMsg.style.display = 'none'


    listContainer.innerHTML = itemsToShow.map(book => `
        <div class="product-card" id="card-${book.id}">
            <img src="${book.image}" alt="${book.name}"> <div class="product-info">
                <h3>${book.name}</h3> <p>Жанр: <strong>${book.category}</strong></p> <p>Ціна: <strong>${book.price} ₴</strong></p> <small>ID: ${book.id}</small> </div>
            <div class="product-actions">
                <button onclick="openModal('edit', '${book.id}')">Редагувати</button> <button onclick="handleDelete('${book.id}')">Видалити</button> </div>
        </div>
    `).join('')
}


function openModal(mode, productId = null) {
    const modal = document.getElementById('product-modal')
    const form = document.getElementById('product-form')
    const title = document.getElementById('modal-title')

    form.reset()

    if (mode === 'edit') {
        const book = state.products.find(p => p.id === productId)
        title.textContent = 'Редагувати книгу'
        document.getElementById('product-id').value = book.id
        document.getElementById('product-name').value = book.name
        document.getElementById('product-price').value = book.price
        document.getElementById('product-category').value = book.category
        document.getElementById('product-image').value = book.image
    } else {
        title.textContent = 'Додати нову книгу'
        document.getElementById('product-id').value = ''
    }

    modal.classList.add('show')
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('show')
}


document.getElementById('product-form').addEventListener('submit', function (e) {
    e.preventDefault()

    const idField = document.getElementById('product-id').value
    const name = document.getElementById('product-name').value
    const price = document.getElementById('product-price').value
    const category = document.getElementById('product-category').value
    const image = document.getElementById('product-image').value

    if (idField) {
        const oldBook = state.products.find(p => p.id === idField)
        const updatedBook = {
            ...oldBook,
            name, price, category, image,
            updatedAt: Date.now(),
        }
        state.products = editProductPure(state.products, updatedBook)
        showSnackbar(`Оновлено книгу: ${name} (ID: ${idField})`)
    } else {

        const newBook = {
            id: 'B-' + Math.floor(Math.random() * 10000),
            name, price, category, image,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        state.products = addProductPure(state.products, newBook)
        showSnackbar('Книгу успішно додано до лавки!')
    }

    closeModal()
    render()
})


function handleDelete(id) {
    const card = document.getElementById(`card-${id}`)
    card.classList.add('removing')

    setTimeout(() => {
        state.products = removeProductPure(state.products, id)
        showSnackbar('Книгу видалено з полиць')
        render()
    }, 400)
}


function applyFilter(genre) {
    state.filter = genre
    render()
}

function applySort(type) {
    state.sort = type
    render()
}


function showSnackbar(message) {
    const snack = document.getElementById('snackbar')
    snack.textContent = message
    snack.classList.add('show')
    setTimeout(() => snack.classList.remove('show'), 3000)
}


render()
