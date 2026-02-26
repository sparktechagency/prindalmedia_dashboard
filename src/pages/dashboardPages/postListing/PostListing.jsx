
import React, { useEffect, useState } from 'react';
import { Input, Space, Table, Form, Radio, Pagination } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;
import { Button, Modal } from 'antd';
import { useDeletePostListingMutation, useDetailsPostListingQuery, useGetPostListingQuery } from '../../../redux/dashboardFeatures/postListing/dashboardPostListingApi';



// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation } from 'swiper/modules';
import moment from 'moment';



const PostListing = () => {
  const [formOne] = Form.useForm();
  const [modalOpenOne, setModalOpenOne] = useState(false)
  const [deleteModalOpenOne, setDeleteModalOpenOne] = useState(false)
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);
  const [postId, setPostId] = useState('')


  const { data: getPostLists, refetch } = useGetPostListingQuery({ per_page: perPage, search: searchText, page: currentPage })
  const allPostLists = getPostLists?.data?.data
  const totalPaginationData = getPostLists?.data?.total


  const { data: postDetails } = useDetailsPostListingQuery(postId)
  const postDetailsData = postDetails?.data

  const [deletePostListing] = useDeletePostListingMutation()



  // modal one
  const onFinishOne = () => {
    console.log('click')
  }

  const showModalOne = (id) => {
    setPostId(id)
    setModalOpenOne(true)
  }

  const handleMondalOpenOneOk = () => {

  }
  const handleMondalCancelOneOk = () => {
    setModalOpenOne(false)
  }



  // delete modal

  const showDeleteModalOne = (id) => {
    setPostId(id)
    setDeleteModalOpenOne(true)
  }

  const handleDeleteModalOpenOneOk = async () => {
    try {
      const res = await deletePostListing(postId).unwrap();
      if (res?.status === true) {
        setDeleteModalOpenOne(false)
        toast.success(res?.message);
         refetch()
      }
    } catch (error) {
      if (error) {
        toast.error(error?.data?.message);
      }
    }
  }


  const handleDeleteModalCancelOneOk = () => {
    setDeleteModalOpenOne(false)
  }

  const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#00C49A',
      }}
    />
  );

  const columns = [
    {
      title: 'Image',
      dataIndex: 'image',
      render: (_, record) => (
        <div className=''>
          <img
            src={record?.avatar_url}
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
      title: 'Food Type',
      dataIndex: 'food_type',
    },
    {
      title: 'Location',
      dataIndex: 'location',
    },
    {
      title: 'Order Type',
      dataIndex: 'order_type',
      render: (_, record) => (
        <div className=''>
          <p className='font-semibold'>{record.have_it}</p>
        </div>
      ),
    },


    {
      title: <div className="text-right">Action</div>,
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => showModalOne(record?.post_id)}
            className=" p-1 rounded bg-blue"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_192_7619" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_192_7619)">
                <path d="M12 16C13.25 16 14.3125 15.5625 15.1875 14.6875C16.0625 13.8125 16.5 12.75 16.5 11.5C16.5 10.25 16.0625 9.1875 15.1875 8.3125C14.3125 7.4375 13.25 7 12 7C10.75 7 9.6875 7.4375 8.8125 8.3125C7.9375 9.1875 7.5 10.25 7.5 11.5C7.5 12.75 7.9375 13.8125 8.8125 14.6875C9.6875 15.5625 10.75 16 12 16ZM12 14.2C11.25 14.2 10.6125 13.9375 10.0875 13.4125C9.5625 12.8875 9.3 12.25 9.3 11.5C9.3 10.75 9.5625 10.1125 10.0875 9.5875C10.6125 9.0625 11.25 8.8 12 8.8C12.75 8.8 13.3875 9.0625 13.9125 9.5875C14.4375 10.1125 14.7 10.75 14.7 11.5C14.7 12.25 14.4375 12.8875 13.9125 13.4125C13.3875 13.9375 12.75 14.2 12 14.2ZM12 19C9.56667 19 7.35 18.3208 5.35 16.9625C3.35 15.6042 1.9 13.7833 1 11.5C1.9 9.21667 3.35 7.39583 5.35 6.0375C7.35 4.67917 9.56667 4 12 4C14.4333 4 16.65 4.67917 18.65 6.0375C20.65 7.39583 22.1 9.21667 23 11.5C22.1 13.7833 20.65 15.6042 18.65 16.9625C16.65 18.3208 14.4333 19 12 19ZM12 17C13.8833 17 15.6125 16.5042 17.1875 15.5125C18.7625 14.5208 19.9667 13.1833 20.8 11.5C19.9667 9.81667 18.7625 8.47917 17.1875 7.4875C15.6125 6.49583 13.8833 6 12 6C10.1167 6 8.3875 6.49583 6.8125 7.4875C5.2375 8.47917 4.03333 9.81667 3.2 11.5C4.03333 13.1833 5.2375 14.5208 6.8125 15.5125C8.3875 16.5042 10.1167 17 12 17Z" fill="#49ADF4" />
              </g>
            </svg>
          </button>
          <button
            onClick={() => showDeleteModalOne(record?.post_id)}
            className=" p-1 rounded bg-blue"
          >
            <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="#FF5353" />
            </svg>

          </button>
        </div>
      ),
    },
  ];


// console.log(postDetailsData?.photo, 'postDetailsData?.photo')


  useEffect(() => {
    refetch()
  }, [perPage, searchText, currentPage, refetch]);


  return (
    <div>
      <Space direction="vertical" style={{ marginBottom: "20px", background: "#00C49A", borderRadius: "20px" }}>
        <Search placeholder="Enter search name"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          enterButton
          className="custom-search-height"
        />
      </Space>

      <Table
        columns={columns}
        dataSource={allPostLists}
        pagination={false}
      />

      {/* modal one */}
      <Modal
        centered
        title={
          <div className="text-center bg-primary text-[#ffffff] py-4 font-OpenSans text-[18px]  font-semibold rounded-t-lg">
            Post listing
          </div>
        }
        open={modalOpenOne}
        onOk={handleMondalOpenOneOk}
        onCancel={handleMondalCancelOneOk}
        footer={null}
        width={600}
        className='custom-service-modal'

      >

        <div className="p-8">
          <Form form={formOne} onFinish={onFinishOne}>
            <div className="flex items-center  -mx-2">
              <img
                className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 "
                src={postDetailsData?.avatar_url}
                alt="Robert"
              />



              <div className="mx-2">
                <h1 className="font-semibold text-[24px] text-[#000000]">
                  {postDetailsData?.user_name}
                </h1>


                {
                  postDetailsData?.have_it === "Home-made" ? <span>

                  </span> : <div className="flex items-center">
                    <span>
                      <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="mask0_192_13514" maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="17">
                          <rect y="0.5" width="16" height="16" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_192_13514)">
                          <path d="M4.66675 15.1666V9.06659C4.10008 8.91103 3.62508 8.59992 3.24175 8.13325C2.85841 7.66658 2.66675 7.12214 2.66675 6.49992V1.83325H4.00008V6.49992H4.66675V1.83325H6.00008V6.49992H6.66675V1.83325H8.00008V6.49992C8.00008 7.12214 7.80841 7.66658 7.42508 8.13325C7.04175 8.59992 6.56675 8.91103 6.00008 9.06659V15.1666H4.66675ZM11.3334 15.1666V9.83325H9.33342V5.16658C9.33342 4.24436 9.65842 3.45825 10.3084 2.80825C10.9584 2.15825 11.7445 1.83325 12.6667 1.83325V15.1666H11.3334Z" fill="#454545" />
                        </g>
                      </svg>
                    </span>
                    {postDetailsData?.restaurant_name}, {postDetailsData?.location}
                  </div>
                }
              </div>
            </div>

            {postDetailsData?.photo && postDetailsData?.photo?.length > 1 ? (
              <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {postDetailsData.photo.map((item, index) => (
                  <SwiperSlide key={index} className="pt-8 cursor-pointer">
                    <img
                      src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}${item}`}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-[300px] object-cover rounded-[20px]"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <div className="pt-8">
                <img
                  src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}${postDetailsData?.photo?.[0]}`}
                  alt="Not Found Image"
                  className="w-full h-[300px] object-cover rounded-[20px]"
                />
              </div>
            )}





            <div className='flex items-center justify-between py-4'>
              <div className='flex items-center gap-5'>
                <div className='flex items-center gap-2'>
                  <span>
                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.99992 12.9999L6.03325 12.1333C4.91103 11.1222 3.98325 10.2499 3.24992 9.5166C2.51659 8.78327 1.93325 8.12494 1.49992 7.5416C1.06659 6.95827 0.763807 6.42216 0.591585 5.93327C0.419363 5.44438 0.333252 4.94438 0.333252 4.43327C0.333252 3.38882 0.683252 2.5166 1.38325 1.8166C2.08325 1.1166 2.95547 0.766602 3.99992 0.766602C4.5777 0.766602 5.1277 0.888824 5.64992 1.13327C6.17214 1.37771 6.62214 1.72216 6.99992 2.1666C7.3777 1.72216 7.8277 1.37771 8.34992 1.13327C8.87214 0.888824 9.42214 0.766602 9.99992 0.766602C11.0444 0.766602 11.9166 1.1166 12.6166 1.8166C13.3166 2.5166 13.6666 3.38882 13.6666 4.43327C13.6666 4.94438 13.5805 5.44438 13.4083 5.93327C13.236 6.42216 12.9333 6.95827 12.4999 7.5416C12.0666 8.12494 11.4833 8.78327 10.7499 9.5166C10.0166 10.2499 9.08881 11.1222 7.96658 12.1333L6.99992 12.9999ZM6.99992 11.1999C8.06659 10.2444 8.94436 9.42494 9.63325 8.7416C10.3221 8.05827 10.8666 7.46382 11.2666 6.95827C11.6666 6.45271 11.9444 6.00271 12.0999 5.60827C12.2555 5.21382 12.3333 4.82216 12.3333 4.43327C12.3333 3.7666 12.111 3.21105 11.6666 2.7666C11.2221 2.32216 10.6666 2.09993 9.99992 2.09993C9.4777 2.09993 8.99436 2.24716 8.54992 2.5416C8.10547 2.83605 7.79992 3.21105 7.63325 3.6666H6.36659C6.19992 3.21105 5.89436 2.83605 5.44992 2.5416C5.00547 2.24716 4.52214 2.09993 3.99992 2.09993C3.33325 2.09993 2.7777 2.32216 2.33325 2.7666C1.88881 3.21105 1.66659 3.7666 1.66659 4.43327C1.66659 4.82216 1.74436 5.21382 1.89992 5.60827C2.05547 6.00271 2.33325 6.45271 2.73325 6.95827C3.13325 7.46382 3.6777 8.05827 4.36659 8.7416C5.05547 9.42494 5.93325 10.2444 6.99992 11.1999Z" fill="#454545" />
                    </svg>

                  </span>
                  <p>{postDetailsData?.love_reacts}</p>
                </div>
                <div className='flex items-center gap-2'>
                  <span>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.333252 2.99992C0.333252 2.29267 0.614204 1.6144 1.1143 1.1143C1.6144 0.614204 2.29267 0.333252 2.99992 0.333252H10.9999C11.7072 0.333252 12.3854 0.614204 12.8855 1.1143C13.3856 1.6144 13.6666 2.29267 13.6666 2.99992V8.33325C13.6666 9.0405 13.3856 9.71877 12.8855 10.2189C12.3854 10.719 11.7072 10.9999 10.9999 10.9999H7.86792L4.03592 13.5546C3.93553 13.6214 3.81889 13.6597 3.69844 13.6655C3.57799 13.6712 3.45823 13.6442 3.35192 13.5873C3.24561 13.5304 3.15672 13.4457 3.09474 13.3423C3.03275 13.2388 2.99998 13.1205 2.99992 12.9999V10.9999C2.29267 10.9999 1.6144 10.719 1.1143 10.2189C0.614204 9.71877 0.333252 9.0405 0.333252 8.33325V2.99992ZM2.99992 1.66659C2.6463 1.66659 2.30716 1.80706 2.05711 2.05711C1.80706 2.30716 1.66659 2.6463 1.66659 2.99992V8.33325C1.66659 8.68687 1.80706 9.02601 2.05711 9.27606C2.30716 9.52611 2.6463 9.66659 2.99992 9.66659H3.66658C3.8434 9.66659 4.01297 9.73682 4.13799 9.86185C4.26301 9.98687 4.33325 10.1564 4.33325 10.3333V11.7546L7.29725 9.77859C7.40663 9.70565 7.53512 9.66669 7.66658 9.66659H10.9999C11.3535 9.66659 11.6927 9.52611 11.9427 9.27606C12.1928 9.02601 12.3333 8.68687 12.3333 8.33325V2.99992C12.3333 2.6463 12.1928 2.30716 11.9427 2.05711C11.6927 1.80706 11.3535 1.66659 10.9999 1.66659H2.99992Z" fill="#454545" />
                    </svg>

                  </span>
                  <p>{postDetailsData?.commentCounts}</p>
                </div>
              </div>
            </div>




            <div className='flex justify-between items-center py-4'>
              <div>
                <h2 className='text-2xl font-bold'>{postDetailsData?.meal_name}</h2>
                <p className='flex items-center gap-3'>
                  <span>{postDetailsData?.food_type}</span>
                  <span>{postDetailsData?.restaurant_name}</span>
                </p>
              </div>

              <div className='flex flex-col items-center '>
                {
                  postDetailsData?.rating && <span className='flex items-center gap-2'>
                    <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.03638 3.56659L7.25304 0.696794C7.41138 0.485683 7.5994 0.330648 7.81711 0.231689C8.03481 0.132731 8.26242 0.083252 8.49992 0.083252C8.73742 0.083252 8.96502 0.132731 9.18273 0.231689C9.40044 0.330648 9.58846 0.485683 9.74679 0.696794L11.9635 3.56659L15.328 4.69471C15.6711 4.80027 15.9416 4.99488 16.1395 5.27856C16.3374 5.56225 16.4364 5.87561 16.4364 6.21867C16.4364 6.377 16.4133 6.53534 16.3671 6.69367C16.3209 6.852 16.2451 7.00374 16.1395 7.14888L13.9624 10.2364L14.0416 13.4822C14.0548 13.944 13.903 14.3333 13.5864 14.6499C13.2697 14.9666 12.9003 15.1249 12.478 15.1249C12.4517 15.1249 12.3065 15.1051 12.0426 15.0655L8.49992 14.076L4.95721 15.0655C4.89124 15.0919 4.81867 15.1084 4.7395 15.115C4.66034 15.1216 4.58777 15.1249 4.52179 15.1249C4.09957 15.1249 3.73013 14.9666 3.41346 14.6499C3.09679 14.3333 2.94506 13.944 2.95825 13.4822L3.03742 10.2166L0.880127 7.14888C0.774571 7.00374 0.698703 6.852 0.652523 6.69367C0.606342 6.53534 0.583252 6.377 0.583252 6.21867C0.583252 5.88881 0.678912 5.58204 0.870231 5.29836C1.06155 5.01468 1.32874 4.81346 1.67179 4.69471L5.03638 3.56659Z" fill="#FFC107" />
                    </svg>
                    <p className='text-xl font-semibold'>{postDetailsData?.rating}</p>
                  </span>
                }

                <div>
                  <p className='text-xs font-semibold'>
                    {moment(postDetailsData?.created_at).format('l')}
                  </p>
                </div>

              </div>
            </div>





            <div>
              <p className='text-[14px] text-[#454545]'>{postDetailsData?.description}</p>
            </div>
          </Form>
        </div>
      </Modal >


      {/* delete modal*/}
      <Modal
        centered
        title={
          <div className="text-center bg-primary text-[#ffffff] py-4 font-OpenSans text-[18px]  font-semibold rounded-t-lg">
            Delete This Post Listing
          </div>
        }
        open={deleteModalOpenOne}
        onOk={handleDeleteModalOpenOneOk}
        onCancel={handleDeleteModalCancelOneOk}
        footer={null}
        width={600}
        className='custom-service-modal'

      >

        <div className="p-8">
          <div className='flex justify-center'>
            <span>
              <svg
                className='w-96 h-16'
                width="14" height="40" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 1H10.5L9.5 0H4.5L3.5 1H0V3H14M1 16C1 16.5304 1.21071 17.0391 1.58579 17.4142C1.96086 17.7893 2.46957 18 3 18H11C11.5304 18 12.0391 17.7893 12.4142 17.4142C12.7893 17.0391 13 16.5304 13 16V4H1V16Z" fill="#FF5353" />
              </svg>
            </span>
          </div>

          <div className='flex flex-col justify-center items-center py-4'>
            <h2 className='text-3xl font-semibold text-red-500'>Delete Post ?</h2>
            <h2 className='text-center text-[#535353]'>Are you sure you want to delete this post listing?</h2>
          </div>
          <div className='flex items-center justify-end gap-5 mt-16'>
            <button className='w-full px-4 py-3 bg-gray-200 rounded-md' onClick={handleDeleteModalCancelOneOk}>Cancel</button>
            <button className='w-full px-4 py-3 bg-red-500 text-white rounded-md' onClick={handleDeleteModalOpenOneOk}>Delete</button>
          </div>
        </div>
      </Modal >

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
    </div >
  );
};
export default PostListing