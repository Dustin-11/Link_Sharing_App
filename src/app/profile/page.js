'use client';

import ProfileHeader from "../components/profile-header";
import ProfileUser from "../components/profile-user";
import ProfilePhoto from "../components/profile-photo";
import { useEffect, useState } from "react";

export default function Profile () {
    const [disabled, setDisabled] = useState(true);
    const [photoTrigger, setPhotoTrigger] = useState(false);
    const [userTrigger, setUserTrigger] = useState(false);
    const [photoChanged, setPhotoChanged] = useState(false);
    // const [emailChanged, setEmailChanged] = useState(false);
    const [nameRequirementsMet, setNameRequirementsMet] = useState(false);
    const [initialNamesReq, setInitialNamesReq] = useState(false);

    //  Triggered on save button click
    //  Reads each child component property and affects as needed
    //  Sets disabled state back to true
    const profileUserFlag = async () => {
        if(nameRequirementsMet) {
            await setUserTrigger(true);
            console.log('nameRequirementsMet');
        }
        if(photoChanged) {
            await setPhotoTrigger(true);
            console.log('photoChanged');
        }
        setDisabled(true);
    };

    //  Figure out how to update save button disabled value when just email value is changed
    // useEffect(() => {
    //     if(emailChanged) {
    //         setDisabled(false);
    //     }
    //     else {
    //         setDisabled(true);
    //     }
    // }, [emailChanged])

    //  Monitors photoChanged and nameRequirementsMet in order to change disabled state to affect button
    useEffect(() => {
        if(photoChanged == true && nameRequirementsMet == true) {
            setDisabled(false);
        } else if(nameRequirementsMet) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    }, [photoChanged, nameRequirementsMet]);

    //  This was needed in order to tell if the initial values loaded from database met length requirements
    useEffect(() => {
        if(photoChanged && initialNamesReq) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }, [photoChanged])

    //  Makes initial button disabled
    useEffect(() => {
            setDisabled(true);
    }, [])
    return(
        <div className="bg-customLightGrey h-screen w-screen">
            <ProfileHeader></ProfileHeader>
            <main className="bg-customWhite h-[calc(100vh-110px)] w-11/12 fixed bottom-4 
            left-1/2 transform -translate-x-1/2 rounded-lg
            overflow-hidden">
                <div className="h-[92%] overflow-y-scroll">
                <ProfilePhoto setDidPhotoChange={(bool) => setPhotoChanged(bool)}
                              trigger={photoTrigger}></ProfilePhoto>
                <ProfileUser nameRequirements={(bool) => {setNameRequirementsMet(bool)}}
                             isInitialNames={(bool) => setInitialNamesReq(bool)}
                             emailNotification={(bool) => setEmailChanged(bool)}
                             trigger={userTrigger}></ProfileUser>
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