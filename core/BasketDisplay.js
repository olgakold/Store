import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

class intBasketDisplay extends React.PureComponent {

  static propTypes = {
    basket: PropTypes.object.isRequired, // получено из Redux
  };

  render() {
    let aaa=JSON.stringify(this.props.basket.numberBooks)
    
    return (
      <div className="CounterDisplay">
        Товаров в корзине: {aaa}
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    basket: state.basket,
  };
};


const BasketDisplay = connect(mapStateToProps)(intBasketDisplay);

export default BasketDisplay;
