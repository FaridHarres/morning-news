
import React from 'react';
import {connect} from 'react-redux';

function addArticle(props) {
 return (
   <button onClick={ ()=>props.addToWishList() }>addArticle</button>
 )
}


export default connect(
   null,
   mapDispatchToProps
)(addArticle);