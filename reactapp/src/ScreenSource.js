import React,{useState, useEffect} from 'react';
import './App.css';
import { List, Avatar} from 'antd';
import Nav from './Nav'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';


function ScreenSource(props) {


  const [ScreenSource, setScreenSource]= useState([])
  const [language, setlanguage]= useState(props.selectedLangue)//on lui fais passer les props qu'on recupére dans le state en bas 


  useEffect(() => {
     async function getNews(){ 
      props.changeLang(language)
      var news = await fetch(`https://newsapi.org/v2/top-headlines/sources?apiKey=ac60f51ada74460d88f3b9666794b8e2&language=${language}`)
      var newsJson= await news.json()
      
      setScreenSource(newsJson.sources)

    }
    
    getNews()
    
  }, [language])
  
  console.log(ScreenSource)

  
  return (
    <div>
        <Nav/>
       
       <div className="Banner">
        <a onClick={()=>setlanguage('fr')} > <img src="./images/france.png" className='flag'/></a> 
        <a onClick={()=>setlanguage('en')}><img src="./images/english.png" className='flag'/></a> 

       </div>

       <div className="HomeThemes">
          
       <List
          itemLayout="horizontal"
          dataSource={ScreenSource}
          renderItem={news => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/images/${news.category}.png`} />}
                title={<Link to={`/screenArticlesBySource/${news.id}`}>{news.name}</Link>}
                description={news.description}
              />
              
            </List.Item>
          )}
        />


          </div>
                 
      </div>
  );
}
function mapStateToProps(state) {
  return { selectedLangue: state.language,
   }
}

  
function mapDispatchToProps(dispatch) {
  return {
    changeLang: function(language) {

        dispatch( {type: 'changeLang',
        language: language,


              
                                })
    }
  }
}

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(ScreenSource);


