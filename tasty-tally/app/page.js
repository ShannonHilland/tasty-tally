"use client";
import { useUserAuth } from "./_utils/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {
  const { user, googleSignIn } = useUserAuth();
  const router = useRouter();

  // Redirect to dashboard after successful sign-in
  useEffect(() => {
    if (user) {
      router.push("/Dashboard"); // Use your actual dashboard route here
    }
  }, [user, router]);

  return (
    <main className="flex items-center justify-center h-screen bg-base-200 ">
      <div className="flex flex-col pb-20 w-9/12 bg-base-100 text-center rounded-lg shadow-lg max-w-96">
        <img
            src="favicon.ico"
            alt="TastyTally Logo"
            className="w-24 h-24 mt-32 mx-auto"
        />
        <h1 className="text-xl font-semibold text-accent-content m-5">Tasty Tally Sign-In</h1>
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
