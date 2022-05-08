import ProfileHeader from '../components/profile/ProfileHeader'
import ProfileTweets from '../components/profile/ProfileTweets'
import Sidebar from '../components/Sidebar'
import Widgets from '../components/Widgets'
const style = {
    wrapper: `flex justify-center h-screen w-screen select-none bg-[#15202b] text-white`,
    content: `max-w-[1400px] w-2/3 flex justify-between`,
    mainContent: `flex-[2] border-r border-l border-[#38444d] overflow-y-scroll`,
  }
  
  const profile = () => {
    return (
      <div className={style.wrapper}>
        <div className={style.content}>
          <Sidebar initialSelectedIcon={'Profile'} />
          <div className={style.mainContent}>
            {/* <ProfileHeader /> */}
            {/* <ProfileTweets /> */}
         
        {/*     @if (session('alert'))
          <p>{{ session('alert') }}</p>
    @endif */}
      
        <form action="{{ route('profile.save') }}" method="POST" encType="multipart/form-data">
          {/* @csrf */}
          <div className="w-full rounded-lg mx-auto mt-8 flex overflow-hidden rounded-b-none">
           
            <div className="md:w-2/3 w-full">
              <div className="py-8 px-16">
                <label htmlFor="name" >Name</label>
                <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="text" defaultValue name="name" />
              </div>
              <hr className="border-gray-200" />
              <div className="py-8 px-16">
                <label htmlFor="email" className="text-sm text-gray-600">Email Address</label>
                <input className="mt-2 border-2 border-gray-200 px-3 py-2 block w-full rounded-lg text-base text-gray-900 focus:outline-none focus:border-indigo-500" type="email" name="email" defaultValue />
              </div>
              <hr className="border-gray-200" />
              <div className="py-8 px-16 clearfix">
                <label htmlFor="photo" className="text-sm text-gray-600 w-full block">Photo</label>
                <img className="rounded-full w-16 h-16 border-4 mt-2 border-gray-200 float-left" id="photo" src="https://pbs.twimg.com/profile_images/1163965029063913472/ItoFLWys_400x400.jpg" alt="photo" />
                <div className="bg-gray-200 text-gray-500 text-xs mt-5 ml-3 font-bold px-4 py-2 rounded-lg float-left hover:bg-gray-300 hover:text-gray-600 relative overflow-hidden cursor-pointer">
                  <input type="file" name="photo" onchange="loadFile(event)" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" /> Change Photo
                </div>
              </div>
            </div>
          </div>
          <div className="p-16 py-8 bg-gray-300 clearfix rounded-b-lg border-t border-gray-200">
            <p className="float-left text-xs text-gray-500 tracking-tight mt-2">Click on Save to update your Profile Info</p>
            <input type="submit" className="bg-indigo-500 text-white text-sm font-medium px-6 py-2 rounded float-right uppercase cursor-pointer" defaultValue="Save" />
          </div>
        </form>
      </div>
          </div>
          {/* <Widgets/> */}
        </div>
      
    )}


export default profile