import { useState } from "react";

import { lessMore } from "./utils";

const FoodOutput = (props) => {
  const [comparing, setComparing] = useState(false);

  // CHANGE BOOLEAN IN STATE TO RENDER DROPDOWN OF NUTRIENTS ON CLICK
  const handleClick = () => {
    setComparing(!comparing);
  };

  return (
    <section className="foodSection">
      {/* ONLY RENDER SAVE AND COMPARE BUTTONS IF A PROPER SUGGESTED FOOD HAS RETURNED FROM THE API CALL */}
      {props.altFood.food_name ? (
        <div className="foodButtons">
          <button className="foodButton" onClick={props.savedPair}>
            Save Pair
          </button>

          <button className="foodButton" onClick={handleClick}>
            Compare
          </button>
        </div>
      ) : null}

      {/* ONLY IF THERE IS A RETURNED SUGGESTED FOOD RENDER USER SELECTION ON LEFT AND SUGGESTED FOOD ON RIGHT */}
      <div className="foodContainer">
        {/* USER SELECTION */}
        {props.altFood.food_name ? (
          <div className="foodWrapper">
            <h2 className="foodTitle">{props.userFood.food_name}</h2>
            <div className="foodPicture">
              {props.userFood.photo ? (
                <img
                  src={props.userFood.photo.highres}
                  alt={props.userFood.food_name}
                />
              ) : null}
            </div>
            <p className="nutrient">Sugar: {props.userFood.nf_sugars}g </p>

            {/* IF COMPARE BUTTON IS CLICKED DISPLAY ADDITIONAL NUTRIENTS */}
            {comparing ? (
              <>
                <p className="nutrient">
                  Calories: {Math.floor(props.userFood.nf_calories)}{" "}
                </p>
                <p className="nutrient">
                  Cholesterol: {props.userFood.nf_cholesterol}mg{" "}
                </p>
                <p className="nutrient">
                  Fibre: {props.userFood.nf_dietary_fiber}g{" "}
                </p>
                <p className="nutrient">Sodium: {props.userFood.nf_sodium}g </p>
                <p className="nutrient">
                  Carbs: {props.userFood.nf_total_carbohydrate}g{" "}
                </p>
                <p className="nutrient">Fat: {props.userFood.nf_total_fat}g </p>
              </>
            ) : null}
          </div>
        ) : null}

        {/* SUGGESTED FOOD */}
        {props.altFood.food_name ? (
          <div className="foodWrapper">
            <h2 className="foodTitle">{props.altFood.food_name}</h2>
            <div className="foodPicture">
              {props.altFood.photo ? (
                <img
                  src={props.altFood.photo.highres}
                  alt={props.altFood.food_name}
                />
              ) : null}
            </div>

            {/* IF SUGGESTED FOOD HAS MORE OF A BAD NUTRIENT RENDER AN "X", IF LESS OF A BAD NUTRIENT RENDER A CHECKMARK, IF EQUAL RENDER AN "=". ONLY FOR SUGGESTED FOOD */}

            {/* USE LESSMORE UTILITY FUNCTION TO CONDITIONALLY RENDER HOW MUCH MORE OR LESS OF THAT INGREDIENT ONLY FOR SUGGESTED FOOD */}
            <p className="nutrient">
              Sugar: {props.altFood.nf_sugars}g{" "}
              {props.userFood.nf_sugars > props.altFood.nf_sugars ? (
                <i className="fas fa-check-circle"></i>
              ) : props.userFood.nf_sugars < props.altFood.nf_sugars ? (
                <i className="fas fa-times-circle"></i>
              ) : (
                <i className="fas fa-pause-circle"></i>
              )}{" "}
              {lessMore(props.altFood.nf_sugars, props.userFood.nf_sugars, "g")}
            </p>
            {comparing ? (
              <>
                <p className="nutrient">
                  Calories: {Math.floor(props.altFood.nf_calories)}{" "}
                  {props.userFood.nf_calories > props.altFood.nf_calories ? (
                    <i className="fas fa-check-circle"></i>
                  ) : props.userFood.nf_calories < props.altFood.nf_calories ? (
                    <i className="fas fa-times-circle"></i>
                  ) : (
                    <i className="fas fa-pause-circle"></i>
                  )}{" "}
                  {lessMore(
                    props.altFood.nf_calories,
                    props.userFood.nf_calories
                  )}
                </p>
                <p className="nutrient">
                  Cholesterol: {props.altFood.nf_cholesterol}mg{" "}
                  {props.userFood.nf_cholesterol >
                  props.altFood.nf_cholesterol ? (
                    <i className="fas fa-check-circle"></i>
                  ) : props.userFood.nf_cholesterol <
                    props.altFood.nf_cholesterol ? (
                    <i className="fas fa-times-circle"></i>
                  ) : (
                    <i className="fas fa-pause-circle"></i>
                  )}{" "}
                  {lessMore(
                    props.altFood.nf_cholesterol,
                    props.userFood.nf_cholesterol,
                    "mg"
                  )}
                </p>
                <p className="nutrient">
                  Fibre: {props.altFood.nf_dietary_fiber}g{" "}
                  {props.userFood.nf_dietary_fiber <
                  props.altFood.nf_dietary_fiber ? (
                    <i className="fas fa-check-circle"></i>
                  ) : props.userFood.nf_dietary_fiber >
                    props.altFood.nf_dietary_fiber ? (
                    <i className="fas fa-times-circle"></i>
                  ) : (
                    <i className="fas fa-pause-circle"></i>
                  )}{" "}
                  {lessMore(
                    props.altFood.nf_dietary_fiber,
                    props.userFood.nf_dietary_fiber,
                    "g"
                  )}
                </p>
                <p className="nutrient">
                  Sodium: {props.altFood.nf_sodium}g{" "}
                  {props.userFood.nf_sodium > props.altFood.nf_sodium ? (
                    <i className="fas fa-check-circle"></i>
                  ) : props.userFood.nf_sodium < props.altFood.nf_sodium ? (
                    <i className="fas fa-times-circle"></i>
                  ) : (
                    <i className="fas fa-pause-circle"></i>
                  )}{" "}
                  {lessMore(props.altFood.nf_sodium, props.userFood.nf_sodium)}
                </p>
                <p className="nutrient">
                  Carbs: {props.altFood.nf_total_carbohydrate}g{" "}
                  {props.userFood.nf_total_carbohydrate >
                  props.altFood.nf_total_carbohydrate ? (
                    <i className="fas fa-check-circle"></i>
                  ) : props.userFood.nf_total_carbohydrate <
                    props.altFood.nf_total_carbohydrate ? (
                    <i className="fas fa-times-circle"></i>
                  ) : (
                    <i className="fas fa-pause-circle"></i>
                  )}{" "}
                  {lessMore(
                    props.altFood.nf_total_carbohydrate,
                    props.userFood.nf_total_carbohydrate,
                    "g"
                  )}
                </p>
                <p className="nutrient">
                  Fat: {props.altFood.nf_total_fat}g{" "}
                  {props.userFood.nf_total_fat > props.altFood.nf_total_fat ? (
                    <i className="fas fa-check-circle"></i>
                  ) : props.userFood.nf_total_fat <
                    props.altFood.nf_total_fat ? (
                    <i className="fas fa-times-circle"></i>
                  ) : (
                    <i className="fas fa-pause-circle"></i>
                  )}{" "}
                  {lessMore(
                    props.altFood.nf_total_fat,
                    props.userFood.nf_total_fat,
                    "g"
                  )}
                </p>
              </>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default FoodOutput;
