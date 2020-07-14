import React from 'react';
import renderer from 'react-test-renderer';

import Login from '../components/LogIn';

test('работа Login', ()=>{

  let viewLogin=0
  const component = renderer.create(
        <Login viewLogin={viewLogin}/>
  ); 
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
    
});
