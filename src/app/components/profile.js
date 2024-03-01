import AddLink from "./add-link";
import ProfileHeader from "./profile-header";

export default function Profile () {
    return (
        <>
            <ProfileHeader></ProfileHeader>
            <main className="bg-customLightGrey w-full">
                <div>
                    <AddLink></AddLink>
                </div>
            </main>
        </>
    );
}