const API_URL = "http://localhost:5000/api/tasks";

// ======================
// LOGIN FUNCTION
// ======================

function loginUser() {

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value.trim();

    let emailError = document.getElementById("emailError");
    let passwordError = document.getElementById("passwordError");

    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    let emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    let passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let valid = true;

    if(email === ""){
        emailError.innerHTML = "⚠ Email is required";
        valid = false;
    }

    else if(!emailPattern.test(email)){
        emailError.innerHTML = "⚠ Enter valid Gmail";
        valid = false;
    }

    if(password === ""){
        passwordError.innerHTML = "⚠ Password is required";
        valid = false;
    }

    else if(!passwordPattern.test(password)){
        passwordError.innerHTML =
        "⚠ Password must contain 8 characters with letters & numbers";
        valid = false;
    }

    if(valid){
        alert("Login Successful");
        window.location.href = "dashboard.html";
    }
}

// ======================
// SIGNUP FUNCTION
// ======================

function signupUser(){

    let name =
    document.getElementById("signupName").value.trim();

    let email =
    document.getElementById("signupEmail").value.trim();

    let password =
    document.getElementById("signupPassword").value.trim();

    let nameError =
    document.getElementById("nameError");

    let emailError =
    document.getElementById("signupEmailError");

    let passwordError =
    document.getElementById("signupPasswordError");

    nameError.innerHTML = "";
    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    let emailPattern =
    /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    let passwordPattern =
    /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let valid = true;

    if(name === ""){
        nameError.innerHTML =
        "⚠ Full Name required";
        valid = false;
    }

    if(email === ""){
        emailError.innerHTML =
        "⚠ Email required";
        valid = false;
    }

    else if(!emailPattern.test(email)){
        emailError.innerHTML =
        "⚠ Enter valid Gmail";
        valid = false;
    }

    if(password === ""){
        passwordError.innerHTML =
        "⚠ Password required";
        valid = false;
    }

    else if(!passwordPattern.test(password)){
        passwordError.innerHTML =
        "⚠ Password must contain letters & numbers";
        valid = false;
    }

    if(valid){
        alert("Signup Successful");
        window.location.href = "login.html";
    }
}

// ======================
// FETCH TASKS
// ======================

async function fetchTasks() {

    try {

        const response = await fetch(API_URL);

        const tasks = await response.json();

        console.log(tasks);

        displayTasks(tasks);

    } catch (error) {

        console.log("Fetch Error:", error);

    }
}

// ======================
// DISPLAY TASKS
// ======================

function displayTasks(tasks) {

    const taskList = document.getElementById("taskList");

    if(!taskList) return;

    taskList.innerHTML = "";

    if(tasks.length === 0){

        taskList.innerHTML = `
            <p class="empty-task">
                No Tasks Available
            </p>
        `;

        return;
    }

    tasks.forEach(task => {

        taskList.innerHTML += `

            <div class="task-card">

                <div class="task-top">

                    <h3>${task.taskName}</h3>

                    <span class="${
                        task.status === "Completed"
                        ? "completed-badge"
                        : "pending-badge"
                    }">

                        ${task.status}

                    </span>

                </div>

                <div class="task-buttons">

                    <button 
                        class="edit-btn"
                        onclick="editTask('${task._id}')"
                    >
                        Edit
                    </button>

                    <button 
                        class="complete-btn"
                        onclick="completeTask('${task._id}')"
                    >
                        Complete
                    </button>

                    <button 
                        class="delete-btn"
                        onclick="deleteTask('${task._id}')"
                    >
                        Delete
                    </button>

                </div>

            </div>

        `;
    });
}

// ======================
// ADD TASK
// ======================

async function addTask() {

    const taskInput =
    document.getElementById("taskInput");

    const taskName =
    taskInput.value.trim();

    if(taskName === ""){

        alert("Please enter task");

        return;
    }

    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                taskName,
                status: "Pending"
            })

        });

        const data = await response.json();

        console.log(data);

        taskInput.value = "";

        fetchTasks();

    } catch (error) {

        console.log("Add Task Error:", error);

    }
}

// ======================
// DELETE TASK
// ======================

async function deleteTask(id) {

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "DELETE"

        });

        fetchTasks();

    } catch (error) {

        console.log(error);

    }
}

// ======================
// COMPLETE TASK
// ======================

async function completeTask(id) {

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                status: "Completed"
            })

        });

        fetchTasks();

    } catch (error) {

        console.log(error);

    }
}

// ======================
// EDIT TASK
// ======================

async function editTask(id) {

    const newTask = prompt("Enter new task name");

    if (!newTask) return;

    try {

        await fetch(`${API_URL}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                taskName: newTask
            })

        });

        fetchTasks();

    } catch (error) {

        console.log(error);

    }
}

// ======================
// PAGE LOAD
// ======================

window.onload = () => {

    console.log("Frontend Connected");

    fetchTasks();

};

// ======================
// BUTTON EVENT
// ======================

document.addEventListener("DOMContentLoaded", () => {

    const addBtn = document.getElementById("addBtn");

    if(addBtn){

        addBtn.addEventListener("click", addTask);

    }

});