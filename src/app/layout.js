'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import { useContext, createContext, useState, useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });


export const PhotoContext = createContext();
export const UserDetailsContext = createContext();

export default function RootLayout({ children }) {

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    console.log(profilePhoto);
  }, [profilePhoto])

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserDetailsContext.Provider value={{userDetails, setUserDetails}}>
        <PhotoContext.Provider value={{profilePhoto, setProfilePhoto}}>
          {children}
        </PhotoContext.Provider>
        </UserDetailsContext.Provider>
      </body>
    </html>
  );
}
