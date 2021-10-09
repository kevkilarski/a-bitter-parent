import axios from "axios";
import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    axios({
      headers: {
        "x-app-id": "70c46ccc",
        "x-app-key": "d82034658ba4890d822655ea6603a5de",
      },
      method: "GET",
      url: `https://trackapi.nutritionix.com/v2/search/instant`,
      dataResponse: "json",
      params: {
        query: "cheezies",
      },
    })
      .then((res) => {

        console.log(res.data);

        return axios({
          headers: {
            "Content-Type": "application/json",
            "x-app-id": "70c46ccc",
            "x-app-key": "d82034658ba4890d822655ea6603a5de",
          },
          data: {
            query: res.data.common[0].food_name,
          },
          method: "POST",
          url: `https://trackapi.nutritionix.com/v2/natural/nutrients`,
          dataResponse: "json",
        });
      })
      .then((res) => {
        console.log(res.data);
      });
  }, []);

  return <div></div>;
}

export default App;

// }) .then( (result) => {
// key: `d82034658ba4890d822655ea6603a5de`,
// AppID = `70c46ccc`,
