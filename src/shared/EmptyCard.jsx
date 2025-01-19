import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Info } from 'lucide-react'

function EmptyCard({type}) {
  return (
    <Card className='p-0'>
    <CardHeader  className='flex w-full items-center justify-between pt-4 pb-2'>

      <div className='flex w-full items-center justify-between '>

      <div className='w-max'>

      <CardTitle > No Events</CardTitle>
      <CardDescription> 
        {type=='organise'
        ?
            'Create an event'
        :
        'Let others Join you'
    }
        </CardDescription>
      </div>
      <div className=' w-max'>
      <Info size={30} /> 
      </div>
      </div>
    </CardHeader>
    <CardContent>
    
    </CardContent>
    {/* <CardFooter>
      <p>Card Footer</p>
    </CardFooter> */}
  </Card>
  )
}

export default EmptyCard