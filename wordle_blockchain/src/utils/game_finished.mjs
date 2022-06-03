import { ethers } from 'ethers'
import erc20abi from '../ABI.json'
import { getAccountAddress } from './get_account_address.mjs'
import { contractAddress } from './contract_info.json'
import { previouslyPlayed } from './previously_played.mjs';

async function gameFinished() {
    
    let accountAddress = await getAccountAddress();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract_interactivity = new ethers.Contract( contractAddress, erc20abi, signer);
    
    if(!(await previouslyPlayed())) await contract_interactivity.toUpdateStatsOfResult(accountAddress);
    else alert("You have already played today");
    
    
}

export { gameFinished };