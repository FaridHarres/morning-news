import React, { useState } from 'react';
import './App.css';
import { Card, Icon } from 'antd';
import Nav from './Nav'
import { useParams } from "react-router-dom";
import { useEffect } from 'react';
import { Button, Modal } from 'antd';
import {connect} from 'react-redux';

const { Meta } = Card;


function ScreenArticlesBySource(props) {
  


  const [articleList, setarticleList] = useState([])


  var { id } = useParams();

  useEffect(() => {
    async function getArticles() {

      var article = await fetch(`https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=ac60f51ada74460d88f3b9666794b8e2`)
      var articleJson = await article.json()
      console.log(articleJson.articles)
      setarticleList(articleJson.articles)

    }
    getArticles()
  }, [])

  console.log(articleList)

  //modal

  const [visible, setVisible] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  
  
  var showModal = (title, content) => {
    setVisible(true)
    setTitle(title)
    setContent(content)
  
  }
  
  var handleOk = e => {
    console.log(e)
    setVisible(false)
  }
  
  var handleCancel = e => {
    console.log(e)
    setVisible(false)
  }

  var tabArticle = articleList.map((news, i) => {
    return (


      <div key={i} style={{ display: 'flex', justifyContent: 'center' }}>


        <Card
          style={{
            width: 300,
            margin: '15px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
          cover={
            <img
              alt={news.urlToImage}
              src={news.urlToImage}
            />
          }
          actions={[
          <Button type="primary" onClick={()=>showModal(news.title, news.description )}>
            voir l'article
            </Button>,        
                     
       <Icon type="like" key="ellipsis" onClick={ ()=>props.addToWishList({title : news.title, desc: news.description,img: news.urlToImage}) } />
          ]}
        >

          <Meta
            title={news.title}
            description={news.description}
          />

        </Card>

      </div>

    )
  })
  console.log(tabArticle)


 


  return (
    <div>

      <Nav />

      <div className="Banner" />

      <div className="Card">


        {tabArticle}
     



      </div>

      <Modal title={title} visible={visible} onOk={handleOk} onCancel={handleCancel}>
                  
                  <p>{content}</p>
               
      </Modal>,

    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function(article) {

        dispatch( {type: 'addArticle',
          listArticle: article,


              
                                })
    }
  }
}


export default connect(
  null,
  mapDispatchToProps
)(ScreenArticlesBySource);


