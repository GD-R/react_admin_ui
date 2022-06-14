import {Routes,Route, useParams, useNavigate} from "react-router-dom";
import Edit from "./Components/Edit";
import { useState } from "react";
import Combine from "./Components/Combine";
import DataContext from "./Context/DataContext";
import ErrorPage from "./Components/ErrorPage";


function App() {
 
  const [userData, setUserData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [pageSize, setPageSize] = useState(0)

  const {edit} = useParams();
  const navigate = useNavigate();

  const afterEdit = (data) => {
  }


  return (
    <div className="w-full">
    <DataContext.Provider value={{userData, setUserData, currentData, setCurrentData, pageSize, setPageSize, afterEdit}} >
     <Routes>
       <Route path="*" element={<ErrorPage/>}/>
       <Route path="/" element={<Combine/>}/>
       <Route path="/home" element={<Combine/>}/>
       <Route path="edit" element={<Edit/>}>
        <Route path=":edit" element={<Edit/>}  />
       </Route>
     </Routes>
     </DataContext.Provider>
    </div>
  );
}

export default App;
