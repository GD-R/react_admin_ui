import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import DataContext from "../Context/DataContext";

const Navbar = () => {

  const { userData, setUserData, currentData, setCurrentData, setPageSize } = useContext(DataContext)
  const [clone, setClone] = useState([])
  
  const navigate = useNavigate();
  
  const [search, setSearch] = useState("");

   useEffect(() => {
   
    if (search?.length > 0) {
      setClone(userData)
      const searchResult = userData.filter((user) => {
        const name = user.name.toLowerCase();
        const email = user.email.toLowerCase();
        const role = user.role.toLowerCase();
        if(name.includes(search) || email.includes(search) || role.includes(search)) {
          return true
        }
     })  

    
     setPageSize(Math.ceil(searchResult.length/10));
     setUserData(searchResult)
     setCurrentData([...searchResult.slice(0,10)])

    }
  
  
   else {
   
    const data = clone.length > 1 ? clone : userData
    setPageSize(Math.ceil(data.length/10));
    setUserData(data)
    setCurrentData([...data.slice(0,10)])
   
   }
      
   }, [search])
 
  const handelSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearch(value);
  }


  return (
    <>
      <nav className="flex justify-around flex-wrap  bg-teal-500 p-6">
        <div>
          <h1 onClick={() => navigate('/home')} className="cursor-pointer text-2xl text-white">ADMIN UI</h1>
        </div>
        <div className="text-right basis-2/5">
          <input
            value={search}
            onChange={handelSearch}
            className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
            type="search"
            name="search"
            placeholder="Search"
          />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
