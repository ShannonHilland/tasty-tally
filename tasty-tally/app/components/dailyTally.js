"use client"


// This component needs to display the daily tally of points remaining, update the progress bar
// and display a message that the user is over (their goal was ___ and their total is ___)
//need to state lift points useState because adding food will change the points value, therefore needs to
//return back to the parent component to update the points value
//https://daisyui.com/components/radial-progress/ to customize size and thickness
//Also display extra weekly points remaining, and daily points used (or maybe extra points earned?)
//should adjust size based on screen size
export default function DailyTally({ usedPoints, dailyGoal, weeklyRemaining }) {
    const remainingPoints = dailyGoal - usedPoints;
    const percent = usedPoints / dailyGoal * 100;

    return (
        <div className="flex items-center justify-around w-full p-4 "> 
            {/* Weekly Remaining Section */}
            <div className="flex flex-col items-center">
                <p className="text-lg font-semibold">{weeklyRemaining}</p>
                <p className="text-sm text-gray-600">Weekly Remaining</p>
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
