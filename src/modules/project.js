import TodoList from './todolist'
import Task from './task'

//create project w/ task

export default class Project{

    constructor(name, projectID) { 
        this.name = name
        this.projectID = projectID
        this.tasks = []
      }

    getprojectID(){
        return this.projectID
    }

    setprojectID(projectID){
        this.projectID = projectID
    }

    getName(){
        return this.name
    }

    setName(name){
        this.name = name
    }

    addTask(task){
        this.tasks.push(task)
    }

    delTask(taskID){
        this.tasks =  this.tasks.filter((task) => task.getTask() !== taskID)
        
    }
    getTasks(){
        return this.tasks
    }

    setTasks(tasks){
        this.tasks = tasks
    }

    findTask(taskID){
        return this.tasks.find((task) => task.getTask() == taskID)
    }

}