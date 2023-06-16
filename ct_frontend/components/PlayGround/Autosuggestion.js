import React, { useState } from "react";
import Autosuggest from "react-autosuggest";

const Autosuggestion = ({ handleSuggestions }) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async (value) => {
    // Make an API call to fetch suggestions based on the input value
    // Replace 'your_api_endpoint' with the actual endpoint URL
    const response = await fetch(`http://127.0.0.1:8000/?filter=${value}`);
    const data = await response.json();
    console.log(data);
    const { filteredKeywords } = data;
    setSuggestions(filteredKeywords);
  };

  const renderSuggestion = (suggestion) => <div>{suggestion}</div>;

  const onSuggestionsFetchRequested = ({ value }) => {
    getSuggestions(value);
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (_, { suggestion }) => {
    setValue(suggestion);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue);
    handleSuggestions(newValue);
    getSuggestions(newValue);
  };

  const inputProps = {
    value,
    onChange,
    placeholder: "Type to get suggestions...",
  };

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={(suggestion) => suggestion}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
      theme={{
        input: "bg-transparent", // Apply transparent background to the input
        suggestionsContainer: "absolute mt-2", // Adjust the positioning of suggestions
      }}
    />
  );
};

export default Autosuggestion;
