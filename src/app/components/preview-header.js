'use client'; 

import Link from "next/link";

export default function PreviewHeader() {

    const handleClick = () => {
        setProfilePhoto(foo => foo + 1);
        console.log(profilePhoto);
    }

    return (
        <nav className="bg-customWhite flex justify-center align-center gap-4 w-full fixed top-0">
            <Link href="/account" className="mt-5 bg-customWhite border-1 border-customPurple 
            text-customPurple w-2/5 py-2 rounded-lg text-center">Back to Editor</Link>
            <button className="mt-5 bg-customPurple text-customWhite w-2/5 py-2 rounded-lg"
                    onClick={handleClick}>Share Link</button>
        </nav>
    );
}