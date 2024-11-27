"use client";
import { useState } from "react";

export default function ProfileForm({user}) {
    const [formData, setFormData] = useState({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        height: user.height,
        weight: user.weight,
        activityLevel: user.activityLevel,
        dailyGoal: user.dailyGoal
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Add DB logic here to submit the form data
    };
    return (
    <div className="bg-base-100 p-6 max-w-md relative">
        <h2 className="text-xl text-primary font-bold mb-4">{formData.firstName}'s Profile</h2>
        <form onSubmit={handleSubmit}>
            {/* First Name Input */}
            <div className="mb-4">
                <label htmlFor="firstName" className="block text-primary pb-1">
                    First Name
                </label>
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-base-100 border border-gray-300 rounded p-2"
                    required
                />
            </div>

            {/* Last Name Input */}
            <div className="mb-4">
                <label htmlFor="lastName" className="block text-primary pb-1">
                    Last Name
                </label>
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-base-100 border border-gray-300 rounded p-2"
                    required
                />
            </div>

            {/* Email Input */}
            <div className="mb-4">
                <label htmlFor="email" className="block text-primary pb-1">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-base-100 border border-gray-300 rounded p-2"
                    required
                />
            </div>

            {/* Gender Input */}
            <div className="mb-4">
                <label htmlFor="gender" className="block text-primary pb-1">
                    Gender
                </label>
                <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-base-100 border border-gray-300 rounded p-2"
                    required
                />
            </div>

            {/* Height Input */}
            <div className="mb-4">
                <label htmlFor="height" className="block text-primary pb-1">
                    Height (cm)
                </label>
                <input
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="w-full bg-base-100 border border-gray-300 rounded p-2"
                    required
                />
            </div>

            {/* Weight Input */}
            <div className="mb-4">
                <label htmlFor="weight" className="block text-primary pb-1">
                    Weight (kg)
                </label>
                <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="w-full bg-base-100 border border-gray-300 rounded p-2"
                    required
                />
            </div>

            <div className="mb-4">
                <label htmlFor="activityLevel" className="block text-primary pb-1">
                    Activity Level
                </label>
                <select
                    name="activityLevel"
                    value={formData.activityLevel}
                    onChange={handleChange}
                    className="w-full bg-base-100 border border-gray-300 rounded p-2"
                    required
                >
                    <option value="Sedentary">Sedentary</option>
                    <option value="Lightly Active">Lightly Active</option>
                    <option value="Moderately Active">Moderately Active</option>
                    <option value="Very Active">Very Active</option>
                </select>
            </div>

            {/* Daily Goal Display */}
            <div className="mb-5">
                <label className="block text-primary pb-1">
                    Daily Goal 
                </label>
                <p className="w-full bg-base-100 border border-gray-300 rounded p-2">
                    {formData.dailyGoal}
                </p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    className="bg-primary text-base-100 px-4 py-2 rounded"
                >
                    Save
                </button>
            </div>
        </form>
    </div>
    );
}
