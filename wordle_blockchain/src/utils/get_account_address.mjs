async function getAccountAddress() {

    if(window.ethereum) {

        let addressToReturn = await window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
                                                            return res[0]
                                                        });
        return addressToReturn;
    }
}

export { getAccountAddress };