import React, { useState } from 'react';
import UserCard from './UserCard';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setgender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
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
      setError(err.response.data);
    }
  };

  return (
    <>
      <div className="flex justify-center items-start gap-6 px-4 pt-10 pb-6 min-h-screen box-border overflow-hidden">
        {/* Edit Profile Card */}
        <div className="bg-base-300 w-80 shadow-xl rounded-xl h-[calc(100vh-180px)] flex flex-col overflow-hidden">
          <div className="p-4 overflow-y-auto flex-1">
            <h2 className="card-title justify-center text-base mb-2">Edit Profile</h2>

            {[
              { label: 'First Name', value: firstName, setter: setFirstName },
              { label: 'Last Name', value: lastName, setter: setLastName },
              { label: 'Age', value: age, setter: setAge },
              { label: 'Gender', value: gender, setter: setgender },
              { label: 'Edit Picture', value: photoUrl, setter: setPhotoUrl },
            ].map(({ label, value, setter }, index) => (
              <label key={index} className="form-control w-full mb-2">
                <div className="label">
                  <span className="label-text text-sm">{label}</span>
                </div>
                <input
                  type="text"
                  value={value}
                  className="input input-bordered input-sm w-full"
                  onChange={(e) => setter(e.target.value)}
                />
              </label>
            ))}
            
            {/* Bio textarea */}
            <label className="form-control w-full mb-2">
              <div className="label">
                <span className="label-text text-sm">Bio</span>
              </div>
              <textarea className="textarea textarea-bordered" placeholder="Bio"></textarea>
            </label>

            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          {/* Save button fixed inside the card */}
          <div className="p-3 border-t border-base-100">
            <button className="btn btn-primary btn-sm w-full" onClick={saveProfile}>
              Save
            </button>
          </div>
        </div>

        {/* User Card: Same fixed height */}
        <div className="h-[calc(100vh-120px)]">
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