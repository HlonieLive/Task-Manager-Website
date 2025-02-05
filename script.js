const taskDisplay = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');

// Fetch tasks from the API
async function fetchTasks() {
    try {
    const response = await fetch('http://localhost:3000/tasks');
    const tasks = await response.json();
    renderTasks(tasks);
    } catch (error) {
    console.error('Error fetching tasks:', error);
    }
}

// Render tasks on the page
function renderTasks(tasks) {
    taskDisplay.innerHTML = '';
    tasks.forEach(task => {
    const taskItem = document.createElement('li');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-btn';

    taskItem.textContent = task.text;
    taskItem.appendChild(deleteButton);

    taskDisplay.appendChild(taskItem);

    deleteButton.addEventListener('click', () => deleteTask(task.id));
});
}

// Add a new task via API
async function addTask(taskText) {
try {
const response = await fetch('http://localhost:3000/tasks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: taskText }),
        });
    if (response.ok) {
        fetchTasks(); // Refresh the task list
    }
    } catch (error) {
    console.error('Error adding task:', error);
    }
}

// Delete a task via API
async function deleteTask(taskId) {
    try {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        fetchTasks(); // Refresh the task list
    }
    } catch (error) {
    console.error('Error deleting task:', error);
    }
}

// Form submission handler
taskForm.addEventListener('submit', event => {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
    addTask(taskText);
    taskInput.value = '';
    }
});

// Initialize the app
fetchTasks();