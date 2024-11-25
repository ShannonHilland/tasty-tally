export default function GetDate() {
    const newDate = new Date();
    const date = newDate.getDate();
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthName[newDate.getMonth()];
    const year = newDate.getFullYear();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = weekday[newDate.getDay()];
    
    return(
        <div className="m-1 p-1 text-lg text-center font-semibold">
            <h1>{day}, {month} {date}, {year}</h1>
        </div>
    );
}