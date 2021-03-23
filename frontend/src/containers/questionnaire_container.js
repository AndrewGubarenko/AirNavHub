import React from 'react';
import Questionnaire from './../components/questionnaire';
import {connect} from 'react-redux';
import {setToMainDisplayMode} from '../reducers/actions/OnMainPageAction';
import {userService} from '../app-context/context';
import {setSpinnerVisibility} from '../reducers/actions/spinnerAction';
import {cipherService} from '../app-context/context';

let CryptoJS = require("crypto-js");
let count = -1;

class QuestionnaireContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      nameUkrainian: "",
      nameEnglish: "",
      facility: "РДЦ",
      position: "",
      shift: "4",
      passportNumber: "",
      passportIssue: "",
      passportDateIssue: "",
      doesHaveInternationalPassport: "false",
      termInternationalPassport: "",
      identNumber: "",
      education: "",
      educationTerm: "",
      homePhone: "",
      mobilePhone: "",
      placeOfBirth: "",
      birthDate: "",
      passportAddress: "",
      actualAddress: "",
      employmentDate: "",
      seniority: "",
      isMarried: "false",
      familyComposition: "",
      children: [],
      additionalInformation: "",

      isTermIntPassVisible: "none",
      isMarriedSpan: [],
      childrenArray: [],

      childNameMap: new Map(),
      childBirthMap: new Map(),

      personalDataAgreementChecked: false,
      personalDataAgreementCheckedColor: "black",

      message: ""
    };
  }

  componentDidMount() {
    count = -1;
    this.props.dispatch(setToMainDisplayMode("block"));
    let result = [];
    if(this.props.user.gender === "MALE") {
      result[0] = "Одружений";
      result[1] = "Неодружений";
      this.setState({isMarriedSpan: result});
    } else if (this.props.user.gender === "FEMALE") {
      result[0] = "Заміжня";
      result[1] = "Незаміжня";
      this.setState({isMarriedSpan: result});
    } else {
      result[0] = "Одружений/Заміжня";
      result[1] = "Неодружений/Незаміжня";
      this.setState({isMarriedSpan: result});
    }

    userService.getQuestionnaire(this.props.user.id).then(response => {
      if(response.ok) {
        return response.json().then(data => {
          if (data.id !== 0 && data.children !== null) {
            return data;
          } else {
            this.setState({nameUkrainian: this.props.user.lastName + " " +this.props.user.firstName});
            return null;
          }
        })
      } else {
        response.text().then(message => {
          this.setState({message: message});
          return null;
        })
      }
    }).then((questionnaire) => {
      if(questionnaire !== null) {
        this.setQuestionnarieData(questionnaire);
        if (this.state.doesHaveInternationalPassport === "true") {
          if(window.innerWidth > 1023) {
            this.setState({isTermIntPassVisible: "grid"});
          } else {
            this.setState({isTermIntPassVisible: "flex"});
          }
        } else {
          this.setState({termInternationalPassport: ""});
          this.setState({isTermIntPassVisible: "none"});
        }
        let childrenArray = this.state.childrenArray;
        this.state.children.forEach((child, i) => {
          count++;
          childrenArray.push(<div key={count} className="questionnaire_children_row">
            <div className="auth-container">
              <input data-number={count} className="questionnaire_terminal_input" onChange={this.onChangeChildName} value={child[0]}/>
              <span className="inscription" id="forgot_password_span">
                ПІБ дитини
              </span>
            </div>
            <div className="auth-container" style={{position: "relative"}}>
              <div id="close__btn" data-number={count} onClick={this.onClickRemoveChild} className="remove_child_btn">&#10006;</div>
              <input type="date" data-number={count} className="questionnaire_terminal_input" onChange={this.onChangeChildBirth} value={child[1]}/>
              <span className="inscription" id="forgot_password_span">
                Дата народження
              </span>
            </div>
          </div>);
        });
        this.setState({childrenArray: childrenArray});
      }
    });
  }

  onChangeNameUkr = (event) => {
    this.setState({nameUkrainian: event.target.value});
  }

  onChangeNameEng = (event) => {
    this.setState({nameEnglish: event.target.value});
  }

  onChangeFacility = (event) => {
    this.setState({facility: event.target.value});
  }

  onChangePosition = (event) => {
    this.setState({position: event.target.value});
  }

  onChangeShift = (event) => {
    this.setState({shift: event.target.value});
  }

  onChangePassportNumber = (event) => {
    this.setState({passportNumber: event.target.value});
  }

  onChangePassportIssue = (event) => {
    this.setState({passportIssue: event.target.value});
  }

  onChangePassportIssueDate = (event) => {
    this.setState({passportDateIssue: event.target.value});
  }

  onChangeDoesHaveIntPass = async (event) => {
    await this.setState({doesHaveInternationalPassport: event.target.value});
    if (this.state.doesHaveInternationalPassport === "true") {
      if(window.innerWidth > 1023) {
        this.setState({isTermIntPassVisible: "grid"});
      } else {
        this.setState({isTermIntPassVisible: "flex"});
      }
    } else {
      this.setState({termInternationalPassport: ""});
      this.setState({isTermIntPassVisible: "none"});
    }
  }

  onChangeTermIntPass = (event) => {
    this.setState({termInternationalPassport: event.target.value});
  }

  onChangeIdentNumber = (event) => {
    let number = this.checkNumber(event.target.value);
    this.setState({identNumber: number});
  }

  onChangeEducation = (event) => {
    this.setState({education: event.target.value});
  }

  onChangeEducationTerm = (event) => {
    this.setState({educationTerm: event.target.value});
  }

  onChangeHomePhone = (event) => {
    let phone = this.checkNumber(event.target.value);
    this.setState({homePhone: phone});
  }

  onChangeMobilePhone = (event) => {
    let phone = this.checkNumber(event.target.value);
    this.setState({mobilePhone: phone});
  }

  checkNumber = (row) => {
    let phoneNum = row.replace(/[^\d]/g, '');
    if(phoneNum.length > 10) {
      phoneNum = phoneNum.slice(0,10);
    }
    return phoneNum;
  }

  onChangePlaceOfBirth = (event) => {
    this.setState({placeOfBirth: event.target.value});
  }

  onChangeBirthDate = (event) => {
    this.setState({birthDate: event.target.value});
  }

  onChangePassportAddress = (event) => {
    this.setState({passportAddress: event.target.value});
  }

  onChangeActualAddress = (event) => {
    this.setState({actualAddress: event.target.value});
  }

  onChangeEmploymentDate = (event) => {
    this.setState({employmentDate: event.target.value});
  }

  onChangeSeniority = (event) => {
    let seniority = this.checkNumber(event.target.value);
    this.setState({seniority: seniority});
  }

  onChangeIsMarried = async (event) => {
    await this.setState({isMarried: event.target.value});
  }

  onChangeFamilyComposition = (event) => {
    this.setState({familyComposition: event.target.value});
  }

  onChangeChildName = (event) => {
    let map = this.state.childNameMap;
    let key = event.target.dataset.number;
    map.set(key, event.target.value);
    this.setState({childNameMap: map});
  }

  onChangeChildBirth = (event) => {
    let map = this.state.childBirthMap;
    let key = event.target.dataset.number;
    map.set(key, event.target.value);
    this.setState({childBirthMap: map});
  }

  onChangeAdditionalInformation = (event) => {
    this.setState({additionalInformation: event.target.value});
  }

  onChangePersonalDataAgreementChecked = () => {
    if (!this.state.personalDataAgreementChecked) {
      this.setState({personalDataAgreementCheckedColor: "black"});
      this.setState({personalDataAgreementChecked: true});
    } else {
      this.setState({personalDataAgreementChecked: false});
    }
  }

  onClickRemoveChild = (event) => {
    let childrenArray = this.state.childrenArray;
    let key = event.target.dataset.number;
    let childNameMap = this.state.childNameMap;
    let childBirthMap = this.state.childBirthMap;
    let children = this.state.children;
    children.splice(key, 1);

    this.setState({children: children});
    childNameMap.delete(key);
    childBirthMap.delete(key);

    this.setState({childNameMap: childNameMap});
    this.setState({childBirthMap: childBirthMap});

    let  newChildrenArray = childrenArray.filter((item) => item.key !== event.target.dataset.number);
    this.setState({childrenArray: newChildrenArray});
  }

  onClickAddChild = async () => {
    count++;

    let childrenArray = this.state.childrenArray;
    await childrenArray.push(<div key={count} className="questionnaire_children_row">
      <div className="auth-container">
        <input data-number={count} className="questionnaire_terminal_input" onChange={this.onChangeChildName} />
        <span className="inscription" id="forgot_password_span">
          ПІБ дитини
        </span>
      </div>
      <div className="auth-container" style={{position: "relative"}}>
        <div id="close__btn" data-number={count} onClick={this.onClickRemoveChild} className="remove_child_btn">&#10006;</div>
        <input type="date" data-number={count} className="questionnaire_terminal_input" onChange={this.onChangeChildBirth}/>
        <span className="inscription" id="forgot_password_span">
          Дата народження
        </span>
      </div>
    </div>);
    this.setState({childrenArray: childrenArray});
  }

  onClickSaveQuestionnaire = async () => {
    if(this.state.personalDataAgreementChecked) {
      this.setState({personalDataAgreementCheckedColor: "black"});
      await this.props.dispatch(setSpinnerVisibility("inline-block"));

      let childrenMap = new Map();
      await this.state.children.forEach((child, i) => {
        childrenMap.set(this.cipherThis(child[0]), this.cipherThis(child[1]));
      });

      await this.state.childNameMap.forEach((name,date) => {
        let encodedName = this.cipherThis(name);
        let encodedDate = this.cipherThis(this.state.childBirthMap.get(date))
        childrenMap.set(encodedName, encodedDate);
      });

      //Making JS Map compatible for JSON.Stringify
      let childrenMapCompatible = Object.fromEntries(childrenMap);

      let questionnaire = {
        nameUkrainian: this.cipherThis(this.state.nameUkrainian),
        nameEnglish: this.cipherThis(this.state.nameEnglish),
        facility: this.cipherThis(this.state.facility),
        position: this.cipherThis(this.state.position),
        shift: this.cipherThis(this.state.shift),
        passportNumber: this.cipherThis(this.state.passportNumber),
        passportIssue: this.cipherThis(this.state.passportIssue),
        passportDateIssue: this.cipherThis(this.state.passportDateIssue),
        doesHaveInternationalPassport: this.cipherThis(this.state.doesHaveInternationalPassport),
        termInternationalPassport: this.cipherThis(this.state.termInternationalPassport),
        identNumber: this.cipherThis(this.state.identNumber),
        education: this.cipherThis(this.state.education),
        educationTerm: this.cipherThis(this.state.educationTerm),
        homePhone: this.cipherThis(this.state.homePhone),
        mobilePhone: this.cipherThis(this.state.mobilePhone),
        placeOfBirth: this.cipherThis(this.state.placeOfBirth),
        birthDate: this.cipherThis(this.state.birthDate),
        passportAddress: this.cipherThis(this.state.passportAddress),
        actualAddress: this.cipherThis(this.state.actualAddress),
        employmentDate: this.cipherThis(this.state.employmentDate),
        seniority: this.cipherThis(this.state.seniority),
        isMarried: this.cipherThis(this.state.isMarried),
        familyComposition: this.cipherThis(this.state.familyComposition),
        children: childrenMapCompatible,
        additionalInformation: this.cipherThis(this.state.additionalInformation),
        userId: this.props.user.id
      }
      await userService.sendQuestionnaire(questionnaire, this.props.user.id).then(response => {
        if(response.ok) {
          response.json().then(data => {
            this.setQuestionnarieData(data);
          })
        } else {
          response.text().then(message => {
            this.setState({message: message});
          })
        }
      });
      await this.props.dispatch(setSpinnerVisibility("none"));
    } else {
      this.setState({personalDataAgreementCheckedColor: "red"});
    }
  }

  setQuestionnarieData = (data) => {
    this.setState({nameUkrainian: this.decipherThis(data.nameUkrainian)});
    this.setState({nameEnglish: this.decipherThis(data.nameEnglish)});
    this.setState({facility: this.decipherThis(data.facility)});
    this.setState({position: this.decipherThis(data.position)});
    this.setState({shift: this.decipherThis(data.shift)});
    this.setState({passportNumber: this.decipherThis(data.passportNumber)});
    this.setState({passportIssue: this.decipherThis(data.passportIssue)});
    this.setState({passportDateIssue: this.decipherThis(data.passportDateIssue)});
    this.setState({doesHaveInternationalPassport: this.decipherThis(data.doesHaveInternationalPassport)});
    this.setState({termInternationalPassport: this.decipherThis(data.termInternationalPassport)});
    this.setState({identNumber: this.decipherThis(data.identNumber)});
    this.setState({education: this.decipherThis(data.education)});
    this.setState({educationTerm: this.decipherThis(data.educationTerm)});
    this.setState({homePhone: this.decipherThis(data.homePhone)});
    this.setState({mobilePhone: this.decipherThis(data.mobilePhone)});
    this.setState({placeOfBirth: this.decipherThis(data.placeOfBirth)});
    this.setState({birthDate: this.decipherThis(data.birthDate)});
    this.setState({passportAddress: this.decipherThis(data.passportAddress)});
    this.setState({actualAddress: this.decipherThis(data.actualAddress)});
    this.setState({employmentDate: this.decipherThis(data.employmentDate)});
    this.setState({seniority: this.decipherThis(data.seniority)});
    this.setState({isMarried: this.decipherThis(data.isMarried)});
    this.setState({familyComposition: this.decipherThis(data.familyComposition)});

    let decodedMap = this.state.children;
    Object.entries(data.children).forEach(async(name, index) => {

      let childName = this.decipherThis(name[0]);
      let childDate = this.decipherThis(name[1]);

      decodedMap.push([childName, childDate]);
    });
    this.setState({children: decodedMap});

    this.setState({additionalInformation: this.decipherThis(data.additionalInformation)});
  }

  cipherThis = (text) => {
    let iv = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    let salt = CryptoJS.lib.WordArray.random(128/8).toString(CryptoJS.enc.Hex);
    if(text) {
      let ciphertext = cipherService.encrypt(salt, iv, text);

      let aesString = (iv + "::" + salt + "::" + ciphertext);
      return btoa(aesString);
    } else {
      return text;
    }
  }

  decipherThis = (encryptedText) => {
    if(encryptedText) {
      let decodedText = atob(encryptedText);
      let aesString = decodedText.split("::");
      let ciphertext = aesString[2];
      return cipherService.decrypt(aesString[1], aesString[0], ciphertext);
    } else {
      return encryptedText;
    }
  }

  render() {
    return(
      <Questionnaire
        nameUkrainian={this.state.nameUkrainian}
        nameEnglish={this.state.nameEnglish}
        facility={this.state.facility}
        position={this.state.position}
        shift={this.state.shift}
        passportNumber={this.state.passportNumber}
        passportIssue={this.state.passportIssue}
        passportDateIssue={this.state.passportDateIssue}
        doesHaveInternationalPassport={this.state.doesHaveInternationalPassport}
        termInternationalPassport={this.state.termInternationalPassport}
        identNumber={this.state.identNumber}
        education={this.state.education}
        educationTerm={this.state.educationTerm}
        homePhone={this.state.homePhone}
        mobilePhone={this.state.mobilePhone}
        placeOfBirth={this.state.placeOfBirth}
        birthDate={this.state.birthDate}
        passportAddress={this.state.passportAddress}
        actualAddress={this.state.actualAddress}
        employmentDate={this.state.employmentDate}
        seniority={this.state.seniority}
        isMarried={this.state.isMarried}
        familyComposition={this.state.familyComposition}
        children={this.state.children}
        additionalInformation={this.state.additionalInformation}
        personalDataAgreementChecked={this.state.personalDataAgreementChecked}
        personalDataAgreementCheckedColor={this.state.personalDataAgreementCheckedColor}

        isTermIntPassVisible={this.state.isTermIntPassVisible}
        isMarriedSpan={this.state.isMarriedSpan}
        childrenArray={this.state.childrenArray}
        message={this.state.message}

        onChangeNameUkr={this.onChangeNameUkr}
        onChangeNameEng={this.onChangeNameEng}
        onChangeFacility={this.onChangeFacility}
        onChangePosition={this.onChangePosition}
        onChangeShift={this.onChangeShift}
        onChangePassportNumber={this.onChangePassportNumber}
        onChangePassportIssue={this.onChangePassportIssue}
        onChangePassportIssueDate={this.onChangePassportIssueDate}
        onChangeDoesHaveIntPass={this.onChangeDoesHaveIntPass}
        onChangeTermIntPass={this.onChangeTermIntPass}
        onChangeIdentNumber={this.onChangeIdentNumber}
        onChangeEducation={this.onChangeEducation}
        onChangeEducationTerm={this.onChangeEducationTerm}
        onChangeHomePhone={this.onChangeHomePhone}
        onChangeMobilePhone={this.onChangeMobilePhone}
        onChangePlaceOfBirth={this.onChangePlaceOfBirth}
        onChangeBirthDate={this.onChangeBirthDate}
        onChangePassportAddress={this.onChangePassportAddress}
        onChangeActualAddress={this.onChangeActualAddress}
        onChangeEmploymentDate={this.onChangeEmploymentDate}
        onChangeSeniority={this.onChangeSeniority}
        onChangeIsMarried={this.onChangeIsMarried}
        onChangeFamilyComposition={this.onChangeFamilyComposition}
        onChangeAdditionalInformation={this.onChangeAdditionalInformation}
        onChangePersonalDataAgreementChecked={this.onChangePersonalDataAgreementChecked}
        onClickAddChild={this.onClickAddChild}

        onClickSaveQuestionnaire={this.onClickSaveQuestionnaire}

        />
    );
  }
}
const mapStateToProps = (state) => {
  return Object.assign({}, state, {
    user: state.user.user,
    spinnerVisibility: state.spinnerVisibility.spinnerVisibility
  });
}

export default connect(mapStateToProps)(QuestionnaireContainer);
