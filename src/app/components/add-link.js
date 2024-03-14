'use client';

import Image from "next/image";
import PhoneIcon from "../../../public/images/illustration-empty.svg"
import { useContext, useEffect, useState } from "react";
import LinkCard from "./link-card";
import { list } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { UserDetailsContext } from "../layout";

export default function AddLink() {

    //  components

    // List of link-card objects -- allows for deleting and resorting
    const [listOfLinks, setListOfLinks] = useState([]);
    // Handles if the instruction or link-card is displayed
    const [displayLinks, setDisplayLinks] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const { userDetails, setUserDetails } = useContext(UserDetailsContext);

    const addNewLink = () => {
        setDisplayLinks(true);
        const newCardDetails = {
            name: '', 
            link: '', 
            indexNumber: listOfLinks.length,
            id: Date.now()
        }
        setListOfLinks(prevState => ([...prevState, newCardDetails]))
    };

    const handleFunction = (card) => {
        if(Array.isArray(listOfLinks)) {
            console.log('handleFunction outer if');
            let updated = false;
            const newArray = listOfLinks.map(link => {
                if(link.indexNumber === card.indexNumber) {
                    updated = true;
                    return { ...link, name: card.name, link: card.link }
                }
                else {
                    return link
                }
            })
            if (updated) {
                setListOfLinks(newArray);
            }
            else {
                setListOfLinks([...listOfLinks, card]);
            }
        }
        else {
            setListOfLinks([card]);
        }
    };

    const deleteFunction = (num) => {
        console.log(num);
        if(Array.isArray(listOfLinks)) {
            let newArray = listOfLinks.filter(link =>
                link.id !== num);
                setListOfLinks(newArray);
            }
        }

    const saveLinks = async () => {
        setDisabled(true);
        const reference = doc(db, 'users', userDetails.uid)
        await updateDoc(reference, {
            links: listOfLinks
        })
        setUserDetails(prevState => ({...prevState, links: listOfLinks}));

    }

    useEffect(() => {
        console.log(userDetails);
    }, [])

    useEffect(() => {
        if(listOfLinks.length === 0) {
            setDisplayLinks(false);
            setDisabled(true);
        }
        else {
            setDisabled(false);
        }
    }, [listOfLinks.length])

    //  Loops through all the links and checks to see if every link has been filled out
    useEffect(() => {
        let flag;
        console.log(listOfLinks);
        listOfLinks.forEach(obj => {
            Object.keys(obj).forEach(key => {
                if(obj[key].length === 0 || obj[key] === undefined || obj[key] === null) {
                    flag = true;
                }
            });
            if(flag) {
                setDisabled(true);
            } 
            else {
                setDisabled(false);
            }
        })
    }, [listOfLinks]);

    return (
        <>
            <div className="px-5 pt-5">
                <h1 className="text-2xl font-bold mb-3 mt-5">Customize your links</h1>
                <p className="text-customGrey">Add/edit/remove links below and then share all your profiles with the world!</p>
                <button className="block border-1 border-customPurple text-customPurple font-bold w-full py-2 rounded-lg mt-8"
                        onClick={addNewLink}>+ Add new link</button>
            </div>

                {displayLinks ?
                <div className="overflow-y-scroll h-[55%]">
                    {listOfLinks.map((card, index) => (
                        <LinkCard key={card.id}
                                  count={index}
                                  item={card}
                                  updateList={(item) => handleFunction(item)}
                                  deleteLinkCard= {(num) => deleteFunction(num)}></LinkCard>
                    ))}
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
                    <button className="mt-5 bg-customPurple text-customWhite w-full font-bold py-2 rounded-lg disabled:bg-customLightPurple"
                            disabled={disabled}
                            onClick={saveLinks}>Save</button>
                </div>
            </div>
        </>
    );
}