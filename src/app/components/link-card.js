'use client';

import { useState, useEffect } from "react";

import PlatformOptions from "./platform-options";
import Image from "next/image";
import Icon from "../../../public/images/icon-drag-and-drop.svg"

export default function LinkCard(props) {
    const [option, setOption] = useState('');
    const [url, setUrl] = useState('');
    const [index, setIndex] = useState();
    const [cardDetails, setCardDetails] = useState({});

    useEffect(() => {
        if(Array.isArray(cardDetails)) {
        props.updateList([...cardDetails, {name: option, link: url, indexNumber: props.count}]);
    }
    else {
        props.updateList({name: option, link: url, indexNumber: props.count});
    }
    }, [option, url, index]);
    useEffect(() => {
        props.link
    }, [cardDetails]);
    return(
        <div className="bg-customLightGrey my-4 mx-5 text-left rounded-lg p-5">
            <div className="flex justify-between text-customGrey">
                <div className="flex gap-4">
                    <Image src={Icon} className="hover:pointer"
                           alt="Drag and Drop Icon"/>
                    <h1 className="font-bold">{`Link # ${props.count + 1}`}</h1>
                </div>
                <button className="hover:pointer" onClick={() => props.removeLink(props.count)}>Remove</button>
            </div>
            <div className="relative">
                <label className="block my-1 mt-5 text-customDarkGrey text-xs">Platform</label>
                <PlatformOptions handleOptionSelection={(option) => setOption(option)}></PlatformOptions>
                <label className="block my-1 mt-16 block text-xs">Link</label>
                <input type="text" placeholder="e.g. https://www.github.com/"
                       onChange={(e) => setUrl(e.target.value)}
                       className="block w-full py-2 pl-2 rounded-lg border-customBorders border-2"></input>
            </div>
        </div>
);
}