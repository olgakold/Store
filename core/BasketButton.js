import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { basketButton_add } from './basketAC';
class intBasketButton extends React.PureComponent {

static propTypes = {
  bookid: PropTypes.number.isRequired, 
  basket: PropTypes.object.isRequired, 

};

incCounter = () => {
  this.props.dispatch( basketButton_add(this.props.bookid) );
}

  
  
  render() {
    
    return (
      <div className="BasketButton">
        <input type='button' value='В корзину' onClick={this.incCounter} />
      </div>
    );
  }
}


const mapStateToProps = function (state) {
  return {
    basket: state.basket,
  };
};


const BasketButton = connect(mapStateToProps)(intBasketButton);

export default BasketButton;
