'use client';

import AddLink from "@/app/components/add-link";
import ProfileHeader from "@/app/components/profile-header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function account () {
    return(
        // <DndProvider backend={HTML5Backend}>
        <div className="bg-customLightGrey h-screen w-screen">
            <ProfileHeader></ProfileHeader>
            <main className="bg-customWhite h-[calc(100vh-110px)] w-11/12 fixed bottom-4 
            left-1/2 transform -translate-x-1/2 rounded-lg
            overflow-hidden">
                <AddLink></AddLink>
            </main>
        </div>
        /* </DndProvider> */
        //div className="bg-customLightGrey h-screen"
    );
}