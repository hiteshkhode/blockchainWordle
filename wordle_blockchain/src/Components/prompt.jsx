import React, { Component } from 'react';
import { useContext } from 'react';
import promptContext from '../Context/prompt_context';

function PromptFunction(){
    const promptState = useContext(promptContext);

    setTimeout(() => {
        promptState.setWinMsg("test context")
        console.log(promptState.winmsg)
    }, 2000);

    return(
        <div id='msgPrompt'>
            this should appear {promptState.winmsg}
        </div>
    )
}

class Prompt extends Component {

    render() {
        return(
            <PromptFunction />
        )
    }
}

export default Prompt;