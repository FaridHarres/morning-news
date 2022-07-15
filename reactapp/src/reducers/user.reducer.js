export default function(token="", action) {
    if(action.type == 'saveToken') {
      return action.token

    }else if(action.type == 'signInToken') {

        return action.tokenSignin
      } 
     else {
      return token;
    }  
   }