import "./globals.css";

export const metadata = {
  title: "Tasty Tally",
  description: "A health website to track your daily food intake",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
