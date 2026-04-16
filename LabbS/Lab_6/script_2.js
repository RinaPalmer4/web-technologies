let state = {
    tasks: [
        {
            id: 'T-101',
            text: 'Покушать',
            done: true,
            createdAt: Date.now() - 5000,
            updatedAt: Date.now() - 5000,
        },
        {
            id: 'T-102',
            text: 'Зробити лабораторну',
            done: false,
            createdAt: Date.now() - 3000,
            updatedAt: Date.now() - 3000,
        },
    ],
    sort: null,
}


const addTaskPure = (tasks, newTask) => [...tasks, newTask]

const removeTaskPure = (tasks, id) => tasks.filter(t => t.id !== id)

const editTaskPure = (tasks, id, newText) =>
    tasks.map(t => t.id === id ? {...t, text: newText, updatedAt: Date.now()} : t)

const toggleDonePure = (tasks, id) =>
    tasks.map(t => t.id === id ? {...t, done: !t.done, updatedAt: Date.now()} : t)

const sortTasksPure = (tasks, sortType) => {
    if (!sortType) return tasks
    const sorted = [...tasks]
    return sorted.sort((a, b) => {
        if (sortType === 'createdAt') return b.createdAt - a.createdAt
        if (sortType === 'updatedAt') return b.updatedAt - a.updatedAt
        if (sortType === 'status') return (a.done === b.done) ? 0 : a.done ? 1 : -1
        return 0
    })
}


function render() {
    const list = document.getElementById('todo-list')
    let displayedTasks = sortTasksPure(state.tasks, state.sort)

    list.innerHTML = displayedTasks.map(task => `
        <div class="task-item ${task.done ? 'done' : ''}" id="task-${task.id}">
            <input type="checkbox" ${task.done ? 'checked' : ''} onchange="handleToggle('${task.id}')">

            <span class="task-text" contenteditable="true" onblur="handleEdit('${task.id}', this.innerText)">${task.text}</span>

            <button class="btn-delete" onclick="handleDelete('${task.id}')">Видалити</button>
        </div>
    `).join('')
}


document.getElementById('add-task-form').addEventListener('submit', function (e) {
    e.preventDefault()
    const input = document.getElementById('new-task-input')
    const text = input.value.trim()

    if (text) {
        const newTask = {
            id: 'T-' + Math.floor(Math.random() * 10000),
            text: text,
            done: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        state.tasks = addTaskPure(state.tasks, newTask)
        input.value = ''
        showSnackbar('Завдання додано!')
        render()
    }
})


function handleDelete(id) {
    const item = document.getElementById(`task-${id}`)
    item.classList.add('removing')

    setTimeout(() => {
        state.tasks = removeTaskPure(state.tasks, id)
        showSnackbar('Завдання видалено')
        render()
    }, 400)
}


function handleToggle(id) {
    state.tasks = toggleDonePure(state.tasks, id)
    render()
}


function handleEdit(id, newText) {
    const oldTask = state.tasks.find(t => t.id === id)

    if (oldTask && oldTask.text !== newText.trim()) {
        state.tasks = editTaskPure(state.tasks, id, newText.trim())
        showSnackbar('Завдання оновлено')
        render()
    }
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
