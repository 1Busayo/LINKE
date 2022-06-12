import { useEffect, useContext, useState } from 'react'
import { TwitterContext } from '../../context/TwitterContext'
import Post from '../Post'


const style = {
    wrapper: `no-scrollbar`,
    header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
    headerTitle: `text-xl font-bold`,
  }

  const tweets = [
    {
    displayName: 'Sam',
    userName: '0x2cAe03eEE45510C17753c57F530518564820d1e9',
    avatar:'https://pbs.twimg.com/profile_images/1470188132423319561/jd8BKeMl_x96.jpg',
    text:'Good Morning',
    isProfileImageNft: false,
    timestamp:'2020-06-01T12:00:00.00Z'
    
    },
    {
        displayName: 'Sam',
        userName: '0x2cAe03eEE45510C17753c57F530518564820d1e9',
        avatar:'https://pbs.twimg.com/profile_images/1470188132423319561/jd8BKeMl_x96.jpg',
        text:'Good Morning',
        isProfileImageNft: false,
        timestamp:'2022-03-31T12:00:00.00Z'
        
        },
    
        {
            displayName: 'Sam',
            userName: '0x2cAe03eEE45510C17753c57F530518564820d1e9',
            avatar:'https://pbs.twimg.com/profile_images/1470188132423319561/jd8BKeMl_x96.jpg',
            text:'Good Morning',
            isProfileImageNft: false,
            timestamp:'2020-06-01T12:00:00.00Z'
            
            }
    ]
    

const ProfileTweets = () => {
  const {currentAccount, currentUser} = useContext(TwitterContext)
  return (
    <div className={style.wrapper}>
    {currentUser.tweets?.map((tweet,index) => (
        <Post 
        key={index}
        displayName={currentUser.name === 'Unnamed' ? currrentUser.walletAddress : currentUser.name}
        userName={`${currentAccount.slice(0, 4)}...${currentAccount.slice(-4)}`}
        text={tweet.tweet}
        avatar={currentUser.isProfileImage}
        isProfileImage={currentUser.isProfileImageNft}
        timestamp={tweet.timestamp}

        />
    ))}
        
        </div>
  )
}

export default ProfileTweets