import React, { useEffect } from 'react'
import ABI from '../chain-info/abi.json'
import {ethers} from 'ethers'

export const PiggyLogger = () => {
const contractAddress = "0x8754475b1fD33B577f23810869aC60CD37879336"
const abi = ABI

let provider = new ethers.providers.Web3Provider(window.ethereum);
let contract = new ethers.Contract(contractAddress,abi,provider)


useEffect(()=>{
    contract.on("Deposit",(amount, depositer,event)=>{
        console.log({
           amount: amount.toNumber(), 
           depositer: depositer, 
           event: event
        }); 
        getLogs()
        contract.removeListener("Deposit",(amount,depositer,event))
    })

},[]);

function getLogs(){
    let filterABI = ["event Deposit(uint amount, address depositer)"]
    let iface = new ethers.utils.Interface(filterABI);
    
    var filter = {
        address:contractAddress,
        fromBlock:0
    }
    var logPromise = provider.getLogs(filter);
    logPromise.then(function(logs) {
        let events = logs.map((log) => iface.parseLog(log))
        console.log(events);
    }).catch(function(err){
        console.log(err);
    });
}

getLogs()


return (
    <div>PiggyLogger</div>
  )
}
