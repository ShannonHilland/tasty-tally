
export default function DailyItem({food, setDailyFoodList}) {
    const handleDelete = () => {
        setDailyFoodList((prev) => prev.filter((item) => item !== food));
    }
    return(
        <div className="collapse bg-base-200 m-1">
            <input type="checkbox" />
            <div className="flex justify-between collapse-title text-xl font-medium px-4">
                <div className="flex items-center">
                    <p className="text-lg font-semibold">{food.name}</p>
                </div>
                <div className="flex items-center">
                    <p className="text-lg font-semibold  border-2 border-primary  p-1 px-3 rounded-xl"> {food.points}</p>
                </div> 
            </div>
            <div className="collapse-content flex justify-between">
                <div className="">
                    <p>Calories: {food.calories}</p>
                    <p>Saturated Fat: {food.saturatedFat}</p>
                    <p>Sugar: {food.sugar}</p>
                    <p>Protein: {food.protein}</p>
                    <p>Serving Size: {food.servingSize}</p>
                </div>
                <div className="flex items-end ml-7">
                        <button className=" text-white p-2 rounded-lg " onClick={handleDelete}>
                            <img
                                src="/blue-delete.svg" 
                                alt="Delete"
                                className="w-6 h-6"
                            />
                        </button>
                </div>
            </div>
        </div>
    );
}