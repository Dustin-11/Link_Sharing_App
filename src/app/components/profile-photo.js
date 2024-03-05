import Image from "next/image";
import UploadImage from "../../../public/images/icon-upload-image.svg";

export default function ProfilePhoto() {

    return(
        <div className="bg-customLightGrey my-4 mx-5 text-left rounded-lg p-5 flex flex-col">
            <p>Profile Picture</p>
            <div className="w-4/5 my-5 py-16 bg-customLightPurple rounded-xl text-center text-customPurple font-bold">
                <Image src={UploadImage} alt="Upload Image Icon" className="mx-auto"/>
                <p className="mt-2">+ Upload Image</p>
            </div>
            <p className="text-xs">Image must be below 1024x1024px. Use PNG or JPG format. </p>
        </div>
    )
}