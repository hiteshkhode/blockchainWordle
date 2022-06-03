import React, { Component, useState } from 'react';
import wordslist from '../utils/wordsExtraction.mjs';
import erc20abi from '../contract.abi.json'
import { ethers } from 'ethers';

class Grid extends Component {

    contract_info = {
        contract_address: ""
    }
    state = {cellarray: new Array(30).fill(""), accountAddress: ""};
    cellCounter = 0;
    base = 0;
    consecutiveSubmission = false;

    correctWord = "ASDFG";
    wordCollection = wordslist
    // wordCollection = ["aahed"]

    accountChangeHandler (accountAddress) {
        this.state.accountAddress = accountAddress;
        this.setState({accountAddress: this.state.accountAddress})
    }

    componentDidMount(){
        this.contract_info.contract_address = "0x0b9bf7DdAd0C06B0e851Ab7b8f90CfD4df59317e"
        this.setState({contract_address: this.contract_info.contract_address})

        if(window.ethereum){
            // console.log("metamask present")
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                    .then((res) => this.accountChangeHandler(res[0]));
                
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract_interactivity = new ethers.Contract( this.contract_info.contract_address, erc20abi, provider);

        contract_interactivity.returnAddressResult("0xEF645838bA7567E5853eDA86796Fe7cfd9Ba11D5").then((data) => console.log(data))  


        }else{
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
            this.base++;
            this.consecutiveSubmission = true;

            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract_interactivity = new ethers.Contract( this.contract_info.contract_address, erc20abi, signer);
            // const signerAddress = await signer.getAddress();
            const returnfromcontract = await contract_interactivity.toUpdateStatsOfResult(this.state.accountAddress);
            console.log(returnfromcontract)

        }
        // check if the word exist in wordcollection
        else if (this.checkIfWordInWordsCollection(word) && !this.consecutiveSubmission) {
            alert("You found a word but not correct!");
            this.base++;
            this.consecutiveSubmission = true;
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

    async setFalse() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract_interactivity = new ethers.Contract( this.contract_info.contract_address, erc20abi, signer);
        await contract_interactivity.setFalse(this.state.accountAddress)
    }

    async setTrue() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract_interactivity = new ethers.Contract( this.contract_info.contract_address, erc20abi, signer);
        await contract_interactivity.setTrue(this.state.accountAddress)
    }


    render() {
        return (
            <div className='outerGrid' tabIndex="0" onKeyDown={(e) => this.handleKeyDown(e)}>

                <button onClick={() => this.setFalse()}>Set False</button>
                <button onClick={() => this.setTrue()}>Set True</button>

                <div className='row0'>
                    <div className="00 cell">{this.state.cellarray[0]}</div>
                    <div className="01 cell">{this.state.cellarray[1]}</div>
                    <div className="02 cell">{this.state.cellarray[2]}</div>
                    <div className="03 cell">{this.state.cellarray[3]}</div>
                    <div className="04 cell">{this.state.cellarray[4]}</div>
                </div>
                <div className='row1'>
                    <div className="10 cell">{this.state.cellarray[5]}</div>
                    <div className="11 cell">{this.state.cellarray[6]}</div>
                    <div className="12 cell">{this.state.cellarray[7]}</div>
                    <div className="13 cell">{this.state.cellarray[8]}</div>
                    <div className="14 cell">{this.state.cellarray[9]}</div>
                </div>
                <div className='row2'>
                    <div className="20 cell">{this.state.cellarray[10]}</div>
                    <div className="21 cell">{this.state.cellarray[11]}</div>
                    <div className="22 cell">{this.state.cellarray[12]}</div>
                    <div className="23 cell">{this.state.cellarray[13]}</div>
                    <div className="24 cell">{this.state.cellarray[14]}</div>
                </div>
                <div className='row3'>
                    <div className="30 cell">{this.state.cellarray[15]}</div>
                    <div className="31 cell">{this.state.cellarray[16]}</div>
                    <div className="32 cell">{this.state.cellarray[17]}</div>
                    <div className="33 cell">{this.state.cellarray[18]}</div>
                    <div className="34 cell">{this.state.cellarray[19]}</div>
                </div>
                <div className='row4'>
                    <div className="40 cell">{this.state.cellarray[20]}</div>
                    <div className="41 cell">{this.state.cellarray[21]}</div>
                    <div className="42 cell">{this.state.cellarray[22]}</div>
                    <div className="43 cell">{this.state.cellarray[23]}</div>
                    <div className="44 cell">{this.state.cellarray[24]}</div>
                </div>
                <div className='row5'>
                    <div className="50 cell">{this.state.cellarray[25]}</div>
                    <div className="51 cell">{this.state.cellarray[26]}</div>
                    <div className="52 cell">{this.state.cellarray[27]}</div>
                    <div className="53 cell">{this.state.cellarray[28]}</div>
                    <div className="54 cell">{this.state.cellarray[29]}</div>
                </div>
            </div>
        );
    }

}

export default Grid;