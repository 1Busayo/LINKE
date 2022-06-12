import Link from 'next/link';
import { TwitterContext } from '../context/TwitterContext';
import { FiMoreHorizontal } from 'react-icons/fi'
import { VscTwitter} from 'react-icons/vsc'
import  SidebarOption from './SidebarOption'
import  { useContext, useState } from 'react'
import { RiHome7Line, RiHome7Fill, RiFileList2Fill, RiBookMarkFill } from 'react-icons/ri'
import { BiHash } from 'react-icons/bi'
import { FiBell } from 'react-icons/fi'
import { HiOutlineMail, HiMail } from 'react-icons/hi'
import { FaRegListAlt, FaHashtag, FaBell } from 'react-icons/fa'
import { CgMoreO } from 'react-icons/cg'
import {
  BsBookmark,
  BsBookmarkFill,
  BsPerson,
  BsPersonFill,
} from 'react-icons/bs'

import { Router, useRouter } from 'next/router';
import Modal from 'react-modal'
import ProfileimageMinter from './minitingModal/ProfileimageMinter'
import Profileinfo from './profile/Profileinfo'
import Tip from './tip/tip'
import { customStyles } from '../lib/constants'


const style = {
    wrapper: `flex-[0.7] px-8 flex flex-col`,
    twitterIconContainer: `text-3xl m-4`,
    tweetButton: `bg-[#404eed] hover:bg-[#3946d5] flex items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer`,
    navContainer: `flex-1`,
    profileButton: `flex items-center mb-6 cursor-pointer hover:bg-[#333c45] rounded-[100px] p-2`,
   profileLeft: ` flex items-center justify-center mr-4`,
    profileImage: `height-12 w-12 rounded-full`,
    profileRight: `flex-1 flex`,
    details: `flex-1`,
    name: `text-lg`,
    handle: `text-[#8899a6]`,
    moreContainer: `flex items-center mr-2`,
    iconContainer: `text-xl mr-4`,
    textGeneral: `font-medium`,
    textActive: `font-bold`,
    profilewrapper: `w-min flex items-center rounded-[100px] p-4 cursor-pointer hover:bg-[#333c45] transition-all hover:duration-200 hover:ease-in-out`,
  }
  
const Sidebar = ({initialSelectedIcon = 'Home'}) => {
const  [selected, setSelected] = useState(initialSelectedIcon)
const router = useRouter()
const {currentAccount, currentUser} = useContext(TwitterContext)


  return (
    <div className = {style.wrapper}>
           <div className = {style.twitterIconContainer}>
   {/* <VscTwitter /> */} LINKE
           </div>
           <div className = {style.navContainer}>
           <SidebarOption 
            Icon={selected == 'Home' ? RiHome7Fill :RiHome7Line }
            text='Home'
            isActive={Boolean(selected == 'Home')}
            setSelected={setSelected}
            redirect ={'/'}
           />
 <SidebarOption 
            Icon={selected == 'Collection' ? FaHashtag : BiHash }
            text='Collection'
            isActive={Boolean(selected == 'Collection')}
            setSelected={setSelected}
           redirect ={'/collection'}
           />

<SidebarOption 
            Icon={selected == 'Notification' ? FaBell : FiBell }
            text='Notification'
            isActive={Boolean(selected == 'Notification')}
            setSelected={setSelected}
          
           />
            {/* <SidebarOption 
            Icon={selected == 'Messages' ? HiMail : HiOutlineMail }
            text='Messages'
            isActive={Boolean(selected == 'Messages')}
            setSelected={setSelected}
          
           /> */}
{/*        
       <SidebarOption 
            Icon={selected == 'Bookmarks' ? RiBookMarkFill : BsBookmark }
            text='Bookmarks'
            isActive={Boolean(selected == 'Bookmarks')}
            setSelected={setSelected}
          
           /> */}
            {/* <SidebarOption
          Icon={selected === 'Lists' ? RiFileList2Fill : FaRegListAlt}
          text='Lists'
          isActive={Boolean(selected === 'Lists')}
          setSelected={setSelected}
        /> */}
        {/* <SidebarOption
          Icon={selected === 'Profile' ? BsPersonFill : BsPerson}
          text='Profile'
          isActive={Boolean(selected === 'Profile')}
          setSelected={{}}
           redirect={'/profile'}
        
          /> */}

<div className={style.profilewrapper}
    onClick={()=>{
      router.push(`${router.pathname}/?profile=${currentAccount}`)
    }}
    > 
    <div className={style.iconContainer}>
  {'selected' === 'Profile' ? <BsPersonFill /> : <BsPerson />}
    </div>
    <div className={`${Boolean(selected === 'Profile') ? style.textActive : style.textGeneral}`}>
      Profile
      </div>
    </div>






        <SidebarOption Icon={CgMoreO} text='More' setSelected={setSelected} />
            <div 
            onClick={()=>{
              router.push(`${router.pathname}/?mint=${currentAccount}`)
            }}
            className={style.tweetButton}>Mint</div>
              </div>
        <div className={style.profileButton}>
        {/* <div className={style.profileLeft}>
    
         </div>    */}
           <img src= {`https://gateway.pinata.cloud/ipfs/${currentUser.profileImage}`} alt="pic" className={currentUser.isProfileImageNft ? `${style.profileImage} smallHex` : style.profileImage} />
        
        <div className={style.profileRight}>
        <div className={style.details}> 
       <div className={style.name}>{currentUser.name} </div>
       <div className={style.handle}>@{currentAccount.slice(0,6)}...{currentAccount.slice(39)}</div>
             </div>
             <div className={style.moreContainer}> 
             {/* <FiMoreHorizontal /> */}
           
             </div>
        </div>
     </div>
   <Modal
   isOpen={Boolean(router.query.mint)}
   onRequestClose={() => router.back()}
   style={ customStyles}
   >
<ProfileimageMinter />

   </Modal>


   <Modal
   isOpen={Boolean(router.query.profile)}
   onRequestClose={() => router.back()}
   style={ customStyles}
   >
<Profileinfo />

   </Modal>


   <Modal
   isOpen={Boolean(router.query.tip)}
   onRequestClose={() => router.back()}
   style={ customStyles}
   >
<Tip />

   </Modal>
             </div>


  )
}

export default Sidebar