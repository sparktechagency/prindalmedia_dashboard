
import { Button, Checkbox, Divider, Form, Input } from "antd"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link } from "react-router-dom"
import img3 from "/login/photo3.png"

const DashboardOtp = () => {




    const onChange = (text) => {
        console.log("onChange:", text);
    };

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
                            backgroundImage: `url(${img3})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "left",
                            backgroundSize: "cover",
                        }}
                    />
                </div>
                {/* forget password */}
                <div className=" justify-center items-center  flex    ">
                    <div className="h-[60vh] bg-white w-[536px]  shadow-xl p-8 rounded-2xl">
                        <div className="text-center pb-16">
                            <img src="/Savorly.svg" alt="Logo" className="mx-auto py-6 w-[70%] object-cover cursor-pointer" />
                            <h1 className="font-bold text-3xl font-OpenSans text-[40px] mb-6">
                                Verify OTP
                            </h1>
                            <p className="font-OpenSans font-normal text-[#3A3A3A]">
                                We have sent 6 digits code in your email
                            </p>
                        </div>


                        <Form layout="vertical" onFinish={onFinish} className="">
                            <Input.OTP
                                size="large"
                                className="otp-input"
                                style={{ width: "100%", height: "40px" }}
                                length={6}
                                formatter={(str) => str.toUpperCase()}
                                onChange={onChange}
                            />
                            <Link to="/create-new-password">
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
                                   Verify
                                </Button>
                            </Link>

                        </Form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardOtp