import Project from './project'
import Task from './task'
import TodoList from './todolist'

export default class Storage{

    static getTodoList(){
        const todolist = Object.assign(new TodoList(), JSON.parse(localStorage.getItem('todolist')))
        const todoProjects = todolist.getProjects().map(project => Object.assign(new Project(), project))
        todolist.setProjects(todoProjects)
        
        todolist.getProjects().forEach(project => {
            project.setTasks(project.getTasks().map(task => Object.assign(new Task(), task)))
        });
        // console.log(todolist)

        return todolist
    }

    static setTodoList(todo){
        localStorage.setItem("todolist", JSON.stringify(todo))
    } 

    static addProject(project){
        const todolist = Storage.getTodoList()
        todolist.addProject(project)
        Storage.setTodoList(todolist)

    }

    static deleteProject(projectID){
        const todolist = Storage.getTodoList()
        todolist.delProject(projectID)
        Storage.setTodoList(todolist) 
    }

    static clearStorage(){
        localStorage.clear()
    }

    static updateProjectName(name, projectID){
        const todolist = Storage.getTodoList()
        todolist.findProject(projectID).setName(name)
        Storage.setTodoList(todolist)
    }

    static addTask(projectID, task){
        const todolist = Storage.getTodoList()
        todolist.findProject(projectID).addTask(task)
        Storage.setTodoList(todolist)
    }

    static deleteTask(projectID, taskID){
        const todolist = Storage.getTodoList()
        todolist.findProject(projectID).delTask(taskID)
        Storage.setTodoList(todolist) 

    }

    static updateDate(projectID, taskID, date){
        const todolist = Storage.getTodoList()
        todolist.findProject(projectID).findTask(taskID).setDate(date)
        Storage.setTodoList(todolist) 

    }

    static updatePriority(projectID, taskID, priority){
        const todolist = Storage.getTodoList()
        todolist.findProject(projectID).findTask(taskID).setPriority(priority)
        Storage.setTodoList(todolist) 

    }

    static updateTaskInfo(projectID, taskID, taskInfo){
        const todolist = Storage.getTodoList()
        todolist.findProject(projectID).findTask(taskID).setTaskInfo(taskInfo)
        Storage.setTodoList(todolist) 

    }

    static updateStatus(projectID, taskID, checked){
        const todolist = Storage.getTodoList()
        todolist.findProject(projectID).findTask(taskID).setChecked(checked)
        Storage.setTodoList(todolist) 
    }

    static updateToday(){
        const todolist = Storage.getTodoList()
        todolist.setToday()
        Storage.setTodoList(todolist)
    }

    static updateThisWeek(){
        const todolist = Storage.getTodoList()
        todolist.setThisWeek()
        Storage.setTodoList(todolist)
    }

    static updateStatusToday(taskID, checked){
        const todolist = Storage.getTodoList().findProject("today").findTask(taskID).setChecked(checked)
        todolist.setToday()
        Storage.setTodoList(todolist)
    }

    static updateStatusWeek(taskID, checked){
        const todolist = Storage.getTodoList().findProject("this-week").findTask(taskID).setChecked(checked)
        todolist.setThisWeek()
        Storage.setTodoList(todolist)
    }

}