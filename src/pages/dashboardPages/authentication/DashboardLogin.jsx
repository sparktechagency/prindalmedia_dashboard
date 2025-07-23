
import { Button, Checkbox, Divider, Form, Input } from "antd"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import img1 from "/login/photo1.png"
import { useLoginApiMutation } from "../../../redux/dashboardFeatures/authontication/authApi"
import toast from "react-hot-toast"


const DashboardLogin = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [loginApi] = useLoginApiMutation()

    const onFinish = async (values) => {
        const authInfo = {
            email: values?.email,
            password: values?.password
        }


        try {
            const res = await loginApi(authInfo).unwrap()
            const token = res.token;
            const role = res?.user?.role


            if (res.status === true) {
                toast.success(res?.message)
                localStorage.setItem("token", token);
                localStorage.setItem("role", role);
                form.resetFields()
                navigate('/dashboard')
            }
            else if (res.status === false) {
                toast.error(res?.message)
            } else {
                toast.error(res?.message)
            }
        } catch (error) {
            if(error){
                 toast.error(error?.data?.message)
            }
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
                            backgroundImage: `url(${img1})`,
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
                                Welcome back
                            </h1>
                            <p className="font-OpenSans font-normal text-[#3A3A3A]">
                                Please sign in with valid information for access your account
                            </p>
                        </div>


                        <Form form={form} layout="vertical" onFinish={onFinish} className="">
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
                            <div>
                                <p className="text-[24px] font-OpenSans">Password</p>
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: "Please enter your password" }]}
                                >
                                    <Input.Password
                                        iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
                                        placeholder="**********"
                                        style={{ height: "50px", cursor: "pointer", }}
                                    />
                                </Form.Item>
                            </div>


                            <Form.Item>
                                <div className="flex justify-between items-center ">
                                    <Form.Item name="remember" valuePropName="checked" noStyle>
                                        <Checkbox className="text-[#818181]">Remember me</Checkbox>
                                    </Form.Item>

                                    <Link
                                        className="login-form-forgot text-[#00C49A]"
                                        to="/forget-password"
                                    >
                                        Forgot password
                                    </Link>
                                </div>
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
                                Sign In
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardLogin