"use client";

import {useState, useEffect} from "react"; 
import { collection, onSnapshot } from "firebase/firestore"; 
import { db } from "../_utils/firebase";
import Item from './AddItemForm';

export default function SearchBar({setDailyFoodList, openPopup, selectedDate}) {
    const [query, setQuery] = useState("");
    const [foodItems, setFoodItems] = useState([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "FoodList"), (snapshot) => {
            const foodList = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setFoodItems(foodList);
        });
        return () => unsubscribe();
    }, []);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
      };

    const handleFocus = () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    };
    
    const filteredItems = foodItems.filter((item) =>
        item.name.toLowerCase().startsWith(query.toLowerCase())
      );
    
    return(
        <div className="m-2 p-2">
            <div className="relative">
                    <input
                        type="text"
                        placeholder="Search for a food item..."
                        className="input input-bordered input-primary p-2 rounded-lg w-full pr-10"
                        value={query}
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                    />
                    {query && (
                        <button
                            onClick={() => setQuery("")}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-primary focus:outline-none"
                        >
                            ✕
                        </button>
                    )}
                </div>
            {query && filteredItems.length === 0 && (
                <div className="text-center font-semibold mt-2">
                    No results found. <button className="text-md font-semibold  border-2 border-primary  p-1 px-3 mx-2 rounded-xl " onClick={openPopup}>Add new food item</button>
                </div>
            )}
            {query && filteredItems.map((food) => (
                <div key={food.id} className="flex items-center justify-between p-2 border-b-2">
                    <Item food={food} setDailyFoodList={setDailyFoodList} setQuery={setQuery} selectedDate={selectedDate}/>
                </div>
            ))}
        </div>
    );

}