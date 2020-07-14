import React from 'react';
import { Route } from 'react-router-dom';

import Page_Start from './Page_Start';
import Page_Books from './Page_Books';
import Page_BookInfo from './Page_BookInfo';
import Page_Basket from './Page_Basket';

import { createStore } from 'redux';
import combinedReducer from '../core/reducers.js';

let store=createStore(combinedReducer);

class PagesRouter extends React.Component {
          
  render() {

    return (
      <div>
        <Route path="/" exact component={Page_Start}  />
        <Route path="/books" render={(props)=><Page_Books {...props} store={store}/>} />
        <Route path="/basket" render={(props)=><Page_Basket {...props} store={store}/>} />
        <Route path="/book/:clid" render={(props)=><Page_BookInfo {...props} store={store}/>}/>
      </div>
    );
    
  }

}
    
export default PagesRouter;
