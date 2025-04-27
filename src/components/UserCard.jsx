import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId, {}, {
        withCredentials: true
      });
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-base-300 w-64 shadow-xl mb-10 max-h-[630px] overflow-hidden">
      <figure className="h-56 w-full">
        <img
          src={photoUrl}
          alt="photo"
          className="w-full h-full object-cover"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title text-lg">{firstName + " " + lastName}</h2>
        {age && gender && <p className="text-sm">{age + ", " + gender}</p>}
        <p className="text-sm line-clamp-3">{about}</p>
        <div className="card-actions justify-center my-4 gap-3">
          <button className="btn btn-primary btn-sm"
            onClick={() => handleSendRequest("not interested", _id)}
          >
            Not Interested
          </button>
          <button className="btn btn-secondary btn-sm"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
