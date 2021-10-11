const FoodOutput = (props) => {

  // console.log(props.userFood.photo.highres);

  return (
    <section className="foodSection">

      <div className="foodWrapper">
        <h2>Food Name: {props.userFood.food_name}</h2>
        <p>Sugar: {props.userFood.nf_sugars}</p>
        <div className="foodPicture">
          {
            props.userFood.photo ? <img src={props.userFood.photo.highres} alt={props.userFood.food_name}/> : null
          }
        </div>
      </div>

      <div className="foodWrapper">
        <h2>Food Name: {props.altFood.food_name}</h2>
        <p>Sugar: {props.altFood.nf_sugars}</p>
        <div className="foodPicture">
          {
            props.altFood.photo ? <img src={props.altFood.photo.highres} alt={props.altFood.food_name}/> : null
          }
        </div>
      </div>

    </section>
  )

}

export default FoodOutput;