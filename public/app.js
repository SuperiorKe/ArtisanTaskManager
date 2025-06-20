// Global variables
let currentUser = null;

// Auth state observer
auth.onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        showApp();
        loadTasks();
    } else {
        currentUser = null;
        showAuth();
    }
});

// Show/Hide sections
function showAuth() {
    document.getElementById('auth-container').style.display = 'flex';
    document.getElementById('app-container').style.display = 'none';
    document.getElementById('loading').style.display = 'none';
}

function showApp() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'block';
    document.getElementById('loading').style.display = 'none';
    document.getElementById('user-email').textContent = currentUser.email;
}

function showLoading() {
    document.getElementById('auth-container').style.display = 'none';
    document.getElementById('app-container').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
}

// Auth functions
function showSignup() {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('signup-form').style.display = 'block';
}

function showLogin() {
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('signup-form').style.display = 'none';
}

async function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
    }
    
    try {
        showLoading();
        await auth.createUserWithEmailAndPassword(email, password);
        // User will be automatically logged in
    } catch (error) {
        alert('Error: ' + error.message);
        showAuth();
    }
}

async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }
    
    try {
        showLoading();
        await auth.signInWithEmailAndPassword(email, password);
        // User will be automatically logged in
    } catch (error) {
        alert('Error: ' + error.message);
        showAuth();
    }
}

async function logout() {
    try {
        await auth.signOut();
        // User will be automatically logged out
    } catch (error) {
        alert('Error logging out: ' + error.message);
    }
}

// Task functions
async function addTask() {
    const taskText = document.getElementById('new-task').value.trim();
    
    if (!taskText) {
        alert('Please enter a task');
        return;
    }
    
    try {
        await db.collection('tasks').add({
            text: taskText,
            completed: false,
            userId: currentUser.uid,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        document.getElementById('new-task').value = '';
        loadTasks();
    } catch (error) {
        alert('Error adding task: ' + error.message);
    }
}

async function loadTasks() {
    try {
        const snapshot = await db.collection('tasks')
            .where('userId', '==', currentUser.uid)
            .orderBy('createdAt', 'desc')
            .get();
        
        const tasksContainer = document.getElementById('tasks-container');
        tasksContainer.innerHTML = '';
        
        if (snapshot.empty) {
            tasksContainer.innerHTML = '<p style="text-align: center; color: white; padding: 20px;">No tasks yet. Add your first task!</p>';
            return;
        }
        
        snapshot.forEach(doc => {
            const task = doc.data();
            const taskElement = createTaskElement(doc.id, task);
            tasksContainer.appendChild(taskElement);
        });
    } catch (error) {
        alert('Error loading tasks: ' + error.message);
    }
}

function createTaskElement(taskId, task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = `task-item ${task.completed ? 'completed' : ''}`;
    
    taskDiv.innerHTML = `
        <div class="task-content">
            <span class="task-text ${task.completed ? 'completed' : ''}">${task.text}</span>
        </div>
        <div class="task-actions">
            <button class="complete-btn" onclick="toggleTask('${taskId}', ${!task.completed})">
                ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="delete-btn" onclick="deleteTask('${taskId}')">Delete</button>
        </div>
    `;
    
    return taskDiv;
}

async function toggleTask(taskId, completed) {
    try {
        await db.collection('tasks').doc(taskId).update({
            completed: completed
        });
        loadTasks();
    } catch (error) {
        alert('Error updating task: ' + error.message);
    }
}

async function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        try {
            await db.collection('tasks').doc(taskId).delete();
            loadTasks();
        } catch (error) {
            alert('Error deleting task: ' + error.message);
        }
    }
}

// Allow Enter key to add tasks
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('new-task').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
});