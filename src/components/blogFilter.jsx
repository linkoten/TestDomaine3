'use client'
import React, { useState } from 'react';


function BlogFilter({ options, initialFilter, onFilterChange, page }) {
  const [selectedFilter, setSelectedFilter] = useState(initialFilter);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setSelectedFilter(newFilter);
    onFilterChange(newFilter);
  };

  return (
    <div className=' flex justify-center items-center'>
      <label htmlFor="filterSelect"></label>
      
      <select
        className='flex h-10 w-1/2 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1'
        id="filterSelect"
        value={selectedFilter}
        onChange={handleFilterChange}
      >
        <option value=""
        className='font-style: font-semibold italic text-left '>All Articles</option>
        {options.map((option) => (
          <option
          className='font-style: font-semibold italic text-left ' 
          key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default BlogFilter;
