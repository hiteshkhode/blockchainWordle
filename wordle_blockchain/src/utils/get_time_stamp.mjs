import { ethers } from 'ethers'
import erc20abi from '../ABI.json'
import { getAccountAddress } from './get_account_address.mjs'
import { contractAddress } from './contract_info.json'

async function gettimestamp(value) {
    
    let accountAddress = await getAccountAddress();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract_interactivity = new ethers.Contract( contractAddress, erc20abi, provider);
    contract_interactivity.getTimeStamp().then((res) => {
        console.log(parseInt(res._hex, 16));
    }
    )    
}

export { gettimestamp };