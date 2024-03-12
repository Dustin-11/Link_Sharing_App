'use client';
import { useEffect, useState, useContext } from "react";
import { UserDetailsContext } from "../layout";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProfileUser({ isButtonDisabled, buttonClicked, setButtonClicked }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');
    const [prevPhoto, setPrevPhoto] = useState('');
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);

    useEffect(() => {
        if(buttonClicked) {
            return;
        }
        if(firstName.length >= 1 && lastName.length >= 1) {
            isButtonDisabled(false);
        }
        else {
            isButtonDisabled(true);
        }
    }, [firstName, lastName]);

    useEffect(() => {
        isButtonDisabled(true);
        setButtonClicked(false);
        if(userDetails.firstName) {
            setFirstName(userDetails.firstName);
        }
        if(userDetails.lastName) {
            setLastName(userDetails.lastName);
        }
        if(userDetails.email) {
            setEmail(userDetails.email);
        }
        if(userDetails.photo) {
            setPrevPhoto(userDetails.photo);
        }
    }, []);

        useEffect(() => {
            setPhotoUrl(userDetails.photo);
        }, [userDetails?.photo])

        useEffect(() => {
            if (photoUrl !== prevPhoto) {
                isButtonDisabled(false);
            }
        }, [photoUrl]);

    useEffect(() => {
        if(buttonClicked) {
        setUserDetails({...userDetails, firstName: firstName, lastName: lastName})
        setButtonClicked(false);
        try{
            const updateUser = async () => {
                if(!userDetails.uid) {
                    return;
                }
                const userReference = doc(db, 'users', userDetails.uid);
                await updateDoc(userReference, {
                  firstName: firstName,
                  lastName: lastName
                })
              }
              updateUser();
              console.log('User updated sucessfully');
            }
            catch (error) {
                console.log('Error occurred:', error);
            }
        }
    }, [buttonClicked]);


    return(
        <div className="bg-customLightGrey my-4 mx-5 text-left rounded-lg p-5">
            <div className="relative">
                <label className="block my-1 text-customDarkGrey text-xs">First Name*</label>
                <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                       className="block w-full py-2 pl-2 rounded-lg border-customBorders border-1 text-customDarkGrey"></input>
                <label className="block my-1 mt-5 text-customDarkGrey text-xs">Last Name*</label>
                <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)}
                       className="block w-full py-2 pl-2 rounded-lg border-customBorders border-1 text-customDarkGrey"></input>
                <label className="block my-1 mt-5 block text-xs">Email</label>
                <input type="email" placeholder='e.g. johndoe@gmail.com' value={email} 
                       onChange={(e) => setEmail(e.target.value)}  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                       className="block w-full py-2 pl-2 rounded-lg border-customBorders border-1 text-customDarkGrey"></input>
            </div>
        </div>
    );
}