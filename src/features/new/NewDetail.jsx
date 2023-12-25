import React from "react";
import { useParams } from "react-router-dom";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
import MarkdownComponent from "./MarkdownComponent";
import axios from "axios";

const Content = () => {
  const { id } = useParams();
  const [blogPost, setBlogPost] = React.useState();
  const [date, setDate] = React.useState("");

  React.useEffect(() => {
    const getPost = async () => {
      try {
        if (!id) return;
        const res = await axios.get(`/news/getNewsById/${id}`);
        setBlogPost(res.data);
        setDate(
          new Date(res.data?.NewsDate).toLocaleDateString("vi-VN", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
  }, [id]);

  return (
    <>
      {!blogPost?.isHidden ? (
        <div className="flex w-full flex-col">
          <div className="min-h-[12rem] min-w-[20rem] overflow-hidden max-md:h-[6rem] max-md:w-[10rem] md:max-h-[36rem] md:max-w-[60rem]">
            <img
              src={blogPost?.NewsThumbnail}
              alt="Title image"
              className="object-cover"
              height={576}
              width={960}
            />
          </div>
          <div>
            <p className="text-xl text-gray-500 lg:text-2xl">{date}</p>
          </div>
          <div className="my-8 space-y-4 md:min-w-[60rem]">
            <h1 className="text-3xl font-bold lg:w-[624px] lg:text-4xl">
              {blogPost?.NewsTitle}
            </h1>
            {/* <p className="text-xl text-gray-500 lg:text-2xl">
              {blogPost && convertTagToVietnamese(blogPost.blogPostTag)}
            </p> */}
            <p className="prose lg:prose-xl">{blogPost?.NewsClarify}</p>
          </div>
          <div className="markdown prose lg:prose-xl ">
            {/* <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blogPost?.blogPostContent || ""}
            </ReactMarkdown> */}
            <MarkdownComponent markdown={blogPost?.NewsContent || ""} />
          </div>
          <div>
            {/* author */}
            {/* <div className="my-8 flex items-center justify-center gap-4">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">Tác giả:</h1>
                <p className="text-xl text-gray-500">
                  {blogPost?.blogPostAuthor}
                </p>
              </div>
            </div> */}
          </div>
        </div>
      ) : (
        <div className="flex h-[90vh] items-center justify-center">
          <h1 className="text-4xl font-bold">Bài viết không tồn tại</h1>
        </div>
      )}
    </>
  );
};

export default Content;
