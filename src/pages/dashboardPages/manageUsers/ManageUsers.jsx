
import React, { useEffect, useState } from 'react';
import { Input, Space, Table, Form, Radio, Pagination } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;
import { Button, Modal } from 'antd';
import Swal from 'sweetalert2';
import { useDeleteUserMutation, useGetUsersQuery } from '../../../redux/dashboardFeatures/manageUsers/dashboardManageUsersApi';
import toast from 'react-hot-toast';



const ManageUsers = () => {
  const [formOne] = Form.useForm();
  const [formTwo] = Form.useForm();
  const [modalOpenOne, setModalOpenOne] = useState(false)
  const [modalOpenTwo, setModalOpenTwo] = useState(false)
  const [value, setValue] = useState(1);
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);


  const { data: getUsers, refetch } = useGetUsersQuery({ per_page: perPage, search: searchText, page: currentPage })
  const allUsers = getUsers?.data?.data
  const totalPaginationData = getUsers?.data?.total


  const [deleteUser] = useDeleteUserMutation()




  // modal one
  const onFinishOne = () => {
    console.log('click')
  }

  const showModalOne = () => {
    setModalOpenOne(true)
  }

  const handleMondalOpenOneOk = () => {

  }
  const handleMondalCancelOneOk = () => {
    setModalOpenOne(false)
  }

  // modal two
  const onFinishTwo = () => {
    console.log('click')
  }

  const showModalTwo = () => {
    setModalOpenTwo(true)
  }

  const handleMondalOpenTwoOk = () => {

  }
  const handleMondalCancelTwoOk = () => {
    setModalOpenTwo(false)
  }


  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Deleted this user!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
        // Call the delete API
        const res = await deleteUser(id).unwrap();
        if (res.status === true) {
          toast.success(res?.message)
          refetch()
        } else {
          toast.error(res?.message)
        }
      }
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };


  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (_, record) => (
        <div className=''>
          <img
            src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}${record.avatar}`}
            alt="" className='w-[50px] h-[50px] rounded-full' />
        </div>
      ),
    },

    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, record) => (
        <div className=''>
          <p className='font-semibold'>{record.name}</p>
        </div>
      ),
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center justify-end gap-3">
          <div className="relative group w-fit">
            {/* Your Icon Button */}
            <button className="p-1 rounded bg-blue ">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21.1871 10.007C20.8623 9.81819 20.5705 9.5777 20.3231 9.295C20.3481 8.90141 20.4418 8.51525 20.6001 8.154C20.8911 7.333 21.2201 6.403 20.6921 5.68C20.1641 4.957 19.1671 4.98 18.2921 5C17.9054 5.03978 17.5148 5.0134 17.1371 4.922C16.9358 4.59451 16.7921 4.23498 16.7121 3.859C16.4641 3.014 16.1811 2.059 15.3121 1.773C14.4741 1.503 13.6981 2.097 13.0121 2.619C12.7161 2.88932 12.3731 3.10317 12.0001 3.25C11.6232 3.10437 11.2764 2.89046 10.9771 2.619C10.2931 2.1 9.52007 1.5 8.67807 1.774C7.81107 2.056 7.52807 3.014 7.27807 3.859C7.1982 4.23376 7.05588 4.59243 6.85707 4.92C6.47859 5.01116 6.0875 5.0382 5.70007 5C4.82207 4.976 3.83307 4.95 3.30007 5.68C2.76707 6.41 3.10007 7.333 3.39207 8.153C3.55251 8.51371 3.64765 8.90003 3.67307 9.294C3.42615 9.57708 3.13464 9.81791 2.81007 10.007C2.07807 10.507 1.24707 11.076 1.24707 12C1.24707 12.924 2.07807 13.491 2.81007 13.993C3.13457 14.1818 3.42607 14.4223 3.67307 14.705C3.65033 15.0988 3.55789 15.4855 3.40007 15.847C3.11007 16.667 2.78207 17.597 3.30907 18.32C3.83607 19.043 4.83007 19.02 5.70907 19C6.09604 18.9602 6.48696 18.9866 6.86507 19.078C7.06545 19.4058 7.20881 19.7653 7.28907 20.141C7.53707 20.986 7.82007 21.941 8.68907 22.227C8.82839 22.2717 8.97376 22.2946 9.12007 22.295C9.82328 22.1941 10.4769 21.8743 10.9881 21.381C11.2841 21.1107 11.6271 20.8968 12.0001 20.75C12.377 20.8956 12.7238 21.1095 13.0231 21.381C13.7081 21.904 14.4841 22.501 15.3231 22.226C16.1901 21.944 16.4731 20.986 16.7231 20.142C16.8032 19.7665 16.9466 19.4074 17.1471 19.08C17.5241 18.9882 17.914 18.9612 18.3001 19C19.1781 19.021 20.1671 19.05 20.7001 18.32C21.2331 17.59 20.9001 16.667 20.6081 15.846C20.4487 15.4856 20.3536 15.1001 20.3271 14.707C20.5741 14.4237 20.866 14.1828 21.1911 13.994C21.9231 13.494 22.7541 12.924 22.7541 12C22.7541 11.076 21.9201 10.508 21.1871 10.007Z" fill="#49ADF4" />
                <path d="M11.0001 14.75C10.9016 14.7502 10.804 14.7308 10.7131 14.6931C10.6221 14.6553 10.5395 14.5999 10.4701 14.53L8.47009 12.53C8.33761 12.3878 8.26549 12.1998 8.26892 12.0055C8.27234 11.8112 8.35106 11.6258 8.48847 11.4884C8.62588 11.351 8.81127 11.2723 9.00557 11.2688C9.19987 11.2654 9.38792 11.3375 9.53009 11.47L11.0701 13.01L14.5501 10.4C14.7092 10.2807 14.9092 10.2294 15.1062 10.2575C15.3031 10.2857 15.4807 10.3909 15.6001 10.55C15.7194 10.7091 15.7707 10.9092 15.7426 11.1061C15.7144 11.303 15.6092 11.4807 15.4501 11.6L11.4501 14.6C11.3202 14.6973 11.1624 14.7499 11.0001 14.75Z" fill="white" />
              </svg>
            </button>

            {/* Tooltip */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-sky-100 text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300 scale-95 group-hover:scale-100">
              Verified!
            </div>
          </div>


          <button
            onClick={() => handleDelete(record?.id)}
            className="bg-secondary px-3 py-1 rounded "
          >
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="#FF5353" />
            </svg>

          </button>
        </div>
      ),
    },
  ];





  useEffect(() => {
    refetch()
  }, [perPage, searchText, currentPage, refetch]);




  return (
    <div>
      <Space direction="vertical" style={{ marginBottom: "20px", background: "#00C49A", borderRadius: "20px" }}>
        <Search placeholder="enter search email or name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          enterButton
          className="custom-search-height"
        />
      </Space>





      <Table
        columns={columns}
        dataSource={allUsers}
        pagination={false}
      />



      {/* pagination */}
      <div className="flex justify-end pt-4">
        <Pagination
          current={currentPage}
          pageSize={perPage}
          total={totalPaginationData || 0}
          onChange={(page, pageSize) => {
            setCurrentPage(page)
            setPerPage(pageSize)
          }}
        />
      </div>
    </div>
  );
};
export default ManageUsers