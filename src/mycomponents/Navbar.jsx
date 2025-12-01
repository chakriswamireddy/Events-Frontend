import React from 'react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Link, useNavigate } from 'react-router'
import { CircleUserRound, Image } from 'lucide-react';
import NovuInbox from '../shared/NovuInbox';


function Navbar({ tokenObj }) {

  const navigate = useNavigate();

  const handleLogout = async () => {
    await localStorage.setItem('jwt-token', null);

    navigate('/authorize')
  }


  return (
    <div className='border-4 w-screen bg-gradient-to-r from-violet-300 to-violet-500 to-violet-200 to-violet-400 h-20 mb-4 flex justify-between '>


      <NavigationMenu className='h-full bg-transparent '>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className='ml-auto h-full flex  gap-6  bg-transparent'>

              {/* {tokenObj.profileImg} */}

              {tokenObj.profileImg ?
                <img src={tokenObj.profileImg} className='h-12 w-12 rounded-lg' alt="profile_pic" />
                :
                <CircleUserRound size={45} />
              }
              <div className='flex flex-col align-start justify-start'>
                <p className='w-max  text-lg'> {tokenObj.username} </p>
                <p className='w-max  text-sm'> {tokenObj.email} </p>
              </div>

            </NavigationMenuTrigger>
            <NavigationMenuContent className='w-96 border-0'>

              <div className='w-60 text-center py-3'>
                <Link className='w-full h-16' to='/authorize' onClick={handleLogout} > Logout  </Link>
              </div>
              {/* <NavigationMenuLink className='w-full'>
          <Link className='w-full h-16'  to='/authorize' onClick={handleLogout} > Logout  </Link>
        </NavigationMenuLink> */}
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* <NavigationMenuItem className='border-2 '> */}

          {/* </NavigationMenuItem> */}
        </NavigationMenuList>

      </NavigationMenu>

      <div className=' self-center mr-4 '>
        <NovuInbox tokenObj={tokenObj} />

      </div>

    </div>

  )
}

export default Navbar