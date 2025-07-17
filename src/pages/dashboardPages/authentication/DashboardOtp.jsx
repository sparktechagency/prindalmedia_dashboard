
import { Button, Checkbox, Divider, Form, Input } from "antd"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import img3 from "/login/photo3.png"
import { useResendApiMutation, useVerifyOtpApiMutation } from "../../../redux/dashboardFeatures/authontication/authApi"
import { useState } from "react"
import toast from "react-hot-toast"

const DashboardOtp = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [otpCode, setOtpCode] = useState("");
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryEmail = queryParams.get('email');


    const [verifyOtpApi] = useVerifyOtpApiMutation()
    const [resendApi] = useResendApiMutation()


    const onFinish = async (values) => {
        const formData = new FormData();
        formData.append("otp", values?.otp);

        try {
            const res = await verifyOtpApi(formData).unwrap();
            const token = res?.access_token
            const role = res?.data?.user?.role

            if (res?.status === true) {
                localStorage.setItem("token", token);
                toast.success(res?.message);
                navigate(`/create-new-password?email=${queryEmail}`)
                form.resetFields()
            } else {
                toast.error(res?.message);
                form.resetFields()
            }
        } catch (error) {
            if (error) {
                toast.error(error?.data?.message)
                form.resetFields()
            }
        }

    }


    const handleResentOtp = async () => {
        const formData = new FormData();
        formData.append("email", queryEmail);


        try {
            const res = await resendApi(formData).unwrap();
            console.log(res?.message)
            if (res?.status === true) {
                toast.success(res?.message);
            } else {
                toast.error(res?.message);
            }
        } catch (error) {
            console.log(error)
        }
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


                        <Form form={form} layout="vertical" onFinish={onFinish} className="flex flex-col justify-center items-center">
                            <Form.Item name="otp" rules={[{ required: true, message: "Please enter the otp code" }]}>
                                <Input.OTP />
                            </Form.Item>
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
                        </Form>

                        <p className="text-center mt-10 text-sm font-normal mb-6 text-[#5C5C5C]">
                            I have not received the email.
                            <Button onClick={() => handleResentOtp()} className="pl-1 text-primary " type="link">
                                Resend
                            </Button>
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardOtp