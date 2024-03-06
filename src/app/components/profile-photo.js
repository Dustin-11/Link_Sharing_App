'use client';

import Image from "next/image";
import UploadImage from "../../../public/images/icon-upload-image.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { PhotoContext } from "../layout";

export default function ProfilePhoto() {
    const fileUploadRef = useRef(null);
    const { profilePhoto, setProfilePhoto } = useContext(PhotoContext);
    const [picture, setPicture] = useState();


    const handleDivClick = () => {
        fileUploadRef.current.click();
    }

    const selectFile = (e) => {
        const file = e.target.files[0];
        const imageUrl = URL.createObjectURL(file);
        setPicture(imageUrl);
        setProfilePhoto(imageUrl);
        localStorage.setItem('profilePhoto', imageUrl);
    }
    useEffect(() => {
        const profilePic = localStorage.getItem('profilePhoto');
        if(profilePic) {
            setPicture(profilePic);
        }
    }, [])

    return(
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
    )
}