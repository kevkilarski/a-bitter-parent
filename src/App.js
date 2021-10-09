import axios from "axios";
import { useEffect } from "react";

import './styles.scss';

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

  return (

    <div className="wrapper">
      <header className="header">
        <h1>A Bitter Parent</h1>
        <p>Chocolates and candy are such a nice treat, but they sometimes don’t provide what we need to stay healthy.  Our app is here to help!  Enter a treat you’re craving into the search form below and we’ll suggest something that will not only satisfy your sweet tooth but will also be a treat you, and your parents, can feel good about!
        </p>
      </header>

      <section className="search">
        Search Form
      </section>

      <main className="food">
        Food components
      </main>

      <footer className="footer">
        This is a footer
      </footer>


    </div>

  );
}

export default App;

