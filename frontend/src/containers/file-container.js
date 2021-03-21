import React from 'react';
import File from '../components/file';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class FileContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      arrowFilesClassName: "expandArrow",
      filesArray: [],
      categoriesList: []
    };
  }

  async componentDidMount() {
    if(this.props.isAuthenticated) {
      if(this.props.files.listOfFiles) {
        await this.setCategories();
      }
      await this.setFiles();
    }
  }

  componentWillUnmount() {
    this.setState({arrowFilesClassName: "expandArrow"});
    this.setState({filesArray: []});
    this.setState({categoriesList: []});
  }

  setCategories = () => {
    let categoriesList = [];
    this.props.files.listOfFiles.forEach((file, i) => {
      if(i === 0) {
        this.setState({checked: file.category.name});
      }
      if(!categoriesList.some(item => item.name === file.category.name)) {
        categoriesList.push(file.category);
      }
    });
    this.setState({categoriesList: categoriesList});
  }

  setFiles = () => {
    let shortFilesArray = [];

    if (this.props.files.listOfFiles.length) {

      shortFilesArray[0] =
      <Tabs key={"Tabs"}
            forceRenderTabPanel
            defaultIndex={0}
            style={{marginTop: "20px"}}>
        <TabList key={"TabList"}>
          {this.state.categoriesList.map(category => {
            return(<Tab key={category.id}>{category.name}</Tab>);
          })}
        </TabList>
        {this.state.categoriesList.map(category => {
          return(
            <TabPanel key={"TabPanel" + category.id}>
              <Tabs key={"Tab" + category.id}
                    forceRenderTabPanel
                    defaultIndex={0}>
                <TabList key={"TabList" + category.id}>
                  {category.subCategories.map(subCat => {
                    return(
                      <Tab key={subCat}>{subCat}</Tab>
                    );
                  })}
                </TabList>
                {
                  category.subCategories.map(subCat => {
                    let files = this.props.files.listOfFiles.filter(file => file.category.name === category.name)
                                                .filter(file => file.subCategory === subCat)
                    let truncatedArray = [];
                    if(files.length > 4) {
                      truncatedArray = files.slice(0, 4);
                    } else {
                      truncatedArray = files;
                    }
                    return(
                      <TabPanel key={"TabPanel" + subCat}>
                        <div className="files-grid-container">
                          {
                            truncatedArray.map(file => {
                              return(
                                <File
                                  key={file.id}
                                  file={file}
                                   />
                              );
                            })
                          }
                      </div>
                      </TabPanel>
                    );
                  })
                }
              </Tabs>
            </TabPanel>
          );
      })}
      </Tabs>
     } else {
       shortFilesArray[0] = <p id="no__files" key="zeroFiles">Покищо немає файлів..</p>
     }
    this.setState({filesArray: shortFilesArray});
  }

  expandFiles = () => {
    let longFilesArray = [];
    if (this.props.files.listOfFiles.length) {
      longFilesArray[0] =
      <Tabs key={"Tabs"} forceRenderTabPanel defaultIndex={0} style={{marginTop: "20px"}}>
        <TabList key={"TabList"}>
          {this.state.categoriesList.map(category => {
            return(<Tab key={category.id}>{category.name}</Tab>);
          })}
        </TabList>
        {this.state.categoriesList.map(category => {
          return(
            <TabPanel key={"TabPanel" + category.id}>
              <Tabs key={"Tab" + category.id} forceRenderTabPanel>
                <TabList key={"TabList" + category.id}>
                  {category.subCategories.map(subCat => {
                    return(
                      <Tab key={subCat}>{subCat}</Tab>
                    );
                  })}
                </TabList>
                {
                  category.subCategories.map(subCat => {
                    let files = this.props.files.listOfFiles.filter(file => file.category.name === category.name)
                                                .filter(file => file.subCategory === subCat)
                    return(
                      <TabPanel key={"TabPanel" + subCat}>
                        <div className="files-grid-container">
                          {
                            files.map(file => {
                              return(
                                <File
                                  key={file.id}
                                  file={file}
                                   />
                              );
                            })
                          }
                        </div>
                      </TabPanel>
                    );
                  })
                }
              </Tabs>
            </TabPanel>
          );
      })}
      </Tabs>
    } else {
      longFilesArray[0] = <p id="no__files" key="zeroFiles">Покищо немає файлів..</p>
    }
    this.setState({filesArray: longFilesArray});
  }

  onClickExpandArrowFiles = () => {
    if (this.state.arrowFilesClassName === "expandArrow") {
      this.setState({arrowFilesClassName: "expandArrow open"});
      this.expandFiles();
    } else if (this.state.arrowFilesClassName === "expandArrow open") {
      this.setState({arrowFilesClassName: "expandArrow"});
      this.setFiles();
    }
  }

  render() {
    return(
      <div id="file__container" className="standard-container" style={{display: this.props.displayFiles}}>
        <p className="container-name">Файли</p>
        <div className="border-plane-container">
          <div className="standard-container-line">
            <svg className="svg-plane-icon">
              <use xlinkHref="#svg-plane"/>
            </svg>
          </div>
        </div>

        <div className="files-whole-container" style={{display: "flex"}}>
          {this.state.filesArray}
        </div>

        <div className={this.state.arrowFilesClassName} onClick={this.onClickExpandArrowFiles}>
            <span className="expandArrow-left"></span>
            <span className="expandArrow-right"></span>
        </div>

      </div>
    );
  }
}

export default FileContainer;
