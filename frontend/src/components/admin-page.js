import React from 'react';

class AdminPage extends React.Component {
  render() {
    return(
      <div className="main_admin_content">
        <div className="admin_menu">
          <ul className="admin_menu_list">
            <li className="admin_menu_list_item" onClick={this.props.onClickUser}>User</li>
            <li className="admin_menu_list_item" onClick={this.props.onClickNews}>News</li>
            <li className="admin_menu_list_item" onClick={this.props.onClickFiles}>Files</li>
            <li className="admin_menu_list_item" onClick={this.props.onClickListOfUsers}>List of users</li>
            <li className="admin_menu_list_item" onClick={this.props.onClickListOfNews}>List of news</li>
            <li className="admin_menu_list_item" onClick={this.props.onClickListOfFiles}>List of files</li>
            <li className="admin_menu_list_item" onClick={this.props.onClickGetLogs}>Get Logs</li>
            <li className="admin_menu_list_item" onClick={this.props.onClickUpdateAccounts}>Update accounts</li>
            <li className="admin_menu_list_item" onClick={this.props.onClickUpdateDataBase}>Update Data base</li>
            <li className="admin_menu_list_item" onClick={this.props.onClickReports}>Reports</li>
          </ul>
        </div>
        <div id="screen">

          <div id="interactive_screen">
            <div className="interactive_button_container" style={{display: this.props.userBtnContainerDisplay}}>
              <button className="admin_screen_btn" onClick={this.props.onClickAddUser}>Add user</button>
              <button className="admin_screen_btn" onClick={this.props.onClickFindUser}>Find user</button>
            </div>
            <div className="interactive_button_container" style={{display: this.props.newsBtnContainerDisplay}}>
              <button className="admin_screen_btn" onClick={this.props.onClickAddNews}>Add News</button>
            </div>
            <div className="interactive_button_container" style={{display: this.props.fileBtnContainerDisplay}}>
              <button className="admin_screen_btn" onClick={this.props.onClickAddFile}>Add file</button>
              <button className="admin_screen_btn" onClick={this.props.onClickGetCategories}>Get cats</button>
            </div>

{/*user panels*/}
            <div className="interactive_control_panel" style={{display: this.props.userControlPanelDisplay}}>
              <div className="interactive_control_panel_row">
                <span>Username: </span><input className="terminal_input" onChange={this.props.onChangeUserUsername} value={this.props.user.username} style={{borderBottomColor: this.props.borderColorUsername}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>FirstName: </span><input className="terminal_input" onChange={this.props.onChangeUserFirstName} value={this.props.user.firstName} style={{borderBottomColor: this.props.borderColorFirstName}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>LastName: </span><input className="terminal_input" onChange={this.props.onChangeUserLastName} value={this.props.user.lastName} style={{borderBottomColor: this.props.borderColorLastName}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>Count: </span><input className="terminal_input" onChange={this.props.onChangeUserCount} value={this.props.user.count} style={{borderBottomColor: this.props.borderColorCount}}/>
              </div>
              <div className="interactive_control_panel_radio">
                <input type="radio" checked={this.props.selected === "MALE"} onChange={this.props.onChangeUserGender} value={"MALE"}/><label>Male</label>
                <input type="radio" checked={this.props.selected === "FEMALE"} onChange={this.props.onChangeUserGender} value={"FEMALE"}/><label>Female</label>
              </div>
              <div className="interactive_control_panel_radio">
                <input type="checkbox" checked={this.props.checked} onChange={this.props.onChangeUserRole}/><label>Is Admin</label>
              </div>
              <button className="admin_screen_btn" onClick={this.props.onClickCreateUser}>Create user</button>
            </div>

            <div className="interactive_control_panel" style={{display: this.props.userFindPanelDisplay}}>
              <div className="interactive_control_panel_row">
                <span>Username: </span><input className="terminal_input" onChange={this.props.onChangeUserUsername} value={this.props.user.username} />
              </div>
              <div className="interactive_control_panel_row">
                <span>FirstName: </span><input className="terminal_input" onChange={this.props.onChangeUserFirstName} value={this.props.user.firstName} />
              </div>
              <div className="interactive_control_panel_row">
                <span>LastName: </span><input className="terminal_input" onChange={this.props.onChangeUserLastName} value={this.props.user.lastName} />
              </div>
              <button className="admin_screen_btn" onClick={this.props.onClickGetUser}>Find user</button>
            </div>

            <div className="interactive_control_panel" style={{display: this.props.userUpdateControlPanelDisplay}}>
              <div className="interactive_control_panel_row">
                <span>FirstName: </span><input className="terminal_input" onChange={this.props.onChangeUserFirstName} value={this.props.user.firstName} style={{borderBottomColor: this.props.borderColorFirstName}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>LastName: </span><input className="terminal_input" onChange={this.props.onChangeUserLastName} value={this.props.user.lastName} style={{borderBottomColor: this.props.borderColorLastName}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>Count: </span><input className="terminal_input" onChange={this.props.onChangeUserCount} value={this.props.user.count} style={{borderBottomColor: this.props.borderColorCount}}/>
              </div>
              <div className="interactive_control_panel_radio">
                <input type="radio" checked={this.props.selected === "MALE"} onChange={this.props.onChangeUserGender} value={"MALE"}/><label>Male</label>
                <input type="radio" checked={this.props.selected === "FEMALE"} onChange={this.props.onChangeUserGender} value={"FEMALE"}/><label>Female</label>
              </div>
              <div className="interactive_control_panel_radio">
                <input type="checkbox" checked={this.props.checked} onChange={this.props.onChangeUserRole}/><label>Is Admin</label>
              </div>
              <div>
                <button className="admin_screen_btn" onClick={this.props.onClickUpdateUser}>Update user</button>
              </div>
              <div style={{display: this.props.DeleteUserButtonDisplay}}>
                <button className="admin_screen_btn" onClick={this.props.onClickDeleteUser} style={{color: "red"}}>Delete user</button>
              </div>
              <div style={{display: this.props.DeleteUserYesNoContainerDisplay}}>
                <button className="admin_screen_btn" onClick={this.props.onClickDeleteYes} style={{color: "red"}}>Yes</button>
                <button className="admin_screen_btn" onClick={this.props.onClickDeleteNo} >No</button>
              </div>
            </div>
{/*user panels*/}
{/*news panels*/}
            <div className="interactive_control_panel" style={{display: this.props.newsControlPanelDisplay}}>
              <div className="interactive_control_panel_row">
                <span>Title: </span><input className="terminal_input" onChange={this.props.onChangeNewsTitle} value={this.props.news.title} style={{borderBottomColor: this.props.borderColorTitle}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>Text: </span><textarea className="terminal_input admin_news_textarea" onChange={this.props.onChangeNewsText} value={this.props.news.text} style={{borderBottomColor: this.props.borderColorText}}/>
              </div>
              <button className="admin_screen_btn" onClick={this.props.onClickCreateNews}>Create news</button>
            </div>

            <div className="interactive_control_panel" style={{display: this.props.newsUpdateControlPanelDisplay}}>
              <div className="interactive_control_panel_row">
                <span>Title: </span><input className="terminal_input" onChange={this.props.onChangeNewsTitle} value={this.props.news.title} style={{borderBottomColor: this.props.borderColorTitle}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>Text: </span><textarea className="terminal_input admin_news_textarea" onChange={this.props.onChangeNewsText} value={this.props.news.text} style={{borderBottomColor: this.props.borderColorText}}/>
              </div>
              <div>
                <button className="admin_screen_btn" onClick={this.props.onClickChangeNews}>Update news</button>
              </div>
              <div style={{display: this.props.DeleteNewsButtonDisplay}}>
                <button className="admin_screen_btn" onClick={this.props.onClickDeleteNews} style={{color: "red"}}>Delete news</button>
              </div>
              <div style={{display: this.props.DeleteNewsYesNoContainerDisplay}}>
                <button className="admin_screen_btn" onClick={this.props.onClickNewsDeleteYes} style={{color: "red"}}>Yes</button>
                <button className="admin_screen_btn" onClick={this.props.onClickNewsDeleteNo} >No</button>
              </div>
            </div>
{/*news panels*/}
{/*files panels*/}
            <div className="interactive_control_panel" style={{display: this.props.filesControlPanelDisplay}}>
              <div className="interactive_control_panel_row">
                <span>Name: </span><input className="terminal_input" onChange={this.props.onChangeFileName} value={this.props.file.name} style={{borderBottomColor: this.props.borderColorName}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>Path: </span><input className="terminal_input" onChange={this.props.onChangeFilePath} value={this.props.file.path} style={{borderBottomColor: this.props.borderColorPath}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>Category: </span><input className="terminal_input" onChange={this.props.onChangeFileCategory} value={this.props.file.category.name} style={{borderBottomColor: this.props.borderColorCategory}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>SubCategory: </span><input className="terminal_input" onChange={this.props.onChangeFileSubCategory} value={this.props.file.subCategory} style={{borderBottomColor: this.props.borderColorSubCategory}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>Or choose: </span>{this.props.selection}

              </div>

              <button className="admin_screen_btn" onClick={this.props.onClickCreateFile}>Add file</button>
            </div>

            <div className="interactive_control_panel" style={{display: this.props.filesUpdateControlPanelDisplay}}>
              <div className="interactive_control_panel_row">
                <span>Name: </span><input className="terminal_input" onChange={this.props.onChangeFileName} value={this.props.file.name} style={{borderBottomColor: this.props.borderColorName}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>Path: </span><input className="terminal_input" onChange={this.props.onChangeFilePath} value={this.props.file.path} style={{borderBottomColor: this.props.borderColorPath}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>Category: </span><input className="terminal_input" onChange={this.props.onChangeFileCategory} value={this.props.file.category.name} style={{borderBottomColor: this.props.borderColorCategory}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>SubCategory: </span><input className="terminal_input" onChange={this.props.onChangeFileSubCategory} value={this.props.file.subCategory} style={{borderBottomColor: this.props.borderColorSubCategory}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>Or choose: </span>{this.props.selection}
              </div>
              <div>
                <button className="admin_screen_btn" onClick={this.props.onClickChangeFile}>Update file</button>
              </div>
              <div style={{display: this.props.DeleteFileButtonDisplay}}>
                <button className="admin_screen_btn" onClick={this.props.onClickDeleteFile} style={{color: "red"}}>Delete file</button>
              </div>
              <div style={{display: this.props.DeleteFileYesNoContainerDisplay}}>
                <button className="admin_screen_btn" onClick={this.props.onClickFileDeleteYes} style={{color: "red"}}>Yes</button>
                <button className="admin_screen_btn" onClick={this.props.onClickFileDeleteNo} >No</button>
              </div>
            </div>

            <div className="interactive_control_panel" style={{display: this.props.categoriesUpdateControlPanelDisplay}}>
              <div className="interactive_control_panel_row">
                <span>Cat Name: </span><input className="terminal_input" onChange={this.props.onChangeCatName} value={this.props.category.name} style={{borderBottomColor: this.props.borderColorCatName}}/>
              </div>
              <div className="interactive_control_panel_row">
                <span>Sub cats: </span><div  style={{display: "flex", flexDirection: "column", textAlign: "left"}}>{this.props.subCats}</div>
              </div>
              <div>
                <button className="admin_screen_btn" onClick={this.props.onClickUpdateCat}>Update cat</button>
              </div>
              <div style={{display: this.props.DeleteCategoryButtonDisplay}}>
                <button className="admin_screen_btn" onClick={this.props.onClickDeleteCategory} style={{color: "red"}}>Delete cat</button>
              </div>
              <div style={{display: this.props.DeleteCategoryYesNoContainerDisplay}}>
                <button className="admin_screen_btn" onClick={this.props.onClickCategoryDeleteYes} style={{color: "red"}}>Yes</button>
                <button className="admin_screen_btn" onClick={this.props.onClickCategoryDeleteNo} >No</button>
              </div>
            </div>
{/*files panels*/}

{/*logs panels*/}
            <div className="interactive_control_panel" style={{display: this.props.logsControlPanelDisplay}}>
              <div className="interactive_control_panel_row">
                <span>Amount: </span><input className="terminal_input" onChange={this.props.onChangeAmount} value={this.props.amountOfLogs} />
              </div>
              <button className="admin_screen_btn" onClick={this.props.onClickGetAmountOfLogs}>Get logs</button>
            </div>
{/*logs panels*/}

{/*Files upload functions*/}
            <div className="interactive_control_panel" style={{display: this.props.XMLCountUpdateControlPanelDisplay}}>
              <div className="interactive_control_panel_file_upload">
                <span/><span className="input_file_span" >Choose file to update accounts: </span>
              </div>
              <div className="interactive_control_panel_file_upload">
                <span/><input id="accounts_file_input_key" className="terminal_input_file" type="file" name="file" onChange={this.props.onChangeUpdateCountFile} style={{color: this.props.fileInputColor}}/>
              </div>
              <button className="admin_screen_btn" onClick={this.props.onClickUploadCountFile}>Update</button>
            </div>

            <div className="interactive_control_panel" style={{display: this.props.XMLDatabaseUpdateControlPanelDisplay}}>
              <div className="interactive_control_panel_file_upload">
                <span/><span className="input_file_span" >Choose file to update DB: </span>
              </div>
              <div className="interactive_control_panel_file_upload">
                <span/><input id="db_file_input_key" className="terminal_input_file" type="file" name="file" onChange={this.props.onChangeUpdateDatabaseFile} style={{color: this.props.fileInputColor}}/>
              </div>
              <button className="admin_screen_btn" onClick={this.props.onClickUploadDatabaseFile}>Update</button>
            </div>

{/*Files upload functions*/}

{/*Reports panel*/}
            <div className="interactive_button_container" style={{display: this.props.reportsControlPanelDisplay}}>
              <button className="admin_screen_btn" onClick={this.props.onClickGetFullReport} style={{width: "100%"}}>Get Full Report</button>
              <button className="admin_screen_btn" onClick={this.props.onClickGetChildrenReport} style={{width: "100%"}}>Get Children Report</button>
            </div>
{/*Reports panel*/}

          </div>
          <div id="list_screen">
            {this.props.terminalData}
          </div>

        </div>
      </div>
    );
  }
}
export default AdminPage
