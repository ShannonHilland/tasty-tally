"use client";
import React from "react";
import {useState} from "react";

import DailyTally from "./components/dailyTally";
import AddItem from "./components/AddItem";

//import { useUserAuth } from "./_utils/auth-context";


export default function Page() {
  //const { user, googleSignIn, firebaseSignOut } = useUserAuth();
  const user = {
    name: "Shannon",
    gender: "female",
    Age: 27,
    height: 176,
    weight: 190,
    activityLevel: "moderate",
    goal: "lose",
    goalWeight: 170,
    allowedPoints: 23,
    weeklyPoints: 49 //?how to reset every week?
  }
  ;
  const [usedPoints, setUsedPoints] = useState(23);

  //function to handle sign in click which would validate, then check profile values are not null-> pop up component if they are to fill them in (calculate daily point)
  
  return (
    user ? (
      //If user is logged in show main dashboard
      <div>
        {/* navigation with signout option up there */}
        <h1>Welcome {user.name}</h1>
        <DailyTally usedPoints={usedPoints} dailyGoal={user.allowedPoints} weeklyRemaining={user.weeklyPoints}/>
        <AddItem />
      </div>
    ) : (
      //if user is not logged in, display login screen
      <div>
        <h1>Access Denied</h1>
        <p>You need to be logged in to access this page</p>
      </div>
    )
  );
}
