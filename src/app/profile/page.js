'use client';

import ProfileDetails from "../components/profile-details";
import ProfileHeader from "../components/profile-header";
import ProfileUser from "../components/profile-user";
import { useEffect, useState } from "react";

export default function Profile () {
    const [disabled, setDisabled] = useState(true);
    const [clickTrigger, setClickTrigger] = useState(false);

    const profileUserFlag = () => {
        setClickTrigger(true);
        setDisabled(true);
    };

    useEffect(() => {
        if(!clickTrigger) {
            setDisabled(true);
        }
    }, [clickTrigger])
    return(
        <div className="bg-customLightGrey h-screen w-screen">
            <ProfileHeader></ProfileHeader>
            <main className="bg-customWhite h-[calc(100vh-110px)] w-11/12 fixed bottom-4 
            left-1/2 transform -translate-x-1/2 rounded-lg
            overflow-hidden">
                <div className="h-[92%] overflow-y-scroll">
                <ProfileDetails></ProfileDetails>
                <ProfileUser isButtonDisabled={(bool) => {setDisabled(bool)}} buttonClicked={clickTrigger} 
                setButtonClicked={(bool) => setClickTrigger(bool)}></ProfileUser>
                </div>
            </main>
            <div className="absolute bottom-0 w-full pb-5 bg-customWhite">
                    <div className="border-b border-customBorders"></div>
                    <div className="px-5">
                        <button className="mt-5 bg-customPurple text-customWhite w-full font-bold py-2 rounded-lg 
                        disabled:bg-customLightPurple"
                                disabled={disabled} onClick={profileUserFlag}>Save</button>
                    </div>
            </div>
        </div>
    );
}