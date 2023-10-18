/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import DeliveryList from "./DeliveryList";
import PlannerList, { Value } from "./PlannerList";
import { axiosInstance } from "../../Service/axiosInstance";

import Customer from "./Customer";
import DatePicker from "react-date-picker";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

export interface LIST {
  _id: string;
  name: string;
  pickUpLocation: string;
  DropOffLocation: string;
}
export interface CUSTOMER {
  name: string;
  pickUpLocation: string;
  DropOffLocation: string;
  slot: string;
  schedule: string;
  _id: number;
  customerId: string;
}

const ParentList = () => {
  const [CustomerSlot, setCustomerSlot] = useState([] as CUSTOMER[]);
  const [List, setList] = useState([] as Array<LIST>);
  const [date, setDate] = useState<Value>(new Date());
  const [Slot, setSlot] = useState("SLOT1");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getList();
  }, []);
  const slot = ["SLOT1", "SLOT2", "SLOT3", "SLOT4"];

  const getList = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get<LIST[]>("/customer");
      setList(res.data);
      console.log(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSlot = async (slot: string) => {
    if (slot) {
      setSlot(slot);
      console.log(slot);
      const schedule = date?.toLocaleString().split(",")[0];
      const res = await axiosInstance.get<CUSTOMER[]>(
        `/planner/slot?schedule=${schedule}&slot=${slot}`
      );
      console.log(res.data);
      setCustomerSlot(res.data);
    }
  };

  const maxDate = new Date();
  const minDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  const removeList = (data: any) => {
    setList((prev) => [...prev.filter((item) => item._id !== data.customerId)]);
  };
  const handleDate = async (date: Value) => {
    setDate(date);
    const schedule = date?.toLocaleString().split(",")[0];
    const res = await axiosInstance.get<CUSTOMER[]>(
      `/planner/slot?schedule=${schedule}&slot=${Slot}`
    );
    setCustomerSlot(res.data);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 font-[poppins] gap-4 md:mt-20 mt-5 grid-cols-1 mb-10">
        <DeliveryList list={List} loading={loading} />
        <PlannerList removeList={removeList} />
      </div>
      <div>
        <p className=" text-center font-extrabold text-3xl  text-slate-600 mt-10">
          Customer Date & Slots
        </p>
        <div className=" grid md:grid-cols-2 gap-4 grid-cols-1 mx-10">
          <div className=" w-72 font-medium h-10">
            <div className="bg-green-500 text-center mx-auto   w-full flex  items-center justify-center rounded-xl p-2">
              <p className="">Sort by Date</p>
            </div>
            <DatePicker
              className={`mx-auto z-20 mt-2 ml-10 `}
              value={date?.toLocaleString()}
              onChange={(date) => handleDate(date)}
              minDate={minDate}
              maxDate={maxDate}
            />
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="w-72 md:mt-0 mt-10 font-medium h-10"
          >
            <div className="bg-green-500 w-full  flex items-center justify-between rounded p-2">
              {Slot === "" ? "Sort by Slot" : Slot}
              {open && <BiChevronDown size={20} />}
              {!open && <BiChevronUp size={20} />}
            </div>
            {open && (
              <ul className="mt-2 bg-white overflow-y-auto max-h-60 z-auto">
                {slot.map((item) => (
                  <li
                    onClick={() => {
                      handleSlot(item);
                      setOpen(false);
                    }}
                    key={item}
                    className=" p-2 text-slate-900 text-sm hover:bg-green-500 rounded-sm hover:text-white"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <Customer open={open} customer={CustomerSlot} />
      </div>
    </>
  );
};

export default ParentList;
