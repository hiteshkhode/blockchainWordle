import React, { Component } from 'react';
import { useContext } from 'react';
import PromptContext from '../Context/prompt_context.jsx';

// function PromptFunction(){
//     const promptState = useContext(promptContext);

//     // const toTestContext = setTimeout(() => {
//     //                             promptState.setWinMsg("test context")
//     //                             console.log(promptState.winmsg)
//     //                             clearTimeout(toTestContext)
//     //                         }, 2000);

    
//     return(
//         <div id='msgPrompt'>
//             this should appear {promptState.winmsg}
//         </div>
//     )
// }

class Prompt extends Component {

    // componentDidMount() {
    //     console.log(this.context)
    // }   

    hidePrompt = () => {
        this.context.resetVisibility()
    }

    render() {
        const {winmsg, setWinMsg} = this.context;
        return(
            // <div id={this.context.visibility} className={'msgPrompt'} style={{display: this.context.visibility}}>
            //     <h1>{winmsg}</h1>
            //     <button onClick={this.hidePrompt}>
            //         <h1>
            //             Okay
            //         </h1>
            //     </button>
            // </div>
            <div className={'msgPrompt'} id={this.context.visibility} style={{display: this.context.visibility}}>
                <button className="close" onClick={this.hidePrompt} >✖</button>
                <p>{winmsg}</p>
                <button className="accept">That's fine!</button>
            </div>
        )
    }
}

Prompt.contextType = PromptContext

export default Prompt;