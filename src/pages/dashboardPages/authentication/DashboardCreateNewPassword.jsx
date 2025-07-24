
import { Button, Checkbox, Divider, Form, Input } from "antd"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import img4 from "/login/photo4.png"
import { useChangePasswordApiMutation } from "../../../redux/dashboardFeatures/authontication/authApi"
import toast from "react-hot-toast"

const DashboardCreateNewPassword = () => {
    const [createNewPasswordForm] = Form.useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const queryEmail = queryParams.get('email');


    const [changePasswordApi] = useChangePasswordApiMutation();


    const onFinish = async (values) => {
        console.log(values)

        const formData = new FormData();
        formData.append("email", queryEmail);
        formData.append("password", values?.password);
        formData.append("password_confirmation", values?.password_confirmation);


        try {
            const res = await changePasswordApi(formData).unwrap();

            if (res?.status === true) {
                toast.success(res?.message);
                navigate("/login")

            }
        } catch (error) {
           if(error){
             toast.error(error?.data?.message);
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
                            {/* <img src="/Savorly.svg" alt="Logo" className="mx-auto py-6 w-[70%] object-cover cursor-pointer" /> */}
                            <img src="/Kalamari.png" alt="Logo" className="mx-auto py-6 w-[70%] object-cover cursor-pointer" />
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
                                    name="password_confirmation"
                                    dependencies={["password"]}
                                    rules={[
                                        { required: true, message: "Please input Confirm new password" },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue("password") === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(
                                                    new Error(
                                                        "The two passwords that you entered do not match"
                                                    )
                                                );
                                            },
                                        }),
                                    ]}
                                    colon={false}
                                >
                                    <Input.Password
                                        placeholder="Write confirm password"
                                        iconRender={(visible) => (visible ? <FaEye /> : <FaEyeSlash />)}
                                        style={{ height: "50px", width: "481px", cursor: "pointer", }}
                                    />
                                </Form.Item>
                            </div>

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
                        </Form>

                    </div>
                </div>
            </div>
        </>
    )
}

export default DashboardCreateNewPassword