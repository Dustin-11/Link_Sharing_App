'use client';

import { useState, useEffect } from "react";

import PlatformOptions from "./platform-options";
import Image from "next/image";
import Icon from "../../../public/images/icon-drag-and-drop.svg"

export default function LinkCard(props ) {
    const [option, setOption] = useState('');
    const [url, setUrl] = useState('');
    const [cardDetails, setCardDetails] = useState({name: '', link: '', indexNumber: props.count, id: props.item.id});

    useEffect(() => {
        console.log(props.item.id);
    }, [cardDetails.id])

    useEffect(() => {
        setCardDetails(prevState => ({
            ...prevState,
            name: option,
            link: url
        }));
    }, [option, url]);
    
    const deleteFunction = () => {
        props.deleteLinkCard(props.item.id);
    }

    useEffect(() => {
        props.updateList(cardDetails);
    }, [cardDetails]);
    return(
        <div className="bg-customLightGrey my-4 mx-5 text-left rounded-lg p-5">
            <div className="flex justify-between text-customGrey">
                <div className="flex gap-4">
                    <Image src={Icon} className="hover:pointer"
                           alt="Drag and Drop Icon"/>
                    <h1 className="font-bold">{`Link # ${props.count + 1}`}</h1>
                </div>
                <button className="hover:pointer" onClick={deleteFunction}>Remove</button>
            </div>
            <div className="relative">
                <label className="block my-1 mt-5 text-customDarkGrey text-xs">Platform</label>
                <PlatformOptions handleOptionSelection={(option) => setOption(option)}></PlatformOptions>
                <label className="block my-1 mt-16 block text-xs">Link</label>
                <input type="text" placeholder="e.g. https://www.github.com/"
                       onChange={(e) => setUrl(e.target.value)}
                       value={url}
                       className="block w-full py-2 pl-2 rounded-lg border-customBorders border-1"></input>
            </div>
        </div>
);
}