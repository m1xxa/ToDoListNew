import Student from './Student';

function Developer(userInfo) {
    this.prototype = Student.call(this,userInfo);
    let _jobtitle = userInfo.jobtitle;
    this.getJob = function () {
        return _jobtitle;
    };
}

Developer.prototype = Object.create(Student.prototype);
Developer.prototype.constructor = Developer;

export default Developer;
