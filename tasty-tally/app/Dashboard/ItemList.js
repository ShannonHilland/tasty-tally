"use client";

import {useState} from "react";
import SearchBar from './SearchBar';
import DailyItem from './DailyItem';
import PopupNewItemForm from './PopUpNewItemForm';
 
 export default function ItemList({dailyFoodList, setDailyFoodList, selectedDate}) {
    const [isVisible, setIsVisible] = useState(false);
    const openPopup = () => setIsVisible(true);
    const closePopup = () => setIsVisible(false);
    const desiredOrder = ["Breakfast", "Lunch", "Dinner", "Snack"];

    const categorizedFood = dailyFoodList.reduce((acc, food) => {
      const category = food.mealCategory || "Uncategorized"; 
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(food);
      return acc;
    }, {});

    const orderedCategorizedFood = Object.keys(categorizedFood)
      .sort((a, b) => {
         const indexA = desiredOrder.indexOf(a);
         const indexB = desiredOrder.indexOf(b);

         // Categories not in the desiredOrder come last and be sorted alphabetically
         if (indexA === -1 && indexB === -1) return a.localeCompare(b);
         if (indexA === -1) return 1;
         if (indexB === -1) return -1;

         return indexA - indexB;
      })
      .reduce((acc, key) => {
         acc[key] = categorizedFood[key];
         return acc;
      }, {});

      return (
        <div className="m-4 p-2">   
          <SearchBar setDailyFoodList={setDailyFoodList} openPopup={openPopup} selectedDate={selectedDate}/>
          {isVisible && <PopupNewItemForm closePopup={closePopup} />}
          {Object.entries(orderedCategorizedFood).map(([category, foods]) => ( 
            <div key={category} className="category-section mb-6">
              <h2 className="text-lg font-bold mb-2 capitalize">{category}</h2>
              {foods.map((food) => ( 
                <DailyItem
                  key={food.id}
                  food={food}
                  setDailyFoodList={setDailyFoodList}
                  selectedDate={selectedDate}
                />
              ))}
            </div>
          ))}
        </div>
      );      
 }