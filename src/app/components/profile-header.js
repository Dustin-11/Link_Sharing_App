'use client';

import Link from "../../../public/images/icon-links-header.svg";
import Preview from "../../../public/images/icon-preview-header.svg";
import Profile from "../../../public/images/icon-profile-details-header.svg";
import Image from "next/image";
import Icon from "../../../public/images/logo-devlinks-small.svg";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import auth from "@/lib/auth";


export default function ProfileHeader() {
    const router = useRouter();
    const signingOut = () => {
        signOut(auth)
        .then(() => {
            console.log('User signed out');
            router.push('/');
        })
        .catch((error) => {
            console.log('Error signing out', error);
        })
    }
    return (
        <nav className="bg-customWhite flex justify-between align-center w-full px-6 py-4 fixed top-0">
            <Image
            src={Icon}
            className=""
            onClick={signingOut}>
            </Image>
            <div className="flex gap-2">
                <button className="flex align-center px-6 py-2 rounded-lg
                focus:bg-customLightPurple"><Image
                src={Link}></Image> </button>
                <button className="flex align-center px-6 py-2 rounded-lg focus:bg-customLightPurple"><Image
                src={Profile}></Image></button>
            </div>
            <button className="flex align-center px-3 py-2 rounded-lg focus:bg-customLightPurple border-2 border-customPurple"><Image
            src={Preview}></Image></button>
        </nav>
      
    );
}