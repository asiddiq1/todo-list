import Task from './task'
import Project from './project'
import Storage from './storage'


function createProject(projectName, projectID){
    //creates project container

    const projectDiv = document.createElement("div");
    projectDiv.className = "project";
    projectDiv.setAttribute("data-project", projectID);

    if (projectID == "inbox" || projectID == "today" || projectID == "this-week"){
        projectDiv.classList.add("req-projects");
        projectDiv.textContent = projectName;
        projectDiv.id = projectID;
    }
    else{

        const projectNameInput = document.createElement("p");
        projectNameInput.className = "project-name";
        projectNameInput.textContent = projectName;
        const trashImg = createTrash("project", projectID);
        projectDiv.append(projectNameInput, trashImg);
        editTaskProjectField(projectNameInput); //edits project field

    }
    
    activeProject(projectDiv); //activates project
    return projectDiv;
}

function renderProjects(){
    let todolists = Storage.getTodoList().getProjects();
    let projectContainer = document.getElementById("project-container"); 
    for (const projects of todolists) {
        let projectName = projects.getName();
        let projectID = projects.getprojectID();
        let projectDiv = createProject(projectName, projectID);
        projectContainer.append(projectDiv);
    }
}

function myTaskAll(task){
    const taskDiv = document.createElement("div");
    taskDiv.className = "mytask";
    taskDiv.setAttribute("data-task", task.taskID);
    taskDiv.setAttribute("data-project", task.projectid);
    const Ctask = createTask(task.projectid, task.taskID, task.task_checked, task.taskInfo, taskDiv);
    const priority = createPriority(task.projectid, task.taskID);
    const taskDue = createDueDate(task.date);
    const datePicker = createDatePicker(task.projectid, task.taskID);
    const trashTask = createTrash("task", task.taskID);
    updatePriority(priority, task.priority); //update priority value
    taskDiv.append(Ctask, priority, taskDue, datePicker, trashTask);

    return taskDiv;
}


function renderTasks(){
    let taskContainer = document.getElementById("task-container"); 
    taskContainer.textContent = "";
    let activeProject = document.querySelector(".active").getAttribute("data-project");
    let tasks = sortArrayDate(activeProject)
    for (const task of tasks) {
        const taskDiv = myTaskAll(task)
        taskContainer.append(taskDiv)

    }
}

function sortArrayDate(projectID){

    let todolists = Storage.getTodoList();
    let tasks = todolists.findProject(projectID).getTasks();

    let unchecked = []        
    tasks.forEach(task => {
            if (task.task_checked == false)
                unchecked.push(task);
        });

    unchecked.sort(function(a,b){
        return a.date.localeCompare(b.date);
      })
    
    unchecked.sort(function(a,b){
        return !a.date - !b.date || a.date.localeCompare(b.date);
        
    })

    let checked = []
    tasks.forEach(task => {
            if (task.task_checked == true)
                checked.push(task);
        });
        
   
    checked.sort(function(a,b){
        return !a.date - !b.date || a.date.localeCompare(b.date);
      })

      return unchecked.concat(checked);

}


function activeProject(project){
 
    project.addEventListener('click', function (e){
        if (e.target.classList.contains("trash-project")) return;
        if (e.target.id == "today"){
            document.getElementById("new-task").style.display = "none";
            Storage.updateToday();
        }
        else if (e.target.id == "this-week"){
            document.getElementById("new-task").style.display = "none";
            Storage.updateThisWeek();
        }
        else{
            document.getElementById("new-task").style.display = "block";
        }
        var activeProject = document.querySelector(".active");
        activeProject.classList.remove("active");
        this.classList.add("active");
        renderTasks();
    });
}


function createTrash(type, id){ 
    //creates deleted object
    const trashImg = document.createElement("img");
    trashImg.src = "images/trash.png";
    trashImg.alt = "trash";
    trashImg.className = "trash-" + type;
    trashImg.addEventListener("click", (e) => {
        e.target.parentNode.remove();
        if (type == "project"){
            
            Storage.deleteProject(id);
            if (e.target.parentNode.classList.contains("active")){
                e.target.parentNode.classList.remove("active");
                const inbox = document.getElementById("inbox")
                inbox.classList.add("active"); //temp fix activates inbox
            }   
        }
        if (type == "task"){
            const activeProject = document.querySelector(".active").getAttribute("data-project");
            Storage.deleteTask(activeProject, id);
        }
    });
    return trashImg;
}

//adds project html 

function projectForm(){

const projectForm = document.getElementById("new-project-form");

projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let projectID = (Date.now() + Math.random()).toString(36) //unique ID
    const projectName = document.getElementById("project-name-input").value;

    let projectContainer = document.getElementById("project-container"); 
    const projectDiv = createProject(projectName, projectID);
    Storage.addProject(new Project(projectName, projectID));
    projectContainer.append(projectDiv);
    let activeProject = document.querySelector(".active");
    activeProject.classList.remove("active");
    projectDiv.classList.add("active");
    document.getElementById("new-task").style.display = "block";
    renderTasks();

    //clears input after submit
    projectForm.reset();

});
}



function editTaskProjectField(element){

    element.addEventListener("dblclick", (e) => {
        e.target.contentEditable = "true";
        e.target.focus();
        e.target.addEventListener("keydown", editField);
        e.target.addEventListener("focusout", editField);
    });

}


function editField(e){
    if (e.key === "Escape" || e.type === "focusout" || e.key === "Enter"){
        this.contentEditable = "false";
        this.removeEventListener("focusout", editField);
        this.removeEventListener("keydown", editField);
        if (this.classList.contains("project")){
            editProjectName.call(this);

        }
        else{
            editTaskInfo.call(this);
        }
    }
}

function editProjectName(){
    let projectID = this.parentNode.getAttribute("data-project");
    let project = Storage.getTodoList().findProject(projectID);
    if (this.textContent !== project.name){
        Storage.updateProjectName(this.textContent, projectID);
    }
}


function editTaskInfo(){
    let taskID = this.parentNode.parentNode.getAttribute("data-task");
    let projectID = this.parentNode.parentNode.getAttribute("data-project");
    let task = Storage.getTodoList().findProject(projectID).findTask(taskID);
    if (this.textContent !== task.taskInfo){
        Storage.updateTaskInfo(projectID, taskID, this.textContent);
    }
}


function updateDateForm(){

    const dateValue = document.getElementById("date-form-picker");
    const dateText = document.querySelector(".date-form");

    dateValue.addEventListener("change", (e) => {
        dateText.textContent = e.target.value;
    });

}


//new project UI 

function newProjectBtn(){
    const newProjectDiv = document.getElementById("new-project");
    const newProjectForm = document.getElementById("new-project-form");
    const projectInput =  document.getElementById("project-name-input");

    document.addEventListener("click", (e) => {
        
        if (!newProjectForm.contains(e.target) && (newProjectForm.style.display == "flex")){
            newProjectForm.style.display = "none";
            newProjectDiv.style.display = "block";   
        }  
        else if (newProjectDiv.contains(e.target)) {
            e.target.style.display = "none";
            newProjectForm.style.display = "flex";
            projectInput.focus();
        }
        else{

            newProjectForm.style.display = "none";
            newProjectDiv.style.display = "block"; 

        }

    });
}


//task UI

function newTaskBtn(){
    const newTaskDiv = document.getElementById("new-task");
    const newTaskForm = document.getElementById("new-task-form");
    const taskInput =  document.getElementById("task-name-input");
    const taskSubmit = document.getElementById("task-submit");

    document.addEventListener("click", (e) => {
        if ((!newTaskForm.contains(e.target) && newTaskForm.style.display == "grid") || 
            taskSubmit.contains(e.target)){
            newTaskForm.style.display = "none";
            newTaskDiv.style.display = "block";  

        }
        else if (newTaskDiv.contains(e.target)) {
            newTaskDiv.style.display = "none";
            newTaskForm.style.display = "grid";
            taskInput.focus();
            updateDateForm();
        }

    });
}

function updatePriority(options, value){
    for (let i = 0; i < options.length; i++){
        if (options[i].value == value){
            options[i].selected = true;
        }
    }
}

function createPriority(projectID, taskID){
    const priority = document.createElement("select");
    priority.name = "priority";

    const optionNone =  document.createElement("option");
    optionNone.value = "none"; 
    optionNone.textContent = "none";

    const optionHigh =  document.createElement("option");
    optionHigh.value = "high"; 
    optionHigh.textContent = "high";

    const optionMedium =  document.createElement("option");
    optionMedium.value = "medium"; 
    optionMedium.textContent = "medium";

    const optionLow =  document.createElement("option");
    optionLow.value = "low"; 
    optionLow.textContent = "low";
    priority.append(optionNone, optionLow, optionMedium, optionHigh);
    priority.addEventListener("change", (e) => {
        Storage.updatePriority(projectID, taskID, e.target.value);

    });

    return priority;
}


function createTask(projectID, taskID, checkboxValue, taskInfoInput, taskDiv){
    
    const task = document.createElement("div");
    task.className = "task";
    
    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.className = "checkbox";
    inputCheck.name = "checkbox";

    if (checkboxValue) {
        inputCheck.checked = "true";
        taskDiv.classList.add("checked");}

    inputCheck.addEventListener("change", (e) => { 
        Storage.updateStatus(projectID, taskID, e.target.checked);
        let activeProject = document.querySelector(".active");

        if (activeProject.id == "today"){
            activeProject.click()
        }
        if (activeProject.id == "this-week"){
            activeProject.click()
        }
        let task = e.target.parentNode.parentNode; 
        if (!e.target.checked){
            task.classList.remove("checked"); 
        }
        else{
            task.classList.add("checked");   
            
        }
        renderTasks(); 

    
    });

    const taskInfo = document.createElement("p");
    taskInfo.className = "task-info";

    editTaskProjectField(taskInfo);

    taskInfo.textContent = taskInfoInput;
    task.append(inputCheck, taskInfo);
    return task;

}


function createDatePicker(projectID, taskID){
    const datePicker = document.createElement("input");
    datePicker.type = "date";
    datePicker.className = "datepicker";
    datePicker.value = new Date().toISOString().slice(0, 10);
    
    datePicker.addEventListener("change", (e) => {
        e.target.previousElementSibling.textContent = e.target.value;
        Storage.updateDate(projectID, taskID, e.target.value);
    });

    return datePicker;

}

function createDueDate(dateValue){
    const taskDue = document.createElement("div");
    taskDue.className = "due-date";
    taskDue.textContent = dateValue;
    return taskDue;

}


function taskForm(){

    const tasktForm = document.getElementById("new-task-form");

    tasktForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let taskID = (Date.now() + Math.random()).toString(36) //unique ID
        let priorityInput = document.getElementById("priority-form").value;
        let task_checked = document.getElementById("checkbox-form").checked;
        let taskInfo = document.getElementById("task-name-input").value;
        let dateValue = document.getElementById("date-form-picker").value;
        let projectID = document.querySelector(".active").getAttribute("data-project");

        const taskStorage = new Task(task_checked, taskInfo, priorityInput, dateValue, taskID, projectID);
        Storage.addTask(projectID, taskStorage);
        renderTasks();

        tasktForm.reset();
        setToday();

    });
}

function setToday(){
    let today = new Date(new Date().toLocaleString().slice(0, 9)).toISOString().slice(0, 10);
    const dateForm = document.getElementById("date-form");
    const dateFormPicker = document.getElementById("date-form-picker");
    dateFormPicker.value = today;
    dateForm.textContent = today;
}


export default function renderAll(){
    renderProjects();
    document.getElementById("inbox").classList.add("active");
    renderTasks();
    taskForm();
    projectForm()
    setToday();
    newProjectBtn();
    newTaskBtn();

}




