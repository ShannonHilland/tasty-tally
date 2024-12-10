"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useUserAuth } from "../_utils/auth-context";
import ViewAllFood from "./ViewAllFood";

export default function AllFood() {
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
        <div className="flex flex-col min-h-screen">
            <div className="flex-grow">
                <Navbar />
                <ViewAllFood />
            </div>
            <Footer />
        </div>
    );
}