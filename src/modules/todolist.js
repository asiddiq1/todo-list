import Project from './project'
import Task from './task'
import {isSameWeek, parseISO} from 'date-fns'

export default class TodoList{

    constructor() {
        this.projects = []
        
        this.projects.push(new Project("Inbox", "inbox"))
        this.projects.push(new Project("Today", "today"))
        this.projects.push(new Project("This Week", "this-week"))

        //default projects on start up
        const homeImprovement = new Project("Home Improvement", "home-improvement");
        homeImprovement.addTask(new Task(false, "Add lights to closet", "none", "2023-08-17", "HI-task1", "home-improvement"))
        homeImprovement.addTask(new Task(false, "Buy new couch for living room", "medium", "", "HI-task2", "home-improvement"))
        homeImprovement.addTask(new Task(true, "Clean office desk", "none", "2023-08-23", "HI-task3", "home-improvement"))
        this.projects.push(homeImprovement);

        const health = new Project("Health and Wellness", "health-wellness");
        health.addTask(new Task(false, "Create workout goals", "medium", "2023-08-17", "HW-task1", "health-wellness"))
        health.addTask(new Task(false, "Leg day", "high", "2023-08-19", "HW-task2", "health-wellness"))
        health.addTask(new Task(true, "Meal prep", "none", "2023-08-17", "HW-task3", "health-wellness"))
        this.projects.push(health);

        const travel = new Project("Travel", "travel");
        travel.addTask(new Task(false, "Book flight and accomodations", "none", "2023-08-17", "T-task1", "travel"))
        travel.addTask(new Task(false, "Purchase travel equipment", "medium", "2023-08-19", "T-task2", "travel"))
        travel.addTask(new Task(true, "Plan activities", "low", "2023-08-17", "T-task3", "travel"))
        this.projects.push(travel);


      }
    
    setProjects(projects){
       this.projects = projects
    }

    getProjects(){
        return this.projects
    }

    findProject(projectID){
        return this.projects.find((project) => project.getprojectID() == projectID)
    }

    addProject(project){
        this.projects.push(project)

    }

    delProject(projectID){
        this.projects = this.projects.filter((project) => project.getprojectID() !== projectID)
    }

    setToday(){

        this.findProject("today").tasks = []
        let today = new Date(new Date().toLocaleString().slice(0, 9)).toISOString().slice(0, 10)
        this.projects.forEach(project => {
            project.tasks.forEach(task => {
                if (project.projectID == "today" || project.projectID == "this-week"){
                    return
                }
                
                if (today == task.getDate()){
                    this.findProject("today").addTask(task)
                }
                
            })
        })
    }

    setThisWeek(){

        this.findProject("this-week").tasks = []
        let today = new Date().toLocaleString()
        this.projects.forEach(project => {
            project.tasks.forEach(task => {
                if (project.projectID == "today" || project.projectID == "this-week"){
                    return
                }
              
                if (isSameWeek(new Date(today), new Date(task.getDate()))){
                    this.findProject("this-week").addTask(task)
                }
                
            })
        })
    }
}