import { useState } from "react";
import { addFoodItem } from "../_utils/firestoreOperations";
import { getDatabase, ref, push } from 'firebase/database';

export default function PopupForm({ closePopup }) {
    const [formData, setFormData] = useState({
        name: "",
        calories: "",
        saturatedFat: "",
        sugar:"",
        protein: "",
        servingSize: "",
    });

    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let pointValue = 0;
        if(!isChecked) {
            pointValue = (parseFloat(formData.calories) * .0305) + (parseFloat(formData.saturatedFat) * .275) + (parseFloat(formData.sugar) * .12) - (parseFloat(formData.protein) * .098)
        }
        const db = getDatabase();
        const newRef = push(ref(db, 'path/to/data'));
        const id = newRef.key;

        const foodItem = {
            ...formData,
            id: id,
            points: Math.round(pointValue),
        };
        addFoodItem(foodItem);
        closePopup();
    };

    return (
        <div>
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={closePopup} 
            ></div>

            {/* Popup Form */}
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-base-200 p-6 rounded shadow-lg w-10/12 max-w-md relative">
                    <h2 className="text-xl text-primary font-bold mb-4">Add A New Food</h2>
                    <form onSubmit={handleSubmit}>
                        {/* Name */}
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-primary pb-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter food name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-base-100  border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        {/* Calories */}
                        <div className="mb-4">
                            <label htmlFor="calories" className="block text-primary pb-1">
                                Calories
                            </label>
                            <input
                                type="number"
                                name="calories"
                                placeholder="0"
                                value={formData.calories}
                                onChange={handleChange}
                                className="w-full bg-base-100 border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        {/* Saturated Fat */}
                        <div className="mb-4">
                            <label htmlFor="saturatedFat" className="block text-primary pb-1">
                                Saturated Fat (g)
                            </label>
                            <input
                                type="number"
                                name="saturatedFat"
                                placeholder="0"
                                value={formData.saturatedFat}
                                onChange={handleChange}
                                className="w-full bg-base-100 border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        {/* Sugar */}
                        <div className="mb-4">
                            <label htmlFor="sugar" className="block text-primary pb-1">
                                Sugar (g)
                            </label>
                            <input
                                type="number"
                                name="sugar"
                                placeholder="0"
                                value={formData.sugar}
                                onChange={handleChange}
                                className="w-full bg-base-100 border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        {/* Protein */}
                        <div className="mb-4">
                            <label htmlFor="protein" className="block text-primary pb-1">
                                Protein (g)
                            </label>
                            <input
                                type="number"
                                name="protein"
                                placeholder="0"
                                value={formData.protein}
                                onChange={handleChange}
                                className="w-full bg-base-100 border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        {/* Serving Size */}
                        <div className="mb-4">
                            <label htmlFor="servingSize" className="block text-primary pb-1">
                                Serving Size
                            </label>
                            <input
                                type="text"
                                name="servingSize"
                                placeholder="1 cup, 1 tbsp, 100g..."
                                value={formData.servingSize}
                                onChange={handleChange}
                                className="w-full bg-base-100 border border-gray-300 rounded p-2"
                                required
                            />
                        </div>
                        {/* Zero Point Option */}
                        <div className="mb-4">
                            <label className="label cursor-pointer">
                                <span className="block text-primary pb-1">Zero Point Food?</span>
                                <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} className="checkbox checkbox-primary" />
                            </label>
                        </div>
                        {/* Submit and Cancel Buttons */}
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={closePopup}
                                className="border-2 border-primary text-primary  px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-primary text-base-100  px-4 py-2 rounded"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}