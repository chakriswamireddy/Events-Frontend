import axios, { all } from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { CreateEventForm } from './CreateEventForm';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"



// import { UsersIcon } from '@heroicons/react/20/solid';
import { Calendar, Delete, Edit, Edit2, Info, LogOut, LucideDelete, ScrollText, Trash2, Users } from 'lucide-react';

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import uploadImageToImgBB from '../hooks/useUploadImg';
import Navbar from './Navbar';
import FilterSection from './FilterSection';
import EmptyCard from '../shared/EmptyCard';
import { useStore } from 'zustand';
import useMyStore from '../zustand/store';


function Homepage() {
  const navigate = useNavigate();

  const [tokenObj, setTokenObj] = useState({});

  const [allEvents, setAllEvents] = useState({})

  const jwtToken = localStorage.getItem('jwt-token');
  const baseBackedURl = import.meta.env.VITE_BASE_BACKEND_URL;

  useEffect(() => {

    if (!jwtToken) {
      navigate('/authorize');
    }

    axios.get(`${baseBackedURl}/api/event/verify-jwt`, {
      headers: { Authorization: `Bearer ${jwtToken}` },
    })
      .then((res) => {
        setTokenObj(res.data);
        console.log(res.data)
      })
      .catch((err) => {
        console.error('Error:', err.response || err.message);
        navigate('/authorize');
      });

  }, [jwtToken])


  const getAPIData = () =>{
    tokenObj && axios.get(`${baseBackedURl}/api/event/all`, {
      params: { email: tokenObj.email },
    })
      .then(res => { setAllEvents(res.data) })
      .catch(err => {
        console.log(err)
      });
  }

  useEffect(() => {

    tokenObj && getAPIData();
  }, [tokenObj])


  const handleDeleteEvent = (eventId) => {
    axios.delete(`${baseBackedURl}/api/event`, {
      params: {
        eventId,
        manager_mail: tokenObj.email
      }
    })
      .then(res => {
        console.log(res.data);
        // setAllEvents((prev) => ({
        //   ...prev,
        //   organisedEvents: prev.organisedEvents.filter((event) => event.eventId=== eventId )
        // }))
        getAPIData();
      })
      .catch(err => console.log(err));

  }

  const handleOptOutEvent = (eventId) => {
    axios.put(`${baseBackedURl}/api/event/opt-out`, {
      eventId,
      manager_mail: tokenObj.email
    })
      .then(res => {
        console.log(res.data);
        getAPIData();       
      })
      .catch(err => console.log(err))
  }



  const filterByName = useMyStore((state) => state.filterByName);
  const filterByDate = useMyStore((state) => state.filterByDate);

  const checkDateInRange = (dateTime) => {
    // console.log(dateTime)
    return ( filterByDate.from && filterByDate.to) || filterByDate.from <= new Date(dateTime) && new Date(dateTime) <= filterByDate.to;
  }

  // useEffect(()=> {
  //   console.log(allEvents?.participatedEvents)
  // },[allEvents])

  return (
    <div>
      <Navbar imgUrl={tokenObj.profileImg} tokenObj={tokenObj} />
      <div className='flex justify-end w-full pr-3 '>
        <CreateEventForm tokenObj={tokenObj} />

      </div>

      {/* {filterByName} */}

      <FilterSection allEvents={allEvents} />


      <div className='flex flex-col md:justify-center md:flex-row w-full border gap-5 p-2 '>
        <div className=' w-full md:w-2/5 md:min-w-96 '>
          <h5 className='font-semibold pl-4 underline mb-2'> Organized Events </h5>

          <Accordion type="single" collapsible>
            {/* {allEvents?.organisedEvents?.map((event) => ( */}
            {allEvents?.organisedEvents?.filter((event) => event.event_name.includes(filterByName) && checkDateInRange(event.dateTime))?.map((event) => (


              <AccordionItem value={event.eventId} key={event.eventId}>
                <Card className='mb-1 '>
                  <AccordionTrigger className='p-0'>

                    {/* <h3>{event.event_name } </h3>
                        <span className='flex gap-1 content-end border'> 
                        {event.location}  <Users style={{marginTop:'3px', marginLeft:'10px'}} size={15}  />  {event.participants.length} </span>
                         */}
                    <CardHeader className='w-full' >
                      <div className='flex w-full items-center justify-between ' >


                        <div className=' w-max' >

                          <CardTitle className=' text-left w-max underline-offset-0 flex' > {event.event_name}
                            {new Date(event.dateTime) < new Date(Date.now()) &&

                              <Badge className='ml-2' variant="secondary">Over</Badge>
                            }

                          </CardTitle>
                          <CardDescription className='flex gap-1 content-end  w-max'> {event.location}  <Users style={{ marginTop: '3px', marginLeft: '10px' }} size={15} />  {event.participants.length}
                            <span className='ml-2 flex gap-1 align-center justify-center underline-offset-0'>
                              <Calendar className='mt-1' size={15} /> {new Date(event.dateTime).toLocaleString()}
                            </span>

                          </CardDescription>
                        </div>
                        <div className='flex items-center w-max  '>

                          {
                            new Date(event.dateTime).getTime() - Date.now() > 24 * 60 * 60 * 1000
                              ?
                              // <Edit color='red' />
                              <CreateEventForm tokenObj={tokenObj} eventEdit={event} />

                              : <Edit size={20} color='gray' />
                          }

                          {event.manager_mail === tokenObj.email &&
                            // 

                            <Dialog className=''>
                              <DialogTrigger className='-2'>
                                <Trash2 size={20} />
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Are you absolutely sure to Delete?</DialogTitle>
                                  <DialogDescription className='flex justify-end gap-2'>
                                    <DialogTrigger>

                                      <Button type='submit' variant='outline' className='border-2' > No </Button>
                                      <Button type='submit' variant="destructive" onClick={() => { handleDeleteEvent(event.eventId) }} color='red'>  Yes</Button>
                                    </DialogTrigger>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>

                          }
                        </div>
                      </div>
                    </CardHeader>
                  </AccordionTrigger>

                  <AccordionContent className='p-0' >

                    <CardContent>
                      <div className='flex gao-4'>
                        <ScrollText color='gray' />
                        <p>   {event.description} </p>
                      </div>
                      <p> {event.participants.join(', ')}  </p>

                    </CardContent>
                  </AccordionContent>
                  {/* <CardFooter>
                      <p>Card Footer</p>
                    </CardFooter> */}
                </Card>
              </AccordionItem>

            ))}
          </Accordion>

          {allEvents.organisedEvents?.length == 0 &&
            <EmptyCard type={'organise'} />
          }

        </div>



        <div className=' w-full md:w-2/5 md:min-w-96 '>
          <h5 className='font-semibold pl-4 underline mb-2'> Participated Events </h5>
          <Accordion type="single" collapsible>
          {/* {allEvents?.participatedEvents?.length} */}
 

            {
              [...new Set(
                allEvents?.participatedEvents?.filter((event) => event.event_name.includes(filterByName) && checkDateInRange(event.dateTime))
           
              )]
            // allEvents?.participatedEvents?.filter((event) => event.event_name.includes(filterByName) && checkDateInRange(event.dateTime))
            
            ?.map((event) => (

              <AccordionItem value={event.eventId} key={event.eventId}>
                <Card className='mb-1 '>
                  <AccordionTrigger className='p-0'>


                    <CardHeader className='w-full' >
                      <div className='flex w-full items-center justify-between ' >


                        <div className=' w-max' >

                          <CardTitle className=' text-left w-max underline-offset-0 flex' > {event.event_name}

                            {new Date(event.dateTime) < new Date(Date.now()) &&

                              <Badge className='ml-2' variant="secondary">Over</Badge>
                            }
                          </CardTitle>
                          <CardDescription className='flex gap-1 content-end  w-max mt-1'> {event.location}  <Users style={{ marginTop: '3px', marginLeft: '10px' }} size={15} />  {event.participants.length}
                            <span className='ml-2 flex gap-1 align-center justify-center underline-offset-0'>
                              <Calendar className='mt-1' size={15} /> {new Date(event.dateTime).toLocaleString()}
                            </span>
                          </CardDescription>
                        </div>
                        <div className='flex items-center w-max '>

                          {
                            new Date(event.dateTime).getTime() - new Date(Date.now()) > 24 * 60 * 60 * 1000
                              ?

                              <Dialog className=''>
                                <DialogTrigger className=''>
                                  <LogOut size={18} />
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Are you absolutely sure to Opt out?</DialogTitle>
                                    <DialogDescription className='flex justify-end gap-2'>

                                      <DialogTrigger>

                                        <Button variant='outline' className='border-2' > No </Button>
                                        <Button variant="destructive" onClick={() => { handleOptOutEvent(event.eventId) }} color='red'>  Yes</Button>
                                      </DialogTrigger>

                                    </DialogDescription>
                                  </DialogHeader>
                                </DialogContent>
                              </Dialog>

                              : <></>
                          }


                          {/* 
                          {event.manager_mail === tokenObj.email &&


                            <Dialog className=''>
                              <DialogTrigger className='-2'>
                                <Trash2 size={20} />
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Are you absolutely sure to Delete?</DialogTitle>
                                  <DialogDescription className='flex justify-end gap-2'>
                                    <Button variant='outline' className='border-2' > No </Button>
                                    <Button variant="destructive" onClick={handleDeleteEvent} color='red'>  Yes</Button>
                                  </DialogDescription>
                                </DialogHeader>
                              </DialogContent>
                            </Dialog>

                          } */}
                        </div>
                      </div>
                    </CardHeader>
                  </AccordionTrigger>
                  {/* <h1>test</h1> */}
                  <AccordionContent className='p-0' >

                    <CardContent>
                      <div className='flex gap-4'>
                        <ScrollText color='gray' />
                        <p>   {event.description} </p>
                      </div>
                      <p> Organiser: {event.manager_mail} </p>
                      <p> {event.participants.join(', ')}  </p>

                    </CardContent>
                  </AccordionContent>
                  {/* <CardFooter>
                      <p>Card Footer</p>
                    </CardFooter> */}
                </Card>
              </AccordionItem>

            ))}
          </Accordion>

          {allEvents?.participatedEvents?.length == 0 &&
            <EmptyCard type={'participate'} />

          }
        </div>
      </div>

    </div>
  )
}

export default Homepage