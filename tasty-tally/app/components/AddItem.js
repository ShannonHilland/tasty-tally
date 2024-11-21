"use client";

import React, { useState } from "react";

const AddItem = () => {
  const [query, setQuery] = useState("");
  const [itemList] = useState([
    "Apple", "Banana", "Orange", "Grapes", "Strawberry", "Blueberry",
    "Mango", "Watermelon", "Pineapple", "Kiwi"
  ]); //will need to retrieve list from API
  const [selectedItems, setSelectedItems] = useState([]);

  // Handle typing in the search bar
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Handle adding an item to the selected list
  const handleItemClick = (item) => {
    if (!selectedItems.includes(item)) {
      setSelectedItems([...selectedItems, item]); //i think will break this into two components. This one to add, the other one to display the list
    }
  };

  // Filter the list of items based on the query
  const filteredItems = itemList.filter((item) =>
    item.toLowerCase().startsWith(query.toLowerCase())
  );

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Add Item</h2>

      {/* Search Bar */}
      <input
        type="text"
        className="border rounded w-full p-2 mb-4"
        placeholder="Search for an item..."
        value={query}
        onChange={handleInputChange}
      />

      {/* Searchable List (only visible when typing) */}
      {query && (
        <ul className="border rounded p-2 max-h-48 overflow-auto mb-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => (
              <li
                key={index}
                className="cursor-pointer p-2 hover:bg-blue-100"
                onClick={() => handleItemClick(item)}
              >
                {item}
              </li>
            ))
          ) : (
            <p className="text-gray-500">No items found</p>
          )}
        </ul>
      )}

      {/* Selected Items */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Selected Items:</h3>
        <ul className="list-disc pl-5">
          {selectedItems.length > 0 ? (
            selectedItems.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))
          ) : (
            <p className="text-gray-500">No items selected yet.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AddItem;

