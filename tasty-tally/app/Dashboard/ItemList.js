"use client";
import {useState} from "react";
import foodList from './foodList';
import SearchBar from './SearchBar';
import DailyItem from './DailyItem';
import PopupNewItemForm from './PopUpNewItemForm';
 
 export default function ItemList({dailyFoodList, setDailyFoodList}) {
    const [isVisible, setIsVisible] = useState(false);
    const openPopup = () => setIsVisible(true);
    const closePopup = () => setIsVisible(false);

    return(
        <div className="m-4 p-2">   
           <SearchBar setDailyFoodList={setDailyFoodList} openPopup={openPopup}/>
           {isVisible && <PopupNewItemForm closePopup={closePopup}/>}
           {dailyFoodList.map((food) => (
                <DailyItem key={food.id} food={food} setDailyFoodList={setDailyFoodList}/>
           ))}
            {/* access to api food for search bar,
                search bar
                ability to add to foodList (api values + quantity and meal to adjust points)
                sorted items by reduce (meal) */}
            {/* {jsonFood.map((food) => (
                <div key={food.id} className="flex items-center justify-between p-2 border-b-2">
                    <div className="flex items-center">
                        <p className="text-lg font-semibold">{food.name}</p>
                        <p className="text-sm text-gray-600">{food.points} Points</p>
                    </div>
                    <div className="flex items-center">
                        <button className="bg-primary text-white p-1 rounded-lg">Add</button>
                    </div>
                </div>
            ))} */}

        </div>
    );
 }