"use client";
import {useState} from "react"; 
import foodList from './foodList';
import Item from './AddItemForm';
// this is where the api food would be called, search through the available food

export default function SearchBar({setDailyFoodList, openPopup}) {
    const [query, setQuery] = useState("");
    const foodItems = [...foodList];

    const handleInputChange = (e) => {
        setQuery(e.target.value);
      };
    
    const filteredItems = foodItems.filter((item) =>
        item.name.toLowerCase().startsWith(query.toLowerCase())
      );
    
    return(
        <div className="m-2 p-2">
            <input
                type="text"
                placeholder="Search to add a food item..."
                className="border-2 border-gray-300 p-2 rounded-lg w-full"
                value={query}
                onChange={handleInputChange}
            />
            {query && filteredItems.length === 0 && (
                <div className="text-center font-semibold mt-2">
                    No results found. <button className="text-md font-semibold  border-2 border-primary  p-1 px-3 mx-2 rounded-xl " onClick={openPopup}>Add new food item</button>
                </div>
            )}
            {query && filteredItems.map((food) => (
                <div key={food.id} className="flex items-center justify-between p-2 border-b-2">
                    <Item food={food} setDailyFoodList={setDailyFoodList} setQuery={setQuery}/>
                </div>
            ))}
        </div>
    );

}