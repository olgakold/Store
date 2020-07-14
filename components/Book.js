import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';
import BasketButton from '../core/BasketButton';
import { Provider } from 'react-redux';

import './Book.css';

class Book extends React.PureComponent {

  static propTypes = {
    title: PropTypes.string.isRequired,
    writer: PropTypes.string.isRequired,
    publ: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    avail: PropTypes.string.isRequired,
    viewPage: PropTypes.number.isRequired,
    code: PropTypes.number.isRequired,
    store: PropTypes.object.isRequired
  };
  

  render() {      
    if (this.props.viewPage==1){


   return (

  
        <tr className="Book">
        <td>{this.props.title}</td>
        <td>{this.props.writer}</td>
        <td>{this.props.publ}</td>
        <td>{this.props.price}</td>
        <td className="Avail">{this.props.avail}</td>
        <td><NavLink to={"/book/"+this.props.code}>О книге</NavLink></td>
        <td><Provider store={this.props.store}><BasketButton bookid={this.props.code}/></Provider></td>
        </tr>

    );
    }

    if (this.props.viewPage==2){

      return (
        <div className="BookDiv">
        <div className="BookName">{this.props.title} </div><br/>
        {this.props.writer}<br/>
        {this.props.publ}<br/>
        {this.props.price}<br/>
        {this.props.avail}<br/>
        <NavLink to={"/book/"+this.props.code}>О книге</NavLink><br/>
        <Provider store={this.props.store}><BasketButton bookid={this.props.code}/></Provider>
        </div>        
 
    );
    
  }
}
}


export default Book;