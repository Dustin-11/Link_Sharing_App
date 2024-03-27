'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import { createContext, useState, useEffect, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const inter = Inter({ subsets: ["latin"] });


export const PhotoContext = createContext();
export const UserDetailsContext = createContext();

export default function RootLayout({ children }) {

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userDetails, setUserDetails] = useState({
    uid: '',
    firstName: '',
    lastName: '',
    email: '',
    photo: '',
    links: []
});

// There is an issue with this upon first starting program server??
useEffect(() => {
  const getUserData = async() => {
    const docRef = doc(db, 'users', userDetails.uid);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists) {
      console.log(docSnap.data());
    }
    else {
      console.log('No data exists!!!!!!!!!!');
    }
    getUserData();
  }
}, [])

useEffect(() => {
  const userInfo = localStorage.getItem('userDetails');
  if(userInfo) {
    const parsed = JSON.parse(userInfo);
    console.log(parsed);
    setUserDetails(JSON.parse(userInfo));
  }
}, [])

  useEffect(() => {
    if(userDetails.firstName.length > 0 && userDetails.lastName.length > 0) {
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
    }
    console.log(userDetails);
}, [userDetails]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <UserDetailsContext.Provider value={{userDetails, setUserDetails}}>
          {children}
        </UserDetailsContext.Provider>
      </body>
    </html>
  );
}
