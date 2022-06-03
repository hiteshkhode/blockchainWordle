import React, { Component, useState } from 'react';
import { validlist, wordslist } from '../utils/wordsExtraction.mjs';
import erc20abi from '../ABI.json'
import { ethers } from 'ethers';
import { getAccountAddress } from '../utils/get_account_address.mjs';
import { makechange } from '../utils/set_value.mjs';
import { contractAddress } from '../utils/contract_info.json';
import { gettimestamp } from '../utils/get_time_stamp.mjs';
import { gameFinished } from '../utils/game_finished.mjs';
import { previouslyPlayed } from '../utils/previously_played.mjs';
import { pushZero } from '../utils/add_zero.mjs';


class Grid extends Component {

    state = {cellarray: new Array(30).fill(""), colorofdiv: new Array(30).fill("beige"), accountAddress: ""};
    cellCounter = 0;
    base = 0;
    consecutiveSubmission = false;

    // correctWord = validlist[Math.floor(Math.random() * validlist.length)].toUpperCase();
    correctWord = "ASDFG"

    wordCollection = wordslist

    async componentDidMount(){

        this.setState({cellarray: new Array(30).fill(""), colorofdiv: new Array(30).fill("beige") }, );
        
        if (await previouslyPlayed()) alert("You have already played this game!");
        else alert("you can start the game now!");


        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const contract_interactivity = new ethers.Contract( contractAddress, erc20abi, provider);
            // contract_interactivity.returnAddressResult(await getAccountAddress()).then((data) => console.log(data))  
        }

        else{
            alert("install metamask extension!!")
        }
    }
    

    checkIfWordInWordsCollection(theword){
        for (let index = 0; index < this.wordCollection.length; index++) {
            if(theword.toLowerCase() === this.wordCollection[index]) return true;
        }
        return false;
    }

    async checkValidity() {
        // form a word from array elements
        let word = "";
        for (let i = 0; i < 5; i++) {
            if (this.state.cellarray[i] !== "") {
                word += this.state.cellarray[this.cellCounter - 5 + i];
            }
        }
        if (word === this.correctWord && !this.consecutiveSubmission) {
            alert("You found the word!");
            this.consecutiveSubmission = true;
            for (let index = 0; index < 5; index++) {
                this.state.colorofdiv[(this.base)*5 + index] = "green";
            }
            this.base++;
            gameFinished();
            this.state = {cellarray: new Array(30).fill(""), colorofdiv: new Array(30).fill("beige"), accountAddress: ""};
            return ;
            // gettimestamp();
        }

        // check if the word exist in wordcollection
        else if (this.checkIfWordInWordsCollection(word) && !this.consecutiveSubmission) {
            let setofcorrectword = new Set();
            for (let i = 0; i < this.correctWord.length; i++) {
                setofcorrectword.add(this.correctWord[i]);
            }

            for (let index = 0; index < 5; index++) {
                
                if (word[index] === this.correctWord[index]) {
                    this.state.colorofdiv[this.base*5 + index] = "rgb(106 170 100)";
                }
                else if(setofcorrectword.has(word[index])) {
                    this.state.colorofdiv[this.base*5 + index] = "rgb(201 180 88)";
                }
                else{
                    this.state.colorofdiv[this.base*5 + index] = "rgb(120 124 126)";
                }

            }
            
            this.base++;
            this.consecutiveSubmission = true;
            this.setState({colorofdiv: this.state.colorofdiv});
            if(this.base === 6) {
                alert("You have lost the game!")
                gameFinished();
                console.log(this.correctWord)
                this.state = {cellarray: new Array(30).fill(""), colorofdiv: new Array(30).fill("beige"), accountAddress: ""};
                this.setState({cellarray: new Array(30).fill(""), colorofdiv: new Array(30).fill("beige") }, );
            };
        }

        else {
            alert("word does not exist");
        }


    }
        
    
    handleKeyDown(e) {
        if (e.keyCode == 13) {
            if (this.cellCounter%5 != 0) {
                console.log("not enough alphas");
            }
            else{
                this.checkValidity()
            }
        }
        else if (String.fromCharCode(e.keyCode).match(/(\w|\s)/g)) {
            this.consecutiveSubmission = false;
            if(this.cellCounter < (this.base + 1)*5){
                this.state.cellarray[this.cellCounter] = String.fromCharCode(e.keyCode);
                this.cellCounter++;
            }
        }
        // else if the key pressed is backspace
        else if (e.keyCode == 8) {
            if (this.cellCounter > this.base*5) {
                this.cellCounter--;
                this.state.cellarray[this.cellCounter] = "";
            }
        }
        
        else {
            //pressed key is a non-char
            //e.g. 'esc', 'backspace', 'up arrow'
            console.log("enter alphabet")
        }
        this.setState({cellarray: this.state.cellarray});
    }

    Gridrow = (props) => {
        return React.createElement('div', { id: `${props.id}`, className: `${props.className}` }, `${props.text}`);
    }

    rendergridelements = () => {
        let gridelements = [];
        for (let i = 0; i < 6; i++) {
            gridelements.push(<this.Gridrow id={i} className='gridrow' text='this is what should appear in place of grid' />);
        }
        return gridelements;
    }

    render() {
        return (
            <div id="wrapperDiv">
                <div className='outerGrid' tabIndex="0" onKeyDown={(e) => this.handleKeyDown(e)}>

                    <div className='row0'>
                        <div className="00 cell" style={{backgroundColor: `${this.state.colorofdiv[0]}`}}>{this.state.cellarray[0]}</div>
                        <div className="01 cell" style={{backgroundColor: `${this.state.colorofdiv[1]}`}}>{this.state.cellarray[1]}</div>
                        <div className="02 cell" style={{backgroundColor: `${this.state.colorofdiv[2]}`}}>{this.state.cellarray[2]}</div>
                        <div className="03 cell" style={{backgroundColor: `${this.state.colorofdiv[3]}`}}>{this.state.cellarray[3]}</div>
                        <div className="04 cell" style={{backgroundColor: `${this.state.colorofdiv[4]}`}}>{this.state.cellarray[4]}</div>
                    </div>
                    <div className='row1'>
                        <div className="10 cell" style={{backgroundColor: `${this.state.colorofdiv[5]}`}}>{this.state.cellarray[5]}</div>
                        <div className="11 cell" style={{backgroundColor: `${this.state.colorofdiv[6]}`}}>{this.state.cellarray[6]}</div>
                        <div className="12 cell" style={{backgroundColor: `${this.state.colorofdiv[7]}`}}>{this.state.cellarray[7]}</div>
                        <div className="13 cell" style={{backgroundColor: `${this.state.colorofdiv[8]}`}}>{this.state.cellarray[8]}</div>
                        <div className="14 cell" style={{backgroundColor: `${this.state.colorofdiv[9]}`}}>{this.state.cellarray[9]}</div>
                    </div>
                    <div className='row2'>
                        <div className="20 cell" style={{backgroundColor: `${this.state.colorofdiv[10]}`}}>{this.state.cellarray[10]}</div>
                        <div className="21 cell" style={{backgroundColor: `${this.state.colorofdiv[11]}`}}>{this.state.cellarray[11]}</div>
                        <div className="22 cell" style={{backgroundColor: `${this.state.colorofdiv[12]}`}}>{this.state.cellarray[12]}</div>
                        <div className="23 cell" style={{backgroundColor: `${this.state.colorofdiv[13]}`}}>{this.state.cellarray[13]}</div>
                        <div className="24 cell" style={{backgroundColor: `${this.state.colorofdiv[14]}`}}>{this.state.cellarray[14]}</div>
                    </div>
                    <div className='row3'>
                        <div className="30 cell" style={{backgroundColor: `${this.state.colorofdiv[15]}`}}>{this.state.cellarray[15]}</div>
                        <div className="31 cell" style={{backgroundColor: `${this.state.colorofdiv[16]}`}}>{this.state.cellarray[16]}</div>
                        <div className="32 cell" style={{backgroundColor: `${this.state.colorofdiv[17]}`}}>{this.state.cellarray[17]}</div>
                        <div className="33 cell" style={{backgroundColor: `${this.state.colorofdiv[18]}`}}>{this.state.cellarray[18]}</div>
                        <div className="34 cell" style={{backgroundColor: `${this.state.colorofdiv[19]}`}}>{this.state.cellarray[19]}</div>
                    </div>
                    <div className='row4'>
                        <div className="40 cell" style={{backgroundColor: `${this.state.colorofdiv[20]}`}}>{this.state.cellarray[20]}</div>
                        <div className="41 cell" style={{backgroundColor: `${this.state.colorofdiv[21]}`}}>{this.state.cellarray[21]}</div>
                        <div className="42 cell" style={{backgroundColor: `${this.state.colorofdiv[22]}`}}>{this.state.cellarray[22]}</div>
                        <div className="43 cell" style={{backgroundColor: `${this.state.colorofdiv[23]}`}}>{this.state.cellarray[23]}</div>
                        <div className="44 cell" style={{backgroundColor: `${this.state.colorofdiv[24]}`}}>{this.state.cellarray[24]}</div>
                    </div>
                    <div className='row5'>
                        <div className="50 cell" style={{backgroundColor: `${this.state.colorofdiv[25]}`}}>{this.state.cellarray[25]}</div>
                        <div className="51 cell" style={{backgroundColor: `${this.state.colorofdiv[26]}`}}>{this.state.cellarray[26]}</div>
                        <div className="52 cell" style={{backgroundColor: `${this.state.colorofdiv[27]}`}}>{this.state.cellarray[27]}</div>
                        <div className="53 cell" style={{backgroundColor: `${this.state.colorofdiv[28]}`}}>{this.state.cellarray[28]}</div>
                        <div className="54 cell" style={{backgroundColor: `${this.state.colorofdiv[29]}`}}>{this.state.cellarray[29]}</div>
                    </div>
                </div>

                <div id='pushZerodiv'>
                    <button onClick={pushZero} id='pushZeroButton' >
                        <h1 id='buttonText'>Play again!</h1>
                        <span id='sameDay'>(same day)</span>
                    </button>
                </div>
            </div>
            
        );
    }

}

export default Grid;