import { useState } from "react";
import SideNav from "../components/SideNav";
import { useTheme } from "../context/theme/Theme";
import PlaceholderProfilePic from "../assets/images/depositphotos_137014128-stock-illustration-user-profile-icon.jpg";
const Error=()=>{
    const {theme}=useTheme();
    const [errorType]=useState<string>("");
    const [errorMessage,setErrorMessage]=useState<string>("");
    {errorType==="404" && setErrorMessage("Page Not Found")}

    return(
        <div className={`flex ${theme==="dark"?"dark":"light"}`}>
           <div>
            <SideNav userId="userId" profilePic={PlaceholderProfilePic}/>
           </div>
           <div className="dark:bg-black">
                <h1 className="text-center ">Error</h1>
            </div>
            {errorType==="404" && <div>
                {errorMessage}
                </div>}
        </div>
    )
};

export default Error;