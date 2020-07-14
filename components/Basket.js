import React from 'react';

import BasketDisplay from '../core/BasketDisplay';

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { Provider } from 'react-redux';
import BasketBook from "./BasketBook"



class intBasket extends React.PureComponent {

  static propTypes = {
    store: PropTypes.object.isRequired,
    basket: PropTypes.object.isRequired, 
  };
  

  render() {
 
    let booksCodeBasket=this.props.basket.booksInBasket.map (i=>     
      <BasketBook       
      key={this.props.basket.keyBooks++}
      title={i.title}
      writer={i.writer}
      publ={i.publ}
      price={i.price}
      avail={i.avail}
      code={i.code}
      store={this.props.store}/>
      
      )
   
  
    
    return (
      
          <div>
           <div className="Top"><Provider store={this.props.store}><BasketDisplay/></Provider></div>
            {(this.props.basket.numberBooks===0)&&(<div>Ваша корзина пуста</div>)}
            {(this.props.basket.numberBooks>0)&&<table>     
            <tbody>
             <tr className="BookTitle">
               <td>Название</td>
               <td>Автор</td>
               <td>Издательство/Серия</td>
               <td>Стоимость</td>
               <td>Удалить</td>
               </tr>
             {booksCodeBasket} 
            </tbody>             
          </table>}
              
          </div>      
    );
  }
}
const mapStateToProps = function (state) {
  return {
    basket: state.basket,
  };
};


const Basket = connect(mapStateToProps)(intBasket);

export default Basket;

