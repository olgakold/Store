import React from 'react';
import PropTypes from 'prop-types';

import BookInfo from '../components/BookInfo';

let booksArr=require('../books.json');


class Page_BookInfo extends React.PureComponent {

  
  static propTypes = {
    store: PropTypes.object.isRequired
  };

  render() {    

    
     let bookCode=parseInt(this.props.match.params.clid);
     let bookData=booksArr.find( c => c.code==bookCode );   
  
    return (
      <div>
       
       <BookInfo bookData={bookData} store={this.props.store}/>           
       
      </div>
    );
    
  }

}

    
export default Page_BookInfo;
 