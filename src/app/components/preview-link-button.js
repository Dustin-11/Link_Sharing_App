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
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LinkButton ({themeSetter}) {
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

    const [theme, setTheme] = useState();

    useEffect(() => {
        console.log(theme);
    }, [theme])

    useEffect(() => {
        nameToThemeConverter();
    }, [])
    const nameToThemeConverter = () => {
        let modifiedString = themeSetter.toLowerCase().replace(' ', '-')
        setTheme(modifiedString);
        // switch(themeSetter) {
        //     case 'Github':
        //         setTheme('Black');
        //         break;
        //     case 'Frontend Mentor':
        //         setTheme('White');
        //         break;
        //     case 'Twitter':
        //         setTheme()
        // }

    }

    return(
        <ul className='px-16'>
            <li className={`${theme} mt-5 text-customWhite py-2 rounded-lg`}>{themeSetter}</li>
        </ul>
    )
}