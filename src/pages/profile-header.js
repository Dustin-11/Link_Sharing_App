import Link from "../../public/images/icon-links-header.svg";
import Preview from "../../public/images/icon-preview-header.svg";
import Profile from "../../public/images/icon-profile-details-header.svg";
import Image from "next/image";
import Icon from "../../public/images/logo-devlinks-small.svg";

export default function ProfileHeader() {
    return (
        <nav className="flex justify-between align-center w-full">
            <Image
            src={Icon}
            className="">
            </Image>
            <div className="flex gap-2">
                <button className="flex align-center px-4 py-2 rounded-lg
                focus:bg-customLightPurple"><Image
                src={Link}></Image> </button>
                <button className="flex align-center px-4 py-2 rounded-lg focus:bg-customLightPurple"><Image
                src={Profile}></Image></button>
            </div>
            <button className="flex align-center px-3 py-2 rounded-lg focus:bg-customLightPurple border-2 border-customPurple"><Image
            src={Preview}></Image></button>
        </nav>
      
    );
}