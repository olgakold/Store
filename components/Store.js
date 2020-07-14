import React from 'react';
import PropTypes from 'prop-types';

import './Store.css';
import Book from './Book';
import Login from './Login';
import {voteEvents} from './events';
import { Provider } from 'react-redux';
import BasketDisplay from '../core/BasketDisplay';

import {compareNameAZ, compareNameZA, comparePriceHigher, comparePriceLower, compareCode, compareArr} from './compare';

class Store extends React.PureComponent {

  static propTypes = {
    nameStore: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    store: PropTypes.object.isRequired 
  };

  state ={
    viewPage: 1, //вид страницы: 1 - в виде списка, 2 - в виде таблицы
    viewLogin: 0,//вид строк авторизации 0- скрыты,1-регистрация, 2-авторизация, 3 - вошли на сайт
    books: this.props.books,
    viewFilter: 0,// 0-все строки, 1-только "на складе", 2-только "предзаказ"
    sortView: 0,// 0-нет сортировки, 1-по названию от А до Я, 2 - по названию от Я до А, 3- по цене по возрастанию, 4 - по цене по убыванию
    
  }
  
  componentDidMount = () => {
    voteEvents.addListener('ESignOut',this.signOut);
    voteEvents.addListener('ESignIn',this.signIn);
  };

  componentWillUnmount = () => {
    voteEvents.removeListener('ESignOut',this.signOut);
    voteEvents.removeListener('ESignIn',this.signIn);
  };

  signOut = () =>{
    this.setState({viewLogin:0})
  }

  signIn = () =>{
    this.setState({viewLogin:3})
    
  }
  changeList = () => {
    this.setState ({viewPage:1})
  }

  changeTable = () => {
    this.setState ({viewPage:2})
  }

  logIn = () => {
    this.setState ({viewLogin: 2})
  }

  signUp =() =>{
    this.setState ({viewLogin: 1})
   
  }
  sort = (EO)=>{
    let sortViewText=EO.target.value
    let newArr=this.state.books.slice()
    if (sortViewText=="по названию от А до Я"){
        this.setState({sortView:1})
    }
    if (sortViewText=="по названию от Я до А"){
      this.setState({sortView:2})
    }   
    if (sortViewText=="по цене по возрастанию"){
       this.setState({sortView:3})
    }   
    if (sortViewText=="по цене по убыванию"){
      this.setState({sortView:4})
    }  
    if (sortViewText=="--"){
      this.setState({sortView:0})
    } 

        
    function compare (newArr){      
      if (sortViewText=="по названию от А до Я"){
        newArr.sort(compareNameAZ)
      }
      if (sortViewText=="по названию от Я до А"){   
        newArr.sort(compareNameZA)
      }
  
      if (sortViewText=="по цене по возрастанию"){
        newArr.sort(comparePriceHigher)
      }
      if (sortViewText=="по цене по убыванию"){
        newArr.sort(comparePriceLower)
      }
      if (sortViewText=="--"){
        newArr.sort(compareCode)
      }    

    }

    if (this.state.viewFilter==1){
    let newArr=this.props.books.filter( i=> i.avail=="На складе" )
    compare (newArr)  
    this.setState({books:newArr})
    }

    if (this.state.viewFilter==0){
      let newArr=this.props.books
      compare (newArr)  
      this.setState({books:newArr})
    }
    if (this.state.viewFilter==2){
      let newArr=this.props.books.filter( i=> i.avail=="Предзаказ" )
      compare (newArr)  
      this.setState({books:newArr})
    }
    compare (newArr)
    this.setState({books:newArr})


  }
  inStock = () =>{
    let newArr=this.props.books.filter( i=> i.avail=="На складе" )
    let a=this.state.sortView
    compareArr (a,newArr)
    this.setState({books:newArr, viewFilter: 1})
    }

  allBooks = () => {
    let newArr=this.props.books
    let a=this.state.sortView
    compareArr (a,newArr)
    this.setState ({books: newArr, viewFilter: 0})
  }

  preOrder = () => {
    let newArr=this.props.books.filter( i=> i.avail=="Предзаказ" )
    let a=this.state.sortView
    compareArr (a,newArr)
    this.setState({books:newArr, viewFilter: 2})  
  }


  render () {
    
    let booksCode=this.state.books.map (i=>     
      <Book 
      viewPage={this.state.viewPage}
      key={i.code}
      title={i.title}
      writer={i.writer}
      publ={i.publ}
      price={i.price}
      avail={i.avail}
      code={i.code}
      store={this.props.store}
      
      />)
    return (
      <div className="Store">
                
          <div className="Top">          
          <Provider store={this.props.store}><BasketDisplay/></Provider>
          <input type="button" value="Войти" onClick={this.logIn} className="LogIn"/>
          <input type="button" value="Зарегистрироваться" onClick={this.signUp} className="SignUpBut"/>
        </div>
        <div className = "Buttons">
          <input type="button" value="Список" onClick={this.changeList}></input>
          <input type="button" value="Таблица" onClick={this.changeTable}></input>
        </div>  
        <div>Сортировать
          <select onChange={this.sort}>
          <option>--</option>
          <option>по названию от А до Я</option>
          <option>по названию от Я до А</option>
          <option>по цене по возрастанию</option>
          <option>по цене по убыванию</option>
        </select>
        </div> 
        <div className="Filter">
        <input className="Availability" type="button" value="Все" onClick={this.allBooks}/>
        <input className="Availability" type="button" value="На складе" onClick={this.inStock}/>
        <input className="Availability" type="button" value="Предзаказ" onClick={this.preOrder}/>
        </div>                
        {(this.state.viewLogin!==0)&&<Login viewLogin={this.state.viewLogin} />}
        {(this.state.viewPage==1)&&
          <table>     
            <tbody>
             <tr className="BookTitle">
               <td>Название</td>
               <td>Автор</td>
               <td>Издательство/Серия</td>
               <td>Стоимость</td>
               <td>Наличие</td>
               <td>Подробнее</td>
               <td>В корзину</td>
               </tr>
             {booksCode} 
            </tbody>             
          </table>
        }
        {(this.state.viewPage==2)&&
        <div>          
         {booksCode}            
        </div>
}
               
      </div> 
    )
  }
}

export default Store;
