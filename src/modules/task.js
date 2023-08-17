export default class Task{

    constructor(task_checked, taskInfo, priority, date, taskID, projectid) { //create task
        this.task_checked = task_checked
        this.taskInfo = taskInfo
        this.priority = priority
        this.date = date
        this.taskID = taskID
        this.projectid = projectid
      }
      
      setTask(taskID){
        this.taskID = taskID
      }

      getTask(){
        return this.taskID
      }

      setDate(date){
        this.date = date
      }

      getDate(){
        return this.date
      }

      setPriority(priority){
        this.priority = priority
      }

      getPriority(){
        return this.priority
      }

      setTaskInfo(taskInfo){
        this.taskInfo = taskInfo
      }

      getTaskInfo(){
        return this.taskInfo
      }

      setChecked(task_checked){
        this.task_checked = task_checked
      }

      getChecked(){
        return this.task_checked
      }
  

}
