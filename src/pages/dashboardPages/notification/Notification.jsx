import moment from "moment"
import { useGetNotificationQuery } from "../../../redux/dashboardFeatures/notification/dashboardNotificationApi"
import { Pagination } from "antd"
import { useEffect, useState } from "react"

const Notification = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(7);

  const { data: getNotificationData, refetch, isLoading } = useGetNotificationQuery({ per_page: perPage, page: currentPage })

  const allNotificationData = getNotificationData?.data
  const totalPaginationData = getNotificationData?.data?.total


  useEffect(() => {
    refetch()
  }, [perPage, currentPage, refetch]);

  return (
    <>
      <div>
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-semibold ">Notifications</h1>
          <button className="text-2xl  text-red-500 underline">Read all</button>
        </div>


        <div className="space-y-4">
          {
            allNotificationData?.map((item, index) => {
              return (
                <div key={index} className={`flex items-center justify-between bg-gray-200 rounded-xl p-4 ${item?.read_at === null ? " cursor-pointer" : "cursor-default"}`}>
                  <div>
                    <div className="flex items-center gap-3 ">
                      <div>
                        <img
                          src={`${import.meta.env.VITE_API_IMAGE_BASE_URL}${item.avatar}`}
                          alt="" className="bg-red-300 w-[60px] h-[60px] rounded-full" />
                      </div>

                      <div>
                        <h3 className="text-xl">
                          <span className="font-bold">{item?.user_name} </span>
                          {item?.message}</h3>
                        <p className="text-md">{moment(item?.created_at).format('LT')}</p>
                      </div>
                    </div>
                  </div>

                  {
                    item?.read_at === null ? <div className="bg-red-500 w-[16px] h-[16px] rounded-full"></div> : ''
                  }

                </div>
              )
            })
          }
        </div>

        {/* pagination */}
        <div className="flex justify-end pt-4">
          <Pagination
            current={currentPage}
            pageSize={perPage}
            total={totalPaginationData || 0}
            onChange={(page, pageSize) => {
              setCurrentPage(page)
              setPerPage(pageSize)
            }}
          />
        </div>
      </div>
    </>
  )
}

export default Notification



