function Storage() {
    let _users = [];
    let _current;

    this.addUser = function(user){
        _users.push(user);
        _current = _users.length-1;
    };
    
    this.removeUser = function (id) {
        delete _users[id];
        _current = _users.length-1;
    };

    this.getUserByName = function (name) {
        for(let i = 0; i < _users.length; i++){
            if(_users[i].name = name) return _users[i];
        }
        return null;
    };

    this.getUsers = function(){
        return _users;
    };

    this.setUsers = function (users) {
        _users = users;
    };

    this.getUser = function (id) {
        return _users[id];
    };

    this.getCurrentUser = function(){
        return _users[_current];
    };

    this.setCurrentUser = function (id) {
        _current = id;
    };

    this.haveUser = function(userInfo){
        for(let index = 0; index < _users.length; index++){
            if(_users[index].getFirstName() === userInfo.firstName && _users[index].getLastName() === userInfo.lastName){
                return index;
            }
        }
        return -1;
    };
}

let userStorage = new Storage();

export default userStorage;