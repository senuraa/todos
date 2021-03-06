export class Constants {
  public static URL_SERVICE_ENDPOINT: string = 'http://54.169.167.51:1337/api/';
//  public static URL_SERVICE_ENDPOINT: string = 'http://localhost:1337/api/';
  //public static URL_SERVICE_ENDPOINT: string = 'http://192.168.1.13:1337/api/';
  public static URL_REGISTER: string = Constants.URL_SERVICE_ENDPOINT + 'accountsecurity/start';
  public static URL_VERIFY: string = Constants.URL_SERVICE_ENDPOINT + 'accountsecurity/verifyPhoneToken';
  public static URL_ADD_PLAYERID: string = Constants.URL_SERVICE_ENDPOINT+'users/addplayerid';
  public static URL_GET_PLAYERID:string = Constants.URL_SERVICE_ENDPOINT+'users/getUserDetails';
  public static URL_ADDTASK: string = Constants.URL_SERVICE_ENDPOINT + 'task/addTask';
  public static URL_UPCOMMINGTASK: string = Constants.URL_SERVICE_ENDPOINT + 'task/upcomingTasks';
  public static URL_TASKOFUSER: string = Constants.URL_SERVICE_ENDPOINT + 'task/tasksOfUser';
  public static URL_CHANGESTATUS: string = Constants.URL_SERVICE_ENDPOINT + 'task/changeTaskStatus';
  public static URL_SENDSMS: string = Constants.URL_SERVICE_ENDPOINT + 'users/sendSMS';
  public static URL_DELETETASK: string = Constants.URL_SERVICE_ENDPOINT + 'task/deleteTask';
  public static URL_UPDATETASK: string = Constants.URL_SERVICE_ENDPOINT + 'task/updateTask';
  public static URL_GET_ONE_TASK: string = Constants.URL_SERVICE_ENDPOINT + 'task/getOneTask';
}
