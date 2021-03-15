export default class AdminService {
  constructor(startUrl) {
    this.startUrl = startUrl + "administrator";
  }

/*user*/
  createUser(user) {
    return fetch(this.startUrl + "/user", {
      method: "post",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  updateUser(user) {
    return fetch(this.startUrl + "/user/" + user.id, {
      method: "put",
      body: JSON.stringify(user),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  findUser(searchRequest) {
    return fetch(this.startUrl + "/user/filter", {
      method: "post",
      body: JSON.stringify(searchRequest),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }

  deleteUser(id) {
    return fetch(this.startUrl + "/user/" + id, {
      method: "delete"
    });
  }
/*user*/
/*news*/
  createNews(singleNew) {
    return fetch(this.startUrl + "/news", {
      method: "post",
      body: JSON.stringify(singleNew),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  updateNews(singleNew) {
    return fetch(this.startUrl + "/news/" + singleNew.id, {
      method: "put",
      body: JSON.stringify(singleNew),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  deleteNews(id){
    return fetch(this.startUrl + "/news/" + id, {
      method: "delete"
    });
  }
  /*news*/
  /*files*/
  createFile(file) {
    return fetch(this.startUrl + "/file", {
      method: "post",
      body: JSON.stringify(file),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }

  updateFile(file) {
    return fetch(this.startUrl + "/file/" + file.id, {
      method: "put",
      body: JSON.stringify(file),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }

  deleteFile(id){
    return fetch(this.startUrl + "/file/" + id, {
      method: "delete"
    });
  }
  /*files*/
  /*Lists*/
  getListOfUsers(){
    return fetch(this.startUrl + "/users_list", {
      method: "get"
    });
  }

  getListOfNews(){
    return fetch(this.startUrl + "/news_list", {
      method: "get"
    });
  }

  getListOfFiles(){
    return fetch(this.startUrl + "/files_list", {
      method: "get"
    });
  }
  getCategoriesList(){
    return fetch(this.startUrl + "/category_list", {
      method: "get"
    });
  }
  deleteSubCategory(categoryNames){
    return fetch(this.startUrl + "/sub_category", {
      method: "delete",
      body: JSON.stringify(categoryNames),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }
  updateCategory(catName, catId) {
    return fetch(this.startUrl + "/category/" + catId, {
      method: "put",
      body: JSON.stringify(catName),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }
  deleteCategory(categoryName){
    return fetch(this.startUrl + "/category", {
      method: "delete",
      body: JSON.stringify(categoryName),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }
  /*Lists*/
  /*Update counts by file*/
  updateCounts(selectedCountFile) {
    return fetch(this.startUrl + "/finance_data", {
      method: "put",
      body: selectedCountFile
    });
  }

  updateDatabase(selectedDatabaseFile) {
    return fetch(this.startUrl + "/data_base", {
      method: "put",
      body: selectedDatabaseFile
    });
  }
  /*Update counts by file*/
  /*Logs*/
  getLogs(numberOfLogs) {
    return fetch(this.startUrl + "/logs/" + numberOfLogs, {
      method: "get"
    });
  }
  /*Logs*/
  /*Reports*/
  getFullReport() {
    return fetch(this.startUrl + "/full_report", {
      method: "get"
    });
  }

  getChildrenReport() {
    return fetch(this.startUrl + "/children_report", {
      method: "get"
    });
  }
  /*Reports*/
}
