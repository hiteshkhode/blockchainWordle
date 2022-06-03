import { ethers } from 'ethers'
import erc20abi from '../contract.abi.json'
import { getAccountAddress } from './get_account_address.mjs'
import { contractAddress } from './contract_info.json'

async function makechange(value) {
    
    let accountAddress = await getAccountAddress();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract_interactivity = new ethers.Contract( contractAddress, erc20abi, signer);

    if(value) await contract_interactivity.setTrue(accountAddress);
    else await contract_interactivity.setFalse(accountAddress);
    
}

export { makechange };