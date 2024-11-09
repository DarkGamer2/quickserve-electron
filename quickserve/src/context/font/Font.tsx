import React,{createContext,useContext,useState,ReactNode} from "react";

interface FontSizeContextProps{
    fontSize:string,
    setFontSize:(fontSize:string)=>void;
}

const FontSizeContext=createContext<FontSizeContextProps|undefined>(undefined);

export const FontSizeProvider:React.FC<{children:ReactNode}>=({children})=>{
    const [fontSize,setFontSize]=useState("12px");

    return(
        <FontSizeContext.Provider value={{fontSize,setFontSize}}>
            {children}
        </FontSizeContext.Provider>
    )
};

export const useFontSize=()=>{
    const context=useContext(FontSizeContext);
    if(!context){
        throw new Error("useFontSize must be used within a FontSizeProvider");
    }
    return context;
};