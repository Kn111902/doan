import React from 'react';
import Content from './content/Content';
import Slide from './slide/Slide';

function Dashboard() {
  return (
  
      <div  className="px-14 py-100" >
        <div >
          <Slide />
        </div>
        <div >
          <Content />
        </div>
      </div>
 
  );
}

export default Dashboard;
