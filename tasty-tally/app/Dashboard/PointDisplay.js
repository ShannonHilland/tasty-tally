export default function PointDisplay({usedPoints, dailyGoal}) {
    console.log("Rendering PointDisplay with usedPoints:", usedPoints);
    const remainingPoints = dailyGoal - usedPoints;
    const percent = usedPoints / dailyGoal * 100;

    return (
        <div className="flex items-center justify-around w-full p-4 "> 
            {/* Daily Goal Section */}
            <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">{dailyGoal}</p>
                <p className="text-sm text-gray-600">Today&apos;s Goal</p>
            </div>

            {/* Progress Bar Section */}
            <div className="flex flex-col items-center">
                <div
                className="radial-progress text-primary text-3xl font-bold"
                style={{ "--value": percent }}
                role="progressbar"
                >
                {remainingPoints}
                </div>
                <p className="mt-2 text-sm text-gray-600">Points Remaining</p>
            </div>

            {/* Daily Used Section */}
            <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">{usedPoints}</p>
                <p className="text-sm text-gray-600">Daily Used</p>
            </div>
        </div>

    );
}