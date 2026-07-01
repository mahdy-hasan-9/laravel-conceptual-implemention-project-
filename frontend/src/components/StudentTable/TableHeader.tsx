import { Button, Input } from 'antd'
import { useState } from 'react'
import ColumnButton from '../ColumnButton/ColumnButton';
import FilterButton from '../FilterButton/FilterButton';
import FilterDataComponent from '../FilterDataComponent/FilterDataComponent';
import { useToggleDrawer } from '../../hooks/useToggleDrawer';
import { RequireAnyRole } from '../../layouts/PermissionGuard';


const TableHeader = ({ search, setSearch, columnInfo, handleChangeColumns, setFilters, filters, handleResetFilters }: any) => {

    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const toggleDrawer = useToggleDrawer();

    const handleOpenDrawer = () => {
        toggleDrawer(true, "showDrawerAdd")
    }


    const handleSearch = (evnt: any) => {
        setSearch(evnt.target.value);
    }

    const toggleFilter = () => {
        setIsFiltersOpen((state) => !state);
    }

    return (
        <>
            <div className='grid md:grid-cols-1 gap-5 mb-5'>
                <div className='w-full'>
                    <div className='text-end'>
                        <div className='flex justify-end gap-3'>
                            <FilterButton toggleFilter={toggleFilter} />
                            <RequireAnyRole roles={['admin', 'manager']}>
                                <Button type='primary' onClick={handleOpenDrawer}>Add New</Button>
                            </RequireAnyRole>
                        </div>
                    </div>
                </div>
            </div>
            <div>

                <div
                    className={`
                        w-full overflow-hidden transition-all duration-300 ease-in-out
                        ${isFiltersOpen
                            ? 'max-h-[500px] opacity-100 mt-2'
                            : 'max-h-0 opacity-0'
                        }
                    `}
                >
                    <FilterDataComponent
                        setFilters={setFilters}
                        filters={filters}
                        handleResetFilters={handleResetFilters}
                    />
                </div>

            </div>
        </>

    )
}

export default TableHeader