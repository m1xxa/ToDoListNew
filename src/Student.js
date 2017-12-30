import User from './User';

function Student(userInfo) {
    this.prototype = User.call(this, userInfo);
    let _specialization = userInfo.specialization;
    this.getSpecialization = function () {
        return _specialization;
    };
}

Student.prototype = Object.create(User.prototype);
Student.prototype.constructor = Student;

export default Student;