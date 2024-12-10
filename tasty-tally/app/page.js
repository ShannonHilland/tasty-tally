"use client";

import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState} from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./_utils/firebase";
import Link from "next/link";
import AboutDetails from "./About/AboutDetails";
import Footer from "./components/Footer";

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
              dailyGoal: 0,
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
    <main>
      <div className="navbar bg-base-200 relative">
        <div className="flex-1 ">      
          <img
            src="favicon.ico"
            alt="TastyTally Logo"
            className="w-10 h-10 ml-2"
          />
          <Link href="/" className="btn btn-ghost text-xl text-primary">TastyTally</Link>
        </div>
        <div className="flex-none">
          {/* larger screens */}
          <div className="hidden md:flex space-x-4">
            <button
              className="w-11/12 mx-auto bg-base-200 border-2 border-primary hover:bg-base-300 text-primary font-semibold px-4 py-2 rounded flex justify-center items-center gap-2"
              onClick={googleSignIn}
            >     
            <img
              src="https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png"
              alt="Google Logo"
              className="w-8 h-8"
            />
            Sign In with Google
            </ button>
          </div>

          {/* smaller screens */}
          <div className="md:hidden">
          <button
              className="flex m-2 border border-primary rounded p-2 text-primary text-semibold"
              onClick={googleSignIn}
            >     
              <img
                src="https://techdocs.akamai.com/identity-cloud/img/social-login/identity-providers/iconfinder-new-google-favicon-682665.png"
                alt="Google Logo"
                className="w-5 h-5 mx-2 justify-center"
              />
              Sign In
              </ button>    
          </div>
        </div>
      </div>
      <AboutDetails />
      <Footer />
    </main>
  );
}
