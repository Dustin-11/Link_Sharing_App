'use client';

import { useState, useEffect } from "react";

import PlatformOptions from "./platform-options";
import Image from "next/image";
import Icon from "../../../public/images/icon-drag-and-drop.svg"

export default function LinkCard(props) {
    const [optionSelected, setOptionSelected] = useState([]);

    useEffect(() => {
        console.log(optionSelected);
    }, [optionSelected]);
    return(
        <div className="bg-customLightGrey my-4 mx-5 text-left rounded-lg p-5">
            <div className="flex justify-between text-customGrey">
                <div className="flex gap-4">
                    <Image src={Icon} className="hover:pointer"/>
                    <h1 className="font-bold">{`Link # ${props.count + 1}`}</h1>
                </div>
                <button className="hover:pointer">Remove</button>
            </div>
            <div className="relative">
                <label className="block my-1 mt-5 text-customDarkGrey text-xs">Platform</label>
                <PlatformOptions handleOptionSelection={(option) => setOptionSelected(option)}></PlatformOptions>
                <label className="block my-1 mt-16 block text-xs">Link</label>
                <input type="text" placeholder="e.g. https://www.github.com/"
                        className="block w-full py-2 pl-2 rounded-lg border-customBorders border-2"></input>
            </div>
        </div>
);
}