
import React, { useState } from 'react';
import { Input, Space, Table, Form, Radio } from 'antd';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;
import { Button, Modal } from 'antd';



const Report = () => {
    const [formOne] = Form.useForm();
    const [selectionType, setSelectionType] = useState('checkbox');
    const [searchText, setSearchText] = useState('')
    const [modalOpenOne, setModalOpenOne] = useState(false)
    const [value, setValue] = useState(1);



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
            title: 'Name',
            dataIndex: 'name',
            render: (_, record) => (
                <div className='flex items-center gap-2'>
                    {/* <img src={record.avatar} alt="" className='w-[50px] rounded-full' /> */}
                    <p className='font-semibold'>{record.name}</p>
                </div>
            ),
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Description',
            dataIndex: 'description',
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
                    <p className='text-gray-400'>{record.time}</p>
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
                        onClick={showModalOne}
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


    const data = [
        {
            key: '1',
            name: 'John Brown',
            email: 'john.brown@example.com',
            order_type: 'Home-Made',
            location: 'Dhaka',
            food_type: 'Meal',
            description: 'Used abusive and inappropriate language towards another user.',
            date: '2025-05-12',
            time: '10:15 AM',
            action: '1',
            avatar: 'https://randomuser.me/api/portraits/women/8.jpg'
        },
        {
            key: '2',
            name: 'Emma Smith',
            email: 'emma.smith@example.com',
            order_type: 'Restaurant',
            location: 'Shylet',
            food_type: 'Drink',
            description: 'Provided false or misleading information in the order section.',
            date: '2025-05-11',
            time: '02:30 PM',
            action: '2',
            avatar: 'https://randomuser.me/api/portraits/men/7.jpg'
        },
        {
            key: '3',
            name: 'Liam Johnson',
            email: 'liam.johnson@example.com',
            order_type: 'Restaurant',
            location: 'Khulna',
            food_type: 'Drink',
            description: 'Posted offensive or disrespectful comments in the review section.',
            date: '2025-05-10',
            time: '06:45 PM',
            action: '3',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        {
            key: '4',
            name: 'Olivia Brown',
            email: 'olivia.brown@example.com',
            order_type: 'Home-Made',
            location: 'Shylet',
            food_type: 'Meal',
            description: 'Suspected of using a fake profile or impersonating someone else.',
            date: '2025-05-09',
            time: '11:20 AM',
            action: '4',
            avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
        },
        {
            key: '5',
            name: 'Noah Williams',
            email: 'noah.williams@example.com',
            order_type: 'Restaurant',
            location: 'Dhaka',
            food_type: 'Drink',
            description: 'Repeatedly posted spam content or promotional links.',
            date: '2025-05-08',
            time: '08:10 PM',
            action: '5',
            avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
        },
        {
            key: '6',
            name: 'Ava Jones',
            email: 'ava.jones@example.com',
            order_type: 'Home-Made',
            location: 'Dhaka',
            food_type: 'Meal',
            description: 'Violated community guidelines or engaged in restricted activities.',
            date: '2025-05-07',
            time: '01:00 PM',
            action: '6',
            avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
        },
    ];



    const onChange = e => {
        setValue(e.target.value);
    };

    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
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
                    <div className='pb-4 flex items-center gap-4 justify-end mx-4'>
                        <button onClick={handleMondalCancelOneOk} className='p-2 px-8 border border-[#ccc] text-[16px] rounded'>Cancel</button>
                        <button  className='bg-primary p-2 px-8 text-[#ffff] text-[16px] rounded'>Save</button>
                    </div>
                }
                width={600}
                className='custom-service-modal'
                maskStyle={{ backgroundColor: 'rgba(134, 134, 134, 0.4)' }}
            >

                <div className="p-8">
                    <Form form={formOne} onFinish={onFinishOne}>
                        <div className="flex items-center  -mx-2">
                            <img
                                className="object-cover mx-2 rounded-full w-14 shrink-0 h-14 "
                                src="https://randomuser.me/api/portraits/women/8.jpg"
                                alt="Robert"
                            />
                            <div className="mx-4">
                                <h1 className="font-semibold text-[24px] text-[#000000]">
                                    John Brown
                                </h1>
                                <div className="flex items-center">
                                    john.brown@example.com
                                </div>
                            </div>
                        </div>
                        <div className='pt-8'>
                            <img src="/login/photo1.png" alt="" className='w-full h-[300px] object-cover rounded-[20px]' />
                        </div>

                        <div className='flex justify-between items-center py-4'>
                            <div>
                                <h2 className='text-2xl font-bold'>Reason</h2>
                            </div>
                        </div>





                        <div>
                            <p className='text-[14px] text-[#454545]'>The user in question has been reported for submitting false or misleading information during the ordering process. Upon thorough review and verification of the user's order history, it was found that multiple discrepancies exist between the information provided and the actual facts verified from our end. This issue not only violates our platform’s community guidelines and terms of use but also undermines the trust and reliability of our ordering system.

                                In the specific order under investigation, the user entered details that did not correspond with their actual location, selected items, or payment intent. For instance, the order claimed to originate from a verified address in the Dhaka region; however, our internal delivery team later confirmed that the address was either incomplete or non-existent. This caused delays, confusion, and wastage of valuable time and logistics resources.</p>
                        </div>
                    </Form>
                </div>
            </Modal >

        </div >
    );
};
export default Report