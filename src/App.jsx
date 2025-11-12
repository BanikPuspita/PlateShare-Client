import React from 'react';
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <Toaster position='top-right' reverseOrder={false}></Toaster>
    </div>
  );
};

export default App;