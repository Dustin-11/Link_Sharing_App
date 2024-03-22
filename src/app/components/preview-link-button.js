'use client';

//  icons
import GitHub from '../../../public/images/icon-github.svg';
import Frontend from '../../../public/images/icon-frontend-mentor.svg';
import Twitter from '../../../public/images/icon-twitter.svg';
import LinkedIn from '../../../public/images/icon-linkedin.svg';
import YouTube from '../../../public/images/icon-youtube.svg';
import Facebook from '../../../public/images/icon-facebook.svg';
import Twitch from '../../../public/images/icon-twitch.svg';
import Dev from '../../../public/images/icon-devto.svg';
import CodeWars from '../../../public/images/icon-codewars.svg';
import CodePen from '../../../public/images/icon-codepen.svg';
import freeCC from '../../../public/images/icon-freecodecamp.svg';
import GitLab from '../../../public/images/icon-gitlab.svg';
import Hash from '../../../public/images/icon-hashnode.svg';
import Stack from '../../../public/images/icon-stack-overflow.svg';
import Arrow from '../../../public/images/icon-arrow-right.svg';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LinkButton ({themeSetter, linkAddress}) {
    const platforms = [
        {name: 'Github', urlPath: GitHub},
        {name: 'Frontend Mentor', urlPath: Frontend},
        {name: 'Twitter', urlPath: Twitter},
        {name: 'LinkedIn', urlPath: LinkedIn},
        {name: 'Youtube', urlPath: YouTube},
        {name: 'Facebook', urlPath: Facebook},
        {name: 'Twitch', urlPath: Twitch},
        {name: 'Dev', urlPath: Dev},
        {name: 'CodeWars', urlPath: CodeWars},
        {name: 'CodePen', urlPath: CodePen},
        {name: 'freeCC', urlPath: freeCC},
        {name: 'GitLab', urlPath: GitLab},
        {name: 'Hash', urlPath: Hash},
        {name: 'Stack', urlPath: Stack}
    ]
    const [image, setImage] = useState();
    const [theme, setTheme] = useState();

    useEffect(() => {
        nameToThemeConverter();
    }, [])

    const nameToThemeConverter = () => {
        for(let i = 0; i < platforms.length; i++) {
            if(platforms[i].name === themeSetter) {
                setImage(platforms[i].urlPath);
            }
        }
        let modifiedString = themeSetter.toLowerCase().replace(/ /g, '-')
        setTheme(modifiedString);
    }

    const openLink = () => {
        try {
            window.open(linkAddress, '_blank')
        }
        catch (error) {
            console.log('Invalid Link', err);
        }
    }

    return(
  
            <li className={`${theme} mt-4 text-customWhite py-3 rounded-lg border-1 border-customBorders flex gap-2 pl-4 justify-between`}
                onClick={openLink}>
                <div className='flex gap-3'>
                <Image src={image} alt='Platform Logo' className='customImage'></Image>
                <span>{themeSetter}</span>
                </div>
                <Image src={Arrow} alt='Arrow Icon' className='mr-4'></Image>
            </li>
    )
}