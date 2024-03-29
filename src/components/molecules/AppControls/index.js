import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import './style.css';

import Button from '../../atoms/Button';
import Switch from '../../atoms/Switch';
import Menu from '../../molecules/Menu';
import { useAuth0 } from "@auth0/auth0-react";

const AppControls = ({
  algorithm,
  onAlgorithmChange,
  onGenerateRandomArray,
  takeInputArray ,
  arraySize,
  onArraySizeChange,
  onToggleDarkMode,
  darkMode,
  loginWithRedirect
  
}) => {
  return (
    
    <Fragment>


  
      <Menu
        placeholder="Select Algorithm"
        items={[
          'Bubble Sort',
          'Selection Sort',
          'Insertion Sort',
          'Merge Sort',
          'Quick Sort',
          'Heap Sort',
          'Shell Sort'
        ]}
        selected={algorithm}
        onSelect={onAlgorithmChange}
      />

      

      <div className="AppControls__Size">
        <span>Size</span>
        <Menu
          placeholder="Array Size"
          items={['5', '10','15', '20', ]}
          selected={String(arraySize)}
          onSelect={onArraySizeChange}
        />
      </div>


      <Button onClick={onGenerateRandomArray}>Random Array</Button>



<Button className="btnArr"   onClick={takeInputArray}
    onSelect={onArraySizeChange}
    >Generate Array</Button>

{/* <button className="loginbtn" onClick={() => loginWithRedirect()}>Log In</button> */}

      
        
      
      

      {/* <Switch
        label="Dark Mode"
        onSwitch={onToggleDarkMode}
        checked={darkMode}
      /> */}
    </Fragment>
  );
};

AppControls.propTypes = {
  algorithm: PropTypes.string,
  onAlgorithmChange: PropTypes.func.isRequired,
  onGenerateRandomArray: PropTypes.func.isRequired,
  takeInputArray: PropTypes.func.isRequired,
  arraySize: PropTypes.number,
  onArraySizeChange: PropTypes.func.isRequired,
  onToggleDarkMode: PropTypes.func.isRequired,
  loginWithRedirect: PropTypes.func.isRequired,
  darkMode: PropTypes.bool
};

export default AppControls;
