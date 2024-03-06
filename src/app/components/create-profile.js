"use client";
import Password from "../../../public/images/icon-password.svg";
import Email from "../../../public/images/icon-email.svg";
import Image from "next/image";
import { db } from "@/lib/firebase";
import { useState } from "react";
import auth from "@/lib/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";



export default function CreateProfile () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const Collection = collection(db, 'users');

   
    const createNewAccount = async (e) => {
        e.preventDefault();
        try{
        if(password !== confirmPassword) {
            console.log("Check Password");
            throw new Error("Passwords do not match");
        }
        if(password.length < 8) {
            console.log("Invalid Password");
            throw new Error ("Invalid Password");
        }
        // const queryEmailMatch = query(Collection, where("email", "==", email));
        // getDocs(queryEmailMatch)
        // .then((querySnapshot) => {
        //     if(!querySnapshot.empty) {
        //         console.log("Email already exists");
        //         throw new Error("Email already exists");
        //     }
            // addDoc(Collection, {
            //     email: email,
            //     password: password,
            // })
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            console.log('User signed up: ', userCredential.user);
        }
        // )
            
            // .then(() => {
            //     console.log("Account created successfully");
            //     setEmail("");
            //     setPassword("");
            //     setConfirmPassword("");
            // })
            // .catch((error) => {
            //     console.error("Error when creating account:", error);
            // })
        // }
        catch (error) {
            console.error("Error in createNewAccount", error);
        }
    }


    return(
        <>
        <div className="w-full mt-10 md:bg-white md:py-10 md:px-10 md:rounded md:max-w-[75%] lg:max-w-[50%] xl:max-w-[40%]">
            <h1 className="text-2xl font-bold">Create account</h1>
            <p className="text-customGrey my-2">Let's get you started sharing your links!</p>
            <form className="mt-10" onSubmit={createNewAccount}>
                <div className="flex flex-col relative mt-2">
                    <label className="text-xs my-1">Email Address</label>
                    <input 
                    className="border-1 border-customBorders focus:outline-none focus:border-customPurple 
                    active:border-customPurple text-customGrey pl-10 py-2 rounded-lg
                    invalid:border-customRed" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@email.com"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"></input>
                    <div className="absolute left-3.5 top-[37px]">
                        <Image
                        src={Email}
                        alt="Email Icon"
                        />
                    </div>
                </div>
                <div className="flex flex-col relative mt-5">
                    <label className="text-xs my-1">Create Password</label>
                    <input 
                    className="border-1 border-customBorders focus:outline-none focus:border-customPurple 
                    active:border-customPurple text-customGrey pl-10 py-2 rounded-lg
                    invalid:border-customRed" 
                    type="text" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    pattern=".{8,}"></input>
                    <div className="absolute left-3.5 top-[37px]">
                        <Image 
                        src={Password}
                        alt="Password Icon"/>
                    </div>
                </div>
                <div className="flex flex-col relative mt-5">
                    <label className="text-xs my-1">Confirm Password</label>
                    <input className="border-1 border-customBorders focus:outline-none focus:border-customPurple 
                    active:border-customPurple text-customGrey pl-10 py-2 rounded-lg" 
                    type="text" 
                    placeholder="At least 8 characters"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    ></input>
                    <div className="absolute left-3.5 top-[37px]">
                        <Image 
                        src={Password}
                        alt="Password Icon"/>
                    </div>
                </div>
                <p className="text-xs text-customGrey my-6">Password must contain at least 8 characters</p>
                <button className="w-full border-1 border-red block mx-auto py-2 bg-customPurple active:bg-customPurpleActive
                active:shadow-lg active:shadow-customLightPurple
                text-white rounded-lg" 
                type="submit"
                >Create new account</button>
            </form>
        </div>
        </>
    );
}