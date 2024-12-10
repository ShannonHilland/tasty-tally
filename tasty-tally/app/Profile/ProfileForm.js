import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore"; // Added getDoc
import { db } from "../_utils/firebase";
import { set } from "firebase/database";

export default function ProfileForm({ user }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "male",
    height: "",
    weight: "",
    activityLevel: "",
    goalWeight: "",
    dailyGoal: ""
  });
  const [pointGoal, setPointGoal] = useState("");

  // Fetch user profile data
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userDoc = await getDoc(doc(db, "Users", user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          setFormData((prev) => ({
            ...prev,
            ...data,
          }));
          setPointGoal(data.dailyGoal);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [user.uid]);

  const calculateDailyGoal = (weight, height, age, gender, activityLevel) => {
    let base = (weight / 4.2) + 7;
    if (gender === "male") base += 8;

    switch (age) {
      case "18-26": base += 5; break;
      case "27-37": base += 3; break;
      case "38-49": base += 2; break;
      case "50+": base += 1; break;
    }

    if (height >= 179) base += 2;

    switch (activityLevel) {
      case "inactive": base += 0; break;
      case "light": base += 1; break;
      case "moderate": base += 2; break;
      case "heavy": base += 3; break;
    }

    return Math.round(base);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dailyGoal = calculateDailyGoal(
      parseFloat(formData.weight),
      parseFloat(formData.height),
      formData.age,
      formData.gender,
      formData.activityLevel
    );

    const profileData = {
      ...formData,
      email: user.email,
      dailyGoal,
    };

    try {
      await setDoc(doc(db, "Users", user.uid), profileData, { merge: true });
      setPointGoal(dailyGoal);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Failed to save profile. Please try again.");
    }
  };

  return (
    <div className="m-5 md:m-2">
      <h1 className="text-center text-3xl font-semibold mt-5 mb-6">
        {formData.firstName ? `${formData.firstName}'s Profile` : "Profile Setup"}
      </h1>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-3">
        <div className="mb-4">
          <label className="block text-sm font-medium">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded text-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded text-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded text-primary"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={formData.height}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded text-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Weight (kg)</label>
          <input
            type="number"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded text-primary"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Activity Level</label>
          <select
            name="activityLevel"
            value={formData.activityLevel}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded text-primary"
          >
            <option value="inactive">Inactive/Sedentary</option>
            <option value="light">Light Activity</option>
            <option value="moderate">Moderate Exercise</option>
            <option value="heavy">Heavy Exercise</option>
          </select>
        </div>

        <div className="mb-4 ">
          <label className="block text-sm font-medium">Goal Weight (kg)</label>
          <input
            type="number"
            name="goalWeight"
            value={formData.goalWeight}
            onChange={handleChange}
            className="w-full p-2 border border-primary rounded text-primary"
            required
          />
        </div>

        <div className="mb-4">
          <div className="block text-md font-medium">Daily Goal: 
            <span className="text-primary text-md font-semibold pl-1">
              {pointGoal}
            </span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-white border-2 border-primary text-primary py-2 px-4 rounded my-2 hover:bg-primary hover:text-white"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
