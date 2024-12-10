"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import ProfileForm from "./ProfileForm";
import Footer from "../components/Footer";
import { useUserAuth } from "../_utils/auth-context";

export default function Profile() {
    const { user } = useUserAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push("/");
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return (
        <div>
            <Navbar />
            <ProfileForm user={user} />
            <Footer />
        </div>
    );
}