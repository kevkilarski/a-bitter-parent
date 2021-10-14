import axios from "axios";

import { useState, useEffect } from "react";
import realtime from "./realtime";
import { onValue, push, ref, getDatabase } from "firebase/database";

import { randomLetter, randomIndex } from "./utils";

import "./styles.scss";
import SearchForm from "./SearchForm.js";
import FoodOutput from "./FoodOutput.js";

import { randomSugar } from "./utils";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  const [userText, setUserText] = useState("");
  const [userFood, setUserFood] = useState({});
  const [altFood, setAltFood] = useState({});
  const [food, setFood] = useState([]);

  //  Store user input in state
  const handleChange = (event) => {
    setUserText(event.target.value);
  };

  // Run api call on submit
  const handleSubmit = (event) => {
    event.preventDefault();

    // 1st API call: Takes user input to use as query and returns 2 arrays (Common & Branded) of 20 items. 

    // 2nd API call: We use the first item in the common food array as our query for this call to get nutrients data on the user searched food.

    //  3rd API call: We take the sugar from the user selected food and make this call with a random letter value to get a random suggestion food with either less than 5 or 10g of sugar

    // 4th API call: Use the suggested food as out query in this call to get its nutrients data

    // 1st API call
    axios({
      headers: {
        "x-app-id": "6a904ca1",
        "x-app-key": "c60b899733e952e93a3c38f50990f697",
      },
      method: "GET",
      url: `https://trackapi.nutritionix.com/v2/search/instant`,
      dataResponse: "json",
      params: {
        query: userText,
      },
    })
      .then((inputRes) => {

        if (!inputRes.data.common[0]) {
          throw new Error("Food not found - Please try again!");
        }

        // 2nd API call
        return axios({
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "6a904ca1",
            "x-app-key": "c60b899733e952e93a3c38f50990f697",
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

        // Set user food to state with nutrients data
        setUserFood(foodRes.data.foods[0]);
        const searchFoodSugar = foodRes.data.foods[0].nf_sugars;

        const sugarCheck = randomSugar(searchFoodSugar);

        if (sugarCheck <= 0) {
          throw new Error(
            `You picked ${foodRes.data.foods[0].food_name}. That is healthy! Eat this, you spoiled brat!`
          );
        }

        // 3rd API call
        return axios({
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "6a904ca1",
            "x-app-key": "c60b899733e952e93a3c38f50990f697",
          },
          data: {
            query: `${randomLetter()}`,
            detailed: true,
            full_nutrients: {
              269: {
                lte: `${sugarCheck}`,
              },
            },
          },
          method: "POST",
          url: `https://trackapi.nutritionix.com/v2/search/instant`,
          dataResponse: "json",
        });
      })
      .then((suggestionRes) => {

        const suggestions = suggestionRes.data.common;

        const suggestionIndex = randomIndex(suggestions);

        // 4th API call
        return axios({
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "6a904ca1",
            "x-app-key": "c60b899733e952e93a3c38f50990f697",
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
        // Set suggested food to state with nutrients data
        setAltFood(altRes.data.foods[0]);
      })
      .catch((error) => {
        // If error reset user, suggested food & user text
        // Alert error message or customer error message from manually thrown errors in API calls 1 & 2
        setUserFood({});
        setAltFood({});
        setUserText("");
        alert(error.message);
      });
  };

  // Set up subscription to firebase to get food pairs on read or change and set to state
  useEffect(() => {
    const dbRef = ref(realtime, "/pairs");

    onValue(dbRef, (snapshot) => {
      const ourDB = snapshot.val();

      const newArray = [];

      // Format each pair object before setting to state
      for (let item in ourDB) {
        const objectCollection = {
          key: item,
          userFoodName: ourDB[item][0].food_name,
          userPic: ourDB[item][0].photo.highres,
          altFoodName: ourDB[item][1].food_name,
          altPic: ourDB[item][1].photo.highres,
        };

        // Save to object to new array
        newArray.push(objectCollection);
      }

      // Set new array to state
      setFood(newArray);
    });
  }, []);

  // On click for save pair button, saves pair to firebase
  const savedPair = () => {
    const db = getDatabase();
    push(ref(db, "pairs/"), [userFood, altFood]);
  };

  // On click for clear button to clear main content
  const onClear = () => {
    setUserFood({});
    setAltFood({});
    setUserText("");
  };

  return (
    <Router>
      <div className="wrapper">

        {/* HEADER */}
        <header className="header">
          <h1>
            A <span>Bitter</span> Parent
          </h1>
        </header>

        {/* HOME - DISPLAY ON LOAD */}
        <Route exact path="/">
          <section className="search">

            <SearchForm
              userText={userText}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />

            <div className="mainButtons">

              {/* LINK TO SAVED PAIRS */}
              <Link className="pairsLink" to="/savedPairs">
                <button className="foodButton">View Saved Pairs</button>
              </Link>

              <button className="foodButton" onClick={onClear}>
                Clear
              </button>
            </div>
          </section>

          <main className="food">
            <p>
              {" "}
              <span>Hey kids!</span> Enter a sweet treat you’re craving into the
              search form above and we’ll suggest something that you and your
              parents can feel good about!
            </p>

            <FoodOutput
              userFood={userFood}
              altFood={altFood}
              savedPair={savedPair}
            />
          </main>

          <footer className="footer">
            Created by Zeynab Manafova, Lou Saint-Andre, Cam Remesz, and Kevin
            Kilarski at Juno College using the Nutritionix API and Firebase.
          </footer>
        </Route>

        {/* SAVED PAIRS ROUTE */}
        <Route path="/savedPairs">
          <main className="savedMain">
            <h2>Your Saved Pairs</h2>

            <Link className="homeLink" to="/">
              <button className="homeButton">Home</button>
            </Link>

            {/* DISPLAY SAVED PAIRS FROM STATE */}
            <ul>
              {food.map((pair) => {
                return (
                  <li key={pair.key} className="savedPair">
                    <div className="savedUserFood">
                      <p>{pair.userFoodName}</p>
                      <div className="savedUserPic">
                        {pair.userPic ? (
                          <img src={pair.userPic} alt={pair.userFoodName} />
                        ) : null}
                      </div>
                    </div>

                    <div className="savedAltFood">
                      <p>{pair.altFoodName}</p>
                      <div className="savedAltPic">
                        {pair.altPic ? (
                          <img src={pair.altPic} alt={pair.altFoodName} />
                        ) : null}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </main>
        </Route>
      </div>
    </Router>
  );
}

export default App;
