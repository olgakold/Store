const BASKET_BUTTON_DEL='BASKET_BUTTON_DEL';
const BASKET_BUTTON_ADD='BASKET_BUTTON_ADD';

const basketButton_del=function(bookid) {
  return {
    type: BASKET_BUTTON_DEL,
    bookid:bookid,
  };
}

const basketButton_add=function(bookid) {
  return {
    type: BASKET_BUTTON_ADD,
    bookid:bookid,    
  };
}
export {
  basketButton_del,BASKET_BUTTON_DEL,
  basketButton_add,BASKET_BUTTON_ADD,
}
