"use client";
import Password from "../../../public/images/icon-password.svg";
import Email from "../../../public/images/icon-email.svg";
import Image from "next/image";
import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import auth from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function Login() {
    const [emailAddress, setEmailAddress] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const Collection = collection(db, 'users');
    const router = useRouter();
    const loginAccount = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth, emailAddress, passwordText)
        .then((userCredentials) => {
            const user = userCredentials.user;
            console.log('User signed in:', user.email);
            router.push('/account')
        })
        .catch((error) => {
            let errorMessage = '';
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = 'An account with this email does not exist. Please create a new account.'
                    break;
                case 'auth/invalid-credential':
                    errorMessage = 'Invalid email/password. Please check sign-in information and try again.'
                    break;
                default :
                errorMessage = 'An error has occurred. Please try again later.'
            }
            console.error('Error while loggin in:', errorMessage);
        })
    };
    return(
        <>
        <div className="w-full mt-10 md:bg-white md:py-10 md:px-10 md:rounded md:max-w-[75%] lg:max-w-[50%] xl:max-w-[40%]">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-customGrey my-2">Add your details below to get back into the app</p>
            <form className="mt-8">
                <div className="flex flex-col relative mt-2">
                    <label className="text-xs my-1">Email Address</label>
                    <input className="border-2 border-customBorders text-customGrey pl-10 py-2 rounded-lg" 
                    type="email" 
                    placeholder="e.g. alex@email.com" 
                    value={emailAddress}
                    onChange={(e) => {setEmailAddress(e.target.value)}}></input>
                    <div className="absolute left-3.5 top-[37px]">
                        <Image
                        src={Email}
                        alt="Email Icon"
                        />
                    </div>
                </div>
                <div className="flex flex-col relative mt-5">
                    <label className="text-xs my-1">Password</label>
                    <input className="border-2 border-customBorders text-customGrey pl-10 py-2 rounded-lg" 
                    type="text" 
                    placeholder="Enter your password" 
                    value={passwordText}
                    onChange={(e) => {setPasswordText(e.target.value)}}></input>
                    <div className="absolute left-3.5 top-[37px]">
                        <Image 
                        src={Password}
                        alt="Password Icon"/>
                    </div>
                </div>
                <button className="w-full border-2 border-red block mx-auto py-2 bg-customPurple active:bg-customPurpleActive
                active:shadow active:shadow-customLightPurple hover:customLightPurple text-white mt-6 rounded-lg" 
                type="submit"
                onClick={loginAccount}>Login</button>
            </form>

        </div>
        </>
    );
}