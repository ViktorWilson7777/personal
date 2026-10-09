import "@/index.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { Header } from "@/components/Header";
import { ShaderBackground } from "@/components/ShaderBackground";

export const metadata = {
  title: "Windy Store | FER202",
  description: "Next.js 15 App Router e-commerce application with Supabase Auth and Favorites",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cookie&family=Lavishly+Yours&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-transparent text-gray-900 dark:text-gray-100 flex flex-col relative antialiased selection:bg-rose-500 selection:text-white">
        <AuthProvider>
          <FavoritesProvider>
            <ShaderBackground />
            <Header />
            <div className="flex-1 flex flex-col">{children}</div>
            <footer className="border-t border-gray-200/60 dark:border-gray-800/60 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              <p>&copy; 2026 Windy - FER202 Labs 4 & 5. All rights reserved.</p>
            </footer>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
