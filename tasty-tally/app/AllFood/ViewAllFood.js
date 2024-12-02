"use client";
import { useState } from "react";
import foodList from "../Dashboard/foodList"; // Replace with actual food list import eventually -> query for entire list

export default function ViewAllFood() {
    const [query, setQuery] = useState("");
    const [sortOption, setSortOption] = useState("default");
    const foodItems = [...foodList];

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    // Filter/sort
    const filteredItems = foodItems
        .filter((item) => {
            const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase());
            if (sortOption === "zero-points") {
                return matchesQuery && item.points === 0;
            }
            return matchesQuery;
        })
        .sort((a, b) => {
            if (sortOption === "low-high") return a.points - b.points;
            if (sortOption === "high-low") return b.points - a.points;
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
                        <option value="default">Sort By</option>
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
