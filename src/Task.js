function getTask (taskInfo) {
    const currentTask = {};
    currentTask['type'] = taskInfo.type;
    currentTask['title'] = taskInfo.title;
    currentTask['status'] = taskInfo.status;
    currentTask['description'] = taskInfo.description;
    currentTask['deadline'] = taskInfo.deadline;
    return currentTask;
}

export default getTask;