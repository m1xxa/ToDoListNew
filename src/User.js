function User(userInfo){
    let _firstName = userInfo.firstName;
    let _lastName = userInfo.lastName;
    let _specialization = userInfo.specialization;
    let _jobtitle = userInfo.jobtitle;
    let _role = userInfo.role;
    let _tasks = [];

    this.getFirstName = function () {
        return _firstName;
    };
    this.getLastName = function () {
        return _lastName;
    };
    this.getSpecialization = function () {
        return _specialization;
    };
    this.getJob = function () {
        return _jobtitle;
    };
    this.getRole = function () {
        return _role;
    };
    this.getTasks = function () {
        return _tasks;
    };
    this.setTasks = function (tasks) {
        _tasks = tasks;
    };
    this.addTask = function (task) {
        _tasks.push(task);
    };
}

export default User;