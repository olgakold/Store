import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { basketButton_del } from './basketAC';
class intBasketButtonDel extends React.PureComponent {

static propTypes = {
  bookid: PropTypes.number.isRequired, 
  basket: PropTypes.object.isRequired, 

};

delCounter = () => {
  this.props.dispatch( basketButton_del(this.props.bookid) );
}

  
  
  render() {
    
    return (
      <div className="BasketButton">
        <input type='button' value='Удалить' onClick={this.delCounter} />
      </div>
    );
  }
}


const mapStateToProps = function (state) {
  return {
    basket: state.basket,
  };
};


const BasketButtonDel = connect(mapStateToProps)(intBasketButtonDel);

export default BasketButtonDel;
