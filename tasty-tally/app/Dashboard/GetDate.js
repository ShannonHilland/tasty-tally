export default function GetDate({ selectedDate, setSelectedDate }) {
    const handleDateChange = (e) => {
        setSelectedDate(new Date(e.target.value));
    };

    return (
        <div className="flex date-picker m-4 justify-center">
            <div className="flex items-center">
                <label htmlFor="date" className="mr-2 text-lg font-semibold">Select Date:</label>
                <input
                    type="date"
                    id="date"
                    value={selectedDate.toISOString().split("T")[0]}
                    onChange={handleDateChange}
                    className="p-1 text-lg  font-semibold"
                />
            </div>
        </div>
    );
}
