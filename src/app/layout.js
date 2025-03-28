import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header"; // Import the Header component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-white`}>
        
        {/* Header Component */}
        <Header />

        {/* Main Content */}
        <main className="ll">{children}</main>

        {/* Footer (Uncomment when needed) */}
        <div>
        <p className='text-center'>Build With 💌 by <a className='text-blue-500' href='https://github.com/Tnmy4069/STAPLE-Connect'>Tnmy</a></p>
    </div>
      
      </body>
    </html>
  );
}
