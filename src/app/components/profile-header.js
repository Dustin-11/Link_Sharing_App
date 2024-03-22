'use client';

import LinkIcon from "../../../public/images/icon-links-header.svg";
import Preview from "../../../public/images/icon-preview-header.svg";
import Profile from "../../../public/images/icon-profile-details-header.svg";
import Image from "next/image";
import Icon from "../../../public/images/logo-devlinks-small.svg";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { UserDetailsContext } from "../layout";
import { useContext } from "react";


export default function ProfileHeader() {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const router = useRouter();
    const signingOut = () => {
        signOut(auth)
        .then(() => {
            setUserDetails({
                uid: '',
                firstName: '',
                lastName: '',
                email: '',
                photo: '',
                links: []
            })
            router.push('/');
            console.log('User signed out', userDetails);
        })
        .catch((error) => {
            console.log('Error signing out', error);
        })
    }
    return (
        <nav className="bg-customWhite flex justify-between align-center w-full px-6 py-4 fixed top-0">
            <Image
                src={Icon}
                alt="Devlinks Icon"
                className=""
                onClick={signingOut}>
            </Image>
            <div className="flex gap-2">
                <Link href="/account" className="flex align-center px-6 py-2 rounded-lg focus:bg-customLightPurple">
                    <Image
                        src={LinkIcon}
                        alt="Link Icon">
                    </Image>
                </Link>
                <Link href="/profile" className="flex align-center px-6 py-2 rounded-lg focus:bg-customLightPurple">
                    <Image
                        src={Profile}
                        alt="Profil Icon">
                    </Image>
                </Link>
            </div>
            <Link href="/preview" className="flex align-center px-3 py-2 rounded-lg focus:bg-customLightPurple border-1 border-customPurple">
                <Image
                    src={Preview}
                    alt="Profile Preview Icon">
                </Image>
            </Link>
        </nav>
    );
}