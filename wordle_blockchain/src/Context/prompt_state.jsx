import { useState } from "react";
import PromptContext from "./prompt_context";

const promptState = (props) => {
    
    function setWinMsg(msg){
        setState({
            "winmsg": msg,
            "visibility": "flex",
            setWinMsg,
            resetVisibility
        })
        var timeout = setTimeout(() => {
            resetVisibility()
        }, 5000);
    }

    function resetVisibility() {
        setState({
            "winmsg": "",
            visibility: "none",
            setWinMsg,
            resetVisibility
        })
    }
    const s1 = {
        "winmsg": "this is winmsg",
        visibility: "none",
        resetVisibility,
        setWinMsg
    }

    const [state, setState] = useState(s1);


    return(
        <PromptContext.Provider value={state}>
            {props.children}
        </PromptContext.Provider>
    )
}

export default promptState;