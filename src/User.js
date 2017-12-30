function User(userInfo){
    let _firstName = userInfo.firstName;
    let _lastName = userInfo.lastName;
    let _role = userInfo.role;
    let _tasks = [];

    this.getFirstName = function () {
        return _firstName;
    };
    this.getLastName = function () {
        return _lastName;
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
}

User.prototype.addTask = function(task){
  this.getTasks().push(task);
};

export default User;