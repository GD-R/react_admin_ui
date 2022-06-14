import React, { useContext, useState } from 'react'
import DataContext from '../Context/DataContext';
import Row from './Row';

const Table = (props) => {
  
    const { handelSelect, currentBox, setCurrentBox } = props;
    const { currentData, setCurrentData } = useContext(DataContext)  

    const handelCheckBox = (e) => {
        setCurrentBox(!currentBox)
       
        setCurrentData(currentData.map((item) => {
            return({...item, select: e.target.checked })
        }))
    }

  return (
    <>
     
  
<div className="w-11/12 md:w-3/5 mx-auto my-5">

	<div className="flex flex-col">
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden ">
                <table className="min-w-full divide-y divide-gray-200 table-fixed">
                    <thead className="bg-gray-700">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <input onChange={handelCheckBox}  checked={currentBox} id="checkbox-all" type="checkbox" className="w-4 h-4 focus:outline-none bg-gray-700 border-gray-600"/>
                                    <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400">
                                Name
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400">
                                Email
                            </th>
                            <th scope="col" className="py-3 px-6 text-xs font-medium tracking-wider text-left uppercase text-gray-400">
                                Role
                            </th>
                            <th scope="col" className="p-4">
                                <span className=" sr-only text-white">Edit</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className=" divide-y  bg-teal-500  divide-gray-700 ">
                       


                    {
                        currentData.map((item) => {
                            return (<Row key={item.id} {...item} handelSelect={handelSelect} />)
                        })
                    }
            
               

                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>


</div>



    </>
  )
}

export default Table
