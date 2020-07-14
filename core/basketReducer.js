import { BASKET_BUTTON_DEL, BASKET_BUTTON_ADD } from './basketAC';



let booksArr=require('../books.json');

const initState={
  booksInBasket: [],
  numberBooks: 0,
  keyBooks: 0
};

function basketReducer(state=initState,action) {

  

  switch (action.type) {

    case BASKET_BUTTON_ADD: {
      let bookInBasket=booksArr.find( i => i.code==action.bookid )
      let newState={...state}
      if (state.booksInBasket.length==0){
        newState.numberBooks++
        newState.booksInBasket.push(bookInBasket)
      }
      else {             
        
        if (state.booksInBasket.indexOf(bookInBasket)!=-1){

          let addBook = confirm ('книга "'+bookInBasket.title+'" уже есть в корзине. Добавить еще?');
          if (addBook){        
            newState.booksInBasket.push(bookInBasket)
            newState.numberBooks++
          }
          if (!addBook) {
            console.log ('не добавлена')
          }
        }
        if (state.booksInBasket.indexOf(bookInBasket)==-1) {
         newState.numberBooks++
         newState.booksInBasket.push(bookInBasket)
        }
       
      
    }
      return newState;
      
    }
    case BASKET_BUTTON_DEL: {
      
      let newState={...state}
      let bookOnBasket=state.booksInBasket.find( i => i.code==action.bookid )
      newState.booksInBasket.splice(state.booksInBasket.indexOf(bookOnBasket),1)
      newState.numberBooks--
      return newState;
    }

    default:
      return state;
  }
}

export default basketReducer;
