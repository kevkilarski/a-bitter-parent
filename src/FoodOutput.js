import {useState} from 'react';

const FoodOutput = (props) => {

  const [comparing, setComparing] = useState(false);

  const handleClick = () => {
    setComparing(!comparing);
  }

  return (
    <section className="foodSection">

      {
        props.altFood.food_name ? (
          <div className="foodWrapper">
            <h2 className="foodTitle">{props.userFood.food_name}</h2>
            <div className="foodPicture">
              {
                props.userFood.photo ? (
                  <img src={props.userFood.photo.highres} alt={props.userFood.food_name}/> 
                ) : (
                  null
                )
              }
              </div>
              <p className="nutrient">Sugar: {props.userFood.nf_sugars}g</p>
              {
                comparing ? (
                  <>
                    <p className="nutrient">Calories: {Math.floor(props.userFood.nf_calories)}</p>
                    <p className="nutrient">Cholesterol: {props.userFood.nf_cholesterol}mg</p>
                    <p className="nutrient">Fibre: {props.userFood.nf_dietary_fiber}g</p>
                    <p className="nutrient">Sodium: {props.userFood.nf_sodium}g</p>
                    <p className="nutrient">Carbs: {props.userFood.nf_total_carbohydrate}g</p>
                    <p className="nutrient">Fat: {props.userFood.nf_total_fat}g</p>
                  </>
                ) : (
                  null
                )
              }
          </div>
        ) : (
          null
        )
      }

      { 
        props.altFood.food_name ? (
          <div className="foodButtons">
            <button className="foodButton" onClick={props.savedPair}>Save Pair</button>

            <button className="foodButton" onClick={handleClick}>Compare</button>
          </div>
        ) : (
          null
        )
      }

      {
        props.altFood.food_name ? (
          <div className="foodWrapper">
            <h2 className="foodTitle">{props.altFood.food_name}</h2>
            <div className="foodPicture">
              {
                props.altFood.photo ? <img src={props.altFood.photo.highres} alt={props.altFood.food_name}/> : null
              }
            </div>
            <p className="nutrient">Sugar: {props.altFood.nf_sugars}g {
              props.userFood.nf_sugars > props.altFood.nf_sugars ? (
                <i className="fas fa-check-circle"></i>
              ) : props.userFood.nf_sugars < props.altFood.nf_sugars ? (
                <i className="fas fa-times-circle"></i>
              ) : (
                <i className="fas fa-pause-circle"></i>
              ) 
            }</p>
            {
              comparing ? (
                <>
                  <p className="nutrient">Calories: {Math.floor(props.altFood.nf_calories)} {
                    props.userFood.nf_calories > props.altFood.nf_calories ? (
                      <i className="fas fa-check-circle"></i>
                    ) : props.userFood.nf_calories < props.altFood.nf_calories ? (
                      <i className="fas fa-times-circle"></i>
                    ) : (
                      <i className="fas fa-pause-circle"></i>
                    ) 
                  }</p>
                  <p className="nutrient">Cholesterol: {props.altFood.nf_cholesterol}mg {
                    props.userFood.nf_cholesterol > props.altFood.nf_cholesterol ? (
                      <i className="fas fa-check-circle"></i>
                    ) : props.userFood.nf_cholesterol < props.altFood.nf_cholesterol ? (
                      <i className="fas fa-times-circle"></i>
                    ) : (
                      <i className="fas fa-pause-circle"></i>
                    ) 
                  }</p>
                  <p className="nutrient">Fibre: {props.altFood.nf_dietary_fiber}g {
                    props.userFood.nf_dietary_fiber < props.altFood.nf_dietary_fiber ? (
                      <i className="fas fa-check-circle"></i>
                    ) : props.userFood.nf_dietary_fiber > props.altFood.nf_dietary_fiber ? (
                      <i className="fas fa-times-circle"></i>
                    ) : (
                      <i className="fas fa-pause-circle"></i>
                    ) 
                  }</p>
                  <p className="nutrient">Sodium: {props.altFood.nf_sodium}g {
                    props.userFood.nf_sodium > props.altFood.nf_sodium ? (
                      <i className="fas fa-check-circle"></i>
                    ) : props.userFood.nf_sodium < props.altFood.nf_sodium ? (
                      <i className="fas fa-times-circle"></i>
                    ) : (
                      <i className="fas fa-pause-circle"></i>
                    ) 
                  }</p>
                  <p className="nutrient">Carbs: {props.altFood.nf_total_carbohydrate}g {
                    props.userFood.nf_total_carbohydrate > props.altFood.nf_total_carbohydrate ? (
                      <i className="fas fa-check-circle"></i>
                    ) : props.userFood.nf_total_carbohydrate < props.altFood.nf_total_carbohydrate ? (
                      <i className="fas fa-times-circle"></i>
                    ) : (
                      <i className="fas fa-pause-circle"></i>
                    ) 
                  }</p>
                  <p className="nutrient">Fat: {props.altFood.nf_total_fat}g {
                    props.userFood.nf_total_fat > props.altFood.nf_total_fat ? (
                      <i className="fas fa-check-circle"></i>
                    ) : props.userFood.nf_total_fat < props.altFood.nf_total_fat ? (
                      <i className="fas fa-times-circle"></i>
                    ) : (
                      <i className="fas fa-pause-circle"></i>
                    ) 
                  }</p>
                </>
              ) : (
                null       
              )       
            }       
          </div>       
        ) : (       
          null       
        )       
      }       
    
    </section>       
  )

}

export default FoodOutput;