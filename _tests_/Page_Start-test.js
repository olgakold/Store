import React from 'react';
import renderer from 'react-test-renderer';

import Page_Start from '../pages/Page_Start';

test('работа Page_Start', ()=>{

  
  const component = renderer.create(
        <Page_Start/>
  ); 
  let componentTree=component.toJSON();
  expect(componentTree).toMatchSnapshot();
  
});

