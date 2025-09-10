document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTask');
    const taskList = document.getElementById('taskList');
    const deleteAllBtn = document.getElementById('deleteAll');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            if (task.completed) {
                li.classList.add('completed');
            }

            const taskSpan = document.createElement('span');
            taskSpan.className = 'task-text';
            taskSpan.textContent = task.text;

            const timestampSpan = document.createElement('span');
            timestampSpan.className = 'timestamp';
            const date = new Date(task.timestamp);
            timestampSpan.textContent = ` - ${date.toLocaleDateString('ar')} ${date.toLocaleTimeString('ar')}`;

            const completeBtn = document.createElement('button');
            completeBtn.className = 'complete-btn';
            completeBtn.textContent = task.completed ? '↩️ إلغاء' : '✅ مكتمل';
            completeBtn.addEventListener('click', () => {
                task.completed = !task.completed;
                saveTasks();
                renderTasks();
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.className = 'delete-btn';
            deleteBtn.textContent = '🗑️ حذف';
            deleteBtn.addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });

            li.appendChild(taskSpan);
            li.appendChild(timestampSpan);
            li.appendChild(completeBtn);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') {
            alert('يرجى إدخال مهمة صحيحة');
            return;
        }

        const newTask = {
            text: taskText,
            completed: false,
            timestamp: Date.now()
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    deleteAllBtn.addEventListener('click', () => {
        if (confirm('هل أنت متأكد من حذف جميع المهام؟')) {
            tasks = [];
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});
