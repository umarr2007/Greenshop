import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { AiOutlineComment } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
const fetchBlogs = async () => {
  const res = await axios.get(
    "https://green-shop-backend.onrender.com/api/user/blog?access_token=64bebc1e2c6d3f056a8c85b7&search="
  );
  return res.data;
};
function BlogsAll() {
  const { data: blogs } = useQuery({
    queryKey: ["blog"],
    queryFn: fetchBlogs,
  });

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[30px] py-[40px] px-[40px]">
      {blogs?.data.map((blog) => (
        <div
          key={blog._id}
          className="border border-[#A5A5A5] rounded-[15px] flex flex-col justify-between"
        >
          <div className="px-[20px] pt-[20px] pb-[10px]">
            <h2 className="text-[20px] font-medium leading-[100%] mb-[10px]">
              {blog.title}
            </h2>
            <p className="text-[14px] font-normal leading-[16px]">
              {blog.short_description}
            </p>
          </div>
          <hr className="border-[#A5A5A5]" />
          {user && (
            <div className="flex justify-between px-[30px] py-[15px]">
              <StatItem icon={<IoEyeOutline />} value={blog.views} />
              <StatItem icon={<AiOutlineComment />} value={blog.__v} />
              <StatItem icon={<CiHeart />} value={blog.reaction_length} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
function StatItem({ icon, value }) {
  return (
    <div className="flex items-center gap-[4px] cursor-pointer hover:text-[#46A358]">
      {icon}
      <span>{value}</span>
    </div>
  );
}
export default BlogsAll;