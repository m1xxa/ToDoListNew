function Storage() {
    let _users = [];

    this.addUser = function(user){
        _users.push(user);
    };
    
    this.removeUser = function (id) {
        delete _users[id];
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

    this.getUser = function (id) {
        return _users[id];
    };

    this.getCurrentUser = function(){
        return _users[_users.length-1];
    };
}

let userStorage = new Storage();

export default userStorage;