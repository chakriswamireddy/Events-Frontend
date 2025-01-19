import { Input } from '@headlessui/react'
import React from 'react'
import DateRangePicker from '../shared/DateRangePicker'
import useMyStore from '../zustand/store';
// import { useStore } from ''
// import { DateRangePicker } from '../shared/DateRangePicker'

function FilterSection() {

  const filterByName = useMyStore((state) => state.filterByName);
  const onChangeFilterByName = useMyStore((state) => state.onChangeFilterByName);


  return (
    <div className='flex gap-3 align-end ml-2 mb-4'>

      <p className='border-3 mt-2 font-semibold'>
      Filters: 

      </p>
        
        <Input type='text' className='pl-4 rounded-lg' placeholder='Search events' onChange={(e)=> onChangeFilterByName(e.target.value)  } />
        <DateRangePicker />

    </div>
  )
}

export default FilterSection