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
        let updatePassword=Math.random();
        formData.append('f', 'LOCKGET');
        formData.append('n', 'KOLDENKOVA_Store_Clients');
        formData.append('p', updatePassword);  
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
          data = JSON.parse(data.result)
          this.fetchSuccess(data, updatePassword);
       })
       .catch( error => {
          this.fetchError(error.message);
       })
     }
   }

    fetchSuccess = (data, updatePassword) => { 
      let newLog=this.state.newLog
      let newPassword=this.state.newPassword      
      let formDataUPDATE = new FormData();
      formDataUPDATE.append('f', 'UPDATE');
      formDataUPDATE.append('n', 'KOLDENKOVA_Store_Clients');      
      formDataUPDATE.append('p', updatePassword);    

      if (newLog in data){
        formDataUPDATE.append('v', JSON.stringify(data));
        alert ('Данное имя уже использовано')

        isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
          method: 'post',
          headers: {
              "Accept": "application/json",
          },
          body: formDataUPDATE               
        })    

        .then( response => { 
          if (!response.ok){
               throw new Error("fetch error " + response.status); }                     
          else
              return response.json() ; 
        }) 
  
        .then( data => {        
              console.log (data) 
        })

        .catch( error => {
              this.fetchError(error.message);
        })
      }      
        

      

      else {

        data[newLog]=newPassword
        formDataUPDATE.append('v', JSON.stringify(data));

        isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
        method: 'post',
        headers: {
            "Accept": "application/json",
        },
        body: formDataUPDATE       
        
        })       
        .then( response => { 
        if (!response.ok){
            throw new Error("fetch error " + response.status); }                     
        else
            return response.json() ; 
        })


       .then( data => {        

        this.fetchSuccessUPDATE(data, newLog);
        })
        .catch( error => {
          this.fetchError(error.message);
        })
      }      
    }

    fetchSuccessUPDATE = (data, newLog)=>{
      voteEvents.emit('ESignIn');
    }

    fetchError = (error) =>{
      console.log (error)
    }

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
      formData.append('n', 'KOLDENKOVA_Store_Clients');       

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
              this.fetchSuccessRead(data, this.state.newLog, this.state.newPassword);
          })
          .catch( error => {           
             this.fetchErrorRead(error.message);
          })
        }
      }

fetchErrorRead = (errorMessage) => {
  console.log (errorMessage)
};

 fetchSuccessRead = (loadedData, newLog, newPassword) => { 
   if (!(newLog in loadedData)){
    alert('Вы не зарегистрированы. Пройдите регистрацию')
   }
   else{
     if (loadedData[newLog]!=newPassword) {
       alert ('Вы ввели неверный пароль')
     }
     else {
      voteEvents.emit('ESignIn');
     }
   }
  }

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
