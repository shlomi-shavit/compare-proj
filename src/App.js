import React from 'react';
import MasterForm from './containers/MasterForm/MasterForm';
import classes from './App.module.scss';

function App() {
  return (
    <div className="App rtl" style={{direction: 'rtl'}}>

        <div className={classes.steps_container}>
            <MasterForm/>
        </div>

    </div>
  );
}

export default App;
