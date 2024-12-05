import { doc, setDoc, collection, addDoc, getDoc, updateDoc, arrayUnion, runTransaction } from "firebase/firestore";
import { db, } from "./firebase";

// Save user data
export const saveUserData = async (user) => {
  try {
    const userRef = doc(db, "Users", user.uid);
    await setDoc(userRef, user, { merge: true });
  } catch (error) {
    console.error("Error saving user data: ", error);
  }
};

// Add a food item to the daily log
export const logFood = async (userId, date, food) => {
  try {
    const dateId = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
    const logRef = doc(db, "Users", userId, "DailyLogs", dateId);

    const logSnap = await getDoc(logRef);

    const points = food.points || 0;

    if (logSnap.exists()) {
      const currentPoints = logSnap.data().pointsUsed || 0;
      await updateDoc(logRef, {
        foods: arrayUnion(food),
        pointsUsed: currentPoints + points,
      });
    } else {
      await setDoc(logRef, {
        foods: [food],
        pointsUsed: points,
      });
    }
  } catch (error) {
    console.error("Error logging food:", error);
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

// Delete an existing food item from the log
export const deleteFood = async (userId, date, food) => {
  try {
    const dateId = date.toISOString().split("T")[0];
    const userDocRef = doc(db, "Users", userId, "DailyLogs", dateId);

    await runTransaction(db, async (transaction) => {
      const logSnap = await transaction.get(userDocRef);

      if (!logSnap.exists()) {
        throw new Error("Daily log does not exist.");
      }

      const logData = logSnap.data();
      const updatedFoods = (logData.foods || []).filter(
        (item) => item.id !== food.id
      );
      const updatedPointsUsed = (logData.pointsUsed || 0) - (food.points || 0);

      transaction.update(userDocRef, {
        foods: updatedFoods,
        pointsUsed: Math.max(0, updatedPointsUsed),
      });
    });
  } catch (error) {
    console.error("Error deleting food:", error);
  }
};

export const fetchDailyLog = async (userId, date) => {
  try {
    const dateId = date.toISOString().split("T")[0]; // Format date to YYYY-MM-DD
    const logRef = doc(db, "Users", userId, "DailyLogs", dateId);
    const logSnap = await getDoc(logRef);

    if (logSnap.exists()) {
      const logData = logSnap.data();
      return {
        foods: logData.foods || [],
        pointsUsed: logData.pointsUsed || 0,
      };
    } else {
      // If no log exists for the day, return default values
      return {
        foods: [],
        pointsUsed: 0,
      };
    }
  } catch (error) {
    console.error("Error fetching daily log:", error);
    return {
      foods: [],
      pointsUsed: 0,
    };
  }
};
