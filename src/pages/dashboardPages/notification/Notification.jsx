import { useGetNotificationQuery } from "../../../redux/dashboardFeatures/notification/dashboardNotificationApi"

const Notification = () => {
const {data:getNotificationData, refetch, isLoading} = useGetNotificationQuery()

const allNotificationData = getNotificationData?.data
console.log(allNotificationData)

  return (
    <>
    
    </>
  )
}

export default Notification



