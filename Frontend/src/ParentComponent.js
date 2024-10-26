import React from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
  const message = "Hello from Parent!";
  
  return (
    <div>
      <ChildComponent greeting={message} />
    </div>
  );
}

export default ParentComponent;