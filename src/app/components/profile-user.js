'use client';
import { useEffect, useState, useContext } from "react";
import { UserDetailsContext } from "../layout";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function ProfileUser({ nameRequirements, isInitialNames, emailNotification, trigger }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const [storedNames, setStoredNames] = useState(false);
    const [storedEmail, setStoredEmail] = useState(false);

    //  Monitors firstName and lastName properties everytime they change -- even on first render -- and needs to be able to accurately affect save button disable property
    useEffect(() => {
        if(!storedNames) {
            if(firstName.length >= 1 && lastName.length >= 1) {
                nameRequirements(true);
            }
            else {
                nameRequirements(false);
            }
        }
        else if(storedNames && firstName.length >= 1 && lastName.length >= 1) {
            isInitialNames(true);
            console.log('elseif in profile-user');
            setStoredNames(false);
        }
        
        else {
            setStoredNames(false);
        }
    }, [firstName, lastName]);

    // useEffect(() => {
    //     if(!storedEmail) {
    //         console.log('triggered');
    //         // emailNotification(true);
    //     }
    //     else {
    //         console.log('triggered else');
    //         setStoredEmail(false);
    //     }
    // }, [email])

    //  Runs on first render, brings in and updates local variable state with userDetails properties (if exist yet)
    //  userDetails get intially updated with saved info during login
    useEffect(() => {
        let trigger1 = 0;
        let trigger2 = 0;
        if(userDetails.firstName) {
            setFirstName(userDetails.firstName);
            trigger1++;
        }
        if(userDetails.lastName) {
            setLastName(userDetails.lastName);
            trigger1++;
        }

        if(userDetails.email) {
            setEmail(userDetails.email);
            trigger2++;
        }

        if(trigger1 > 0) {
            setStoredNames(true);
        }
        if(trigger2 > 0) {
            setStoredEmail(true);
        }
    }, []);

        //  Triggered by save button click
        //  Saves firstName and lastName properties in both userDetails global variable and Firestore
    useEffect(() => {
        if(trigger) {
        console.log('user triggered');
        try{
            setUserDetails({...userDetails, firstName: firstName, lastName: lastName, email: email})
            const updateUser = async () => {
                if(!userDetails.uid) {
                    return;
                }
                const userReference = doc(db, 'users', userDetails.uid);
                await updateDoc(userReference, {
                  firstName: firstName,
                  lastName: lastName,
                  email: email
                });
              }
              updateUser();
              nameRequirements(false);
            }
            catch (error) {
                console.log('Error occurred:', error);
            }
        }
    }, [trigger]);


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