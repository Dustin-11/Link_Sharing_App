'use client';

import Image from "next/image";
import UploadImage from "../../../public/images/icon-upload-image.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { PhotoContext, UserDetailsContext } from "../layout";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export default function ProfilePhoto({ isButtonDisabled, buttonClicked, setButtonClicked }) {
    const fileUploadRef = useRef(null);
    // const { profilePhoto, setProfilePhoto } = useContext(PhotoContext);
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const [picture, setPicture] = useState();
    // Get a reference to the storage service, which is used to create references in your storage bucket
    // const storage = getStorage();

    // Create a storage reference from our storage service
    // const storageRef = ref(storage);



    const handleDivClick = () => {
        fileUploadRef.current.click();
    }

    const selectFile = (e) => {
        const file = e.target.files[0];
        console.log(file.name);
        const storage = getStorage();
        const storageRef = ref(storage, 'images/' + file.name);
        
        const uploadTask = uploadBytesResumable(storageRef, file);
        const imageUrl = URL.createObjectURL(file);
        setPicture(imageUrl);
        setUserDetails({...userDetails, photo: imageUrl});
        // setProfilePhoto(imageUrl);
        console.log(imageUrl);
        const updateUser = async () => {
            if(!userDetails.uid) {
                return;
            }
            const userReference = doc(db, 'users', userDetails.uid);
            await updateDoc(userReference, {
              photo: imageUrl
            })
          }
          updateUser();
        // localStorage.setItem('profilePhoto', imageUrl);
    }

    useEffect(() => {
        if(userDetails.photo) {
            setPicture(userDetails.photo);
        }
    }, [])
    useEffect(() => {
        if(userDetails.photo !== picture) {
            isButtonDisabled(false);
        } 
    }, [picture])
    // useEffect(() => {
    //     // const profilePic = localStorage.getItem('profilePhoto');
    
            
    //         try{
    //             const updateUser2 = async () => {
    //                 if(!userDetails.uid) {
    //                     return;
    //                 }
    //                 const userReference = doc(db, 'users', userDetails.uid);
    //                 await updateDoc(userReference, {
    //                   photo: imageUrl
    //                 })
    //               }
    //               updateUser2();
    //               console.log('User updated sucessfully');
    //             }
    //             catch (error) {
    //                 console.log('Error occurred:', error);
    //             }
        
    // });

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