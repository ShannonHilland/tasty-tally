"use client";
import Navbar from "../components/Navbar";
import PointDisplay from "./PointDisplay";
import GetDate from "./GetDate";
import ItemList from "./ItemList";
import {useState} from "react";

export default function Dashboard() {
    const [dailyFoodList, setDailyFoodList] = useState([]);
    return (
        <div>
            <Navbar />
            {/*  might actually have to come from database to show the info stored in that day? */}
            <GetDate />
            {/* need to get these values from user info (to track weeklies and daily goal) and daily food */}
            <PointDisplay usedPoints={18} dailyGoal={25} weeklyRemaining={33}/>
            <ItemList dailyFoodList={dailyFoodList} setDailyFoodList={setDailyFoodList}/>
        </div>
    );
}