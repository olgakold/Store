import React from 'react';
import PropTypes from 'prop-types';

import { Provider } from 'react-redux';
import './Book.css';

import BasketButtonDel from '../core/BasketBottonDel';


class BasketBook extends React.PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    writer: PropTypes.string.isRequired,
    publ: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    avail: PropTypes.string.isRequired,    
    code: PropTypes.number.isRequired,
    store: PropTypes.object.isRequired,   
  };
  
 
  render() {    
 
   return (
    <tr className="Book">
    <td>{this.props.title}</td>
    <td>{this.props.writer}</td>
    <td>{this.props.publ}</td>
    <td>{this.props.price}</td>
    <td><Provider store={this.props.store}><BasketButtonDel bookid={this.props.code}/></Provider></td>
 
    </tr>

    );

}
}

export default BasketBook;
