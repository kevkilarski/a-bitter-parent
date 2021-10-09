const SearchForm = (props) => {

  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="formInput">Enter Text here:</label>
        <input 
          type="text"
          value={props.userText} 
          onChange={props.handleChange}
          id="formInput"
          placeholder="Carrot Muffin"
        />
        <button type="submit">Submit</button>
      </form>
    </>
  )

}

export default SearchForm;