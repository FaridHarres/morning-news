import React from 'react';
import './App.css';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenSource from './ScreenSource';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ScreenHome from './ScreenHome'
import ScreenArticlesBySource from './ScreenArticlesBySource';
import {Provider} from 'react-redux';
import article from './reducers/article';
import language from  './reducers/langue';
//on récupére le token et ensuite on le met dans le store
import  token from './reducers/user.reducer'
import {createStore, combineReducers}  from 'redux';

const store = createStore(combineReducers({article, token, language}));


function App() {
  return (
    <Provider store={store}>       
      <Router>
        <Routes>
        <Route exact path="/" element={<ScreenHome />} />
        <Route exact path="/screenMyArticles" element={<ScreenMyArticles />} />
        <Route exact path="/screenArticlesBySource/:id" element={<ScreenArticlesBySource />} />
        <Route exact path="/screenSource" element={<ScreenSource />} />

        </Routes>
      </Router>
  </Provider>
  );
}

export default App;
