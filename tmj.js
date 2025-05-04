document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const progressBar = document.getElementById('progressBar');
    const taskChart = document.getElementById('taskChart').getContext('2d');

    let tasks = [];

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const taskName = document.getElementById('taskName').value;
        const taskPriority = document.getElementById('taskPriority').value;
        addTask(taskName, taskPriority);
        taskForm.reset();
    });

    function addTask(name, priority) {
        const task = {
            name,
            priority: parseInt(priority),
            completed: false
        };
        tasks.push(task);
        sortTasks();
        updateTasks();
        updateProgressBar();
        updateChart();
    }

    function sortTasks() {
        tasks.sort((a, b) => a.priority - b.priority);
    }

    function updateTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = task.completed ? 'completed' : '';
            li.innerHTML = `${task.name} <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>`;
            taskList.appendChild(li);
        });
    }

    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        updateTasks();
        updateProgressBar();
        updateChart();
    }

    function updateProgressBar() {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(task => task.completed).length;
        const percentage = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
        progressBar.style.width = `${percentage}%`;
    }

    function updateChart() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const incompleteTasks = tasks.length - completedTasks;

        new Chart(taskChart, {
            type: 'bar',
            data: {
                labels: ['Completed', 'Incomplete'],
                datasets: [{
                    label: 'Tasks',
                    data: [completedTasks, incompleteTasks],
                    backgroundColor: ['#4caf50', '#f44336']
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
});
