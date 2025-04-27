import axios from 'axios';
import {BASE_URL} from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux'
import { addRequests , removeRequest} from '../utils/requestSlice';
import { useEffect , useState } from 'react';

const Requests = () => {
    const requests = useSelector((store) => store.requests);
    const dispatch = useDispatch();

 const reviewRequest = async (status, _id) => {
    try {
      const res =axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id ,
         {}, 
        {withCredentials: true}
    );
    dispatch(removeRequest(_id));
    } catch (err) {
      console.error("Error reviewing request:", err);
    }
  };


    const fetchRequests = async () => {
        try{
            const res = await axios.get(BASE_URL + "/user/requests/pending" , {
                withCredentials :true, 
            });
            dispatch(addRequests(res.data.data));

        }catch(err){}
    }

    useEffect(()=> {
        fetchRequests();
    }, [])

    if(!requests) return;
    if(requests.length === 0) return <h1 className="flex justify-center my-10">No Requests Found</h1>;


  return (
    <div className="text-center my-10">
        <h1 className="text-bold text-white text-3xl">Connection Requests</h1>
      {requests.map((request)=>{
        const {_id , firstName , lastName , photoUrl , age , gender} =
        request.fromUserId;
        return (
        <div key={_id} 
        className=" flex items-center m-4 p-4 rounded-lg bg-base-300 mx-auto">
            <div><img alt ="photo" className="w-20 h-20 rounded-full" src= {photoUrl} ></img></div>
            <div className="text-left mx-4">
            <h2 className="font-bold text-xl"> {firstName + " " + lastName}
            </h2>
            {age && gender && <p>{age + ", " + gender}</p>}
            </div>

<button className="btn" onClick = {()=> reviewRequest("accepted" , request._id )} >
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
  Accept
</button> 
<button className="btn btn-ghost" onClick = {()=> reviewRequest("rejected" , request._id )}>Reject</button>

        </div>
      );
      })}  
    </div>
  )
}

export default Requests; 