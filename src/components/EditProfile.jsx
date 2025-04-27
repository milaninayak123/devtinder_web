import React, { useState } from 'react';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl );
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response?.data || "Something went wrong.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-start gap-6 px-4 pt-10 pb-6 h-screen overflow-hidden box-border">
        {/* Edit Profile Card */}
        <div className="bg-base-300 w-80 shadow-xl rounded-xl h-[calc(100vh-160px)] flex flex-col overflow-hidden">
          <div className="p-4 overflow-y-auto flex-1">
            <h2 className="card-title justify-center text-base mb-2">Edit Profile</h2>

            {/* Form */}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">First Name</span>
              </div>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Last Name</span>
              </div>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Age</span>
              </div>
              <input
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Gender</span>
              </div>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </label>

            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Edit Picture (Photo URL)</span>
              </div>
              <input
                type="text"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="input input-bordered input-sm w-full max-w-xs"
              />
            </label>

            {/* About/Bio textarea */}
            <label className="form-control w-full max-w-xs my-2">
              <div className="label">
                <span className="label-text">Bio</span>
              </div>
              <textarea
                className="textarea textarea-bordered w-full max-w-xs"
                placeholder="Bio"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
            </label>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* Save button */}
          <div className="p-3 border-t border-base-100">
            <button className="btn btn-primary btn-sm w-full" onClick={saveProfile}>
              Save
            </button>
          </div>
        </div>

        {/* User Card */}
        <div className="h-[calc(100vh-160px)]">
          <UserCard user={{ firstName, lastName, photoUrl, age, gender, about }} />
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
