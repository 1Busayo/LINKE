import TweetBox from './TweetBox'
import Post from '../Post'
import { BsStars } from 'react-icons/bs'
import { useContext } from 'react'
import { TwitterContext } from '../../context/TwitterContext'



const style = {
    wrapper: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`,
  }
  

// const tweets = [
// {
// displayName: 'Sam',
// userName: '0x2cAe03eEE45510C17753c57F530518564820d1e9',
// avatar:'https://pbs.twimg.com/profile_images/1470188132423319561/jd8BKeMl_x96.jpg',
// text:'Good Morning',
// isProfileImageNft: false,
// timestamp:'2020-06-01T12:00:00.00Z'

// },
// {
//     displayName: 'Sam',
//     userName: '0x2cAe03eEE45510C17753c57F530518564820d1e9',
//     avatar:'https://pbs.twimg.com/profile_images/1470188132423319561/jd8BKeMl_x96.jpg',
//     text:'Good Morning',
//     isProfileImageNft: false,
//     timestamp:'2022-03-31T12:00:00.00Z'
    
//     },

//     {
//         displayName: 'Sam',
//         userName: '0x2cAe03eEE45510C17753c57F530518564820d1e9',
//         avatar:'https://pbs.twimg.com/profile_images/1470188132423319561/jd8BKeMl_x96.jpg',
//         text:'Good Morning',
//         isProfileImageNft: false,
//         timestamp:'2020-06-01T12:00:00.00Z'
        
//         }
// ]


const ProfileFeed = () => {
  const {pMimes} = useContext(TwitterContext)
  return (
    <div className={style.wrapper}>
    <div className={style.header} >
    <div className={style.headerTitle} >Collections</div>
        <BsStars />
        </div>  
       

        {pMimes.map((tweet ,index) =>(
            <Post
            key={index}
            displayName={tweet.author.name === 'Unnamed'
            ? `${tweet.author.walletAddress.slice(0,4)}...${tweet.author.walletAddress.slice(41)}` : tweet.author.name
          }
            userName={`${tweet.author.walletAddress.slice(0,4)}...${tweet.author.walletAddress.slice( 
                -4)}`}
            avatar={tweet.author.profileImage}
            text={`${tweet.mimetitle} ${tweet.mimedesc}`}
            mimeimage= {tweet.mimeimage}
            isProfileImage={tweet.author.isProfileImageNft}
            timestamp={tweet.timestamp}
            
            />
         ) )}
        </div>
  )
}

export default ProfileFeed