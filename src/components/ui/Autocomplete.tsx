import { useEffect, useRef, useState } from "react";

import { Country } from "../../ts/interfaces/Country.interface";

import useAutocomplete from "../../hooks/useAutocomplete";

interface Props {
  data: Country[];
}

const Autocomplete = ({ data }: Props) => {
  const inputSearchRef = useRef<HTMLInputElement>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const divRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputSearchRef.current) {
      inputSearchRef.current.focus();
    }
  }, []);

  const {
    isVisible,
    searchedValue,
    suggestions,
    selectedSuggestion,
    activeSuggestion,
	
    handleChange,
    handleKeyDown,
    handleClick,
  } = useAutocomplete(data, inputSearchRef.current);

  return (
    <div className="completeContainer ">
      <input
        placeholder="Search your Country"
        value={searchedValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputSearchRef}
		onFocus={()=> setInputFocused(true)}
		onBlur={() => setTimeout(() => setInputFocused(false), 100)}
        color="secondary"
      />

      {!suggestions.length &&
      searchedValue.length &&
      !selectedSuggestion.length ? (
        <div className="itemListNot">
          <h1>No results</h1>
        </div>
      ) : (
       inputFocused && searchedValue && isVisible && (
          <div className="select-option" ref={divRef}>
            {suggestions.map(({ name, flags }: Country, index) => (
              <div
                key={index}
                className={`itemList ${
                  index === activeSuggestion - 1 ? "activeItem" : ""
                }`}
                onClick={() => handleClick(name.common)}
              >
                <div>
                  <img className="flag-img" src={flags.svg} />
                  {name.common}
                </div>
              </div>
            ))}
          </div>
        )
      )}

      <p className="textCo">Country selected: {selectedSuggestion}</p>
    </div>
  );
};

export default Autocomplete;
