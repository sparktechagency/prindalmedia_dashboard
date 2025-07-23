
import React, { useEffect, useState } from 'react';
import { Input, Space, Table, Form, Radio, Pagination } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;
import { Button, Modal } from 'antd';
import { useDetailsReportQuery, useGetReportsQuery } from '../../../redux/dashboardFeatures/activeReport/dashboardReportApi';
import moment from 'moment';



const Report = () => {
    const [formOne] = Form.useForm();
    const [selectionType, setSelectionType] = useState('checkbox');
    const [searchText, setSearchText] = useState('')
    const [modalOpenOne, setModalOpenOne] = useState(false)
    const [value, setValue] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(4);
    const [detailsId, setDetailsId] = useState('')


    const { data: getReports, refetch } = useGetReportsQuery({ per_page: perPage, page: currentPage })
    const allReport = getReports?.data?.data
    const totalPaginationData = getReports?.data?.total

    const { data: singleReport } = useDetailsReportQuery(detailsId)
    const singleReportData = singleReport?.data


    // modal one
    const onFinishOne = () => {
        console.log('click')
    }

    const showModalOne = (id) => {
        setDetailsId(id)
        setModalOpenOne(true)
    }

    const handleMondalOpenOneOk = () => {

    }
    const handleMondalCancelOneOk = () => {
        setModalOpenOne(false)
    }









    const suffix = (
        <AudioOutlined
            style={{
                fontSize: 16,
                color: '#00C49A',
            }}
        />
    );
    const onSearch = (value, _e, info) =>
        console.log(info === null || info === void 0 ? void 0 : info.source, value);

    const handleDelete = () => {
        console.log('click')
        Swal.fire({
            title: "Are you sure?",
            text: "Delete this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }
    const handleUpdate = () => {
        console.log('click')
    }

    const columns = [

        {
            title: 'Image',
            dataIndex: 'image',
            render: (_, record) => (
                <div className=''>
                    <img
                     src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}${record?.reporter_info?.avatar}`}
                        alt="" className='w-[50px] h-[50px] rounded-full' />
                </div>
            ),
        },
        {
            title: 'Name',
            dataIndex: 'name',
            render: (_, record) => (
                <div className=''>
                    <p className='font-semibold'>{record?.reporter_info?.name}</p>
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            render: (_, record) => (
                <div className=''>
                    <p className='font-semibold'>{record?.reporter_info?.email}</p>
                </div>
            ),
        },
        {
            title: 'Description',
            dataIndex: 'content',
            render: (text) => {
                const words = text.split(' ');
                const limited = words.slice(0, 10).join(' ');
                return (
                    <span>
                        {words.length > 8 ? `${limited}...` : text}
                    </span>
                );
            }
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (_, record) => (
                <div>
                    <p>{record.date}</p>
                    <p className='font-semibold'> {moment(record?.reporter_info?.created_at).format('l')}</p>
                    <p className='text-gray-400'> {moment(record?.reporter_info?.created_at).format('LT')}</p>

                </div>
            )
        },


        {
            title: <div className="text-right">Action</div>,
            dataIndex: "action",
            key: "action",
            render: (_, record) => (
                <div className="flex items-center justify-end gap-3">
                    <button
                        onClick={() => showModalOne(record?.id)}
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
                </div>
            ),
        },
    ];




    useEffect(() => {
        refetch()
    }, [perPage, currentPage, refetch]);

    return (
        <div>
            <Table
                columns={columns}
                dataSource={allReport}
                pagination={false}
            />


            {/* modal one */}
            <Modal
                centered
                title={
                    <div className="text-center bg-primary text-[#ffffff] py-4 font-OpenSans text-[18px]  font-semibold rounded-t-lg">
                        Active Reports
                    </div>
                }
                open={modalOpenOne}
                onOk={handleMondalOpenOneOk}
                onCancel={handleMondalCancelOneOk}
                footer={
                    false
                }
                width={600}
                className='custom-service-modal'

            >

                <div className="p-8">
                    <Form form={formOne} onFinish={onFinishOne}>
                        <div className="flex items-center  -mx-2">
                            <img
                                className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 "
                                src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}${singleReportData?.reporter_info?.avatar}`}
                                alt="Robert"
                            />
                            <div className="mx-4">
                                <h1 className="font-semibold text-[24px] text-[#000000]">
                                    {singleReportData?.reporter_info?.name}
                                </h1>
                                <div className="flex items-center">
                                    {singleReportData?.reporter_info?.email}
                                </div>
                            </div>
                        </div>
                        {/* <div className='pt-8'>
                            <img src="/login/photo1.png" alt="" className='w-full h-[300px] object-cover rounded-[20px]' />
                        </div> */}

                        <div className='flex justify-between items-center py-4'>
                            <div>
                                <h2 className='text-2xl font-bold'>Reason</h2>
                            </div>
                        </div>





                        <div>
                            <p className='text-[14px] text-[#454545]'>{singleReportData?.content}</p>
                        </div>
                    </Form>
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
export default Report