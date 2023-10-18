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

  success: any,
  failure: any,
  loading: any,
  setOpen: any,
  removeList: any
) => {
  console.log(info);
  loading(true);
  try {
    const res = await axiosInstance.post<LIST>("/planner", info);

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
