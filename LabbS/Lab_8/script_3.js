const tasks = document.querySelectorAll('.task-card')
const columns = document.querySelectorAll('.column-content')


tasks.forEach(task => {
    task.addEventListener('dragstart', () => {
        task.classList.add('dragging')
    })

    task.addEventListener('dragend', () => {
        task.classList.remove('dragging')
    })
})


columns.forEach(column => {
    column.addEventListener('dragover', (e) => {
        e.preventDefault()


        const afterElement = getDragAfterElement(column, e.clientY)
        const draggableTask = document.querySelector('.dragging')


        if (afterElement == null) {
            column.appendChild(draggableTask)
        } else {

            column.insertBefore(draggableTask, afterElement)
        }
    })
})


function getDragAfterElement(column, y) {

    const draggableElements = [...column.querySelectorAll('.task-card:not(.dragging)')]


    return draggableElements.reduce((closest, child) => {

        const box = child.getBoundingClientRect()


        const offset = y - box.top - box.height / 2


        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child}
        } else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}
