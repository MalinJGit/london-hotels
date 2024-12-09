import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void; // Funktion som skickar söksträngen tillbaka till föräldrakomponenten
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery); // Skicka söksträngen till föräldrakomponenten
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Sök hotell..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Sök</button>
    </div>
  );
};

export default SearchBar;