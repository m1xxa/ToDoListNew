import $ from 'jquery';
import userStorage from "./Storage";
import * as UI from './constants';
import User from './User';
import getTask from './Task';
import Student from "./Student";
import Developer from "./Developer";

$( "#role-selector" ).change(function() {
    const value = UI.roleSelector.options[UI.roleSelector.selectedIndex].value;

    switch(value){
        case UI.roles[0] :
            UI.userSpecializationBlock.addClass("d-none");
            UI.userJobBlock.addClass("d-none");
            break;
        case UI.roles[1] :
            UI.userSpecializationBlock.removeClass("d-none");
            UI.userJobBlock.addClass("d-none");
            break;
        case UI.roles[2] :
            UI.userSpecializationBlock.removeClass("d-none");
            UI.userJobBlock.removeClass("d-none");
            break;
        default :
            UI.userSpecializationBlock.addClass("d-none");
            UI.userJobBlock.addClass("d-none");
            break;
    }
});

$( ".sign-in" ).click(function () {
    UI.welcomeScreen.addClass("d-none");
    UI.userInform.removeClass("d-none");
});

$("#create-user-btn").click(function () {
    const role = UI.roleSelector.options[UI.roleSelector.selectedIndex].value;
    const userInfo = {
        firstName: UI.userForm.elements.name.value,
        lastName: UI.userForm.elements.surname.value,
        specialization: UI.userForm.elements.specialization.value,
        jobtitle: UI.userForm.elements.job.value,
        role: role,
    };
    switch(role){
        case UI.roles[0] :
            const user = new User(userInfo);
            userStorage.addUser(user);
            showTasksUi(user);
            showAvailableTabs(userInfo);
            addToList();
            break;
        case UI.roles[1] :
            const student = new Student(userInfo);
            userStorage.addUser(student);
            showTasksUi(student);
            showAvailableTabs(userInfo);
            addToList();
            break;
        case UI.roles[2] :
            const developer = new Developer(userInfo);
            userStorage.addUser(developer);
            showTasksUi(developer);
            showAvailableTabs(userInfo);
            addToList();
            break;
        default :
            alert("Please, select role");
            break;
    }
    console.log(userStorage.getUsers());
});

$("#add-simple").click(function () {
    const taskInfo = {
        type: "Simple task",
        title: UI.simpleTaskForm.stTitle.value,
        status: UI.simpleTaskForm.stStatus.value,
    };
    userStorage.getCurrentUser().addTask(getTask(taskInfo));
    UI.simpleTaskForm.reset();
    addToList();
});

$("#add-home").click(function () {
    const taskInfo = {
        type: "Home task",
        title: UI.homeTaskForm.htTitle.value,
        status: UI.homeTaskForm.htStatus.value,
        description: UI.homeTaskForm.htDescription.value,
    };
    userStorage.getCurrentUser().addTask(getTask(taskInfo));
    UI.homeTaskForm.reset();
    addToList();
});

$("#add-project").click(function () {
    const taskInfo = {
        type: "Project task",
        title: UI.projectTaskForm.ptTitle.value,
        status: UI.projectTaskForm.ptStatus.value,
        description: UI.projectTaskForm.ptDescription.value,
        deadline: UI.projectTaskForm.ptDeadline.value,
    };
    userStorage.getCurrentUser().addTask(getTask(taskInfo));
    UI.projectTaskForm.reset();
    addToList();
});

$(".sign-out").click(function () {
    showNewUserUi();
});

/* Show form for create new user */
function showNewUserUi() {
    $(".user-inform").removeClass("d-none");
    $(".todo-data").addClass("d-none");
    $(".sign-out").addClass("d-none");
    $(".sign-in").removeClass("d-none");
    $(".body").css('background-image', 'url(https://d3ptyyxy2at9ui.cloudfront.net/bc51cd8ccfb3787ee54ad263924a1a0a.jpg)');
    UI.userForm.reset();
}

/* Show tasks form for current user */
function showTasksUi(user) {
    $(".user-inform").addClass("d-none");
    $(".todo-data").removeClass("d-none");
    $(".sign-out").removeClass("d-none");
    $(".sign-in").addClass("d-none");
    $(".body").css('background-image', 'url()');
    $(".list-title").text("List of " + user.getFirstName() + "'s tasks: ");
}

/* Show tabs available for user */
function showAvailableTabs(user) {
    switch (user.role) {
        case UI.roles[0] :
            UI.tabHome.addClass("d-none");
            UI.tabProject.addClass("d-none");
            break;
        case UI.roles[1] :
            UI.tabHome.removeClass("d-none");
            UI.tabProject.addClass("d-none");
            break;
        case UI.roles[2] :
            UI.tabHome.removeClass("d-none");
            UI.tabProject.removeClass("d-none");
            break;
        default :
            console.log("Error read roles");
    }
}

/* Add user task to list */
function addToList(){
    const list = window.document.createElement('ul');
    for (let i = 0; i < userStorage.getCurrentUser().getTasks().length; i++){
        const li = document.createElement('li');
        li.className = "list-group-item";
        let type = userStorage.getCurrentUser().getTasks()[i].type || "";
        let title = userStorage.getCurrentUser().getTasks()[i].title || "";
        let status = userStorage.getCurrentUser().getTasks()[i].status || "";
        let description = userStorage.getCurrentUser().getTasks()[i].description || "";
        let deadline = userStorage.getCurrentUser().getTasks()[i].deadline || "";
        li.innerHTML = "<b>" + type + ": </b>" + title + " " + status + " " + description + " " + deadline;
        const span = document.createElement("SPAN");
        const txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        list.appendChild(li);
    }
    UI.tasklist.innerHTML = "";
    UI.tasklist.appendChild(list);

    const closeButtons = document.getElementsByClassName("close");
    for(let i = 0; i < closeButtons.length; i++){
        closeButtons[i].onclick = function(){
            let t = userStorage.getCurrentUser().getTasks();
            t.splice(i, 1);
            userStorage.getCurrentUser().setTasks(t);
            this.parentNode.parentNode.removeChild(this.parentNode);
        };
    }
}