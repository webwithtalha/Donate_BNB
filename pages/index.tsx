import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import DonateBnbABI from '../web3/abis/DonateBnb.json'
import { SmartContract } from '../web3/addresses/contracts'
import Donate from '../components/Donate'
import GetDonations from '../components/Get.Donations'
import Header from '../components/Header'

export default function Home() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  })

  useEffect(() => {
    const connectWallet = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send('eth_requestAccounts', [])
        const signer = provider.getSigner()
        const contract = new ethers.Contract(
          SmartContract,
          DonateBnbABI,
          signer
        )
        setState({ provider, signer, contract })
      }
    }
    connectWallet()
  }, [])

  return (
    <div>
      <Header />
      <Donate state={state} />
      {/* <GetDonations state={state} /> */}
    </div>
  )
}
