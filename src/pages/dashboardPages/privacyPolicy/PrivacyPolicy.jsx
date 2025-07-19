
import { Button } from "antd";
import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import { useGetSettingQuery, useUpdateSettingMutation } from "../../../redux/dashboardFeatures/seetings/dashboardSetting";

import toast from "react-hot-toast";



const PrivacyPolicy = () => {
  const [content, setContent] = useState('');
  const editor = useRef(null);

  const { data: getSettingData,refetch, isLoading} = useGetSettingQuery()
  const settingData = getSettingData?.data

  const[updateSetting] = useUpdateSettingMutation()



  useEffect(() => {
    if (settingData?.privacy_policy) {
      setContent(settingData?.privacy_policy)
    }
  }, [settingData])



    const handleUpdate = async () => {
    const formData = new FormData();
    formData.append("privacy_policy", content);


    //  formData.forEach((value, key) => {
    //   console.log(key, value);
    // });


    try {
      const res = await updateSetting(formData).unwrap();
      console.log(res)
      if (res?.status === true) {
        toast.success(res?.message)
          refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };


  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="w-full mt-6">
        <JoditEditor
          ref={editor}
          value={content}
          // config={{
          //   height: "400px", // Set your desired height
          // }}
          onChange={(newContent) => {
            setContent(newContent);
          }}
        />
      </div>

      <div className="flex justify-end ">
        <Button
          htmlType="submit"
          style={{ backgroundColor: "#00C49A", color: "white", fontFamily: "degularDisplay", padding: "24px 40px", fontSize: "16px", fontWeight: "bold", margin: "10px 0px" }}
          onClick={handleUpdate}
        >
          Save
        </Button>
      </div>


    </>
  )
}

export default PrivacyPolicy


