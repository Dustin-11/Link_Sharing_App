'use client';

import AddLink from "@/app/components/add-link";
import ProfileHeader from "@/app/components/profile-header";
import PhoneIllustration from "../components/phone-illustration";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function account () {
    return(
        // <DndProvider backend={HTML5Backend}>
        <div className="bg-customLightGrey h-screen w-screen">
            <ProfileHeader></ProfileHeader>
            <div className="xl:flex xl:justify-between xl:pt-20 xl:h-full xl:gap-4">
                <div className="invisible xl:visible xl:bg-white xl:w-2/5 xl:flex 
                                xl:justify-center xl:items-center xl:ml-2 xl:mb-2 xl:rounded-xl">
                    <PhoneIllustration></PhoneIllustration>
                </div>
                <div className="xl:relative xl:w-3/5 xl:mb-2 xl:mr-2 xl:rounded-xl">
                    <main className="bg-customWhite h-[calc(100vh-110px)] w-11/12 fixed bottom-4 
                                     left-1/2 transform -translate-x-1/2 rounded-lg
                                     overflow-hidden xl:w-full xl:absolute xl:h-full xl:bottom-0">
                        <AddLink></AddLink>
                    </main>
                </div>
            </div>
            {/* <main className="bg-customWhite h-[calc(100vh-110px)] w-11/12 fixed bottom-4 
            left-1/2 transform -translate-x-1/2 rounded-lg
            overflow-hidden">
                <AddLink></AddLink>
            </main> */}
        </div>
        /* </DndProvider> */
        //div className="bg-customLightGrey h-screen"
    );
}