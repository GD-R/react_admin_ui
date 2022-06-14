import React from 'react'
import { useNavigate } from 'react-router-dom';

const Row = (props) => {
 
    const { id, name, email, role, select, handelSelect } = props;

    const navigate = useNavigate();
    
    const handelEdit = () => {
      navigate(`/edit/${id}`)
    }

   
  return (
    <>
      
      <tr className = {`${select ? "bg-gray-700" : "bg-teal-500" } hover:bg-gray-700`  }>
                            <td className="p-4 w-4">
                                <div className="flex items-center">
                                    <input onChange={() => handelSelect(id)}   checked={select} id="checkbox-table-1" type="checkbox" className="w-4 h-4 text-blue-600  rounded  bg-gray-700 border-gray-600"/>
                                    <label htmlFor="checkbox-table-1" className="sr-only">checkbox</label>
                                </div>
                            </td>
                            <td className="px-6 text-sm font-medium  whitespace-nowrap text-white">{name}</td>
                            <td className="px-6 text-sm font-medium  whitespace-nowrap text-white">{email}</td>
                            <td className="px-6 text-sm font-medium  whitespace-nowrap text-white">{role}</td>
                            <td className="px-6 text-sm font-medium text-right whitespace-nowrap">
                                <p onClick={handelEdit}  className=" text-blue-500 hover:underline cursor-pointer">Edit</p>
                            </td>
                        </tr> 
    </>
  )
}

export default Row
