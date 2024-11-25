import Link from "next/link";

export default function Navbar() {
    return(
        <div className="navbar bg-base-200">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">TastyTally</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn m-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </div>
                    <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                            <Link href="/Dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link href="/AllFood">All Food</Link>
                        </li>
                        <li>
                            <Link href="/Profile">Profile</Link>
                        </li>
                        <li>
                            <p>Sign Out</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};