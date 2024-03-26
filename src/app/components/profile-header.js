'use client';

import LinkIcon from "./icons-customizable/link-icon";
import Preview from "../../../public/images/icon-preview-header.svg";
import ProfileIcon from "./icons-customizable/profile-icon";
import Image from "next/image";
import Icon from "../../../public/images/logo-devlinks-small.svg";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/auth";
import Link from "next/link";
import { UserDetailsContext } from "../layout";
import { createContext, useContext, useEffect, useRef, useState } from "react";


export default function ProfileHeader() {
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);
    const [accountActive, setAccountActive] = useState(false);
    const [profileActive, setProfileActive] = useState(false);
    const [fillColor, setFillColor] = useState('#633CFF')
    const activeElement = useRef();
    const accountRef = useRef(null);
    const profileRef = useRef(null);
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

    const navigate = (x) => {
        router.push(x);
        // test.current = router.pathname;
        // console.log(test.current);
    }

    // useEffect(() => {
    //     if (test.current !== undefined) {
    //     console.log(test.current); }
    // }, [test.current])

    const handleClick1 = () => {
        localStorage.setItem('focus', 'account'); 
    }

    const handleClick2 = () => {
        localStorage.setItem('focus', 'profile');
    }

    useEffect(() => {
        if(localStorage.getItem('focus') !== null) {
            const focusValue = localStorage.getItem('focus');
            if(focusValue === 'account') {
                setAccountActive(true);
                setProfileActive(false);
            } else if (focusValue === 'profile') {
                setAccountActive(false);
                setProfileActive(true);
            }
    }
    }, [])

    return (
        <nav className="bg-customWhite flex justify-between align-center w-full px-6 py-4 fixed top-0">
            <Image
                src={Icon}
                alt="Devlinks Icon"
                className=""
                onClick={signingOut}>
            </Image>
            
            <div className="flex gap-2">
                <a ref={accountRef} onClick={() => {handleClick1(); navigate('/account')}} href="/account" className={`flex align-center px-6 py-2 rounded-lg 
                                                    ${accountActive ? 'bg-customLightPurple' : ''} `}>
                    <LinkIcon colorFlag={accountActive}/>
                </a>
                <a ref={profileRef} onClick={() => {handleClick2(); navigate('/profile')}} href="/profile" className={`flex align-center px-6 py-2 rounded-lg focus:bg-customLightPurple focus:outline-none
                                                                                                                       ${profileActive ? 'bg-customLightPurple' : ''}`}>
                    <ProfileIcon colorFlag={profileActive} />
                </a>
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