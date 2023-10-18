import { useDrag } from "react-dnd";
interface Props {
  item: {
    _id: string;
    name: string;
    pickUpLocation: string;
    DropOffLocation: string;
  };
}
const ListTable = ({ item }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "customer",
    item: { item: item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <tr
      ref={drag}
      className={`odd:bg-slate-100  hover:bg-green-500 hover:text-white even:bg-white-300 ${
        isDragging ? "border-4 border-indigo-200 border-x-indigo-500" : 0
      }  cursor-pointer duration-500`}
    >
      <td className="py-3 md:px-6 px-2">{item._id}</td>
      <td className="py-3 md:px-6 px-2">{item.name}</td>
      <td className="py-3 md:px-6 px-2">{item.pickUpLocation}</td>
      <td className="py-3 md:px-6 px-2">{item.DropOffLocation}</td>
    </tr>
  );
};

export default ListTable;
