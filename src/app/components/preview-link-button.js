'use client';

//  icons
// import GitHub from '../../../public/images/icon-github.svg';
// import Frontend from '../../../public/images/icon-frontend-mentor.svg';
// import Twitter from '../../../public/images/icon-twitter.svg';
// import LinkedIn from '../../../public/images/icon-linkedin.svg';
// import YouTube from '../../../public/images/icon-youtube.svg';
// import Facebook from '../../../public/images/icon-facebook.svg';
// import Twitch from '../../../public/images/icon-twitch.svg';
// import Dev from '../../../public/images/icon-devto.svg';
// import CodeWars from '../../../public/images/icon-codewars.svg';
// import CodePen from '../../../public/images/icon-codepen.svg';
// import freeCC from '../../../public/images/icon-freecodecamp.svg';
// import GitLab from '../../../public/images/icon-gitlab.svg';
// import Hash from '../../../public/images/icon-hashnode.svg';
// import Stack from '../../../public/images/icon-stack-overflow.svg';
// import Arrow from '../../../public/images/icon-arrow-right.svg';

import CodePen from "./icons-customizable/codepen";
import CodeWars from "./icons-customizable/codewars";
import DevTo from "./icons-customizable/dev";
import Facebook from "./icons-customizable/facebook";
import FreeCodeCamp from "./icons-customizable/freecodecamp";
import FrontendMentor from "./icons-customizable/frontend-mentor";
import Github from "./icons-customizable/github";
import GitLab from "./icons-customizable/gitlab";
import HashNode from "./icons-customizable/hash";
import LinkedIn from "./icons-customizable/linkedin";
import StackOverflow from "./icons-customizable/stackoverflow";
import Twitch from "./icons-customizable/twitch";
import Twitter from "./icons-customizable/twitter";
import Youtube from "./icons-customizable/youtube";
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function LinkButton ({themeSetter, linkAddress}) {
    const platforms = {
        'Github': Github,
        'Frontend Mentor' : FrontendMentor,
        'Twitter' : Twitter,
        'LinkedIn': LinkedIn,
        'Youtube' : Youtube,
        'Facebook' : Facebook,
        'Twitch' : Twitch,
        'Dev' : DevTo,
        'Codewars' : CodeWars,
        'Codepen' : CodePen,
        'freeCC' : FreeCodeCamp,
        'GitLab' : GitLab,
        'Hash' : HashNode,
        'Stack' : StackOverflow
    }
    const [fillColor, setFillColor] = useState('#FFFFFF');
    const [theme, setTheme] = useState();

    useEffect(() => {
        nameToThemeConverter();
    }, [])

    const nameToThemeConverter = () => {
        if(themeSetter === 'Frontend Mentor') {
            setFillColor('#333333');
        }
        let modifiedString = themeSetter.toLowerCase().replace(/ /g, '-')
        setTheme(modifiedString);
            
    }

    const PlatformComponent = platforms[themeSetter];

    const openLink = () => {
        try {
            window.open(linkAddress, '_blank')
        }
        catch (error) {
            console.log('Invalid Link', err);
        }
    }

        //  SVG for arrow icon
        // function Arrow({ x, y, fill }) {
        //     return(
        //             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#EEE" x={x} y={y} viewBox="0 0 16 16">
        //                     <path fill={fill} d="M2.667 7.333v1.334h8L7 12.333l.947.947L13.227 8l-5.28-5.28L7 3.667l3.667 3.666h-8Z"/>
        //             </svg> 
        //         );
        // }

    return(
  
            <li className={`${theme} mt-4 text-customWhite py-3 rounded-lg border-1 border-customBorders flex gap-2 pl-4 justify-between`}
                onClick={openLink}>
                <div className='flex gap-3 items-center'>
                    {/* {<Facebook fill={'#000000'}/>} */}
                    {PlatformComponent && <PlatformComponent fill={fillColor} />}
                <span>{themeSetter}</span>
                </div>
            </li>
    )
}