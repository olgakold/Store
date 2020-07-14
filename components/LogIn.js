import React from 'react';
import PropTypes, { func } from 'prop-types';
import isoFetch from 'isomorphic-fetch';


import './Login.css';
import {voteEvents} from './events';

class Login extends React.Component {

    static propTypes = {      
      viewLogin: PropTypes.number.isRequired,
     };

    state={
      newLog: '',
      newPassword: '',
      viewLogin: this.props.viewLogin
      
    }
 
  
    save = () =>{

      if (this.state.newLog===""||this.state.newPassword===""){
        alert ('Заполните все поля')
      }
      else {
      
          let formData = new FormData();
          let newLog=this.state.newLog
          let newPassword=this.state.newPassword
          
          formData.append('f', 'INSERT');
          formData.append('n', 'KOLDENKOVA_Store_'+newLog);
          formData.append('v', newPassword);  
          
         isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
              method: 'post',
              headers: {
                  "Accept": "application/json",
              },
              body: formData       
              
          })
         
              .then( response => { 
                  if (!response.ok)
                      throw new Error("fetch error " + response.status);                      
                  else
                      return response.json() ; 
              })
             .then( data => {
              this.fetchSuccess(data);

             })
              .catch( error => {
                console.log(error.message);}
               
              )
    }
    
  }
  

   fetchSuccess = (data) => {   
     
     if (data.result===''&&data.error==='error - string already exists'){
       alert ('Данное имя уже использовано')
     }
     if (data.result==='OK'){
      voteEvents.emit('ESignIn');
     }
    };

   inputLog =(EO)=>{
    let inLog=EO.target.value;
    this.setState({newLog:inLog})
  }

  inputPassword =(EO)=>{
    let inPassword=EO.target.value;
    this.setState({newPassword:inPassword})
  }


    signIn =()=>{
      if (this.state.newLog===""||this.state.newPassword===""){
        alert ('Заполните все поля')
      }
      else {
      let formData = new FormData();
      formData.append('f', 'READ');
      formData.append('n', 'KOLDENKOVA_Store_'+this.state.newLog);       

      isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
          method: 'post',
          headers: {
              "Accept": "application/json",
          },
          body: formData       
          
      })
      
          .then( response => { 
              if (!response.ok)
                 
                  throw new Error("fetch error " + response.status); 
              else
                  
                 return response.json(); 
          })
          .then( data => {
           
             data = JSON.parse(data.result)
              this.fetchSuccessRead(data);
          })
          .catch( error => {
           
             this.fetchErrorRead(error.message);
          })
        }
      }

fetchErrorRead = (errorMessage) => {
  alert('Вы не зарегистрированы. Пройдите регистрацию')
};

 fetchSuccessRead = (loadedData) => { 
   
   if (String(loadedData)!==String(this.state.newPassword)){
     alert ('Вы ввели неверный пароль')
   }
   else {
    voteEvents.emit('ESignIn');
   }
   
 };



signOut = () =>{
  voteEvents.emit('ESignOut');
}

 render (){
  
    
  if (this.props.viewLogin!==3){
        return (
          <div className="SignIn">
          <label >Логин
            <input onChange={this.inputLog}/>
          </label>
          <label>Пароль
            <input onChange={this.inputPassword}/>
          </label>
      {(this.props.viewLogin==1)&&
      <input type="button" onClick={this.save} value="Запомнить"/>}
      {(this.props.viewLogin==2)&&
      <input type="button" onClick={this.signIn} value="Войти"/>}
    </div>    
  
  );
  }
  if (this.props.viewLogin===3){
    return(
    <div className="SignInName"> 
      Добро пожаловать, <span>{this.state.newLog}</span>!
      <input type="button" onClick={this.signOut} value="Выйти"/>
    </div>)
  }
  if (this.props.viewLogin===0){
    return(<div></div>)}     

}
}


export default Login;  


