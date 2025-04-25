import axios from 'axios';
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from 'react-redux';
import { addRequests } from '../utils/requestSlice';
import { useEffect, useState } from 'react';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/pending", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.error("Error fetching requests:", err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleAccept = (id) => {
    setAcceptedRequests((prev) => [...prev, id]);
    // Optional: Call the backend to accept the request
    // axios.post(BASE_URL + "/user/requests/accept", { requestId: id }, { withCredentials: true });
  };

  if (!requests) return null;
  if (requests.length === 0) return <h1 className="text-center text-white text-2xl mt-10">No Connections Found</h1>;

  return (
    <div className="text-center my-10">
      <h1 className="font-bold text-white text-3xl mb-6">Connection Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender } = request.fromUserId;
        return (
          <div
            key={_id}
            className="flex items-center m-4 p-4 rounded-lg bg-base-300 w-3/4 mx-auto"
          >
            <div>
              <img alt="photo" className="w-20 h-20 rounded-full" src={photoUrl} />
            </div>
            <div className="text-left mx-4 flex-1">
              <h2 className="font-bold text-xl text-white">
                {firstName + " " + lastName}
              </h2>
              {age && gender && <p className="text-gray-300">{age + ", " + gender}</p>}
            </div>

            <div className="flex gap-2 items-center">
              {acceptedRequests.includes(_id) ? (
                <span className="text-green-400 font-semibold">Accepted ✅</span>
              ) : (
                <button className="btn" onClick={() => handleAccept(_id)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                  Accept
                </button>
              )}
              <button className="btn btn-ghost">Reject</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
