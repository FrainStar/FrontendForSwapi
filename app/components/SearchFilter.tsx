"use client";

import React, { useState } from 'react';

interface SearchFilterProps {
    onSearch: (searchTerm: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="flex justify-center">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="input input-bordered w-full max-w-xs mr-2"
            />
            <button onClick={handleSearch} className="btn btn-primary">
                Search
            </button>
        </div>
    );
};

export default SearchFilter;