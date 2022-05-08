import { createContext, useEffect, useState } from 'react'
import { useRouter} from 'next/router'
import { client } from '../lib/client'
export const TwitterContext = createContext()


export const TwitterProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState('')
  const [currentAccount, setCurrentAccount] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [tweets, setTweets] = useState([])
  const [pMimes,setpersonalMimes] = useState([])
  const router = useRouter()



useEffect(()=>{
    checkIfWalletIsConnected()
  } ,[])

  useEffect(() => {
    if (!currentAccount || appStatus !== 'connected') return
    getCurrentUserDetails(currentAccount)
    fetchTweets()
    personalMimes(currentAccount)
  }, [currentAccount, appStatus])


const checkIfWalletIsConnected = async () => {
if (!window.ethereum) return setAppStatus('noMetaMask')

try {
    const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
    })
    if (addressArray.length > 0 ){
        //connected

        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
       createUserAccount(addressArray[0])
    }else{
        //not connected
        router.push('/')
        setAppStatus('notConnected')
    }
} catch (error) {
    
}




} 


/** initiates metamask wallet connecton */
const connectToWallet = async () =>{
if(!window.ethereum) return setAppStatus('noMetaMask')
try {
    setAppStatus('loading')
const addressArray = await window.ethereum.request({
    method:'eth_requestAccounts'
})

if (addressArray.length > 0) {
   setAppStatus('connected')
    setCurrentAccount(addressArray[0])
   createUserAccount(addressArray[0])
} else {
    router.push('/')
    setAppStatus('notConnected')
}

} catch (error) {
    setAppStatus('error')
}

}

/**creates account in sanity DB if the user does  not already have one
 * 
 * 
 */
const createUserAccount = async (userWalletAddress = currentAccount) => {
if (!window.ethereum) return  setAppStatu('noMetaMask')

try {
    const  userDoc = {
        _type: 'users',
        _id: userWalletAddress,
        name:'Unnamed',
        isProfileImageNft:false,
        profileImage:'https://pbs.twimg.com/profile_images/1470188132423319561/jd8BKeMl_x96.jpg',
       walletAddress: userWalletAddress,
    }


   await client.createIfNotExists(userDoc)
} catch (error) {
    router.push('/')
    setAppStatus('error')
}

}



const getProfileImageUrl = async (imageUri, isNft) =>{
  if(isNft){
return `https://gateway.pinata.cloud/ipfs/${imageUri}`
  } else {
    return imageUri
  }
}


 /**
   * Gets all the tweets stored in Sanity DB by user.
   */
  const personalMimes = async (userAccount = currentAccount) => {
    const query = `
      *[_type == "mimes" && author->walletAddress == "${userAccount}"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        mimeTitle,
        mimeDesc,
        mimeImage,
        timestamp
      }|order(timestamp desc)
    `
    const sanityResponse = await client.fetch(query)
    setpersonalMimes([])
     /**
     * Async await not available with for..of loops.
     */
      sanityResponse.forEach(async (item) => {
        const profileImageUrl = await getProfileImageUrl(
          item.author.profileImage,
          item.author.isProfileImageNft,
        )
  
       // if (item.author.isProfileImageNft) {
          const newItem = {
            mimetitle: item.mimeTitle,
            mimedesc:item.mimeDesc,
            mimeimage:item.mimeImage,
            timestamp: item.timestamp,
            author: {
              name: item.author.name,
              walletAddress: item.author.walletAddress,
              isProfileImageNft: item.author.isProfileImageNft,
              profileImage: profileImageUrl,
             
            },
          }
  
          setpersonalMimes((prevState) => [...prevState, newItem])
        // } else {
        //   setTweets(prevState => [...prevState, item])
        // }
      })

}

 /**
   * Gets all the tweets stored in Sanity DB.
   */
  const fetchTweets = async () => {
    const query = `
      *[_type == "mimes"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        mimeTitle,
        mimeDesc,
        mimeImage,
        timestamp
      }|order(timestamp desc)
    `
    const sanityResponse = await client.fetch(query)
    setTweets([])
     /**
     * Async await not available with for..of loops.
     */
      sanityResponse.forEach(async (item) => {
        const profileImageUrl = await getProfileImageUrl(
          item.author.profileImage,
          item.author.isProfileImageNft,
        )
  
       // if (item.author.isProfileImageNft) {
          const newItem = {
            mimetitle: item.mimeTitle,
            mimedesc:item.mimeDesc,
            mimeimage:item.mimeImage,
            timestamp: item.timestamp,
            author: {
              name: item.author.name,
              walletAddress: item.author.walletAddress,
              isProfileImageNft: item.author.isProfileImageNft,
              profileImage: profileImageUrl,
             
            },
          }
  
          setTweets((prevState) => [...prevState, newItem])
        // } else {
        //   setTweets(prevState => [...prevState, item])
        // }
      })

}
    const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if (appStatus !== 'connected') return

    const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "mimes": mimes[]->{mimeTitle, mimeDesc, mimeImage, timestamp}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `
    const sanityResponse = await client.fetch(query)

    const profileImageUrl = await getProfileImageUrl(
      sanityResponse[0].profileImage,
      sanityResponse[0].isProfileImageNft,
    )
 
    setCurrentUser({
      mimes: sanityResponse[0].mimes,
      name: sanityResponse[0].name,
      profileImage: sanityResponse[0].profileImage,
      isProfileImageNft: sanityResponse[0].isProfileImageNft,
      coverImage: sanityResponse[0].coverImage,
      walletAddress: sanityResponse[0].walletAddress,      
      
    })

    
}

    return (
         <TwitterContext.Provider 
         value={{ 
           appStatus , 
           currentAccount,  
           connectToWallet, 
           fetchTweets,
           tweets,
          
           pMimes,
           currentUser, 
           getCurrentUserDetails 
           }}>
             {children}
         </TwitterContext.Provider>
   )
}