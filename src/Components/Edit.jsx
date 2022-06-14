import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import DataContext from "../Context/DataContext";

const Edit = () => {

 const { userData, setUserData, currentData, setCurrentData, setPageSize} = useContext(DataContext)

 const navigate = useNavigate();

 const { edit } = useParams();
  
 const editThisUser = currentData.find((user) => user.id === edit)

const defaultValues = {
    name: editThisUser? editThisUser.name : "",
    email: editThisUser? editThisUser.email : "",
    role: editThisUser? editThisUser.role : "",
  }

  const { register, handleSubmit, formState: { errors } } = useForm({defaultValues});

  const onFormSubmit = (data) => {
    const updatedUser = {
      id: edit,
      name: data.name,
      email: data.email,
      role: data.role,
      select: false
   }
   const nonEditedUsers = userData.filter((user) => user.id !== edit);
   let combineAfterUpdate = [...nonEditedUsers, updatedUser];
   combineAfterUpdate = combineAfterUpdate.sort((a,b) => (Number(a.id) > Number(b.id) ? 1 : -1))
  
   setPageSize(Math.ceil(combineAfterUpdate.length/10));
   setUserData(combineAfterUpdate);
   setCurrentData([...combineAfterUpdate.slice(0,10)]);
   
   navigate('/home')
  }

  const nameObj = {
    required: "This is required",
    minLength: {
      value: 4,
      message: "Min length is 4"
    }
  }

  const emailObj = {
    required: "This is required",
    pattern: { value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ , 
    message:"Invalid Email" }
  }
  

  return (
    <form  onSubmit={handleSubmit(onFormSubmit)} className="flex justify-center  w-full h-full">
      <div className="flex flex-wrap justify-evenly items-center gap-4 h-screen w-screen bg-green-400">
        <div>
          <input
          name="name"
            {...register("name", nameObj)}
            type="text"
            placeholder="Name"
            className="mb-2 bg-gray-100 p-2 rounded-lg border-2 border-green-600 shadow-md focus:outline-none focus:border-teal-600"
          />
          <p>{errors.name?.message}</p>
        </div>
        <div className="flex flex-col items-center">
          <input
            {...register("email", emailObj)}
            type="text"
            placeholder="Email"
            className="mb-2 bg-gray-100 p-2 rounded-lg border-2 border-green-600 shadow-md focus:outline-none focus:border-teal-600"
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <div className="relative inline-flex">
            <svg
              className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 412 232"
            >
              <path
                d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z"
                fill="#648299"
                fillRule="nonzero"
              />
            </svg>
            <select name="role"
            {...register("role", { required: true })}
            className="border-2 border-green-600 rounded-lg text-gray-600 h-11 pl-5 pr-10 bg-gray-100 hover:border-gray-400 focus:outline-none appearance-none">
              <option>member</option>
              <option>admin</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-gray-100 border-2 border-green-600 text-gray-600 px-4 py-2 rounded-md text-1xl font-medium hover:bg-green-600 transition duration-300"
        >
          SUBMIT
        </button>
      </div>
    </form>
  );
}

export default Edit;

{
  /* <input type="text" placeholder="Input Field" classNameName="mb-2 bg-gray-100 p-2 rounded-lg border-2 border-teal-500 shadow-md focus:outline-none focus:border-teal-600" /> */
}
