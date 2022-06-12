
import { BsFillPatchCheckFill } from 'react-icons/bs'
import { FaRegComment, FaRetweet , FaEthereum } from 'react-icons/fa'
import { AiOutlineHeart } from 'react-icons/ai'
import { FiShare } from 'react-icons/fi'
import { format } from 'timeago.js'
import { useState } from 'react'
import { useRouter } from 'next/router';

const style = {
    wrapper: `flex p-3 border-b border-[#38444d]`,
    profileImage: `rounded-full h-[40px] w-[40px] object-cover`,
    postMain: `flex-1 px-4`,
    headerDetails: `flex items-center`,
    name: `font-bold mr-1`,
    verified: `text-[0.8rem]`,
    handleAndTimeAgo: `text-[#8899a6] ml-1`,
    tweet: `my-2`,
    image: `rounded-3xl`,
    footer: `flex justify-between mr-28 mt-4 text-[#8899a6]`,
    footerIcon: `rounded-full text-lg p-2`,
    btn: `@apply font-bold py-2 px-4 rounded`,
    btn_blue:`@apply bg-blue-500 text-white`,
    btn_blue_hover:`hover:@apply bg-blue-700`
  }
  


const Post = ({
    displayName,
    userName,
    text,
    mimeimage,
    avatar,
    timestamp,
    isProfileImage,
  }) => {

    const router = useRouter()

  return (
    <div className={style.wrapper}>
    <div>
      <img
        src={avatar}
        alt={userName}
        className={
          isProfileImage
            ? `${style.profileImage} smallHex`
            : style.profileImage
        }
      />
    </div>
   <div className={style.postMain}>
<div>
    <span className={style.headerDetails}> 
    <span className={style.name}>{displayName}</span>
    {isProfileImage && (
    <span className={style.verified}>
      <BsFillPatchCheckFill />
        </span> 
        )}
   
    <span className={style.handleAndTimeAgo}>
        @ {userName} • {format(new Date(timestamp))}
    </span>
     </span> 

     <div className={style.tweet}>{text}</div>

     <div className={style.tweet}><img src={`https://gateway.pinata.cloud/ipfs/${mimeimage}`} />
     </div>
</div>
 <div className={style.footer}> 

               <button  className={`${style.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}
              onClick={()=>{
                router.push(`${router.pathname}/?tip=${displayName}`)
              }}
               
             >

{/* <button class="btn-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> */}
{/* <button className='btn btn_blue btn_blue_hover'> */}
<FaEthereum/> Tip
</button>
{/*<div  className={`${style.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}>
    <FaRegComment/>
</div>
 <div
            className={`${style.footerIcon} hover:text-[#03ba7c] hover:bg-[#1b393b]`}
          >
            <FaRetweet />
          </div>*/}
          <div
            className={`${style.footerIcon} hover:text-[#f91c80] hover:bg-[#39243c]`}
          >
            <AiOutlineHeart />
          </div>
          <div
            className={`${style.footerIcon} hover:text-[#1d9bf0] hover:bg-[#1e364a]`}
          >
            <FiShare />
          </div> 
</div>


   </div>




</div>

  )
}

export default Post