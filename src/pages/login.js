import Password from "../../public/images/icon-password.svg";
import Email from "../../public/images/icon-email.svg";
import Image from "next/image";
import Link from "next/link";
import SharedHeader from "./shared-header";

export default function Login() {
    return(
        <>
        <SharedHeader></SharedHeader>
        <div className="w-full mt-10 md:bg-white md:py-10 md:px-10 md:rounded md:max-w-[75%] lg:max-w-[50%] xl:max-w-[40%]">
            <h1 className="text-2xl font-bold">Login</h1>
            <p className="text-customGrey my-2">Add your details below to get back into the app</p>
            <form className="mt-8">
                <div className="flex flex-col relative mt-2">
                    <label className="text-xs my-1">Email Address</label>
                    <input className="border-2 border-customBorders text-customGrey pl-10 py-2 rounded-lg" type="email" placeholder="e.g. alex@email.com" ></input>
                    <div className="absolute left-3.5 top-[37px]">
                        <Image
                        src={Email}
                        alt="Email Icon"
                        />
                    </div>
                </div>
                <div className="flex flex-col relative mt-5">
                    <label className="text-xs my-1">Password</label>
                    <input className="border-2 border-customBorders text-customGrey pl-10 py-2 rounded-lg" type="text" placeholder="Enter your password"></input>
                    <div className="absolute left-3.5 top-[37px]">
                        <Image 
                        src={Password}
                        alt="Password Icon"/>
                    </div>
                </div>
                <button className="w-full border-2 border-red block mx-auto py-2 bg-customPurple active:bg-customPurpleActive
                active:shadow active:shadow-customLightPurple hover:customLightPurple text-white mt-6 rounded-lg" type="submit">Login</button>
            </form>
            <div className="flex flex-col items-center mt-5">
                <p className="text-customGrey">Don't have an account?</p>
                
                <Link href="/create-profile" className="text-customPurple">Create an account</Link>
                
            </div>
        </div>
        </>
    );
}