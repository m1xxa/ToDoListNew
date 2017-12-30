import $ from 'jquery';
import User from './User';
import getTask from './Task';
import Student from "./Student";
import Developer from "./Developer";

let users = [];
const roles = ["User", "Student", "Developer"];

$( "#role-selector" ).change(function() {
    const roleSelector = document.getElementById("role-selector");
    const value = roleSelector.options[roleSelector.selectedIndex].value;

    const userSpecializationBlock  = $("#specialization");
    const userJobBlock = $("#job");

    switch(value){
        case roles[0] :
            userSpecializationBlock.addClass("d-none");
            userJobBlock.addClass("d-none");
            break;
        case roles[1] :
            userSpecializationBlock.removeClass("d-none");
            userJobBlock.addClass("d-none");
            break;
        case roles[2] :
            userSpecializationBlock.removeClass("d-none");
            userJobBlock.removeClass("d-none");
            break;
        default :
            userSpecializationBlock.addClass("d-none");
            userJobBlock.addClass("d-none");
            break;
    }
});

$( ".sign-in" ).click(function () {
    const welcomeScreen = $(".welcome-screen");
    const userInform = $(".user-inform");
    welcomeScreen.addClass("d-none");
    userInform.removeClass("d-none");
});

$("#create-user-btn").click(function () {
    const roleSelector = document.getElementById("role-selector");
    const role = roleSelector.options[roleSelector.selectedIndex].value;
    const userForm = document.forms.userform;

    const userInfo = {
        name: userForm.elements.name.value,
        surname: userForm.elements.surname.value,
        specialization: userForm.elements.specialization.value,
        jobtitle: userForm.elements.job.value,
        role: role,
    };
    switch(role){
        case roles[0] :
            const user = new User(userInfo);
            users.push(user);
            showTasksUi(user);
            showAvailableTabs(userInfo);
            addToList();
            break;
        case roles[1] :
            const student = new Student(userInfo);
            users.push(student);
            showTasksUi(student);
            showAvailableTabs(userInfo);
            addToList();
            break;
        case roles[2] :
            const developer = new Developer(userInfo);
            users.push(developer);
            showTasksUi(developer);
            showAvailableTabs(userInfo);
            addToList();
            break;
        default :
            alert("Please, select role");
            console.log(users);
            break;
    }
});

$("#add-simple").click(function () {
    const simpleTaskForm = document.forms.simpleTaskForm;
    const taskInfo = {
        type: "Simple task",
        title: simpleTaskForm.stTitle.value,
        status: simpleTaskForm.stStatus.value,
    };

    users[users.length-1].addTask(getTask(taskInfo));
    simpleTaskForm.reset();
    addToList();
    console.log(users);
});

$("#add-home").click(function () {
    const homeTaskForm = document.forms.homeTaskForm;
    const taskInfo = {
        type: "Home task",
        title: homeTaskForm.htTitle.value,
        status: homeTaskForm.htStatus.value,
        description: homeTaskForm.htDescription.value,
    };
    users[users.length-1].addTask(getTask(taskInfo));
    homeTaskForm.reset();
    addToList();
    console.log(users);
});

$("#add-project").click(function () {
    const projectTaskForm = document.forms.projectTaskForm;
    const taskInfo = {
        type: "Project task",
        title: projectTaskForm.ptTitle.value,
        status: projectTaskForm.ptStatus.value,
        description: projectTaskForm.ptDescription.value,
        deadline: projectTaskForm.ptDeadline.value,
    };
    users[users.length-1].addTask(getTask(taskInfo));
    projectTaskForm.reset();
    addToList();
    console.log(users);
});

$(".sign-out").click(function () {
    showNewUserUi();
});

function showNewUserUi() {
    $(".user-inform").removeClass("d-none");
    $(".todo-data").addClass("d-none");
    $(".sign-out").addClass("d-none");
    $(".sign-in").removeClass("d-none");
    $(".body").css('background-image', 'url(https://d3ptyyxy2at9ui.cloudfront.net/bc51cd8ccfb3787ee54ad263924a1a0a.jpg)');

    const userForm = document.forms.userform;
    userForm.reset();
}

/* Show tasks form for current user */
function showTasksUi(user) {
    $(".user-inform").addClass("d-none");
    $(".todo-data").removeClass("d-none");
    $(".sign-out").removeClass("d-none");
    $(".sign-in").addClass("d-none");
    $(".body").css('background-image', 'url()');
}

/* Show tabs available for user */
function showAvailableTabs(user) {
    let tabHome = $("#tab-home");
    let tabProject = $("#tab-project");
    switch (user.role) {
        case roles[0] :
            break;
        case roles[1] :
            tabHome.removeClass("d-none");
            break;
        case roles[2] :
            tabHome.removeClass("d-none");
            tabProject.removeClass("d-none");
            break;
        default :
            console.log("Error read roles");
    }
}

/* Add user task to list */
function addToList(){
    const list = window.document.createElement('ul');
    for (let i = 0; i < users[users.length-1].getTasks().length; i++){
        const li = document.createElement('li');
        li.className = "list-group-item";
        let type = users[users.length-1].getTasks()[i].type || "";
        let title = users[users.length-1].getTasks()[i].title || "";
        let status = users[users.length-1].getTasks()[i].status || "";
        let description = users[users.length-1].getTasks()[i].description || "";
        let deadline = users[users.length-1].getTasks()[i].deadline || "";
        li.innerHTML = "<b>" + type + ": </b>" + title + " " + status + " " + description + " " + deadline;
        const span = document.createElement("SPAN");
        const txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        list.appendChild(li);
    }
    let tasklist = document.getElementById("tasklist");
    tasklist.innerHTML = "";
    tasklist.appendChild(list);

    const closeButtons = document.getElementsByClassName("close");
    for(let i = 0; i < closeButtons.length; i++){
        closeButtons[i].onclick = function(){
            let t = users[users.length - 1].getTasks();
            t.splice(i, 1);
            users[users.length - 1].setTasks(t);
            this.parentNode.parentNode.removeChild(this.parentNode);
        };
    }
}

