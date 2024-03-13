'use client';

import Image from "next/image";
import UploadImage from "../../../public/images/icon-upload-image.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { UserDetailsContext } from "../layout";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

export default function ProfilePhoto({ setDidPhotoChange, trigger }) {
    const fileUploadRef = useRef(null);
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const [picture, setPicture] = useState();
    const [uploadInfo, setUploadInfo] = useState();

    //  Loads saved photo if user has one
    useEffect(() => {
        console.log('Initial render triggered');
        if(userDetails.photo) {
            setPicture(userDetails.photo);
        }
    }, [])

    //  Uses useRef hook placed on input type='file' to be triggered whenever parent div is clicked
    const handleDivClick = () => {
        fileUploadRef.current.click();
    }

    //  Triggered on save button click
    const handleUploadTask = async (uploadTask) => {
        try {
            if(!userDetails.uid) {
                return;
            }
            let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            
            const userReference = doc(db, 'users', userDetails.uid);
            await updateDoc(userReference, {
            photo: downloadURL
            })
            setUserDetails(() => ({
                ...userDetails,
                photo: downloadURL
            }));
            console.log('Updated User Database');
        }
        catch(error) {
            console.log('Error', error);
        }
    }

    //  Triggered on save button click -- main function that triggers two other functions
    //  Updates the user info in Firestore
    useEffect(() => {
        
        if(trigger){
            handleUploadTask(uploadInfo);
            setDidPhotoChange(false);
        }
    }, [trigger])


//  Triggered automatically when user changes profile photo
//  Stores uploadTask in state variable to be used to update user info in Firestore when save button clicked
//  Sets picture state to current photo selected to make current UI reflex current selection -- selections should not be made permanent until save button is clicked
//  This function needs to notify parent that photo changed
    const selectFile = (e) => {
        const file = e.target.files[0];
        console.log(file.name);
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
            console.log('Upload is ' + progress + '% done');
        },
        (error) => {
            console.log('Unsuccessful image upload. Please try again:', error);
        },
        async() => {
            setUploadInfo(uploadTask)
            setPicture(await getDownloadURL(uploadTask.snapshot.ref));
            setDidPhotoChange(true);
        });
    }

    return(
        <>
        <div className="px-5 pt-5">
            <h1 className="text-2xl font-bold mb-3 mt-5">Profile Details</h1>
            <p className="text-customGrey">Add your details to create a personal touch to your profile.</p>
        </div>
        <div className="bg-customLightGrey my-4 mx-5 text-left rounded-lg p-5 flex flex-col">
            <p>Profile Picture</p>
            <div className={` relative w-4/5 my-5 py-16 bg-customLightPurple rounded-xl text-center font-bold ${picture ? 'text-customWhite' : 'text-customPurple'}`} style={{backgroundImage: picture ? `url(${picture})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center'}}
                 onClick={handleDivClick}>
                      {picture && (<div className="absolute inset-0 bg-black bg-opacity-40"></div>)}
                <div className="relative">
                    <Image src={UploadImage} alt="Upload Image Icon" className="mx-auto"/>
                    <p className="mt-2">+ Upload Image</p>
                    <input ref={fileUploadRef} type="file" accept="image/*" className="hidden" onChange={selectFile}></input>
                </div>
            </div>
            <p className="text-xs">Image must be below 1024x1024px. Use PNG or JPG format. </p>
        </div>
        </>
    )
}