"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="navbar bg-base-200 relative">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">TastyTally</a>
            </div>

            {/* Navigation */}
            <div className="flex-none">
                {/* larger screens -> horizontal navigation */}
                <div className="hidden md:flex space-x-4">
                    <Link href="/Dashboard" className="btn btn-ghost">
                        Dashboard
                    </Link>
                    <Link href="/AllFood" className="btn btn-ghost">
                        All Food
                    </Link>
                    <Link href="/Profile" className="btn btn-ghost">
                        Profile
                    </Link>
                    <button className="btn btn-ghost">Sign Out</button>
                </div>

                {/* smaller screens-> hamburger */}
                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="btn m-1"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </button>

                    {/* Menu Overlay */}
                    {isMenuOpen && (
                        <div className="fixed bg-base-100 inset-0 flex items-center justify-center z-50">
                            <div className="bg-base-200 p-6 rounded shadow-lg w-10/12 max-w-md relative">
                                <button
                                    onClick={() => setIsMenuOpen(false)}
                                    className="absolute top-4 right-4 text-2xl text-primary"
                                >
                                    ✕
                                </button>
                                <ul className="menu text-lg text-primary space-y-4">
                                    <li>
                                        <Link href="/Dashboard" onClick={() => setIsMenuOpen(false)}>
                                            Dashboard
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/AllFood" onClick={() => setIsMenuOpen(false)}>
                                            All Food
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/Profile" onClick={() => setIsMenuOpen(false)}>
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <button onClick={() => setIsMenuOpen(false)}>
                                            Sign Out
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
