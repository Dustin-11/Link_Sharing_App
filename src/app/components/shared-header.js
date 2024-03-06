import Icon from "../../../public/images/logo-devlinks-small.svg";
import Image from "next/image";

export default function SharedHeader() {
    return(
        <div className="w-full flex border-redjustify-start md:justify-center">
            <Image 
            src={Icon}
            width={40}
            height={40}
            alt="Devlinks Logo"
            />
            <h1 className="text-customLarge text-customDarkGrey font-customBold font-extrabold ml-2">devlinks</h1>
        </div>
    );
}