"use client";
import Navbar from "../components/Navbar";
import PointDisplay from "./PointDisplay";
import ItemList from "./ItemList";
import GetDate from "./GetDate";
import {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../_utils/auth-context";
import { fetchDailyLog } from "../_utils/firestoreOperations";

export default function Dashboard() {
    const [dailyFoodList, setDailyFoodList] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [pointsUsed, setPointsUsed] = useState(0);
    const { user } = useUserAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);

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


    return (
        <div>
            <Navbar />
            <div className="flex justify-center">
                <div className="w-10/12 lg:w-8/12 ">
                    <GetDate selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                    <PointDisplay usedPoints={18} dailyGoal={25} weeklyRemaining={33} />
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