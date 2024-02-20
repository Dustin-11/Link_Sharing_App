"use client";
import Password from "../../public/images/icon-password.svg";
import Email from "../../public/images/icon-email.svg";
import Image from "next/image";
import db from "@/firebase";
import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";



export default function CreateProfile () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const Collection = collection(db, 'users');

    const createNewAccount = (e) => {
        if(password === confirmPassword) {
            e.preventDefault();
            console.log(db);
            const newDoc = addDoc(Collection, {
                email: email,
                password: password,
            })
            .then(() => {
                console.log("Account created successfully");
            })
            .catch((error) => {
                console.error("Error when creating account:", error);
            })
        } else {
            console.error("Passwords do not match");
        }
    }
    return(
        <div className="w-full mt-10 md:bg-white md:py-10 md:px-10 md:rounded md:max-w-[75%] lg:max-w-[50%] xl:max-w-[40%]">
            <h1 className="text-2xl font-bold">Create account</h1>
            <p className="text-customGrey my-2">Let's get you started sharing your links!</p>
            <form className="mt-10" onSubmit={createNewAccount}>
                <div className="flex flex-col relative mt-2">
                    <label className="text-xs my-1">Email Address</label>
                    <input 
                    className="border-2 border-customBorders focus:outline-none focus:border-customPurple 
                    active:border-customPurple text-customGrey pl-10 py-2 rounded-lg
                    invalid:border-customRed" 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. alex@email.com"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" 
                    required ></input>
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
                    className="border-2 border-customBorders focus:outline-none focus:border-customPurple 
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
                    <input className="border-2 border-customBorders focus:outline-none focus:border-customPurple 
                    active:border-customPurple text-customGrey pl-10 py-2 rounded-lg" 
                    type="text" 
                    placeholder="At leasrt 8 characters"
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
                <button className="w-full border-2 border-red block mx-auto py-2 bg-customPurple active:bg-customPurpleActive
                active:shadow-lg active:shadow-customLightPurple
                text-white rounded-lg" 
                type="submit"
                >Create new account</button>
            </form>
            <div className="flex flex-col items-center mt-5">
                <p className="text-customGrey">Already have an account?</p>
                <p><a className="text-customPurple cursor-pointer active:text-customPurpleActive">Login</a></p>
            </div>
        </div>
    );
}