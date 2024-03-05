import ProfilePhoto from "./profile-photo"

export default function ProfileDetails () {
    return(
        <>
        <div className="px-5 pt-5">
            <h1 className="text-2xl font-bold mb-3 mt-5">Profile Details</h1>
            <p className="text-customGrey">Add your details to create a personal touch to your profile.</p>
        </div>
        <ProfilePhoto></ProfilePhoto>
        </>
    )
}