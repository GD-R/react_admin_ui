import React, { useContext, useEffect, useState } from 'react'
import Table from './Table';
import Pagination from '@mui/material/Pagination';
import DataContext from '../Context/DataContext';


const Main = () => {

    const { userData, setUserData, currentData, setCurrentData, pageSize, setPageSize } = useContext(DataContext)



    
    const [page, setPage] = useState(1)
    const [value, setValue] = useState(1)
   
    const [currentBox, setCurrentBox] = useState(false)
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(10)
   
    
    const getCurrentData = (data,start,end) => {
      return([...data.slice(start,end)])
    }

    
  
    const handlePageChange = (event,value) => {
     const firstUser = (value*10)-10;
     const lastUser = value*10;
      setCurrentData(getCurrentData(userData,firstUser,lastUser))
      setStart((value*10)-10);
      setEnd(value*10)
      setCurrentBox(false)
      setPage(value);
    }
    

    const handelSelect = (id) => {
        const data = currentData.map((item) => {
          return (id !== item.id? {...item} : {...item, select: !item.select})
        })
        setCurrentData(data);
    }


    const handelDelete = () => {
      const deletedUsers = currentData.filter((item) => {
        return (item.select === true);
      })
   
      const combine = [...userData, ...deletedUsers];
      
      const ids = combine.map(item => item.id);
     
      const filtered = combine.filter((item) => !ids.includes(item.id, userData.length))
      
      
             setPageSize(Math.ceil(filtered.length/10));
             setUserData(filtered);
             if(deletedUsers.length >= 10) {
              setCurrentData(getCurrentData(filtered,0,10));
              setPage(1);
             }
             
             else if (Math.ceil(filtered.length/10) < Math.ceil(userData.length/10)) {
              setCurrentData(getCurrentData(filtered,0,10));
              setPage(1);
             }
             
             else {
              setCurrentData(getCurrentData(filtered,start,end));
             }
             
             setCurrentBox(false)

        
    }
   
    useEffect(() => {
       
        const fetchApi = async() => {
          
             const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
             const data = await response.json();
             const completeData = data.map((item) => { return({...item,select: false}) })
             setPageSize(Math.ceil(completeData.length/10));
             setUserData(completeData);
             setCurrentData(getCurrentData(completeData,start,end));
             window.localStorage.setItem('data', JSON.stringify(completeData));
            }
            if(userData.length === 0)
            {
              fetchApi();
            }
    }, [])

    

  return (
    <>
     <Table currentData={currentData} handelSelect={handelSelect} setCurrentData={setCurrentData}
       currentBox={currentBox}
       setCurrentBox={setCurrentBox}
     />
     <div className='flex justify-evenly'>
     <div className=''>
     
     <button
     onClick={handelDelete}
        type="button"
        className="border border-green-500 bg-teal-500 text-white rounded-md px-4 py-2 m-1 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
      >
        Delete
      </button>
     </div>
     <Pagination count={pageSize}  page={page} showFirstButton showLastButton onChange={handlePageChange} />
     
     </div>
    </>
  )
}

export default Main

