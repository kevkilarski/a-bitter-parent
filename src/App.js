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

  const [userFood, setUserFood] = useState({});
  const [altFood, setAltFood] = useState({});
  const [food, setFood] = useState([]);


const handleChange = (event) => {
  setUserText(event.target.value);
}

const handleSubmit = (event) => {
  event.preventDefault();

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

      console.log("1st call", inputRes);

      if (!inputRes.data.common[0]) {
        throw new Error ("Food not found - Please try again!")
      }

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

      console.log("2nd call", foodRes);

      setUserFood(foodRes.data.foods[0]);
      const searchFoodSugar = foodRes.data.foods[0].nf_sugars

      const sugarCheck = randomSugar(searchFoodSugar);

      if (sugarCheck <= 0) {
        throw new Error (`You picked ${foodRes.data.foods[0].food_name}. That is healthy! Eat this, you spoiled brat!`)
      }

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
              lte: `${sugarCheck}`
            }
          }
        },
        method: "POST",
        url: `https://trackapi.nutritionix.com/v2/search/instant`,
        dataResponse: "json",
      });
    })
    .then(suggestionRes => {

      console.log("3rd call", suggestionRes);

      
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

      console.log("4th call", altRes.status);











      
    })
    .catch((error)=>{
      setUserFood({});
      setAltFood({});
      setUserText('');
      alert(error.message);
      console.log(error.message);
    });
}








  useEffect(()=>{
    const dbRef = ref(realtime, '/pairs')

    onValue(dbRef, (snapshot)=>{

      console.log("My Snapshot!", snapshot.val());

      const ourDB = snapshot.val();

      const newArray = [];

      for (let item in ourDB) {
        const objectCollection = {
          key: item,
          userFoodName: ourDB[item][0].food_name,
          userPic: ourDB[item][0].photo.highres,
          altFoodName: ourDB[item][1].food_name,
          altPic: ourDB[item][1].photo.highres,
        }

      newArray.push(objectCollection);
      console.log("MY ARRAY", newArray);
      }
      
      setFood(newArray);
    
    })


}, []);



  const savedPair = () => {
    const db = getDatabase()
    push(ref(db, 'pairs/'), [
        userFood,
        altFood
    ])
    console.log(food);
  }

  const onClear = () => {
  setUserFood({});
  setAltFood({});
  setUserText('');
  };
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

        <div className="mainButtons">

          <Link className="pairsLink" to="/savedPairs">
            <button className="foodButton">View Saved Pairs</button>
          </Link>

          <button className="foodButton" onClick={onClear}>Clear</button>

        </div>

      </section>

      <main className="food">
        
   
          <p> <span>Hey kids!</span> Enter a sweet treat you’re craving into the search form above and we’ll suggest something that you and your parents can feel good about!
          </p>

          <FoodOutput userFood={userFood} altFood={altFood} savedPair={savedPair}/>

      </main>

      <footer className="footer">
        Created by Zeynab Manafova, Lou Saint-Andre, Cam Remesz, and Kevin Kilarski at Juno College using the Nutritionix API and Firebase.
      </footer>
    </Route>

    <Route path='/savedPairs'>
    <main className="savedMain">
      
      <h2>Your Saved Pairs</h2>

      <Link className="homeLink" to="/">
        <button className="homeButton" >Home</button>
      </Link>

        <ul>
        {
          
          food.map((pair)=>{
            return (
              <li key={pair.key} className="savedPair">

                <div className="savedUserFood">
                  <p>{pair.userFoodName}</p>
                  <div className="savedUserPic">
                    {
                      pair.userPic ? <img src={pair.userPic} alt={pair.userFoodName} /> : null
                    }
                  </div>
                </div>

                <div className="savedAltFood">
                  <p>{pair.altFoodName}</p>
                  <div className="savedAltPic">
                    {
                      pair.altPic ? <img src={pair.altPic} alt={pair.altFoodName} /> : null
                    }
                  </div>
                </div>

              </li>
              )
            })
            
          }
          </ul>
      </main>
    </Route>


    </div>
    
    </Router>
  );
}

export default App;
