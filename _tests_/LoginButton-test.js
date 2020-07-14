import React from 'react';
import renderer from 'react-test-renderer';

import Login from '../components/LogIn';

test('работа Login', ()=>{
  let viewLogin=1
  const component = renderer.create(
        <Login viewLogin={viewLogin}/>
  ); 
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  const buttonElem = component.root.find( el => el.props.value=='Запомнить');   
  buttonElem.props.onClick();
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  buttonElem.props.onClick();
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

    
});

test('работа Login', ()=>{
  let viewLogin=2
  const component = renderer.create(
        <Login viewLogin={viewLogin}/>
  ); 
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  const buttonElem = component.root.find( el => el.props.value=='Войти');   
  buttonElem.props.onClick();
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  buttonElem.props.onClick();
  componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();

    
});
