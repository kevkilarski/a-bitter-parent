import axios from "axios";

import { useState, useEffect } from "react";
import realtime from "./realtime";
import { onValue, ref } from 'firebase/database';

import { randomLetter, randomIndex } from "./utils";

import './styles.scss';
import SearchForm from "./SearchForm.js";
import FoodOutput from "./FoodOutput.js";

import { randomSugar } from "./utils";

function App() {

  const [userText, setUserText] = useState('');
  const [error, setError] = useState('');
  const [userFood, setUserFood] = useState({});
  const [altFood, setAltFood] = useState({});

const handleChange = (event) => {
  setUserText(event.target.value);
}

const handleSubmit = (event) => {
  event.preventDefault();
  setError('');
  console.log("You submitted!!!!")

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

      console.log('Input Res:', inputRes.data);

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
      console.log('FoodRes:', foodRes.data.foods[0])

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

      console.log("3rd API", suggestions[suggestionIndex]);



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

      console.log("4th API", altRes.data.foods[0]);
      setAltFood(altRes.data.foods[0]);











      
    })
    .catch((error)=>{
      setError(error)
    });
}


  const [food, setFood] = useState([]);

  useEffect(()=>{
    const dbRef = ref(realtime)
    onValue(dbRef, (snapshot)=>{
      const foodPairs = snapshot.val()
      console.log(foodPairs)
      setFood(foodPairs);
    })
  }, []);

  return (

    <div className="wrapper">
      <header className="header">
        <h1>A <span>Bitter</span> Parent</h1>
      </header>

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

        <button>View Saved Pairs</button>
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

          <FoodOutput userFood={userFood} altFood={altFood}/>

      </main>

      <footer className="footer">
        This is a footer
      </footer>


    </div>

  );
}

export default App;
