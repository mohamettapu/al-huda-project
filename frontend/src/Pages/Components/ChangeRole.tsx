import { useDispatch, useSelector } from "react-redux";
import { resetData, updateRoleFN } from "../../Redux/Slices/users/changeRole";
import { UpdateRoleInterface } from "../../types/userInterface";
import { AppDispatch, RootState } from "../../Redux/store";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
// import { userListFN } from "../../Redux/Slices/users/userListSlice";

const ChangeRole = ({
  phone,
  setIsOpen,
  isOpen,
}: {
  isOpen: boolean;
  phone: string;

  setIsOpen: (value: boolean) => void;
}) => {
  const [role, setRole] = useState("");
  const user = { phone, role } as UpdateRoleInterface;
  const dispatch = useDispatch<AppDispatch>();

  const changeRoleState = useSelector((state: RootState) => state.changeRole);
  useEffect(() => {
    if (changeRoleState.isSuccess) {
      toast.success(changeRoleState.data.msg);
      //   dispatch(userListFN());
      resetData();
    }
    if (changeRoleState.isError) {
      toast.error(changeRoleState.errorMsg);
      resetData();
    }
  }, [changeRoleState]);
  const handleChangeRole = () => {
    dispatch(updateRoleFN(user));
    console.log(user);
  };
  if (!isOpen) return null; // Conditional rendering to hide the modal

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-[90vw] max-w-[600px]">
        <h2 className="text-xl font-bold font-geist mb-4">change role </h2>
        <p className="mb-6 font-geist">
          Are you sure you want to change role {phone}
        </p>
        <select
          className="bg-slate-200 w-full py-4 text-xl px-3 font-geist rounded-lg mb-4"
          name=""
          value={role}
          onChange={(e) => setRole(e.target.value)}
          id=""
        >
          <option value="">select</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => {
              handleChangeRole();
              setIsOpen(changeRoleState.isLoading);
            }}
            className="bg-black text-white py-2 px-4 rounded font-geist    hover:bg-red-700"
          >
            update
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="bg-gray-300 py-2 px-4 font-geist rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeRole;
