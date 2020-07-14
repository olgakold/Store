import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import BasketButton from '../core/BasketButton';
import BasketDisplay from '../core/BasketDisplay';

class BookInfo extends React.PureComponent {


static propTypes = {
      bookData: PropTypes.object.isRequired,   
      store: PropTypes.object.isRequired, 
      };
      
          
  render() {
    
    return (

      <div>
        <div className="Top"><Provider store={this.props.store}><BasketDisplay/></Provider></div>
        <div className="BookName">{this.props.bookData.title} </div><br/>
        {this.props.bookData.writer}<br/>
        {this.props.bookData.publ}<br/>
        {this.props.bookData.price}<br/>
        {this.props.bookData.avail}<br/>
        <Provider store={this.props.store}><BasketButton bookid={this.props.bookData.code}/></Provider>
  
        </div>            
    );
    
  }

}
export default BookInfo
