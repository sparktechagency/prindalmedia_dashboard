

import { Button, Checkbox, Divider, Form, Input } from "antd"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link } from "react-router-dom"
import img2 from "/login/photo2.png"

const DashboardForgetPassword = () => {

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
                            backgroundImage: `url(${img2})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "left",
                            backgroundSize: "cover",
                        }}
                    />
                </div>
                {/* forget password */}
                <div className="  justify-center items-center  flex    ">
                    <div className="h-[60vh] bg-white w-[536px]  shadow-xl p-8 rounded-2xl">
                        <div className="text-center pb-16">
                            <img src="/Savorly.svg" alt="Logo" className="mx-auto py-6 w-[70%] object-cover cursor-pointer" />
                            <h1 className="font-bold text-3xl font-OpenSans text-[40px] mb-6">
                                Forget password
                            </h1>
                            <p className="font-OpenSans font-normal text-[#3A3A3A]">
                                You have to verify your email address to reset password.
                            </p>
                        </div>


                        <Form layout="vertical" onFinish={onFinish} className="">
                            <div>
                                <p className="text-[24px] font-OpenSans">Email</p>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true, message: "Please enter your email" }]}
                                >
                                    <Input
                                        placeholder="example@gmail.com"
                                        style={{ height: "50px", backgroundColor: "#fefefe" }}
                                        className="bg-[#fefefe]"
                                    />
                                </Form.Item>
                            </div>
                            <Link to="/otp-code">
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
                                    Submit
                                </Button>
                            </Link>

                        </Form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardForgetPassword