/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from "../../Service/axiosInstance";
import { AxiosError } from "axios";
import { Value } from "../Delivery/PlannerList";
import { LIST } from "../Delivery/ParentList";
interface Props {
  customerId: string;
  name: string;
  schedule: Value;
  DropOffLocation: string;
  slot: string;
  pickUpLocation: string;
}

export const DropCustomer = async (
  info: Props,

  success: (message: { message: string }) => void,
  failure: (data: any) => void,
  loading: (load: boolean) => void,
  setOpen: (open: boolean) => void,
  removeList: (res: LIST) => void
) => {
  console.log(info);
  loading(true);
  try {
    const time = info.schedule?.toLocaleString().split(",")[0];
    const res = await axiosInstance.post<LIST>("/planner", {
      ...info,
      schedule: time,
    });

    success({ message: "customer added successfully" });
    loading(false);
    setOpen(true);
    removeList(res.data);
  } catch (error) {
    const err = error as AxiosError;
    setOpen(true);

    failure(err.response?.data);
    loading(false);
  }
};

export const Sort = async () => {};
