'use client';

import Image from "next/image";
import { PhotoContext, UserDetailsContext } from "../layout";
import { useContext } from "react";

export default function PreviewUser() {
    const { profilePhoto } = useContext(PhotoContext);
    const { userDetails } = useContext(UserDetailsContext);

    return(
        <div className="text-center">
            <div className="relative h-[130px] w-[130px] mx-auto mt-16 border-4 border-customPurple rounded-full overflow-hidden flex align-center justify-center">
                {profilePhoto ? <Image src={profilePhoto} alt="ProfilePhoto" height={150} width={150} className="object-cover"></Image> :
                <div></div>}
            </div>
            <h1 className="mt-5 text-customLarge text-customDarkGrey font-bold">{`${userDetails.firstName} ${userDetails.lastName}`}</h1>
            <p className="mt-3 text-xs text-customGrey">{userDetails.email}</p>
        </div>
    );
}