"use strict";
  
  function compareNameAZ (a,b) {
    if ( a.title<b.title )  return -1;
    if ( a.title>b.title )  return 1;
    return 0;
  }

  function compareNameZA (a,b) {
    if ( a.title>b.title )  return -1;
    if ( a.title<b.title )  return 1;
    return 0;
  }

  function comparePriceHigher(a,b){
    return parseFloat(a.price)-parseFloat(b.price); 
  }

  function comparePriceLower(a,b){
    return parseFloat(b.price)-parseFloat(a.price); 
  }  
  function compareCode(a,b){
    return parseFloat(a.code)-parseFloat(b.code); 
  }  

  function compareArr (a,newArr){
    if (a===1){
      newArr.sort(compareNameAZ)
    }
    if (a===2){
      newArr.sort(compareNameZA)
    }

    if (a===3){
      newArr.sort(comparePriceHigher)
    }
    if (a===4){
      newArr.sort(comparePriceLower)
    }
    if (a===0){
      newArr.sort(compareCode)
    } 
  }

  export  {compareNameAZ, compareNameZA,comparePriceHigher, comparePriceLower, compareCode, compareArr}