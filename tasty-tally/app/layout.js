import "./globals.css";
import { AuthContextProvider } from "./_utils/auth-context";
import { saveUserData, logFood, addFoodItem } from "./_utils/firestoreOperations";

export const metadata = {
  title: "Tasty Tally",
  description: "A health website to track your daily food intake",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
