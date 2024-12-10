export default function Footer() {
    return (
        <footer className="footer bg-base-200 items-center p-4 flex flex-wrap justify-between">
            <aside className="flex items-center space-x-2">
            <img
                src="favicon.ico"
                alt="TastyTally Logo"
                className="w-10 h-10"
            />
            <p className="text-xs">Shannon Hilland {new Date().getFullYear()} - All rights reserved</p>
            </aside>
            <nav className="flex items-center space-x-2">
            <a
                href="https://github.com/ShannonHilland/tasty-tally"
                target="_blank"
                className="flex items-center space-x-2"
            >
                <img
                src="/github.png"
                alt="Github Logo"
                width="30"
                height="30"
                className="fill-current"
                />
                <span className=" text-xs hidden md:inline">Check out the code here!</span>
            </a>
            </nav>
      </footer>
    )
}