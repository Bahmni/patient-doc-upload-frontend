import React from "react";
import "./SearchButton.scss";
import { Search } from "carbon-components-react";
const SearchButton = () => {
  return (
    <div className="search-button-container">
      <Search
        size="lg"
        labelText="Search"
        placeholder="Search Patient Name or Patient ID"
        closeButtonLabelText="Clear search input"
        id="search-1"
        onChange={() => {}}
        onKeyDown={() => {}}
      />
    </div>
  );
};
export default SearchButton;
