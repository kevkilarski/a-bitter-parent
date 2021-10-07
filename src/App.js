import axios from 'axios';
import { useEffect } from 'react';
import './App.css';

function App() {  

  useEffect(() => {
    axios({
      method: 'GET',
      headers: {
        'x-app-id': '70c46ccc',
        'x-app-key': 'd82034658ba4890d822655ea6603a5de',
      },
      url: `https://api.nutritionix.com/v2/search/`,
      dataResponse: 'json',
      params: {
        q: 'carrot'
      },
    }).then(response => {
      console.log(response);
    })
  }, [])
    return (
      <div>

      </div>
    )
}

    
    
    export default App;
    
    // }) .then( (result) => {
      // key: `d82034658ba4890d822655ea6603a5de`,
      // AppID = `70c46ccc`,
      
      