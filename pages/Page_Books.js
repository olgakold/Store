import React from 'react';

import Store from '../components/Store';

import PropTypes from 'prop-types';

let booksArr=require('../books.json');
let nameStore='Бакенбарды Пушкина'

class Page_Books extends React.PureComponent {

  static propTypes = {
    store: PropTypes.object.isRequired
  };
          
  render() {

    return (
      <div>
        <Store books={booksArr} nameStore={nameStore} store={this.props.store}/>
      </div>
      
    );
    
  }

}
    
export default Page_Books;
    