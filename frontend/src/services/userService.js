export default class UserService {
  constructor(startUrl) {
    this.startUrl = startUrl + "user";
  }

  getUser(id) {
    return fetch(this.startUrl + "/" + id, {
      method: "get",
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  /*security*/
  authenticate(user_object) {
    return fetch(this.startUrl
      + "/authentication?username="
      + user_object.username
      + "&password="
      + user_object.password
      + "&remember_me="
      + user_object.remember_me, {
      method: "post",

      headers: new Headers({
        "Content-Type": "application/json;charset=utf-8"
      })
    });
  }

  logout() {
    return fetch(this.startUrl + "/logout", {
      method: "get"
    });
  }

  changePassword(passData, id) {
    return fetch(this.startUrl + "/" + id + "/password", {
      method: "put",
      body: JSON.stringify(passData),
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }

  /*security*/

  sendFeedback(feedback) {
    return fetch(this.startUrl + "/feedback", {
      method: "post",
      body: JSON.stringify(feedback),
      headers: new Headers({
        "Content-type": "application/json"
      })
    });
  }

  sendQuestionnaire(questionnaire, id) {
    return fetch(this.startUrl + "/" + id + "/questionnaire", {
      method: "post",
      body: JSON.stringify(questionnaire),
      headers: new Headers({
        "Content-type": "application/json"
      })
    });
  }

  getQuestionnaire(id) {
    return fetch(this.startUrl + "/" + id + "/questionnaire", {
      method: "get"
    });
  }
}
