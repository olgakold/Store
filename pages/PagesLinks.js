import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import './PagesLinks.css';

class PagesLinks extends React.Component {
          
  render() {

    return (
      <div className="Links">
        <NavLink to="/" exact className="PageLink" activeClassName="ActivePageLink">Главная</NavLink>
        <NavLink to="/books" className="PageLink" activeClassName="ActivePageLink">Книги</NavLink>
        <NavLink to="/basket" className="PageLink" activeClassName="ActivePageLink">Корзина</NavLink>
                
      </div>
    );
    
  }

}
    
export default PagesLinks;