import { AuthContextProvider } from "@/app/AuthContext";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

export const metadata = {
  title: "Xrossfit",
  description: "A Fitness App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* <AuthContextProvider> */}
          <AppRouterCacheProvider>{children}</AppRouterCacheProvider>
        {/* </AuthContextProvider> */}
      </body>
    </html>
  );
}
