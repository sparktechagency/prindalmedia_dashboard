import { EnvironmentOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Form, Input, Upload } from "antd"
import { useForm } from "antd/es/form/Form"
import { UploadCloud } from "lucide-react"
import { useState } from "react"


const MyProfile = () => {
    const [form] = useForm()
    const [ImageFileList, setImageFileList] = useState([]);

    const onFinish = (values) => {
        console.log(values)


        const formData = new FormData();



        if (ImageFileList.length > 0) {
            const uploadedFile = ImageFileList.find(file => file.originFileObj);

            if (uploadedFile) {
                formData.append("avatar", uploadedFile.originFileObj);
            }
        }

        formData.append("first_name", values.first_name);
        formData.append("last_name", values.last_name);
        formData.append("phone", values.phone);
        formData.append("address", values.address);

        formData.forEach((value, key) => {
            console.log(`${key}:`, value);
        })

        setFileList([]);
        form.resetFields()

    }
    return (
        <div>
            <Form form={form} layout="vertical" onFinish={onFinish}>


                {/* upload image */}
                <div className="pb-4 w-full pt-20">

                    <div className="w-full flex flex-col justify-center items-center pb-8">

                        <Form.Item
                            className="md:col-span-2"
                            name="image"
                            rules={[
                                {
                                    required: ImageFileList?.length === 0,
                                    message: "Image required",
                                },
                            ]}
                        >
                            <Upload
                                beforeUpload={() => false}
                                accept="image/*"
                                maxCount={1}
                                showUploadList={{ showPreviewIcon: true }}
                                fileList={ImageFileList}
                                onChange={({ fileList }) => setImageFileList(fileList)}
                                listType="picture-card"
                            >
                                <div className="flex flex-col items-center">
                                    <UploadCloud className="w-5 h-5 text-gray-400" />
                                    <span className="mt-2">Choose File</span>
                                </div>
                            </Upload>
                        </Form.Item>
                        <p className="text-[24px] font-OpenSans font-bold text-[#001018]">Upload your photo</p>
                    </div>
                </div>


                {/* first name & last name */}
                <div className="flex justify-between gap-3">
                    <Form.Item
                        name="first_name"
                        rules={[{ required: true, message: "Please enter your First name" }]}
                        style={{ width: "50%" }}
                    >
                        <Input
                            prefix={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 2C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4C6 4.53043 6.21071 5.03914 6.58579 5.41421C6.96086 5.78929 7.46957 6 8 6C8.53043 6 9.03914 5.78929 9.41421 5.41421C9.78929 5.03914 10 4.53043 10 4C10 3.46957 9.78929 2.96086 9.41421 2.58579C9.03914 2.21071 8.53043 2 8 2ZM8 9C10.67 9 16 10.33 16 13V16H0V13C0 10.33 5.33 9 8 9ZM8 10.9C5.03 10.9 1.9 12.36 1.9 13V14.1H14.1V13C14.1 12.36 10.97 10.9 8 10.9Z" fill="#60606A" />
                            </svg>
                            }
                            type="text"
                            placeholder="First name"
                            style={{ border: "1px solid #B6B6BA", padding: "10px" }}

                        />
                    </Form.Item>

                    <Form.Item
                        name="last_name"
                        rules={[{ required: true, message: "Please enter your Last name" }]}
                        style={{ width: "50%" }}
                    >
                        <Input
                            prefix={<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 2C7.46957 2 6.96086 2.21071 6.58579 2.58579C6.21071 2.96086 6 3.46957 6 4C6 4.53043 6.21071 5.03914 6.58579 5.41421C6.96086 5.78929 7.46957 6 8 6C8.53043 6 9.03914 5.78929 9.41421 5.41421C9.78929 5.03914 10 4.53043 10 4C10 3.46957 9.78929 2.96086 9.41421 2.58579C9.03914 2.21071 8.53043 2 8 2ZM8 9C10.67 9 16 10.33 16 13V16H0V13C0 10.33 5.33 9 8 9ZM8 10.9C5.03 10.9 1.9 12.36 1.9 13V14.1H14.1V13C14.1 12.36 10.97 10.9 8 10.9Z" fill="#60606A" />
                            </svg>
                            }
                            type="text"
                            placeholder="Last name"
                            style={{ border: "1px solid #B6B6BA", padding: "10px" }}
                        />
                    </Form.Item>
                </div>

                {/* contact number */}
                <div>
                    <Form.Item
                        name="phone"
                        rules={[{ required: true, message: "Please enter your contact number" }]}
                    // style={{ width: "50%" }}
                    >
                        <Input
                            prefix={<svg width="16" height="22" viewBox="0 0 16 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.05702 1.41805L4.22402 1.06705C4.86331 0.874278 5.5509 0.920685 6.15849 1.19761C6.76608 1.47454 7.25216 1.96308 7.52602 2.57205L8.42802 4.57805C8.66348 5.10186 8.72905 5.68623 8.61553 6.24919C8.502 6.81215 8.21508 7.32544 7.79502 7.71705L6.30002 9.11005C6.25635 9.15075 6.22868 9.20573 6.22202 9.26505C6.17802 9.66206 6.44702 10.4351 7.06802 11.5101C7.51802 12.2911 7.92702 12.8401 8.27402 13.1471C8.51702 13.3621 8.65002 13.4081 8.70702 13.3921L10.717 12.7771C11.2659 12.6092 11.8536 12.6172 12.3977 12.8001C12.9418 12.9831 13.415 13.3317 13.751 13.7971L15.031 15.5731C15.4207 16.113 15.6012 16.776 15.539 17.439C15.4769 18.102 15.1763 18.7199 14.693 19.1781L13.806 20.0181C13.3358 20.4634 12.7582 20.7793 12.1296 20.9351C11.501 21.0909 10.8428 21.0812 10.219 20.9071C7.46502 20.1381 4.99602 17.8141 2.78402 13.9831C0.570019 10.1471 -0.207981 6.84305 0.510019 4.07005C0.671194 3.44639 0.990304 2.87476 1.43659 2.41025C1.88288 1.94575 2.4403 1.60404 3.05702 1.41805ZM3.49102 2.85505C3.12091 2.96636 2.78571 3.17113 2.51772 3.44962C2.24974 3.72811 2.05801 4.07094 1.96102 4.44505C1.35902 6.77705 2.04802 9.70605 4.08402 13.2331C6.11802 16.7551 8.30702 18.8161 10.624 19.4631C10.9983 19.5674 11.3932 19.5731 11.7704 19.4795C12.1475 19.386 12.494 19.1963 12.776 18.9291L13.662 18.0891C13.8818 17.8808 14.0186 17.5999 14.0469 17.2985C14.0752 16.997 13.9932 16.6956 13.816 16.4501L12.536 14.6751C12.3833 14.4633 12.168 14.3046 11.9205 14.2214C11.673 14.1382 11.4057 14.1346 11.156 14.2111L9.14102 14.8281C7.97102 15.1761 6.91002 14.2351 5.77002 12.2601C5.00002 10.9301 4.64202 9.90005 4.73202 9.09905C4.77802 8.68305 4.97202 8.29905 5.27702 8.01305L6.77202 6.62005C6.96287 6.44195 7.09318 6.20856 7.14465 5.95264C7.19612 5.69671 7.16618 5.4311 7.05902 5.19305L6.15802 3.18705C6.03352 2.91024 5.81255 2.68819 5.53636 2.56233C5.26016 2.43647 4.94761 2.4154 4.65702 2.50305L3.49102 2.85505Z" fill="#60606A" />
                            </svg>
                            }
                            type="number"
                            placeholder="Contact number"
                            style={{ border: "1px solid #B6B6BA", padding: "10px" }}
                        />
                    </Form.Item>
                </div>

                {/* location */}
                <div>
                    <Form.Item
                        name="address"
                        rules={[{ required: true, message: "Please enter your Location" }]}
                    // style={{ width: "50%" }}
                    >
                        <Input
                            prefix={<svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9 2.00002C7.14348 2.00002 5.36301 2.73752 4.05025 4.05028C2.7375 5.36303 2 7.14351 2 9.00002C2 11.862 3.782 14.623 5.738 16.762C6.73814 17.8517 7.82943 18.854 9 19.758C9.17467 19.624 9.37967 19.4607 9.615 19.268C10.5548 18.4963 11.4393 17.6596 12.262 16.764C14.218 14.623 16 11.863 16 9.00002C16 7.14351 15.2625 5.36303 13.9497 4.05028C12.637 2.73752 10.8565 2.00002 9 2.00002ZM9 22.214L8.433 21.824L8.43 21.822L8.424 21.817L8.404 21.803L8.329 21.75L8.059 21.553C6.69086 20.5248 5.41988 19.3733 4.262 18.113C2.218 15.875 0 12.636 0 8.99902C3.55683e-08 6.61207 0.948211 4.32289 2.63604 2.63506C4.32387 0.947235 6.61305 -0.000976563 9 -0.000976562C11.3869 -0.000976562 13.6761 0.947235 15.364 2.63506C17.0518 4.32289 18 6.61207 18 8.99902C18 12.636 15.782 15.876 13.738 18.111C12.5804 19.3713 11.3098 20.5228 9.942 21.551C9.82805 21.6361 9.71305 21.7198 9.597 21.802L9.576 21.816L9.57 21.821L9.568 21.822L9 22.214ZM9 7.00002C8.46957 7.00002 7.96086 7.21074 7.58579 7.58581C7.21071 7.96088 7 8.46959 7 9.00002C7 9.53046 7.21071 10.0392 7.58579 10.4142C7.96086 10.7893 8.46957 11 9 11C9.53043 11 10.0391 10.7893 10.4142 10.4142C10.7893 10.0392 11 9.53046 11 9.00002C11 8.46959 10.7893 7.96088 10.4142 7.58581C10.0391 7.21074 9.53043 7.00002 9 7.00002ZM5 9.00002C5 7.93916 5.42143 6.92174 6.17157 6.1716C6.92172 5.42145 7.93913 5.00002 9 5.00002C10.0609 5.00002 11.0783 5.42145 11.8284 6.1716C12.5786 6.92174 13 7.93916 13 9.00002C13 10.0609 12.5786 11.0783 11.8284 11.8285C11.0783 12.5786 10.0609 13 9 13C7.93913 13 6.92172 12.5786 6.17157 11.8285C5.42143 11.0783 5 10.0609 5 9.00002Z" fill="#60606A" />
                            </svg>
                            }
                            type="text"
                            placeholder="Location"
                            style={{ border: "1px solid #B6B6BA", padding: "10px" }}
                        />
                    </Form.Item>
                </div>

                <Button
                    htmlType="submit"
                    block
                    style={{
                        backgroundColor: "#00C49A", color: "white", fontFamily: "OpenSans", padding: "24px", fontSize: "16px", fontWeight: "bold", borderRadius: "50px", border: "none",
                        boxShadow: "none"
                    }}
                >
                    Update
                </Button>
            </Form>

        </div>
    )
}

export default MyProfile