import { POST } from "@/lib/fetcher";
import { toast } from "react-toastify";

const Bookmark = ({ userId, params }) => {
  const clickHandler = async () => {
    const response = await POST({
      url: `/api/user/${userId}/bookmarks`,
      body: JSON.stringify({ ...params }),
    });
    toast.success(`${response.result}`);
  };

  return (
    <button
      className="text-3xl text-gray-600 hover:text-orange-400 hover:cursor-pointer"
      onClick={clickHandler}
    >
      <i className="fa fa-bookmark"></i>
    </button>
  );
};

export default Bookmark;
