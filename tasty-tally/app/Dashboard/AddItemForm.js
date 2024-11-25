"use client";
import {useState} from "react";
export default function AddItemForm({food, setDailyFoodList, setQuery}) {
    const [quantity, setQuantity] = useState(1);
    const [mealCategory, setMealCategory] = useState("Breakfast");
    const handleSubmit = (e) => {
        e.preventDefault();
        const item = {
            id: food.id,
            name: food.name,
            points: food.points,
            calories: food.calories,
            saturatedFat: food.saturatedFat,
            sugar: food.sugar,
            protein: food.protein,
            servingSize: food.servingSize,
            quantity: quantity,
            mealCategory: mealCategory
        }
        setDailyFoodList((prev) => [...prev, item]);
        setQuery("");
    }
    const handleQuantityChange = (e) => {
        const value = Math.max(1, Number(e.target.value));
        setQuantity(value);
    }

    const handleMealSelection = (e) => {
        setMealCategory(e.target.value);
    }

    return (
        <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="flex justify-between collapse-title text-xl font-medium">
                <div className="flex items-center">
                    <p className="text-lg font-semibold">{food.name}</p>
                </div>
                <div className="flex items-center">
                    <p className="text-lg font-semibold  border-2 border-primary  p-1 px-3 mx-2 rounded-xl"> {food.points}</p>
                </div> 
            </div>
            <div className="collapse-content">
                <p>Calories: {food.calories}</p>
                <p>Saturated Fat: {food.saturatedFat}</p>
                <p>Sugar: {food.sugar}</p>
                <p>Protein: {food.protein}</p>
                <p>Serving Size: {food.servingSize}</p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <input type="number" min="1" name="quantity" value={quantity} onChange={handleQuantityChange} className="w-10 rounded-md m-1 p-1" required />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-center">
                            <label htmlFor="Meal">Meal:</label>
                            <select type="text" name="mealCategory" onChange={handleMealSelection} className="w-24 rounded-md m-1 p-1" required>
                                <option value="Breakfast">Breakfast</option>
                                <option value="Lunch">Lunch</option>
                                <option value="Dinner">Dinner</option>
                                <option value="Snack">Snack</option>
                            </select>
                        </div>
                        <div className="flex items-center mr-8">
                            <button className="bg-primary text-white p-2 rounded-lg active:bg-violet-900" type="submit">Add</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}