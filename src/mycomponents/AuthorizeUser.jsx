import React from 'react'
// import DropDown from '../shared/DropDown'
import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Loader2, LogIn, UserPlus, UserRoundPlus } from 'lucide-react';
import uploadImageToImgBB from '../hooks/useUploadImg';

import eventIcon from '../assets/image.png'

function AuthorizeUser() {



    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('admin')
    const [password, setPassword] = useState('')

    const [profileImgUrl, setProfileImgUrl] = useState(null)
    const [apiResponse, setApiResponse] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const baseBackedURl = import.meta.env.VITE_BASE_BACKEND_URL;

    const navigate = useNavigate();

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const uploadedImageUrl = await uploadImageToImgBB(file);
            if (uploadedImageUrl) {
                setProfileImgUrl(uploadedImageUrl);
            } else {
                console.error("Image upload failed!");
            }
        }
    };

    const registerUser = async (event) => {

        event.preventDefault();

        // const profileImg = await profileImgUrl;

        setIsLoading(true);
        axios.post(`${baseBackedURl}/api/auth/register`, { username, email, password, role, profileImg: profileImgUrl })
            .then(response => {
                console.log(response.data.token)

                setApiResponse(response.data.message);

                setTimeout(() => {
                    localStorage.setItem('jwt-token', response.data.token)

                    // console.log(l)
                    navigate('/home');
                    setApiResponse(null)
                }, 1000);
                setIsLoading(false);
            })
            .catch(error => {
                setApiResponse(error.response.data.message);
                console.error(error.response || error.message);

            });

        setTimeout(() => {
            setApiResponse(null)
        }, 2000)

    }

    const loginUser = (e) => {
        e.preventDefault();
        setIsLoading(true);

        axios.post(`${baseBackedURl}/api/auth/login`, { email, password })
            .then(response => {
                // console.log(response.data.token)

                setApiResponse(response.data.message);
                setIsLoading(false)

                setTimeout(() => {
                    localStorage.setItem('jwt-token', response.data.token)
                    navigate('/home');
                    setApiResponse(null)
                }, 2000)
            })
            .catch(error => {
                setApiResponse(error.response.data.message);
                console.error(error.response || error.message);

            });

        setTimeout(() => {
            setApiResponse(null)
        }, 2000)

    }

    const handleGuestLogin =() => {
        setPassword('1234');
        setEmail('fornot@gmail.com');
        loginUser();
    }


    return (

        <div id='auth-page' className='animate__animated animate__fadeInDown'>

            <div className='flex mx-auto w-max pt-40 gap-2 animate__animated animate__fadeInDownBig animate__delay-0.5s '>
                <img src={eventIcon} alt='event' className='h-20 w-20 animate-pulse mt-2  ' />
                <div className='mt-3'>

                    <Label id='appTitle' > Events </Label>
                    <div> Your all meetings at One Place... </div>
                </div>
            </div>


            <Tabs defaultValue="login" className="w-[400px] mx-auto pt-12 animate__animated animate__fadeInDown animate__delay-1s ">
                <TabsList className='border mx-auto w-full h-12'>
                    <TabsTrigger value="register">Register</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="register">
                    <div >
                        <form action="" onSubmit={registerUser}>
                            <Input type="text" className='mt-4' value={username} onChange={(e) => setUsername(e.target.value)} placeholder='name' />
                            <Input type="email" className='mt-4' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
                            <Input type='password' className='mt-4' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='pwd' />


                            <div className="grid w-full max-w-sm items-center gap-1.5 my-4">
                                <Label htmlFor="picture" style={{ color: 'lightgray' }}>Upload Your profile Picture</Label>
                                <Input id="picture" type="file" onChange={handleFileChange} />
                            </div>

                            {/* <select name="" id="" onChange={(e) => setRole(e.target.value)}>
                            <option value="admin">admin</option>
                            <option value="editor">editor</option>
                            <option value="viewer"> viewer</option>
                        </select> */}


                            <Select onChange={(e) => setRole(e.target.value)} className=''>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select the role" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Select Role</SelectLabel>
                                        <SelectItem value="Admin">Admin</SelectItem>
                                        <SelectItem value="Manager">Manager</SelectItem>
                                        <SelectItem value="Viewer">Viewer</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <div className='w-full flex  gap-2 align-end justify-center mt-8'>

                              
                                <Button className='hover:scale-105 hover:bg-slate-600 bg-slate-800  ' type='submit' >
                                    <UserRoundPlus />
                                     Register </Button>
                            </div>
                            <Label style={{ color: 'orange' }} > {apiResponse}  </Label>

                        </form>
                    </div>

                </TabsContent>
                <TabsContent value="login">

                    <div>
                        <form action="" onSubmit={loginUser} >
                            {/* <input type="text" value={username} onChange={(e)=> setUsername(e.target.value) } /> */}
                            {/* <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input type='password' value={role} onChange={(e) => setRole(e.target.value)} /> */}

                            <Input type="email" className='mt-4' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='email' />
                            <Input type='password' className='mt-4' value={password} onChange={(e) => setPassword(e.target.value)} placeholder='pwd' />


                            {/* <DropDown setRole={setRole} /> */}

                            <div className='w-full flex  gap-2 align-end justify-center mt-8'>


                            <Button className='bg-black-100 hover:bg-slate-500  text-slate-400' onClick={handleGuestLogin} variant="outline" > Continue as Guest </Button>

                                <Button className='hover:scale-105 '>
                                    {isLoading ?
                                        <Loader2 className="animate-spin" />
                                        :
                                        <>
                                        <span> Login </span>
                                        <LogIn />
                                        </>
                                        
                                    }
                                </Button>
                            </div>
                            <Label style={{ color: 'orange' }} > {apiResponse}  </Label>

                        </form>
                    </div>

                </TabsContent>
            </Tabs>

        </div>


    )
}

export default AuthorizeUser