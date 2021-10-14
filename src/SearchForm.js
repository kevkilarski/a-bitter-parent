const SearchForm = (props) => {
  return (
    <>
      <form onSubmit={props.handleSubmit}>
        <label htmlFor="formInput"></label>
        <input
          className="input"
          type="text"
          value={props.userText}
          onChange={props.handleChange}
          id="formInput"
          placeholder="Choose your Food"
          required
        />
        <button type="submit" className="submitButton">
          Submit
        </button>
      </form>
    </>
  );
};

export default SearchForm;
