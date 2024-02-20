import Link from "next/link";
import RemoveBtn from "../Buttons/RemoveBtn/RemoveBtn";
import { HiPencilAlt } from "react-icons/hi";

const TopicList = ({ item }) => {
  return (
    <div className="border border-slate-300 flex justify-between p-4 my-3">
      <div>
        <h2 className="font-bold text-2xl">{item.title}</h2>
        <div>{item.description}</div>
      </div>
      <div className="flex items-start gap-2">
        <RemoveBtn />
        <Link href={"/editTopic/123"}>
          <HiPencilAlt size={24} />
        </Link>
      </div>
    </div>
  );
};

export default TopicList;
