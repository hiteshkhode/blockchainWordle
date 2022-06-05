import { useState } from "react";
import PromptContext from "./prompt_context";

const promptState = (props) => {
    function setWinMsg(msg){
        setState({
            "winmsg": msg,
            setWinMsg
        })
    }
    const s1 = {
        "winmsg": "this is winmsg",
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