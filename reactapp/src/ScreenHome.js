import React, { useState} from 'react';
import './App.css';
import {Input,Button, Modal, } from 'antd';
import {Link, Navigate,} from 'react-router-dom'

import {connect} from 'react-redux';



//props du redux
function ScreenHome(props) {

  //modal

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  
  
  var showModal = () => {
    setVisible(true)
   
  
  }
  
  var handleOk = e => {
    //console.log(e)
    setVisible(false)
  }
  
  var handleCancel = e => {
    //console.log(e)
    setVisible(false)
  }

  //signup

const [signUpUsername, setsignUpUsername] = useState('')
const [signUpEmail, setssignUpEmail] = useState('')
const [signUpPassword, setsisignUpPassword] = useState('')
const [signupOk, setSignupOk]= useState(false)
const [erreurMsg, seterreurMsg ] = useState('')


async function handleSubmitSignUp(){


var result = await fetch('/sign-up', {
  method: 'POST',
  headers: {'Content-Type':'application/x-www-form-urlencoded'},
  body: `name=${signUpUsername}&email=${signUpEmail}&password=${signUpPassword}`
 });

 var resultJson = await result.json()

 //console.log(resultJson.token)
 setSignupOk(resultJson.result)
 seterreurMsg(resultJson.resultat)
 setContent(resultJson.resultat)
 props.addToken(resultJson.token)


 if(resultJson.resultat !==""){
  showModal();
}
}





//signIn
const [signInEmail, setssignInEmail] = useState('')
const [signInPassword, setsisignInPassword] = useState('')
const [userExist, setUserExist] = useState(false)
const [erreurLogin, seterreurLogin] =useState('')
async function handleSubmitSignIn(){



  var result = await fetch('/sign-in', {

    method: 'POST',
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
    body: `email=${signInEmail}&password=${signInPassword}`
   });
   var resultJson = await result.json()
   //console.log(resultJson)
   setUserExist(resultJson.result)

   seterreurLogin(resultJson.resultat)

   //console.log("🚀 ~ file: ScreenHome.js ~ line 86 ~ handleSubmitSignIn ~ resultJson.resultat", resultJson.result)
  setContent(resultJson.resultat)
  props.signInToken(resultJson.user.token)
  if(resultJson.resultat !==""){
    showModal();
  }

  }

  //console.log(userExist)
  if(userExist || signupOk){
   return <Navigate to="screenSource"/>
  }else{

  return (
    <div className="Login-page" >

          {/* SIGN-IN */}

          <div className="Sign">
                 
                 
                  <Input className="Login-input" onChange={(e) => setssignInEmail(e.target.value)} placeholder="arthur@lacapsule.com" />

                  <Input.Password className="Login-input" onChange={(e) => setsisignInPassword(e.target.value)} placeholder="password" />
            

                  <Button style={{width:'80px'}} onClick={()=>handleSubmitSignIn()} type="primary">Sign-in</Button>

          </div>

          {/* SIGN-UP */}

          <div className="Sign">
                  
                  <Input className="Login-input" onChange={(e) => setsignUpUsername(e.target.value)} value={signUpUsername} placeholder="Arthur G" />

                  <Input className="Login-input" onChange={(e) => setssignUpEmail(e.target.value)} value={signUpEmail} placeholder="arthur@lacapsule.com" />


                  <Input.Password className="Login-input" onChange={(e) => setsisignUpPassword(e.target.value)} value={signUpPassword} placeholder="password" />
            

                  <Button style={{width:'80px'}} onClick={()=>handleSubmitSignUp()} type="primary">Sign-up</Button>

          </div>
          <Modal title="⚠️ ERREUR :"   bodyStyle={{backgroundColor: 'red'}} visible={visible} onOk={handleOk} onCancel={handleCancel}>
          <p>{content}</p>
          </Modal>

      </div>
  );
}
}


//envoi du token dans le store user.reducer.js

function mapDispatchToProps(dispatch) {
  return {
    //cette fonction a été mis dans le handleSubmitSignUp et on lui a donné comme argument resultJson.token
    addToken: function(token) {

        dispatch( {type: 'saveToken',token: token,},
        )
    },
    signInToken: function(token) {

      dispatch( {type: 'signInToken',tokenSignin: token,},
      )
    }

  }
}

export default connect(
  null, 
  mapDispatchToProps
)(ScreenHome)