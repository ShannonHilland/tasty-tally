import { doc, setDoc, collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Save user data
export const saveUserData = async (user) => {
  try {
    const userRef = doc(db, "Users", user.uid);
    await setDoc(userRef, user, { merge: true });
  } catch (error) {
    console.error("Error saving user data: ", error);
  }
};

// Log food for a specific day
export const logFood = async (userId, date, food) => {
  try {
    const logsRef = collection(db, "DailyLogs");
    const dailyQuery = query(logsRef, where("userId", "==", userId), where("date", "==", date));
    const snapshot = await getDocs(dailyQuery);

    if (snapshot.empty) {
      await addDoc(logsRef, { userId, date, foods: [food] });
    } else {
      // Update existing log (you can expand this to include update logic)
    }
  } catch (error) {
    console.error("Error logging food: ", error);
  }
};

// Add a new food item to the shared database
export const addFoodItem = async (food) => {
  try {
    const foodRef = collection(db, "FoodList");
    await addDoc(foodRef, food);
  } catch (error) {
    console.error("Error adding food item: ", error);
  }
};
