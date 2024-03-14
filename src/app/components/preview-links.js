'use client';

import Image from "next/image";
import { UserDetailsContext } from "../layout";
import { useContext, useEffect } from "react";
import LinkButton from "./preview-link-button";

export default function PreviewLinks() {
    const { userDetails } = useContext(UserDetailsContext);
    useEffect(() => {
        console.log(userDetails.links);
    }, [])
    return(
        <ul>
            {userDetails.links.map((card) => (<LinkButton key={card.indexNumber} themeSetter={card.name}></LinkButton>))}
        </ul>
    );
}