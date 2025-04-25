import { useDispatch } from "react-redux";
import {BASE_URL} from "../utils/constants";
import axios from "axios";
import {removeUserFromFeed} from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const {_id , firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status , userId) =>{
    try{
      const res = await axios.post(BASE_URL +"/request/send/" + status + "/" + userId , {} ,
        {
          withCredentials: true
        }
      );
      dispatch(removeUserFromFeed(userId));
    }
    catch(err){

    }
  }
  console.log(user);
  return (
    <div className="card bg-base-300 w-80 shadow-xl mb-10 max-h-[500px] overflow-hidden">
      <figure className="h-36 w-full flex justify-center items-center bg-base-200">
        <img
          src={photoUrl}
          alt="photo"
          className="h-full object-contain"
        />
      </figure>
      <div className="card-body p-3">
        <h2 className="card-title text-base">{firstName + " " + lastName}</h2>
        {age && gender && <p className="text-sm">{age + ", " + gender}</p>}
        <p className="text-sm line-clamp-3">{about}</p>
        <div className="card-actions justify-center my-2">
          <button className="btn btn-primary btn-xs"
          onClick={()=> handleSendRequest("ignored" , _id)}
          >
            Ignore
          </button>
          <button className="btn btn-secondary btn-xs" 
          onClick={()=> handleSendRequest("interested" , _id)}
          >
            Interested
            </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
