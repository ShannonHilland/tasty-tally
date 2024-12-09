"use client";
import Navbar from "../components/Navbar";
import PointDisplay from "./PointDisplay";
import ItemList from "./ItemList";
import GetDate from "./GetDate";
import {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";
import { fetchDailyGoal, fetchDailyLog } from "../_utils/firestoreOperations";

export default function Dashboard() {
    const [dailyFoodList, setDailyFoodList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [pointsUsed, setPointsUsed] = useState(0);
    const { user } = useUserAuth();
    const router = useRouter();
    const [dailyGoal, setDailyGoal] = useState(0);

    //I know this is a lot of userEffects, I didn't know how else to control updating specific parts of the UI depending on what's changing
    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);

    //display a new log when the date or user is changed
    useEffect(() => {
        const fetchLog = async () => {
          const logData = await fetchDailyLog(user.uid, selectedDate);
          setPointsUsed(logData.pointsUsed);
          setDailyFoodList(logData.foods);
        };
      
        if (user) {
          fetchLog();
        }
      }, [user, selectedDate]);
      
    //update PointDisplay component when the food list changes
    useEffect(() => {
      const fetchLog = async () => {
        const logData = await fetchDailyLog(user.uid, selectedDate);
        setPointsUsed(logData.pointsUsed);
      };
    
      if (user) {
        fetchLog();
      }
    }, [dailyFoodList]);

    //fetch the daily goal when user logs in
    useEffect(() => {
      const fetchGoal = async () => {
          const goal = await fetchDailyGoal(user.uid);
          setDailyGoal(goal);
      }
      if (user) {
          fetchGoal();
      }
    }, []);


    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="w-10/12 lg:w-8/12 ">
                    <GetDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    <PointDisplay usedPoints={pointsUsed} dailyGoal={dailyGoal} weeklyRemaining={33} />
                    <ItemList
                        dailyFoodList={dailyFoodList}
                        setDailyFoodList={setDailyFoodList} 
                        selectedDate={selectedDate}
                    />
                </div>
            </div>
        </div>
    );
}