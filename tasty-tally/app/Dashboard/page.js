"use client";
import Navbar from "../components/Navbar";
import PointDisplay from "./PointDisplay";
import GetDate from "./GetDate";
import ItemList from "./ItemList";
import {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";

export default function Dashboard() {
    const [dailyFoodList, setDailyFoodList] = useState([]);
    const { user } = useUserAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);
    if (!user) {
        return null;
    }

    return (
        <div>
            <Navbar />
            {/*  might actually have to come from database to show the info stored in that day? */}
            <div className="flex justify-center">
                <div className="md:w-8/12">
                    <GetDate />
                    {/* need to get these values from user info (to track weeklies and daily goal) and daily food */}
                    <PointDisplay usedPoints={18} dailyGoal={25} weeklyRemaining={33}/>
                    <ItemList dailyFoodList={dailyFoodList} setDailyFoodList={setDailyFoodList}/>
                </div>
            </div>
        </div>
    );
}