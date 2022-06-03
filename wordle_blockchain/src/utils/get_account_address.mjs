async function getAccountAddress() {

    if(window.ethereum) {
        // window.ethereum
        // .request({ method: "eth_requestAccounts" })
        //     .then((res) => {
        //         console.log(res[0])
        //         return res[0]
        //     });

        let addressToReturn = await window.ethereum.request({ method: "eth_requestAccounts" }).then((res) => {
                                                            return res[0]
                                                        });
        return addressToReturn;
    }
}

export { getAccountAddress };