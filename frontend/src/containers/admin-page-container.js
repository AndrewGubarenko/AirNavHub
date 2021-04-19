import React from 'react';
import AdminPage from '../components/admin-page';
import {adminService} from '../app-context/context';
import {setToMainDisplayMode} from '../reducers/actions/OnMainPageAction';
import {setSpinnerVisibility} from '../reducers/actions/spinnerAction';
import {connect} from 'react-redux';
import {scroller} from 'react-scroll';
//import {cipherService} from '../app-context/context';

/*let CryptoJS = require("crypto-js");*/

class AdminPageContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      user: {
        id: "",
        username: "",
        firstName: "",
        lastName: "",
        count: "",
        gender: "MALE",
        roles: ["USER"]
      },
      news: {
        id: "",
        title: "",
        text: ""
      },
      file: {
        id: "",
        name: "",
        path: "",
        category: {
          name: ""
        },
        subCategory: ""
      },
      category: {
        id: "",
        name: "",
        subCategories: []
      },
      newsList: [],
      filesList: [],
      selection: [],
      logs: "",
      amountOfLogs: 0,
      selectedCountFile: null,
      selectedDatabaseFile: null,
      userBtnContainerDisplay: "none",
      newsBtnContainerDisplay: "none",
      fileBtnContainerDisplay: "none",
      userControlPanelDisplay: "none",
      userFindPanelDisplay: "none",
      newsControlPanelDisplay: "none",
      filesControlPanelDisplay: "none",
      userUpdateControlPanelDisplay: "none",
      DeleteUserButtonDisplay: "none",
      DeleteUserYesNoContainerDisplay: "none",
      newsUpdateControlPanelDisplay: "none",
      DeleteNewsButtonDisplay: "none",
      DeleteNewsYesNoContainerDisplay: "none",
      filesUpdateControlPanelDisplay: "none",
      DeleteFileButtonDisplay: "none",
      DeleteFileYesNoContainerDisplay: "none",
      DeleteCategoryButtonDisplay: "none",
      DeleteCategoryYesNoContainerDisplay: "none",
      XMLCountUpdateControlPanelDisplay: "none",
      XMLDatabaseUpdateControlPanelDisplay: "none",
      categoriesUpdateControlPanelDisplay: "none",
      logsControlPanelDisplay: "none",
      reportsControlPanelDisplay: "none",
      selected: "MALE",
      checked: false,
      borderColorUsername: "darkgrey",
      borderColorFirstName: "darkgrey",
      borderColorLastName: "darkgrey",
      borderColorCount: "darkgrey",
      borderColorTitle: "darkgrey",
      borderColorText: "darkgrey",
      borderColorName: "darkgrey",
      borderColorPath: "darkgrey",
      borderColorCategory: "darkgrey",
      borderColorSubCategory: "darkgrey",
      borderColorCatName: "darkgrey",
      fileInputColor: "red",
      terminalData: ""
    };
  }

  componentDidMount() {
    this.setSelection();
    this.props.dispatch(setToMainDisplayMode("block"));
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  componentWillUnmount() {
    this.clearState();
  }

  clearState = () => {
      document.getElementById('accounts_file_input_key').value = '';
      document.getElementById('db_file_input_key').value = '';
      this.setState({username: "",
                      user: {
                        id: "",
                        username: "",
                        firstName: "",
                        lastName: "",
                        count: "",
                        gender: "MALE",
                        roles: ["USER"]
                      },
                      news: {
                        id: "",
                        title: "",
                        text: ""
                      },
                      file: {
                        id: "",
                        name: "",
                        path: "",
                        category: {
                          name: ""
                        },
                        subCategory: ""
                      },
                      category: {
                        id: "",
                        name: "",
                        subCategories: []
                      },
                      newsList: [],
                      filesList: [],
                      logs: "",
                      amountOfLogs: 0,
                      selectedCountFile: null,
                      selectedDatabaseFile: null,
                      userBtnContainerDisplay: "none",
                      newsBtnContainerDisplay: "none",
                      fileBtnContainerDisplay: "none",
                      userControlPanelDisplay: "none",
                      userFindPanelDisplay: "none",
                      newsControlPanelDisplay: "none",
                      filesControlPanelDisplay: "none",
                      userUpdateControlPanelDisplay: "none",
                      DeleteUserButtonDisplay: "none",
                      DeleteUserYesNoContainerDisplay: "none",
                      newsUpdateControlPanelDisplay: "none",
                      DeleteNewsButtonDisplay: "none",
                      DeleteNewsYesNoContainerDisplay: "none",
                      filesUpdateControlPanelDisplay: "none",
                      DeleteFileButtonDisplay: "none",
                      DeleteFileYesNoContainerDisplay: "none",
                      DeleteCategoryButtonDisplay: "none",
                      DeleteCategoryYesNoContainerDisplay: "none",
                      XMLCountUpdateControlPanelDisplay: "none",
                      XMLDatabaseUpdateControlPanelDisplay: "none",
                      logsControlPanelDisplay: "none",
                      categoriesUpdateControlPanelDisplay: "none",
                      reportsControlPanelDisplay: "none",
                      selected: "MALE",
                      checked: false,
                      borderColorUsername: "darkgrey",
                      borderColorFirstName: "darkgrey",
                      borderColorLastName: "darkgrey",
                      borderColorCount: "darkgrey",
                      borderColorTitle: "darkgrey",
                      borderColorText: "darkgrey",
                      borderColorName: "darkgrey",
                      borderColorPath: "darkgrey",
                      borderColorCategory: "darkgrey",
                      borderColorSubCategory: "darkgrey",
                      borderColorCatName: "darkgrey",
                      fileInputColor: "red",
                      terminalData: ""
                    });
  }

/*User functions*/
  onChangeUserUsername = (event) => {
    this.setState({borderColorUsername: "darkgrey"});
    const user = this.state.user;
    user.username = event.target.value;
    this.setState({user: user});
  }
  onChangeUserFirstName = (event) => {
    this.setState({borderColorFirstName: "darkgrey"});
    const user = this.state.user;
    user.firstName = event.target.value;
    this.setState({user: user});
  }
  onChangeUserLastName = (event) => {
    this.setState({borderColorLastName: "darkgrey"});
    const user = this.state.user;
    user.lastName = event.target.value;
    this.setState({user: user});
  }
  onChangeUserCount = (event) => {
    this.setState({borderColorCount: "darkgrey"});
    const user = this.state.user;
    user.count = event.target.value;
    this.setState({user: user});
  }
  onChangeUserGender = (event) => {
    const user = this.state.user;
    user.gender = event.target.value;
    this.setState({selected: event.target.value})
    this.setState({user: user});
  }
  onChangeUserRole = () => {
    const user = this.state.user;
    if (!this.state.checked) {
      this.setState({checked: true})
      user.roles = ["USER", "ADMINISTRATOR"];
      this.setState({user: user});
    } else {
      this.setState({checked: false})
      user.roles = ["USER"];
      this.setState({user: user});
    }
  }

  onClickAddUser = () => {
    this.setState({userBtnContainerDisplay: "none"});
    this.setState({userControlPanelDisplay: "block"});
  }
  onClickFindUser = () => {
    this.setState({userBtnContainerDisplay: "none"});
    this.setState({userFindPanelDisplay: "block"});
  }
  onClickCreateUser = async () => {
    if(this.state.user.username === "") {
      this.setState({borderColorUsername: "red"});
    } else if(this.state.user.firstName === "") {
      this.setState({borderColorFirstName: "red"});
    } else if(this.state.user.lastName === "") {
      this.setState({borderColorLastName: "red"});
    } else if(Number.parseFloat(this.state.user.count) !== 0 && !Number.parseFloat(this.state.user.count)) {
      this.setState({borderColorCount: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      let user = this.state.user;
      /*let encryptedUsername = this.cipherThis(user.username);
      user.username = encryptedUsername;*/
      await adminService.createUser(user).then(response => {
        if(response.ok) {
          return response.json().then(data => {
            /*let username = this.decipherThis(data.username);
            data.username = username;*/
            this.setState({user: data})
            this.setState({userControlPanelDisplay: "none"});
            this.setState({userUpdateControlPanelDisplay: "block"});
            this.setState({DeleteUserButtonDisplay: "block"});
            this.setState({terminalData: JSON.stringify(data)})
            this.setState({selected: data.gender});
            if(data.roles.includes("ADMINISTRATOR")) {
              this.setState({checked: true});
            }
          })
        } else {
          response.text().then(error => this.setState({terminalData: error}));
        }
      });
    }
    this.props.dispatch(setSpinnerVisibility("none"));
  }
  onClickUpdateUser = async () => {
    if(this.state.user.firstName === "") {
      this.setState({borderColorFirstName: "red"});
    } else if(this.state.user.lastName === "") {
      this.setState({borderColorLastName: "red"});
    } else if(Number.parseFloat(this.state.user.count) !== 0 && !Number.parseFloat(this.state.user.count)) {
      this.setState({borderColorCount: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      let user = this.state.user;
      /*let username = this.cipherThis(this.state.user.username);
      user.username = username;*/
      await adminService.updateUser(user).then(response => {
        if(response.ok) {
          return response.json().then(data => {
            /*let username = this.decipherThis(data.username);
            data.username = username;*/
            this.setState({selected: data.gender});
            if(data.roles.includes("ADMINISTRATOR")) {
              this.setState({checked: true});
            }
            this.setState({terminalData: JSON.stringify(data)})
            this.setState({user: data});
          });
        } else {
          response.text().then(error => this.setState({terminalData: error}));
        }
      });
    }
    this.props.dispatch(setSpinnerVisibility("none"));
  }
  onClickGetUser = async () => {
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    let searchRequest = {username: this.state.user.username,
                         firstName: this.state.user.firstName,
                         lastName: this.state.user.lastName}
    await adminService.findUser(searchRequest).then(response => {
      if(response.ok) {
        return response.json().then(data => {
          this.setState({userFindPanelDisplay: "none"})
          this.createUsersListForPrint(data);
        });
      } else {
        response.text().then(error => this.setState({terminalData: error}));
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  onClickDeleteUser = () => {
    this.setState({DeleteUserButtonDisplay: "none"})
    this.setState({DeleteUserYesNoContainerDisplay: "block"})
  }
  onClickDeleteYes = async () => {
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.deleteUser(this.state.user.id).then(response => {
      return response.text()
    }).then(data => {
      this.setState({terminalData: data});
    }).then(() => {
      this.setState({userUpdateControlPanelDisplay: "none"});
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }
  onClickDeleteNo = () => {
    this.setState({DeleteUserButtonDisplay: "block"})
    this.setState({DeleteUserYesNoContainerDisplay: "none"})
  }
/*User functions*/

/*News functions*/
  onChangeNewsTitle = (event) => {
    this.setState({borderColorTitle: "darkgrey"});
    const news = this.state.news;
    news.title = event.target.value;
    this.setState({news: news});
  }
  onChangeNewsText = (event) => {
    this.setState({borderColorText: "darkgrey"});
    const news = this.state.news;
    news.text = event.target.value;
    this.setState({news: news});
  }
  onClickAddNews = () => {
    this.setState({newsBtnContainerDisplay: "none"});
    this.setState({newsControlPanelDisplay: "block"});
  }
  onClickCreateNews = async () => {
    if(this.state.news.title === "") {
      this.setState({borderColorTitle: "red"});
    } else if(this.state.news.text === "") {
      this.setState({borderColorText: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      await adminService.createNews(this.state.news).then(response => {
        if(response.ok) {
          return response.json().then(data => {
            this.setState({news: data})
            this.setState({newsControlPanelDisplay: "none"});
            this.setState({newsUpdateControlPanelDisplay: "block"});
            this.setState({DeleteNewsButtonDisplay: "block"});
            this.setState({terminalData: JSON.stringify(data)});
            });
        } else {
          return response.text().then(error => {this.setState({terminalData: error})});
        }
      });
    }
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  onClickChangeNews = async () => {
    if(this.state.news.title === "") {
      this.setState({borderColorTitle: "red"});
    } else if(this.state.news.text === "") {
      this.setState({borderColorText: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      await adminService.updateNews(this.state.news).then(response => {
        if(response.ok) {
          return response.json().then(data => {
          this.setState({news: data});
          this.setState({terminalData: JSON.stringify(data)});
        });
        } else {
          return response.text().then(error => {this.setState({terminalData: error})});
        }
      });
    }
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  onClickDeleteNews = () => {
    this.setState({DeleteNewsButtonDisplay: "none"});
    this.setState({DeleteNewsYesNoContainerDisplay: "block"});
  }
  onClickNewsDeleteYes = async () => {
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.deleteNews(this.state.news.id).then(response => {
      return response.text()
    }).then(data => {
      this.setState({terminalData: data});
    }).then(() => {
      this.setState({newsUpdateControlPanelDisplay: "none"});
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }
  onClickNewsDeleteNo = () => {
    this.setState({DeleteNewsButtonDisplay: "block"});
    this.setState({DeleteNewsYesNoContainerDisplay: "none"});
  }
/*News functions*/
/*Files functions*/
  onChangeFileName = (event) => {
    this.setState({borderColorName: "darkgrey"});
    const file = this.state.file;
    file.name = event.target.value;
    this.setState({file: file});
  }
  onChangeFilePath = (event) => {
    this.setState({borderColorPath: "darkgrey"});
    const file = this.state.file;
    file.path = event.target.value;
    this.setState({file: file});
  }
  onChangeFileCategory = (event) => {
    this.setState({borderColorCategory: "darkgrey"});
    const file = this.state.file;
    const category = file.category;
    category.name = event.target.value;
    this.setState({file: file});
  }
  onChangeFileSubCategory = (event) => {
    this.setState({borderColorSubCategory: "darkgrey"});
    const file = this.state.file;
    file.subCategory = event.target.value;
    this.setState({file: file});
  }

  onChangeFileCategoryAndSubcategory = (event) => {
    let index = event.target.selectedIndex;
    let element = event.target[index];
    let categoryName =  element.getAttribute('category');
    const file = this.state.file;
    let category = {name: categoryName};
    file.category = category;
    file.subCategory = event.target.value;
    this.setState({file: file});
  }

  onChangeCatName = (event) => {
    this.setState({borderColorCatName: "darkgrey"});
    const category = this.state.category;
    category.name = event.target.value;
    this.setState({category: category});
  }

  setSelection = () => {
    adminService.getCategoriesList().then(response => {
      response.json().then(categories => {
        let selection = categories.map(category => {
          let subCats = category.subCategories.map(subCategory => {
             return(
              <option key={subCategory}
                      category={category.name}
                      value={subCategory}>{subCategory}</option>
              )
            })
          return (
            <optgroup key={category.id} label={category.name}>
              {subCats}
            </optgroup>
          )
        });
        let selectionContainer = <select id="select" className="terminal_input_select" onChange={this.onChangeFileCategoryAndSubcategory}>
          <option category="" value=""/>
          {selection}
        </select>
        this.setState({selection: selectionContainer});
      });
    });
  }

  onClickGetCategories = async () => {
    this.clearState();
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.getCategoriesList().then(response => {
      if(response.ok) {
          return response.json().then(data => {
          this.createCategoriesListForPrint(data);
        });
      } else {
        return response.text().then(error => {this.setState({terminalData: error})});
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  getSubCats = () => {
    let subCats = this.state.category.subCategories;
    return(
      subCats.map(subCat => {
        let categoryNames = {
          categoryName: this.state.category.name,
          subCategoryName: subCat
        };
        return(
          <div key={subCat}>
            <span style={{color: "#181818"}}> {subCat} </span> <button className="admin_screen_btn" onClick={() => {
              adminService.deleteSubCategory(categoryNames).then((response) => {
                if(response.ok) {
                  const category = this.state.category;
                  const index = category.subCategories.indexOf(subCat);
                  if (index > -1) {
                    category.subCategories.splice(index, 1);
                  }
                  this.setState({category: category});
                  this.setSelection();
                  this.getSubCats();
                  response.text().then(error => {this.setState({terminalData: error})});
                } else {
                  return response.text().then(error => {this.setState({terminalData: error})});
                }
              })
            }} style={{color: "red", margin: "0"}}>Del subCat</button>
          </div>
        );
      })
    )
  }

  onClickUpdateCat = async () => {
    if(this.state.category.name.trim() === "") {
      this.setState({borderColorCatName: "red"});
    } else {
      let category = this.state.category;
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      await adminService.updateCategory(category.name, category.id).then(response => {
        if(response.ok) {
          return response.json().then(category => {
            this.setState({category: category});
            this.setState({terminalData: JSON.stringify(category)});
            this.setSelection();
          });
        } else {
          return response.text().then(error => {this.setState({terminalData: error})});
        }
      });
    }
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  onClickDeleteCategory = () => {
    this.setState({DeleteCategoryButtonDisplay: "none"});
    this.setState({DeleteCategoryYesNoContainerDisplay: "block"});
  }
  onClickCategoryDeleteYes = async () => {
    this.clearState();
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.deleteCategory(this.state.category.name).then(response => {
      if(response.ok) {
        return response.text().then(response => {this.setState({terminalData: response})});
      } else {
        return response.text().then(error => {this.setState({terminalData: error})});
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }
  onClickCategoryDeleteNo = () => {
    this.setState({DeleteCategoryButtonDisplay: "block"});
    this.setState({DeleteCategoryYesNoContainerDisplay: "none"});
  }

  onClickAddFile = () => {
    this.setState({fileBtnContainerDisplay: "none"});
    this.setState({filesControlPanelDisplay: "block"});
  }

  onClickCreateFile = async () => {
    if(this.state.file.name.trim() === "") {
      this.setState({borderColorName: "red"});
    } else if(this.state.file.path.trim() === "") {
      this.setState({borderColorPath: "red"});
    } else if(this.state.file.category.name.trim() === "") {
      this.setState({borderColorCategory: "red"});
    } else if(this.state.file.subCategory.trim() === "") {
      this.setState({borderColorSubCategory: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      await adminService.createFile(this.state.file).then(response => {
        if(response.ok) {
          return response.json().then(data => {
            this.setState({file: data});
            this.setState({filesControlPanelDisplay: "none"});
            this.setState({filesUpdateControlPanelDisplay: "block"});
            this.setState({DeleteFileButtonDisplay: "block"});
            this.setState({terminalData: JSON.stringify(data)});
            this.setSelection();
          });
        } else {
          return response.text().then(error => {this.setState({terminalData: error})});
        }
      });
    }
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  onClickChangeFile = async () => {
    if(this.state.file.name.trim() === "") {
      this.setState({borderColorName: "red"});
    } else if(this.state.file.path.trim() === "") {
      this.setState({borderColorPath: "red"});
    } else if(this.state.file.category.name.trim() === "") {
      this.setState({borderColorCategory: "red"});
    } else if(this.state.file.subCategory.trim() === "") {
      this.setState({borderColorSubCategory: "red"});
    } else {
      this.props.dispatch(setSpinnerVisibility("inline-block"));
      await adminService.updateFile(this.state.file).then(response => {
        if(response.ok) {
          return response.json().then(data => {
            this.setState({file: data});
            this.setState({terminalData: JSON.stringify(data)});
            this.setSelection();
          });
        } else {
          return response.text().then(error => {this.setState({terminalData: error})});
        }
      });
    }
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  onClickDeleteFile = () => {
    this.setState({DeleteFileButtonDisplay: "none"});
    this.setState({DeleteFileYesNoContainerDisplay: "block"});
  }
  onClickFileDeleteYes = async () => {
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.deleteFile(this.state.file.id).then(response => {
      return response.text();
    }).then(data => {
      this.setState({terminalData: data});
      this.setSelection();
    }).then(() => {
      this.setState({filesUpdateControlPanelDisplay: "none"});
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }
  onClickFileDeleteNo = () => {
    this.setState({DeleteFileButtonDisplay: "block"});
    this.setState({DeleteFileYesNoContainerDisplay: "none"});
  }
  /*Files functions*/
  /*Lists functions*/
  createUsersListForPrint = (list) => {
    let terminalData;
    if (Array.isArray(list) && list.length) {
      let count = 0;
      terminalData = (
          <div>
              {
                list.map(item => {
                  /*let decryptedUsername = this.decipherThis(item.username);
                  item.username = decryptedUsername;*/
                  return(
                    <div key={item.id} className="admin_result_list_item" style={{cursor: "pointer"}} onClick={async() => {
                        await this.setState({user: item});
                        this.setState({selected: item.gender});
                        if(item.roles.includes("ADMINISTRATOR")) {
                          this.setState({checked: true});
                        }
                        this.setState({userUpdateControlPanelDisplay: "block"});
                        this.setState({DeleteUserButtonDisplay: "block"});
                        scroller.scrollTo("interactive_screen", {
                          spy: true,
                          smooth: true,
                          offset:-300,
                          duration: 500
                        });
                      }}>
                      <pre>{++count}) {JSON.stringify(item)}</pre>
                    </div>
                  );
                })
              }
          </div>
      );
    } else {
      terminalData = "No users found";
    }
    this.setState({terminalData: terminalData});
  }

  createNewsListForPrint = (list) => {
    let terminalData;
    if (Array.isArray(list) && list.length) {
      let count = 0;
      terminalData = (
          <div>
              {
                list.map(item => {
                  return(
                    <div key={item.id} className="admin_result_list_item" style={{cursor: "pointer"}} onClick={async() => {
                        await this.setState({news: item});
                        this.setState({newsUpdateControlPanelDisplay: "block"});
                        this.setState({DeleteNewsButtonDisplay: "block"});
                        scroller.scrollTo("interactive_screen", {
                          spy: true,
                          smooth: true,
                          offset:-300,
                          duration: 500
                        });
                      }}>
                      <pre>{++count}) {JSON.stringify(item)}</pre>
                    </div>
                  );
                })
              }
          </div>
      );
    } else {
      terminalData = "No news found";
    }
    this.setState({terminalData: terminalData});
  }

  createFilesListForPrint = (list) => {
    let terminalData;
    if (Array.isArray(list) && list.length) {
      let count = 0;
      terminalData = (
          <div>
              {
                list.map(item => {
                  return(
                    <div key={item.id} className="admin_result_list_item" style={{cursor: "pointer"}} onClick={async() => {
                        await this.setState({file: item});
                        this.setState({filesUpdateControlPanelDisplay: "block"});
                        this.setState({DeleteFileButtonDisplay: "block"});
                        scroller.scrollTo("interactive_screen", {
                          spy: true,
                          smooth: true,
                          offset:-300,
                          duration: 500
                        });
                      }}>
                      <pre>{++count}) {JSON.stringify(item)}</pre>
                    </div>
                  );
                })
              }
          </div>
      );
    } else {
      terminalData = "No files found";
    }
    this.setState({terminalData: terminalData});
  }

  createCategoriesListForPrint = (list) => {
    let terminalData;
    if (Array.isArray(list) && list.length) {
      let count = 0;
      terminalData = (
          <div>
              {
                list.map(item => {
                  return(
                    <div key={item.id} className="admin_result_list_item" style={{cursor: "pointer"}} onClick={async() => {
                        await this.setState({category: item});
                        this.setState({categoriesUpdateControlPanelDisplay: "block"});
                        this.setState({DeleteCategoryButtonDisplay: "block"});
                        scroller.scrollTo("interactive_screen", {
                          spy: true,
                          smooth: true,
                          offset:-300,
                          duration: 500
                        });
                      }}>
                      <pre>{++count}) {JSON.stringify(item)}</pre>
                    </div>
                  );
                })
              }
          </div>
      );
    } else {
      terminalData = "No files found";
    }
    this.setState({terminalData: terminalData});
  }

  createLogsListForPrint = (list) => {
    let terminalData;
    if (Array.isArray(list) && list.length) {
      let count = 0;
      terminalData = (
          <div>
              {
                list.map(item => {
                  let log = JSON.stringify(item);
                  let color;
                  if (log.indexOf("INFO") !== -1) {
                    color = "green";
                  } else {
                    color = "red";
                  }
                  return(
                    <div key={count} className="admin_result_list_item">
                      <pre style={{color: color}}>{++count}) {log}</pre>
                    </div>
                  );
                })
              }
          </div>
      );
    } else {
      terminalData = "No logs";
    }
    this.setState({terminalData: terminalData});
  }
  /*Lists functions*/
  /*Menu functions*/
  onClickUser = () => {
    this.clearState();
    this.setState({userBtnContainerDisplay: "block"});
  }
  onClickNews = () => {
    this.clearState();
    this.setState({newsBtnContainerDisplay: "block"});
  }
  onClickFiles = () => {
    this.clearState();
    this.setState({fileBtnContainerDisplay: "block"});
  }
  onClickListOfUsers = async () => {
    this.clearState();
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.getListOfUsers().then(response => {
      if(response.ok) {
        return response.json().then(data => {
          this.createUsersListForPrint(data);
        });
      } else {
        return response.text().then(error => {this.setState({terminalData: error})});
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }
  onClickListOfNews = async () => {
    this.clearState();
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.getListOfNews().then(response => {
      if(response.ok) {
        return response.json().then(data => {
          this.createNewsListForPrint(data);
        });
      } else {
        return response.text().then(error => {this.setState({terminalData: error})});
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }
  onClickListOfFiles = async () => {
    this.clearState();
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.getListOfFiles().then(response => {
      if(response.ok) {
          return response.json().then(data => {
          this.createFilesListForPrint(data);
        });
      } else {
        return response.text().then(error => {this.setState({terminalData: error})});
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  onChangeAmount = (event) => {
    this.setState({amountOfLogs: event.target.value});
  }
  onClickGetAmountOfLogs = async () => {
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.getLogs(this.state.amountOfLogs).then(response => {
      if(response.ok) {
          return response.json().then(data => {
          this.createLogsListForPrint(data);
        }).then(() => {scroller.scrollTo("footer", {
                                                      spy: true,
                                                      smooth: true,
                                                      offset:-300,
                                                      duration: 500
                                                    });});
      } else {
        return response.text().then(error => {this.setState({terminalData: error})});
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }
  onClickGetLogs = () => {
    this.clearState();
    this.setState({logsControlPanelDisplay: "block"});
  }
/*Menu functions*/
/*Files upload functions*/
  onClickUpdateAccounts = () => {
    this.clearState();
    this.setState({XMLCountUpdateControlPanelDisplay: "block"});
  }
  onClickUpdateDataBase = () => {
    this.clearState();
    this.setState({XMLDatabaseUpdateControlPanelDisplay: "block"});
  }
  onChangeUpdateCountFile = async (event) => {
    await this.setState({
      selectedCountFile: event.target.files[0]
    })
    if(this.state.selectedCountFile !== null) {
      this.setState({fileInputColor: "#09173f"});
    }
    if(this.state.selectedCountFile === undefined || this.state.selectedCountFile === null) {
      this.setState({fileInputColor: "red"});
    }
  }
  onClickUploadCountFile = async () => {
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.updateCounts(this.state.selectedCountFile).then(response => {
      if(response.ok) {
        let count = 0;
        return response.json().then(array => {
        return array.map(item => {
          let color;
          if (item.indexOf("INFO") !== -1) {
            color = "green";
          } else {
            color = "red";
          }
          return(<pre key={count} style={{color: color}}>{++count + ") " + item}</pre>);
          })
        }).then(result => {
          this.setState({terminalData: result});
        });
      } else {
        return response.text().then(message => {
          this.setState({terminalData: message});
        });
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  onChangeUpdateDatabaseFile = async (event) => {
    await this.setState({
      selectedDatabaseFile: event.target.files[0]
    })
    if(this.state.selectedDatabaseFile !== null) {
      this.setState({fileInputColor: "#09173f"});
    }
    if(this.state.selectedDatabaseFile === undefined || this.state.selectedDatabaseFile === null) {
      this.setState({fileInputColor: "red"});
    }
  }
  onClickUploadDatabaseFile = async () => {
    this.setState({XMLDatabaseUpdateControlPanelDisplay: "none"});
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.updateDatabase(this.state.selectedDatabaseFile).then(response => {
      if(response.ok) {
        return response.json().then(data => {
          this.createUsersListForPrint(data);
        });
      } else {
        return response.text().then(message => {
          this.setState({terminalData: message});
        });
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }

/*Files upload functions*/
/*Reports functions*/
  onClickReports = () => {
    this.clearState();
    this.setState({reportsControlPanelDisplay: "block"});
  }

  onClickGetFullReport = async () => {
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.getFullReport().then(response => {
      if(response.ok) {
        response.text().then(message => {
          let element = document.createElement('a');
          element.setAttribute('href', 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + encodeURIComponent(message));
          element.setAttribute('download', "full_report.xlsx");

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);

        });
      } else {
        response.text().then(message => {
          this.setState({terminalData: message});
        });
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }

  onClickGetChildrenReport = async () => {
    this.props.dispatch(setSpinnerVisibility("inline-block"));
    await adminService.getChildrenReport().then(response => {
      if(response.ok) {
        response.text().then(message => {
          let element = document.createElement('a');
          element.setAttribute('href', 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + encodeURIComponent(message));
          element.setAttribute('download', "children_report.xlsx");

          element.style.display = 'none';
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);

        });
      } else {
        response.text().then(message => {
          this.setState({terminalData: message});
        });
      }
    });
    this.props.dispatch(setSpinnerVisibility("none"));
  }
/*Reports functions*/
  /*cipherThis = (text) => {
    let iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    let salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    if(text) {
      let ciphertext = cipherService.encrypt(salt, iv, text);

      let aesString = (iv + "::" + salt + "::" + ciphertext);
      let encryptedString = btoa(aesString);
      return encryptedString;
    } else {
      return text;
    }
  }*/

  /*decipherThis = (encryptedText) => {
    if(encryptedText) {
      let decodedText = atob(encryptedText);
      let aesString = decodedText.split("::");
      let ciphertext = aesString[2];
      let decryptedText = cipherService.decrypt(aesString[1], aesString[0], ciphertext);
      return decryptedText;
    } else {
      return encryptedText;
    }
  }*/

  render() {
    return(
      <AdminPage
        user={this.state.user}
        news={this.state.news}
        file={this.state.file}
        category={this.state.category}
        subCats={this.getSubCats()}
        selected={this.state.selected}
        checked={this.state.checked}
        amountOfLogs={this.state.amountOfLogs}
        selection={this.state.selection}

        userBtnContainerDisplay={this.state.userBtnContainerDisplay}
        newsBtnContainerDisplay={this.state.newsBtnContainerDisplay}
        fileBtnContainerDisplay={this.state.fileBtnContainerDisplay}
        userControlPanelDisplay={this.state.userControlPanelDisplay}
        userFindPanelDisplay={this.state.userFindPanelDisplay}
        newsControlPanelDisplay={this.state.newsControlPanelDisplay}
        filesControlPanelDisplay={this.state.filesControlPanelDisplay}
        userUpdateControlPanelDisplay={this.state.userUpdateControlPanelDisplay}
        DeleteUserButtonDisplay={this.state.DeleteUserButtonDisplay}
        DeleteUserYesNoContainerDisplay={this.state.DeleteUserYesNoContainerDisplay}
        newsUpdateControlPanelDisplay={this.state.newsUpdateControlPanelDisplay}
        DeleteNewsButtonDisplay={this.state.DeleteNewsButtonDisplay}
        DeleteNewsYesNoContainerDisplay={this.state.DeleteNewsYesNoContainerDisplay}
        filesUpdateControlPanelDisplay={this.state.filesUpdateControlPanelDisplay}
        DeleteFileButtonDisplay={this.state.DeleteFileButtonDisplay}
        DeleteFileYesNoContainerDisplay={this.state.DeleteFileYesNoContainerDisplay}
        DeleteCategoryButtonDisplay={this.state.DeleteCategoryButtonDisplay}
        DeleteCategoryYesNoContainerDisplay={this.state.DeleteCategoryYesNoContainerDisplay}
        logsControlPanelDisplay={this.state.logsControlPanelDisplay}
        categoriesUpdateControlPanelDisplay={this.state.categoriesUpdateControlPanelDisplay}
        reportsControlPanelDisplay={this.state.reportsControlPanelDisplay}

        borderColorUsername={this.state.borderColorUsername}
        borderColorFirstName={this.state.borderColorFirstName}
        borderColorLastName={this.state.borderColorLastName}
        borderColorCount={this.state.borderColorCount}
        borderColorTitle={this.state.borderColorTitle}
        borderColorText={this.state.borderColorText}
        borderColorName={this.state.borderColorName}
        borderColorPath={this.state.borderColorPath}
        borderColorCategory={this.state.borderColorCategory}
        borderColorSubCategory={this.state.borderColorSubCategory}
        borderColorCatName={this.state.borderColorCatName}

        onClickUser={this.onClickUser}
        onClickNews={this.onClickNews}
        onClickFiles={this.onClickFiles}
        onClickListOfUsers={this.onClickListOfUsers}
        onClickListOfNews={this.onClickListOfNews}
        onClickListOfFiles={this.onClickListOfFiles}
        onClickGetLogs={this.onClickGetLogs}

        onClickAddUser={this.onClickAddUser}
        onClickFindUser={this.onClickFindUser}
        onClickUpdateUser={this.onClickUpdateUser}
        onClickGetUser={this.onClickGetUser}
        onClickCreateUser={this.onClickCreateUser}
        onChangeUserUsername={this.onChangeUserUsername}
        onChangeUserFirstName={this.onChangeUserFirstName}
        onChangeUserLastName={this.onChangeUserLastName}
        onChangeUserCount={this.onChangeUserCount}
        onChangeUserGender={this.onChangeUserGender}
        onChangeUserRole={this.onChangeUserRole}
        onClickDeleteUser={this.onClickDeleteUser}
        onClickDeleteYes={this.onClickDeleteYes}
        onClickDeleteNo={this.onClickDeleteNo}

        onClickAddNews={this.onClickAddNews}
        onClickCreateNews={this.onClickCreateNews}
        onClickChangeNews={this.onClickChangeNews}
        onClickDeleteNews={this.onClickDeleteNews}
        onClickNewsDeleteYes={this.onClickNewsDeleteYes}
        onClickNewsDeleteNo={this.onClickNewsDeleteNo}
        onChangeNewsTitle={this.onChangeNewsTitle}
        onChangeNewsText={this.onChangeNewsText}

        onChangeFileName={this.onChangeFileName}
        onChangeFilePath={this.onChangeFilePath}
        onChangeFileCategory={this.onChangeFileCategory}
        onChangeFileSubCategory={this.onChangeFileSubCategory}
        onChangeFileCategoryAndSubcategory={this.onChangeFileCategoryAndSubcategory}
        onChangeCatName={this.onChangeCatName}
        onClickCreateFile={this.onClickCreateFile}
        onClickAddFile={this.onClickAddFile}
        onClickChangeFile={this.onClickChangeFile}
        onClickDeleteFile={this.onClickDeleteFile}
        onClickFileDeleteYes={this.onClickFileDeleteYes}
        onClickFileDeleteNo={this.onClickFileDeleteNo}
        onClickGetCategories={this.onClickGetCategories}
        onClickUpdateCat={this.onClickUpdateCat}
        onClickDeleteCategory={this.onClickDeleteCategory}
        onClickCategoryDeleteYes={this.onClickCategoryDeleteYes}
        onClickCategoryDeleteNo={this.onClickCategoryDeleteNo}

        onClickSingleNew={this.onClickSingleNew}

        onClickUpdateAccounts={this.onClickUpdateAccounts}
        onClickUpdateDataBase={this.onClickUpdateDataBase}
        onChangeUpdateCountFile={this.onChangeUpdateCountFile}
        XMLCountUpdateControlPanelDisplay={this.state.XMLCountUpdateControlPanelDisplay}
        onClickUploadCountFile={this.onClickUploadCountFile}
        fileInputColor={this.state.fileInputColor}
        XMLDatabaseUpdateControlPanelDisplay={this.state.XMLDatabaseUpdateControlPanelDisplay}
        onChangeUpdateDatabaseFile={this.onChangeUpdateDatabaseFile}
        onClickUploadDatabaseFile={this.onClickUploadDatabaseFile}

        onClickReports={this.onClickReports}
        onClickGetFullReport={this.onClickGetFullReport}
        onClickGetChildrenReport={this.onClickGetChildrenReport}

        onChangeAmount={this.onChangeAmount}
        onClickGetAmountOfLogs={this.onClickGetAmountOfLogs}

        terminalData={this.state.terminalData}
        />
    );
  }
}

const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(AdminPageContainer);
