export default class RepresentationService {
  constructor(startUrl) {
    this.startUrl = startUrl;
  }

  getTruncatedMain() {
    return fetch(this.startUrl + "main", {
      method: "get",
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  getFullMain(id) {
    return fetch(this.startUrl + "full_main/" + id, {
      method: "get",
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
	    })
    });
  }

  restorePassword(email) {
    return fetch(this.startUrl + "password", {
      method: "put",
      body: email,
      headers: new Headers({
        "Content-type": "application/json;chartSet=UTF-8"
      })
    });
  }
}
