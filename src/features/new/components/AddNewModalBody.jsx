/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewNew } from "../newSlice";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import axios from "axios";

const INITIAL_NEW_OBJ = {
  NewsTitle: "",
  NewsClarify: "",
  NewsContent: "",
  NewsThumbnail: "",
  IsHidden: false,
};

function AddNewModalBody({ closeModal }) {
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [currentBlogPost, setCurrentBlogPost] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_NEW_OBJ);
  const [imageURL, setImageURL] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const mdParser = new MarkdownIt();

  const handleEditorChange = ({ text }) => {
    setCurrentBlogPost((blogPost) => {
      const updatedBlogPost = {
        ...blogPost,
        blogPostContent: text,
      };

      return updatedBlogPost;
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadPostImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const imageUrl = await axios.post("/news/uploadNewsImage", formData);
      console.log("imageUrl", imageUrl);

      return imageUrl.data.imageURL;
    } catch (error) {
      console.log(error);
    }
  };

  const addNew = async () => {
    try {
      setLoading(true);

      const date = new Date();
      const newLeadObj = {
        Id: "string",
        NewsTitle: leadObj.NewsTitle,
        NewsClarify: leadObj.NewsClarify,
        NewsDate: date.toISOString(),
        NewsContent: currentBlogPost.blogPostContent,
        NewsThumbnail: "string",
        IsHidden: false,
      };

      const newNew = await axios.post("/news/createNews", newLeadObj);
      console.log("newNew", newNew.data);

      if (newNew.data && imageFile) {
        const dataForm = new FormData();
        dataForm.append("file", imageFile);
        const imageURL = await axios.post(
          `/news/uploadNewsThumbnail/${newNew.data.newsId}`,
          dataForm
        );
        const newNewObj = {
          Id: newNew.data.newsId,
          NewsTitle: leadObj.NewsTitle,
          NewsClarify: leadObj.NewsClarify,
          NewsDate: date.toISOString(),
          NewsContent: currentBlogPost.blogPostContent,
          NewsThumbnail: imageURL.data.imageURL,
          IsHidden: false,
        };

        dispatch(addNewNew({ newLeadObj: newNewObj }));
      }

      setLoading(false);
      dispatch(
        showNotification({
          message: "Đã thêm bài báo!",
          status: 1,
        })
      );
      // window.location.reload();
      closeModal();
    } catch (error) {
      console.log(error);
    }
  };

  const saveNewNew = () => {
    if (leadObj.NewsTitle.trim() === "")
      return setErrorMessage("Cần phải có tiêu đề!");
    else if (leadObj.NewsClarify.trim() === "")
      return setErrorMessage("Cần có mô tả!");
    else {
      addNew();
      // dispatch(showNotification({ message: "Đã thêm bài báo!", status: 1 }));
      closeModal();
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={leadObj.NewsTitle}
        updateType="NewsTitle"
        containerStyle="mt-4"
        labelTitle="Tiều đề bài báo"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.NewsClarify}
        updateType="NewsClarify"
        containerStyle="mt-4"
        labelTitle="Mô tả"
        updateFormValue={updateFormValue}
      />

      <div className="mt-4">
        <label className="label text-sm ">Ảnh</label>
        <input
          type="file"
          className="file-input w-full max-w-xs"
          accept="image/*"
          onChange={handleFileChange}
        />
        {imageURL && (
          <img
            src={imageURL}
            alt="Preview"
            className="mt-4 object-cover w-48 h-48"
          />
        )}
      </div>

      <div className="w-full my-4">
        <MdEditor
          style={{ height: "500px" }}
          placeholder="Nhập nội dung bài viết ở đây..."
          value={currentBlogPost.blogPostContent}
          renderHTML={(content) => mdParser.render(content)}
          onChange={handleEditorChange}
          onImageUpload={handleUploadPostImage}
        />
      </div>

      <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
      <div className="modal-action">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewNew()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddNewModalBody;
