import React, { useState } from "react";

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-center mt-4">
      <input
        type="text"
        className="form-control w-50 me-2"
        placeholder="Enter A Food Name (For Example: Chicken)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
