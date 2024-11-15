import { useState } from "react";
import SideNav from "../components/SideNav";
import { useTheme } from "../context/theme/Theme";
const Error=()=>{
    const {theme}=useTheme();
    const [errorType,setErrorType]=useState<string>("");
    const [errorMessage,setErrorMessage]=useState<string>("");
    {errorType==="404" && setErrorMessage("Page Not Found")}

    return(
        <div className={`flex ${theme==="dark"?"dark":"light"}`}>
           <div>
            <SideNav/>
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