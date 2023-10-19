/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import DeliveryList from "./DeliveryList";
import PlannerList from "./PlannerList";
import { axiosInstance } from "../../Service/axiosInstance";

import Customer from "./Customer";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import dayjs from "dayjs";
import DatePickers from "../common/DatePicker";
import { SortByTimeAndSlot } from "../common/request";

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
  const [date, setDate] = useState(new Date());
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

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDate = async (date: Date) => {
    const time = dayjs(date).format("DD/MM/YYYY");
    const data = await SortByTimeAndSlot(time, Slot);
    if (data) {
      setCustomerSlot(data);
    }
    setDate(date);
  };

  const handleSlot = async (slot: string) => {
    if (slot) {
      const time = dayjs(date).format("DD/MM/YYYY");
      setSlot(slot);

      const data = await SortByTimeAndSlot(time, slot);
      if (data) {
        setCustomerSlot(data);
      }
    }
  };

  const maxDate = new Date();
  const minDate = new Date();
  maxDate.setDate(maxDate.getDate() + 7);

  const removeList = (data: any) => {
    setList((prev) => [...prev.filter((item) => item._id !== data.customerId)]);
  };

  return (
    <>
      <div className="grid md:grid-cols-2 font-[poppins] gap-4 md:mt-20 mt-5 grid-cols-1 mb-10">
        <DeliveryList list={List} loading={loading} />
        <PlannerList removeList={removeList} SLOT={slot} />
      </div>
      <div>
        <p className=" text-center font-extrabold text-3xl  text-slate-600 mt-10">
          Customer Date & Slots
        </p>
        <div className=" grid md:grid-cols-2 gap-4 grid-cols-1 mx-10">
          <div className=" w-72 font-medium h-10">
            <div className="bg-green-500 text-center mx-auto   w-full flex  items-center justify-center rounded-xl p-2">
              <p className="font-[poppins]">Sort by Date</p>
            </div>
            <DatePickers
              value={date}
              handleDate={handleDate}
              minDate={minDate}
              maxDate={maxDate}
              style="ml-10 z-20 p-3 text-center mt-3 font-[poppins] hover:bg-green-500"
            />
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="w-72 md:mt-0 mt-14 font-medium h-10"
          >
            <div className="bg-green-500 w-full font-[poppins]  flex items-center justify-between rounded-xl p-2">
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
                    className=" p-2 text-slate-900 font-[poppins] text-sm hover:bg-green-500 rounded-sm hover:text-white"
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
