import axios from "axios";
import {BASE_URL} from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
    const connections = useSelector(store => store.connections);

    const dispatch = useDispatch();
    //make an api call to fetch the data
    //it will make an api call to our backened 
    //keep a try catch block to handle errors

    const fetchConnections = async() => {
        try{
            //make an api call to get the connections of user
            const res = await axios.get(BASE_URL+ "/user/connections" , {
                withCredentials: true,
            });
            console.log(res.data.data);
            dispatch(addConnections(res.data.data));
        }catch(err){

        }
    };
//call this function one time or once when page loads
    useEffect(()=>{
        fetchConnections();
    } , [])

    if(!connections) return;
    if(connections.length == 0) return 
    <h1>No Connections Found</h1>

  return (
    <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connections</h1>
      {connections.map((connection)=>{
        const {_id ,firstName , lastName , photoUrl , age , gender , about} =
        connection;
        return (
        <div key ={_id} className=" flex m-4 p-4 rounded-lg bg-base 10 w-2/3 mx-auto">
            <div><img alt ="photo" className="w-20 h-20 rounded-full" src= {photoUrl} ></img></div>
            <div className="text-left mx-4">
            <h2 className="font-bold text-xl"> {firstName + " " + lastName}
            </h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            <p>{about}</p>  
            </div>
            
                      
        </div>
      );
      })}  
    </div>
  )
}

export default Connections