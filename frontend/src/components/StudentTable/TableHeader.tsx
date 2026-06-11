import { Button, Input } from 'antd'
import React, { useState } from 'react'
import FilterComponent from '../FilterComponent/FilterComponent';

const TableHeader = () => {

    const [isFiltersOpen, setIsFiltersOpen] = useState(true);

    const toggleFilter = () => {
        setIsFiltersOpen((state) => !state);
    }

    return (
        <div className='flex flex-wrap items-center justify-between w-full gap-y-2'>
            <div className='w-full sm:max-w-[400px]'>
                <Input placeholder='Search...' className='w-full' />
            </div>

            <div className='flex flex-wrap items-center gap-2'>
                <Button>Columns</Button>
                <Button onClick={toggleFilter}>Filters</Button>
                <Button>Add New</Button>
            </div>
            {isFiltersOpen && (
                <div className='w-full mt-2'>
                    <FilterComponent />
                </div>
            )}
        </div>

    )
}

export default TableHeader