'use client';
import { useEffect, useState, useContext } from "react";
import { UserDetailsContext } from "../layout";

export default function ProfileUser({ isButtonDisabled, buttonClicked, setButtonClicked }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const { setUserDetails } = useContext(UserDetailsContext);

    useEffect(() => {
        if(firstName.length >= 1 && lastName.length >= 1) {
            isButtonDisabled(false);
        }
        else {
            isButtonDisabled(true);
        }
    }, [firstName, lastName]);

    useEffect(() => {
        const storedFirst = localStorage.getItem('firstName');
        if(storedFirst) {
            setFirstName(storedFirst);
        }

        const storedLast = localStorage.getItem('lastName');
        if(storedLast) {
            setLastName(storedLast);
        }

        const storedEmail = localStorage.getItem('email');
        if(storedEmail) {
            setEmail(storedEmail);
        }
        isButtonDisabled(true);
    }, []);


    useEffect(() => {
        setUserDetails({firstName: firstName, lastName: lastName, email: email})
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
        localStorage.setItem('email', email);
    }, [firstName, lastName, email]);


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