const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
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
          <button className="btn btn-primary btn-xs">Ignore</button>
          <button className="btn btn-secondary btn-xs">Interested</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
