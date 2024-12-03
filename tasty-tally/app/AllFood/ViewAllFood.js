"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore"; 
import { db } from "../_utils/firebase";

export default function ViewAllFood() {
    const [query, setQuery] = useState("");
    const [sortOption, setSortOption] = useState("alphabetical"); 
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

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // Filter/sort
    const filteredItems = foodItems
        .filter((item) => {
            return item.name.toLowerCase().includes(query.toLowerCase());
        })
        .sort((a, b) => {
            if (sortOption === "low-high") {
                return a.points - b.points;
            }
            if (sortOption === "high-low") {
                return b.points - a.points;
            }
            if (sortOption === "zero-points") {
                return a.points === 0 ? -1 : b.points === 0 ? 1 : 0;
            }
            if (sortOption === "alphabetical") {
                return a.name.localeCompare(b.name); 
            }
            return 0; 
        });

    return (
        <div className="flex justify-center">
            <div className="p-4 w-full max-w-screen-md">
                {/* Search Bar and Sort Dropdown */}
                <div className="flex items-center justify-between gap-4 mb-4">
                    <div className="relative flex-grow">
                        <input
                            type="text"
                            placeholder="Search for a food item..."
                            className="input input-bordered input-primary p-2 rounded-lg w-full pr-10"
                            value={query}
                            onChange={handleInputChange}
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
                    <select
                        className="select select-primary p-2 rounded-lg flex-shrink-0 w-auto"
                        value={sortOption}
                        onChange={handleSortChange}
                    >
                        <option value="alphabetical">Sort By: Alphabetical</option>
                        <option value="low-high">Points: Low to High</option>
                        <option value="high-low">Points: High to Low</option>
                        <option value="zero-points">Zero Points</option>
                    </select>
                </div>

                {/* Food List */}
                {filteredItems.length === 0 ? (
                    <div className="text-center font-semibold mt-2">
                        No results found.
                    </div>
                ) : (
                    filteredItems.map((food) => (
                        <div key={food.id} className="collapse bg-base-200 m-1">
                            <input type="checkbox" />
                            <div className="flex justify-between collapse-title text-xl font-medium">
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold">{food.name}</p>
                                </div>
                                <div className="flex items-center">
                                    <p className="text-lg font-semibold border-2 border-primary p-1 px-3 mx-2 rounded-xl">
                                        {food.points}
                                    </p>
                                </div>
                            </div>
                            <div className="collapse-content flex justify-between">
                                <div>
                                    <p>Calories: {food.calories}</p>
                                    <p>Saturated Fat: {food.saturatedFat}</p>
                                    <p>Sugar: {food.sugar}</p>
                                    <p>Protein: {food.protein}</p>
                                    <p>Serving Size: {food.servingSize}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
