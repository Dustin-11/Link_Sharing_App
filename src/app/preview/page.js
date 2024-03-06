import PreviewHeader from "../components/preview-header";
import PreviewUser from "../components/preview-user";

export default function Preview() {
    return(
        <div className="bg-customWhite h-screen w-screen">
            <PreviewHeader></PreviewHeader>
            <main className="bg-customWhite h-[calc(100vh-110px)] w-11/12 fixed bottom-4 
            left-1/2 transform -translate-x-1/2 rounded-lg
            overflow-y-scroll">
                <PreviewUser></PreviewUser>

            </main>
        </div>
    )
}