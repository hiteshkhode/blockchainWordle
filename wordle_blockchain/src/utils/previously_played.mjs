import { ethers } from 'ethers'
import erc20abi from '../ABI.json'
import { getAccountAddress } from './get_account_address.mjs'
import { contractAddress } from './contract_info.json'

async function previouslyPlayed() {
    
    let accountAddress = await getAccountAddress();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract_interactivity = new ethers.Contract( contractAddress, erc20abi, provider);
    
    let currenttimestamp = await contract_interactivity.getTimeStamp();
    let lasttimestamp = await contract_interactivity.getLastTimeStamp( accountAddress );
    let difference = parseInt(currenttimestamp._hex, 16) - parseInt(lasttimestamp._hex, 16);
    if(difference < 86400) return true;
    else return false
}

export { previouslyPlayed };