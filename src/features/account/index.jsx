/* eslint-disable no-unused-vars */
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { openModal } from "../common/modalSlice";
import { deleteUser, getUsersContent } from "./accountSlice";
import {
  ARCHIVE_MODAL_CLOSE_TYPES,
  MODAL_BODY_TYPES,
} from "../../utils/globalConstantUtil";
import {
  ArchiveBoxArrowDownIcon,
  ArchiveBoxXMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { showNotification } from "../common/headerSlice";

// const TopSideButtons = () => {
//   const dispatch = useDispatch();

//   const openAddNewLeadModal = () => {
//     dispatch(
//       openModal({
//         title: "Thêm câu hỏi",
//         bodyType: MODAL_BODY_TYPES.USER_ADD_NEW,
//         size: "lg",
//       })
//     );
//   };

//   return (
//     <div className="inline-block float-right">
//       <button
//         className="btn px-6 btn-sm normal-case btn-primary"
//         onClick={() => openAddNewLeadModal()}
//       >
//         Thêm
//       </button>
//     </div>
//   );
// };

function User() {
  const { users } = useSelector((state) => state.user);
  const [userList, setUserList] = useState(users); //[{id: 1, name: "abc"}, {id: 2, name: "xyz"}
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [qq, setQq] = useState(users.User);

  useEffect(() => {
    dispatch(getUsersContent());
    console.table("userList", userList);
    setQq(users.User);
  }, []);

  const archiveCurrentLead = (_id, index, status) => {
    dispatch(
      openModal({
        title: "Xác nhận",
        bodyType: MODAL_BODY_TYPES.ARCHIVE,
        extraObject: {
          message: status
            ? `Bạn chắc chắn muốn khoá tài khoản người dùng này?`
            : `Bạn chắc chắn muốn bỏ khoá tài khoản người dùng này?`,
          type: ARCHIVE_MODAL_CLOSE_TYPES.USER_ARCHIVE,
          _id,
          index,
          status,
        },
      })
    );
  };

  const showImportant = (index) => {
    if (index === true)
      return <div className="badge badge-neutral">Điểm liệt</div>;
    else return <div></div>;
  };

  const onSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const search = () => {
    if (!Array.isArray(users)) {
      return [];
    }

    if (searchTerm === "") {
      return users;
    } else {
      return users.filter(
        (item) =>
          item.UserEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.UserLastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.UserFirstName.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  };

  useEffect(() => {
    setUserList(search());
  }, [searchTerm]);

  useEffect(() => {
    setUserList(users);
  }, [users]);

  return (
    <>
      <TitleCard title="Danh sách người dùng" topMargin="mt-2">
        {/* Leads List in table format loaded from slice after api call */}
        <section>
          <div className="flex items-center">
            <div className="flex">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Nhập từ khóa"
                value={searchTerm}
                onChange={onSearch}
              />
            </div>
            <div className="flex-initial ml-2">
              <button className="btn btn-primary">
                <span className="p-2 text-white">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                </span>
                Tìm kiếm
              </button>
            </div>
          </div>
        </section>
        <div className="overflow-x-auto w-full">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Stt</th>
                <th>Mail</th>
                <th>Họ tên</th>
                <th>Ngày sinh</th>
                <th>Giới tính</th>
                <th>Số điện thoại</th>
                <th>Trạng thái</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {userList?.map((l, k) => {
                // if (
                //   l.UserLastName === l.UserFirstName &&
                //   l.UserLastName === "Admin"
                // )
                //   return null;
                return (
                  <tr key={l.Id}>
                    {/* <td>
                      <div className="flex items-center space-x-3">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={l.avatar} alt="Avatar" />
                        </div>
                      </div>
                    </td> */}
                    <td>{k + 1}</td>
                    <td>{l.UserEmail}</td>

                    <td className="truncate max-w-md">
                      {l.UserLastName} {l.UserFirstName}
                    </td>
                    <td>
                      {/* {moment(new Date(l.UserBirthday)).format("DD MMM YY")} */}
                      {new Date(l.UserBirthday).toLocaleDateString("vi-VN")}
                    </td>
                    <td>{l.UserGender === "Male" ? "Nam" : "Nữ"}</td>
                    <td>{l.UserPhoneNumber}</td>
                    <td>{l.IsVerified ? "Đã xác nhận" : ""}</td>
                    <td>
                      <div className="flex">
                        <div className="tooltip" data-tip="Khoá / mở khoá">
                          <button
                            className="btn btn-square btn-ghost"
                            onClick={() =>
                              archiveCurrentLead(l.Id, k, l.IsActive)
                            }
                          >
                            {l.IsActive ? (
                              <ArchiveBoxXMarkIcon className="w-5 text-gray-400" />
                            ) : (
                              <ArchiveBoxArrowDownIcon className="w-5 text-yellow-700" />
                            )}
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default User;
