import React, { useEffect } from 'react';

const SearchBar = ({ searchQuery, setQuery, SearchPlaceholder, findProducts, setFindProducts }) => {

  const handleSearch = () => {
  return setFindProducts(true)
  };

  const handleKeyPress = (e) => {
    if(e.key == 'Enter' || e.key == 'Return'){
    return setFindProducts(true)
    }
    };


  const handleSearchChange = (e)=> {
    setFindProducts(false)
    setQuery(e.target.value)
  }

  return (
    <div className="flex items-center justify-center space-x-2  w-full">
      <input
        className="border border-gray-300 p-2 rounded text-xs w-2/6"
        type="search"
        placeholder={SearchPlaceholder}
      value={searchQuery}
        onChange={(e) => handleSearchChange(e)}
        onKeyDown={(e) => handleKeyPress(e)}
      />
      <button
        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
        onClick={handleSearch}
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;