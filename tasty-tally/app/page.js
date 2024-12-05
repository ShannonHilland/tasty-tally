"use client";

import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./_utils/firebase";

export default function SignInPage() {
  const { user, googleSignIn } = useUserAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const isProfileComplete = (profile) => {
    const requiredFields = [
      "firstName",
      "lastName",
      "email",
      "gender",
      "height",
      "weight",
      "activityLevel",
      "goalWeight",
      "dailyGoal",
    ];
    return requiredFields.every((field) => profile[field]);
  };

  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        setLoading(true);
        try {
          const userRef = doc(db, "Users", user.uid);
          const userDoc = await getDoc(userRef);
  
          if (userDoc.exists()) {
            const profile = userDoc.data();
            if (isProfileComplete(profile)) {
              router.push("/Dashboard"); 
            } else {
              router.push("/Profile"); 
            }
          } else {
            // Create the User document
            await setDoc(userRef, {
              email: user.email,
            });
  
            // Create a placeholder in the DailyLogs subcollection
            const dailyLogRef = doc(db, "Users", user.uid, "DailyLogs", new Date().toISOString().split("T")[0]);
            await setDoc(dailyLogRef, {
              foods: [],
              pointsUsed: 0,
            });
  
            router.push("/Profile");
          }
        } catch (error) {
          console.error("Error checking user profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    checkProfile();
  }, [user, router]);
  

  if (loading) {
    return (
      <main className="flex items-center justify-center h-screen bg-base-200">
        <div className="text-center">Loading...</div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center h-screen bg-base-200">
      <div className="flex flex-col pb-20 w-9/12 bg-base-100 text-center rounded-lg shadow-lg max-w-96">
        <img
          src="favicon.ico"
          alt="TastyTally Logo"
          className="w-24 h-24 mt-32 mx-auto"
        />
        <h1 className="text-xl font-semibold m-5 text-primary">Tasty Tally Sign-In</h1>
        <div className="m-2">
          <button
            className="w-11/12 mx-auto bg-base-200 border-2 border-primary hover:bg-base-300 text-primary font-semibold px-4 py-2 rounded flex justify-center items-center gap-2"
            onClick={googleSignIn}
          >
            <img
              src="https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png"
              alt="Google Logo"
              className="w-5 h-5"
            />
            Sign In with Google
          </button>
        </div>
      </div>
    </main>
  );
}
