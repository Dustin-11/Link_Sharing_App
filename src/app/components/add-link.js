'use client';

import Image from "next/image";
import PhoneIcon from "../../../public/images/illustration-empty.svg"
import { useState } from "react";

//  components
import PlatformOptions from "./platform-options";
import LinkCard from "./link-card";
import Link from "next/link";

export default function AddLink() {
    const [listOfLinks, setListOfLinks] = useState([]);
    const [displayLinks, setDisplayLinks] = useState(false);
    const [linkCount, setLinkCount] = useState(0);
    const platforms = ['Github', 'Frontend Mentor', 'Twitter', 'LinkedIn', 'Youtube', 'Facebook', 'Twitch', 'Dev', 'CodeWars', 
    'CodePen', 'freeCC', 'GitLab', 'Hash', 'Stack']

    const addNewLink = () => {
        setDisplayLinks(true);
        setLinkCount(linkCount + 1);
    };
    return (
        <>
            <div className="px-5 pt-5">
                <h1 className="text-2xl font-bold mb-3 mt-5">Customize your links</h1>
                <p className="text-customGrey">Add/edit/remove links below and then share all your profiles with the world!</p>
                <button className="block border-2 border-customPurple text-customPurple font-bold w-full py-2 rounded-lg mt-8"
                        onClick={addNewLink}>+ Add new link</button>
            </div>
            
                {displayLinks ?
                <div className="overflow-y-scroll h-[55%]">
                    {Array.from({ length: linkCount }, (_, index) => (<LinkCard count={index} key={index}/>))}
                </div> :
            <div className="overflow-hidden h-[55%]">
                <div className="bg-customLightGrey my-4 mx-5 rounded-lg text-center rounded-lg">
                    <div className="px-20 pt-10">
                        <Image
                        src={PhoneIcon}
                        alt="Illustration Empty Icon"
                        className="mx-auto">
                        </Image>
                    </div>
                    <h1 className="text-2xl font-bold mx-4 mt-4">Let's get you started</h1>
                    <p className="text-customGrey mx-4 mt-5 pb-8">Use the "Add new link" button to get started. Once you have more than one link,
                        you can reorder and edit them. We're here to help you and share your profiles with everyone.
                    </p>
                </div>
                
                
            </div>}
            
            <div className="absolute bottom-0 w-full pb-5 bg-customWhite">
            <div className="border-b border-customBorders"></div>
            <div className="px-5">
                <button className="mt-5 bg-customPurple text-customWhite w-full font-bold py-2 rounded-lg">Save</button>
            </div>
            </div>
        </>
    );
}