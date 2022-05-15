import {useState, useContext, Profiler} from 'react'
import { TwitterContext } from '../../context/TwitterContext'
import {  useRouter } from 'next/router';
import InitialState from './InitialState'
import LoadingState from './LoadingState'
import FinishedState from './FinishedState'
import { pinJSONToIPFS, pinFileToIPFS } from '../../lib/pianta'
import { client } from '../../lib/client'
import {ethers} from 'ethers'
import { contractABI,  contractAddress} from '../../lib/constants'

let metamask

if (typeof window !== 'undefined') {
  metamask = window.ethereum
}


const getEthereumContract = async () => { 
  if (!metamask) return
  const provider = new ethers.providers.Web3Provider(metamask)
  const signer = provider.getSigner()
  const transactionContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
    )

  return transactionContract



}

const Profileinfo = () => {
  const { currentAccount, setAppStatus } = useContext(TwitterContext)
  const router = useRouter()

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('initial')
  const [profileImage, setProfileImage] = useState()

  const saveprofile = async () => {
    if (!name ||  !profileImage) return
    setStatus('loading')

    const pinataMetaData = {
      name: `${name} - profilename`,
    }


    const ipfsImageHash = await pinFileToIPFS(profileImage, pinataMetaData)

    await client
      .patch(currentAccount)
      .set({ profileImage: ipfsImageHash })
      .set({ isProfileImageNft: true })
      .commit()

    const imageMetaData  = {
      name: name,
      description: 'profile_image',
      image: `ipfs://${ipfsImageHash}`,
    }

    const ipfsJsonHash = await pinJSONToIPFS(imageMetaData)

    //const contract = await getEthereumContract()

    // const transactionParameters = {
    //   to: contractAddress,
    //   from: currentAccount,
    //   data: await contract.mint(currentAccount, `ipfs://${ipfsJsonHash}`),
    // }

   try {

    
  
   const profileId = `${currentAccount}`
  //  const tweetDoc = {
  //   _type: 'users',
  //   _id: profileId,
  //   mimeTitle: imageMetaData.name,
  //   mimeDesc: imageMetaData.description,
  //   mimeImage: ipfsImageHash,
  //   timestamp: new Date(Date.now()).toISOString(),
  //   author: {
  //     _key: tweetId,
  //     _ref: currentAccount,
  //     _type: 'reference',
  //   },
  // }
  
  const  userDoc = {
    _type: 'users',
    _id: profileId,
    name: name,
    isProfileImageNft:false,
    profileImage:ipfsImageHash,
    walletAddress: currentAccount,
}



await  client.createOrReplace(userDoc).then((res) => {
    console.log(`Profile updated `)
  })
  
  // await client.patch(currentAccount) .setIfMissing({ mimes: [] })
  //   .insert('after', 'mimes[-1]', [
  //     {
  //       _key: tweetId,
  //       _ref: tweetId,
  //       _type: 'reference',
  //     },
  //   ])
  //   .commit()
  
  // await fetchTweets()
  // setTweetMessage('')

  

    
  /** metamask wallet */
      // await metamask.request({
      //   method: 'eth_sendTransaction',
      //   params: [transactionParameters],
      // })

      setStatus('finished')
    } catch (error) {
      console.log(error)
      setStatus('finished')
    }


  }
const modalChildrren = (modalStatus = status) => {
  switch (modalStatus) {
    case 'initial':
      return (
        <InitialState
          profileImage={profileImage}
          setProfileImage={setProfileImage}
          name={name}
          setName={setName}
          saveprofile={saveprofile}
        />
      )

    case 'loading':
      return <LoadingState />

    case 'finished':
      return <FinishedState />

    default:
      router.push('/')
      setAppStatus('error')
      break
  }
}


  return <> {(modalChildrren(status))} </>
}

export default Profileinfo