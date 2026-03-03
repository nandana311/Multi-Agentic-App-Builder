// Function to add a task
function addTask(text) {
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    if (text.trim() === '') {
        alert('Task description cannot be empty.');
        return;
    }

    const taskItem = document.createElement('li');
    taskItem.setAttribute('data-id', Date.now().toString());
    taskItem.innerHTML = `
        <span class="task-desc">${text}</span>
        <input type="checkbox" class="completed-checkbox" onclick="toggleTaskCompletion('${taskItem.getAttribute('data-id')}')">
        <button class="edit-btn" onclick="editTask('${taskItem.getAttribute('data-id')}', prompt('Edit task:'))">Edit</button>
        <button class="delete-btn" onclick="deleteTask('${taskItem.getAttribute('data-id')}')">Delete</button>
        <span class="drag-handle">Drag</span>
    `;
    taskList.appendChild(taskItem);
    taskInput.value = '';
}

// Function to toggle task completion
function toggleTaskCompletion(id) {
    const taskItem = document.querySelector(`li[data-id='${id}']`);
    const checkbox = taskItem.querySelector('.completed-checkbox');
    if (checkbox.checked) {
        taskItem.style.textDecoration = 'line-through';
    } else {
        taskItem.style.textDecoration = 'none';
    }
}

// Function to delete a task
function deleteTask(id) {
    const taskItem = document.querySelector(`li[data-id='${id}']`);
    taskItem.remove();
}

// Function to edit a task
function editTask(id, newText) {
    if (!newText) {
        alert('Task description cannot be empty.');
        return;
    }
    const taskItem = document.querySelector(`li[data-id='${id}']`);
    const taskDesc = taskItem.querySelector('.task-desc');
    taskDesc.textContent = newText;
}

// Function to filter tasks
function filterTasks(filterType) {
    const taskList = document.getElementById('task-list');
    const tasks = taskList.getElementsByTagName('li');

    for (const task of tasks) {
        const isCompleted = task.querySelector('.completed-checkbox').checked;
        task.style.display = 'none';

        if (filterType === 'all' || 
            (filterType === 'completed' && isCompleted) || 
            (filterType === 'pending' && !isCompleted)) {
            task.style.display = 'flex';
        }
    }
}

// Function to reorder tasks
function reorderTasks(draggedTaskId, newPositionId) {
    const taskList = document.getElementById('task-list');
    const draggedTask = document.querySelector(`li[data-id='${draggedTaskId}']`);
    const newPositionTask = document.querySelector(`li[data-id='${newPositionId}']`);

    taskList.insertBefore(draggedTask, newPositionTask);
}

// Event listeners for adding tasks with button
const addTaskBtn = document.getElementById('add-task-btn');
addTaskBtn.addEventListener('click', () => {
    const taskInput = document.getElementById('task-input');
    addTask(taskInput.value);
});

// Event listeners for filtering tasks
const filterOptions = document.getElementById('filter-options');
filterOptions.addEventListener('change', (event) => {
    filterTasks(event.target.value);
});
