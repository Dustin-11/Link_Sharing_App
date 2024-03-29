'use client';

import Image from "next/image";
import { UserDetailsContext } from "../layout";
import { useContext, useEffect, useState } from "react";

export default function PreviewUser() {
    const { userDetails } = useContext(UserDetailsContext);
    const [photo, setPhoto] = useState('');

    useEffect(() => {
        fetchImage();
    }, [])

    const fetchImage = async() => {
        try {
            const response = await fetch(userDetails.photo);
            const blob = await response.blob();
            const image = URL.createObjectURL(blob);
            setPhoto(image);
        } catch (error) {
            console.error('Error loading image:', error);
        }
    }

    useEffect(() => {
        if(userDetails.photo) {
            fetchImage();
        }
    }, [userDetails.photo])

    return(
        <div className="text-center">
         
            <div className="relative h-[130px] w-[130px] mx-auto mt-16 border-4 border-customPurple rounded-full overflow-hidden flex align-center justify-center md:mt-8">
                {photo ? <Image src={photo} alt="ProfilePhoto" height={150} width={150} className="object-cover"></Image> :
                <div></div>}
            </div>
            
            {userDetails && (<><h1 className="mt-5 text-customLarge text-customDarkGrey font-bold md:mt-3">{`${userDetails.firstName} ${userDetails.lastName}`}</h1>
            <p className="mt-3 text-xs text-customGrey md:mt-2">{userDetails.email}</p></>)}
        </div>
    );
}