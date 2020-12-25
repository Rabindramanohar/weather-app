import { useState } from 'react';
import './App.css';
import AllCities from './components/AllCities';
import SelectedCity from './components/SelectedCity';

function App() {
  const[toggleComponent, setToggleComponent] = useState(false);
  function handleButton() {
    setToggleComponent({toggleComponent : !toggleComponent})
  }
  return (
    <div className="App">
      <h1>Weather Application</h1>
      <input type = "text" placeholder = "Enter you City" />
      <button onClick = {handleButton}>Search</button>
      {toggleComponent ? <SelectedCity /> : <AllCities />}
    </div>
  );
}

export default App;
