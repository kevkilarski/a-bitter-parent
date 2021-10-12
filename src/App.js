import axios from "axios";

import { useState, useEffect } from "react";
import realtime from "./realtime";
import { onValue, push, ref, getDatabase } from 'firebase/database';

import { randomLetter, randomIndex } from "./utils";

import './styles.scss';
import SearchForm from "./SearchForm.js";
import FoodOutput from "./FoodOutput.js";

import { randomSugar } from "./utils";

import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

function App() {

  const [userText, setUserText] = useState('');
  const [error, setError] = useState('');
  const [userFood, setUserFood] = useState({});
  const [altFood, setAltFood] = useState({});
  const [food, setFood] = useState([]);


const handleChange = (event) => {
  setUserText(event.target.value);
}

const handleSubmit = (event) => {
  event.preventDefault();
  setError('');

  axios({
    headers: {
      "x-app-id": "7dae18ec",
      "x-app-key": "5a4b147254b31f911e70443e46a963bb",
    },
    method: "GET",
    url: `https://trackapi.nutritionix.com/v2/search/instant`,
    dataResponse: "json",
    params: {
      query: userText,
    },
  })
    .then((inputRes) => {
      return axios({
        headers: {
          "Content-Type": "application/json",
          "x-app-id": "7dae18ec",
          "x-app-key": "5a4b147254b31f911e70443e46a963bb",
        },
        data: {
          query: inputRes.data.common[0].food_name,
        },
        method: "POST",
        url: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        dataResponse: "json",
      });
    })
    .then((foodRes) => {
      setUserFood(foodRes.data.foods[0]);
      const searchFoodSugar = foodRes.data.foods[0].nf_sugars

      

      return axios({
        headers: {
          "Content-Type": "application/json",
          "x-app-id": "7dae18ec",
          "x-app-key": "5a4b147254b31f911e70443e46a963bb",
        },
        data: {
          query: `${randomLetter()}`,
          detailed: true,
          full_nutrients: {
            269: {
              lte: `${randomSugar(searchFoodSugar)}`
            }
          }
        },
        method: "POST",
        url: `https://trackapi.nutritionix.com/v2/search/instant`,
        dataResponse: "json",
      });
    })
    .then(suggestionRes => {
      const suggestions = suggestionRes.data.common;

      const suggestionIndex = randomIndex(suggestions);

      return axios({
        headers: {
          "Content-Type": "application/json",
          "x-app-id": "7dae18ec",
          "x-app-key": "5a4b147254b31f911e70443e46a963bb",
        },
        data: {
          query: suggestions[suggestionIndex].food_name,
        },
        method: "POST",
        url: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        dataResponse: "json",
      });
    })
    .then((altRes) => {
      setAltFood(altRes.data.foods[0]);











      
    })
    .catch((error)=>{
      setError(error)
    });
}




  useEffect(()=>{
    const dbRef = ref(realtime, '/pairs')
    onValue(dbRef, (snapshot)=>{
      snapshot.forEach((childSnapshot) => {
        setFood(childSnapshot.val())
      })

    })
  }, []);

  const savedPair = () => {
    const db = getDatabase()
    push(ref(db, 'pairs/'), [
      {
        userFood
      },
      {
        altFood
      }
    ])
    console.log(food);
  }


  return (


<Router>

    <div className="wrapper">
      <header className="header">
        <h1>A <span>Bitter</span> Parent</h1>
      </header>



      <Route exact path='/'>
      <section className="search">
        <SearchForm
          userText={userText}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        {/* <form>
          <label>Enter Text here:</label>
          <input  onChange={handleChange}/>
          <button>Submit</button>
        </form> */}



        <Link to="/savedPairs">
          <button>View Saved Pairs</button>
        </Link>



      </section>

      <main className="food">
        
        { error ? (
          <div>EAT</div>
        ): (
          null
        )
          }
          <p> <span>Hey kids!</span> Enter a sweet treat you’re craving into the search form above and we’ll suggest something that you and your parents can feel good about!
          </p>

          <FoodOutput userFood={userFood} altFood={altFood} savedPair={savedPair}/>

      </main>

      <footer className="footer">
        This is a footer
      </footer>
    </Route>

    <Route path='/savedPairs'>
      <main className="savedMain">
        {
          food.map((pair)=>{
            console.log(pair)
            // return (
            //   <div className="savedPair">
            //     <div className="savedUserfood">
            //       <p> {pair[0].food_name}</p>
            //     </div>

            //     <div className="savedAltFood">
            //     <p> {pair[1].food_name}</p>
            //     </div>

            //   </div>
            //   )
            })
          }
      </main>
    </Route>


    </div>
    
    </Router>
  );
}

export default App;
