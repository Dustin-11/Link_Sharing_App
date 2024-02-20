import Authentication from "@/pages/authentication";
import Profile from "@/pages/profile";

export default function Signin() {
  return (
    <main className="flex min-h-screen flex-col items-center p-6 font-customRegular 
    md:justify-center md:bg-customLightGrey">
      <Authentication></Authentication>

    </main>
  );
}
