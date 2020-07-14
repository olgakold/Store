import React from 'react';
import Basket from '../components/Basket';

import PropTypes from 'prop-types';

class Page_Basket extends React.PureComponent {
  static propTypes = {
    store: PropTypes.object.isRequired
  };
  
          
  render() {
          
    return (   
      
        <Basket store={this.props.store}/>          
      
    );    
  }
}
export default Page_Basket;
    

    