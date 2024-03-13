'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import { createContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const inter = Inter({ subsets: ["latin"] });


// export const PhotoContext = createContext();
export const UserDetailsContext = createContext();

export default function RootLayout({ children }) {

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [userDetails, setUserDetails] = useState({
    uid: '',
    firstName: '',
    lastName: '',
    email: '',
    photo: ''
});

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
