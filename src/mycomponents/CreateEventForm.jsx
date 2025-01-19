import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DateTimePicker } from "../shared/DateTimePicker"
import { ParticpantsCombobox } from "../shared/ParticipantsInput"
import { useEffect, useState } from "react"
import axios from "axios"
import { DiamondPlus, Edit } from "lucide-react"

export function CreateEventForm({ tokenObj, eventEdit }) {

  const [eventName, setEventName] = useState('');
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [participants, setParticipants] = useState([])
  
  const baseBackedURl = import.meta.env.VITE_BASE_BACKEND_URL;

  const [apiResponse, setApiResponse] = useState(null)

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen,setDialogOpen] = useState(false)

  const handleCreateEvent = () => {
    axios.post(`${baseBackedURl}/api/event`, {
      event_name: eventName, description, location, manager_mail: tokenObj.email, manager_name: tokenObj.username, participants,
      dateTime
    })
      .then(res => console.log(res.data))
      // .then((res) => console.log(res.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    if (eventEdit) {
      setDateTime(eventEdit?.dateTime);
      setDescription(eventEdit?.description);
      setLocation(eventEdit?.location)
      setParticipants(eventEdit?.participants)
      setEventName(eventEdit?.event_name);


    }
  }, [eventEdit])

  const handleEditEvent = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("calling edit request")
    axios.put(`${baseBackedURl}/api/event`, {
      event_name: eventName, description, location, manager_mail: tokenObj.email, participants,
      dateTime, eventId: eventEdit.eventId
    })
      .then(res => {
        console.log(res.data)
        setIsSubmitting(false);
        setApiResponse(res.status);
        setDialogOpen(false)
      })
      // .then((res) => console.log(res.data))
      .catch(err => console.log(err))

      setTimeout(()=> {
        setApiResponse(null)
      },1000 )
  }

  return (
    <Dialog  open={dialogOpen }>
      <DialogTrigger asChild>
        <Button variant="outline" onClick={()=> setDialogOpen(true)} className={`${eventEdit ? 'p-0' :'' } `} >
          {eventEdit ? <Edit /> : 

            <>
           <span>Create Event</span> 
            <DiamondPlus />
            </>

          }
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Let's Make an Event</DialogTitle>
          <DialogDescription>
            Please, Fill the below details.
          </DialogDescription>
        </DialogHeader>

        <form action="" onSubmit={eventEdit ? handleEditEvent : handleCreateEvent} className="my-3" >

          <Input type="text" placeholder="Event name" value={eventName}
            onChange={(e) => setEventName(e.target.value)} required className='my-2' />
          <Input type="text" placeholder="Description" value={description}
            onChange={(e) => setDescription(e.target.value)} required className='my-3' />

          <Input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className='my-3'
          />

          <DateTimePicker
            dateTime={dateTime}
            setDateTime={setDateTime}
            className='my-8'
          />

          <ParticpantsCombobox
            tags={participants}
            setTags={setParticipants}
            className='my-5'
          />


          <DialogFooter>
            <Button type="submit" className='mt-8' > {isSubmitting? 'Saving..' : 'Save Event'} </Button>
            {apiResponse &&
            <Label> {apiResponse==='ok' ? 'Successfully Saved' : 'Failed to save' } </Label>
            }
          </DialogFooter>
        </form>

      </DialogContent>
    </Dialog>
  )
}
