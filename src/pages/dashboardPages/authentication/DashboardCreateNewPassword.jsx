
import { Button, Checkbox, Divider, Form, Input } from "antd"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link } from "react-router-dom"
import img4 from "/login/photo4.png"

const DashboardCreateNewPassword = () => {

    const onFinish = () => {

    }
    return (
        <>
            <div className="h-dvh font-OpenSans grid grid-cols-2 border border-gray-700  ">
                {/* image  */}
                <div className="flex items-center p-3  justify-center ">
                    <div
                        className="h-full w-full overflow-hidden rounded-xl "
                        style={{
                            backgroundImage: `url(${img4})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "left",
                            backgroundSize: "cover",
                        }}
                    />
                </div>
                {/* forget password */}
                <div className="  justify-center items-center  flex    ">
                    <div className="h-[80vh] bg-white w-[536px]  shadow-xl p-8 rounded-2xl">
                        <div className="text-center pb-16">
                            <img src="/Savorly.svg" alt="Logo" className="mx-auto py-6 w-[70%] object-cover cursor-pointer" />
                            <h1 className="font-bold text-3xl font-OpenSans text-[40px] mb-6">
                               Create new password
                            </h1>
                            <p className="font-OpenSans font-normal text-[#3A3A3A]">
                               You have to create new password to continue
                            </p>
                        </div>


                        <Form layout="vertical" onFinish={onFinish} className="">
                            {/* New Password Field */}
                            <div>
                                <p className="text-[24px] font-OpenSans">New password</p>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: "Please enter your new password" }]}
                                >
                                    <Input.Password
                                        placeholder="Write new password"
                                        iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
                                        style={{ height: "50px", width: "481px", cursor: "pointer", }}
                                    />
                                </Form.Item>
                            </div>

                            {/* Confirm Password Field */}
                            <div>
                                <p className="text-[24px] font-OpenSans">Confirm Password</p>
                                <Form.Item
                                    name="confirmPassword"
                                    rules={[{ required: true, message: "Please confirm your password" }]}
                                >
                                    <Input.Password
                                        placeholder="Write confirm password"
                                        iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
                                        style={{ height: "50px", width: "481px", cursor: "pointer", }}
                                    />
                                </Form.Item>
                            </div>

                            <Link to="/login">
                                <Button
                                    htmlType="submit"
                                    block
                                    style={{
                                        backgroundColor: "#00C49A",
                                        color: "#ffffff",
                                        fontSize: "20px",
                                        fontWeight: "600",
                                        height: "60px",
                                        borderRadius: "20px",
                                        paddingInline: "20px",
                                        marginTop: "20px",
                                        border: "none",

                                    }}
                                >
                                  Update
                                </Button>
                            </Link>

                        </Form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardCreateNewPassword