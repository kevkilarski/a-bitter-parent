import axios from "axios";

import { useState, useEffect } from "react";
import realtime from "./realtime";
import { onValue, ref } from 'firebase/database';

import { randomLetter, randomIndex } from "./utils";

import './styles.scss';
import SearchForm from "./SearchForm.js";

import { randomSugar } from "./utils";

function App() {

  const [userText, setUserText] = useState('');
  const [error, setError] = useState('');

const handleChange = (event) => {
  setUserText(event.target.value);
}

const handleSubmit = (event) => {
  event.preventDefault();
  setError('');
  console.log("You submitted!!!!")

  axios({
    headers: {
      "x-app-id": "70c46ccc",
      "x-app-key": "d82034658ba4890d822655ea6603a5de",
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
          "x-app-id": "70c46ccc",
          "x-app-key": "d82034658ba4890d822655ea6603a5de",
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
      const searchFoodSugar = foodRes.data.foods[0].nf_sugars

      

      return axios({
        headers: {
          "Content-Type": "application/json",
          "x-app-id": "70c46ccc",
          "x-app-key": "d82034658ba4890d822655ea6603a5de",
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

      console.log(suggestions[suggestionIndex]);

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

console.log(food);

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
          <p> <span>Chocolates</span> and <span>candies</span> are such a nice treat, but they sometimes don’t provide what we need to stay <span>healthy</span>.  Our app is here to help!  Enter a treat you’re craving into the search form below and we’ll <span>suggest</span> something that will not only satisfy your sweet tooth but will also be a treat you, and your parents, can <span>feel good</span> about!
        </p>
      </main>

      <footer className="footer">
        This is a footer
      </footer>


    </div>

  );
}

export default App;
