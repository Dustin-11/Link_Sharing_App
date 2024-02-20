import SharedHeader from "./shared-header";
import Login from "./login";
import CreateProfile from "./create-profile";
import { useState } from "react";

export default function authenticatin() {
    const [showLogin, setShowLogin] = useState(true);
    return(
        <>
            <SharedHeader></SharedHeader>
            {showLogin && <Login></Login>}
            {!showLogin && <CreateProfile></CreateProfile>}
        </>
    );
}