import { FaCircleUser } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import { userListFN } from "../../Redux/Slices/users/userListSlice";
import { userResult } from "../../types/userInterface";
import ChangeRole from "../Components/ChangeRole";

const UserList = () => {
  const [searchName, setSearchName] = useState("");
  const [edittingUser, setEditingUser] = useState<userResult | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const userListState = useSelector((state: RootState) => state.listUser);

  const changeRoleState = useSelector((state: RootState) => state.changeRole);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(userListFN());
  }, [dispatch, changeRoleState.isSuccess]);

  if (userListState.isLoading) {
    return (
      <h1 className="w-full py-5 rounded-md bg-[#97979742] animate-pulse"></h1>
    );
  }

  const filteredUsers =
    userListState.data?.data?.filter((user) => {
      return user.firstname.includes(searchName);
    }) || [];
  // console.log(userListState.data.data);
  // console.log("filtered users are", filteredUsers);

  return (
    <div className="p-4 h-full flex flex-col gap-3 ">
      <div className="labels flex  items-center justify-between gap-3 ">
        <div className="desc flex items-center gap-3">
          <FaCircleUser className="text-4xl" />
          <div className="info">
            <h1 className="text-3xl font-geist font-bold">Users list</h1>
            <h1 className="text-xs font-geist font-bold">
              all users of the system
            </h1>
          </div>
        </div>

        <div className="search">
          <input
            type="text"
            onChange={(e) => setSearchName(e.target.value)}
            value={searchName}
            className="bg-slate-200 rounded-lg py-2 font-geist text-black border border-[#0000001c] px-3 w-[20rem]"
            placeholder="Enter First name"
          />
        </div>
      </div>

      <div className="userList bg-slate-300 h-full rounded-lg p-5 flex flex-col gap-3">
        <div className="grid grid-cols-7 w-full justify-items-center items-center ">
          <h1 className="font-geist ">Firstname</h1>
          <h1 className="font-geist ">Lastname</h1>
          <h1 className="font-geist ">Username</h1>
          <h1 className="font-geist ">Email</h1>
          <h1 className="font-geist ">Mobile phone</h1>
          <h1 className="font-geist ">Role</h1>
          <h1 className="font-geist ">action</h1>
        </div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user, index) => (
            <div
              key={index}
              className="grid grid-cols-7 w-full  justify-items-center items-center "
            >
              <h1 className="font-geist ">{user.firstname}</h1>
              <h1 className="font-geist ">{user.lastname}</h1>
              <h1 className="font-geist ">{user.username}</h1>
              <h1 className="font-geist ">{user.email.toLowerCase()}</h1>
              <h1 className="font-geist ">
                {user.phone.replace(/\+252/g, "")}
              </h1>
              <h1 className="font-geist ">{user.role}</h1>
              <button
                onClick={() => {
                  setEditingUser(user);
                  setIsOpen(true);
                }}
                className="font-geist text-white bg-black py-2 px-4 rounded-md "
              >
                change role
              </button>
            </div>
          ))
        ) : (
          <>its not fetched yer</>
        )}
      </div>
      {edittingUser ? (
        <ChangeRole
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          phone={edittingUser.phone.replace(/\+252/g, "")}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserList;
