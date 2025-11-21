import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GuideEditComponent from "./components/GuideEditComponent";
import { getCategory, upload } from "../../../api/guideApi";

const GuideEditPage = () => {
  const [content, setContent] = useState("");
  const [savedFile, setSavedFile] = useState([]);
  const { category } = useParams();
  const [categoryName, setCategoryName] = useState({
    TIME: "운영시간",
    RENT: "상품대여",
    CAR: "차량등록",
    PRICE: "요금안내",
    REFUND: "할인/환불/연기",
  });
  const [categoryFinalName, setcategoryFinalName] = useState("");
  const [fileName, setFilelName] = useState([]);
  const [deletedFileIds, setDeletedFileIds] = useState([]);
  const navigate = useNavigate();

  const guideFiles = useRef(null);

  useEffect(() => {
    const f = async () => {
      const res = await getCategory(category.toUpperCase());
      setSavedFile(res.uploadFiles);
      setContent(res.html ?? "");
    };
    f();
  }, [category]);

  useEffect(() => {
    console.log("savedFile", savedFile);
    console.log("fileName", fileName);
  }, [savedFile]);

  useEffect(() => {
    const changeCategory = () => {
      setcategoryFinalName(categoryName[category.toUpperCase()]);
    };
    changeCategory();
  }, [category]);

  const deleteHandler = (e) => {
    const { name } = e.target;
    const forFilter = savedFile.filter((i) => i.fileNo != name);
    setDeletedFileIds((i) => [...i, name]);
    setSavedFile(forFilter);
  };

  console.log("deletedFileIds", deletedFileIds);

  const fileUploadHandler = (e) => {
    const { files } = e.target;
    const fileList = [];
    for (var i of files) {
      fileList.push(i);
    }
    setFilelName(fileList);
  };

  const saveHandler = async () => {
    const formData = new FormData();
    const guideUploadFile = guideFiles.current.files;
    for (var i of guideUploadFile) {
      formData.append("files", i);
    }
    formData.append("category", category.toUpperCase());
    formData.append("html", content);
    formData.append("deletedNo", deletedFileIds);

    await upload(formData);
    alert("수정한 내용이 저장되었습니다.");
    window.location.reload();
  };

  const cancelHandler = () => {
    if (window.confirm("수정하신 내용을 취소하시겠습니까?")) {
      alert("수정 중인 내용이 취소되었습니다");
      window.location.reload();
    }
  };

  const EditorChangeHandler = (_, editor) => {
    setContent(editor.getData());
  };

  const editorConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "link",
        "blockQuote",
        "|",
        "alignment",
        "|",
        "bulletedList",
        "numberedList",
        "outdent",
        "indent",
        "|",
        "insertTable",
        "|",
        "undo",
        "redo",
      ],
    },

    table: {
      contentToolbar: ["tableColumn", "tableRow", "mergeTableCells"],
    },

    language: "ko",
  };

  return (
    <div>
      <GuideEditComponent
        saveHandler={saveHandler}
        categoryFinalName={categoryFinalName}
        content={content}
        EditorChangeHandler={EditorChangeHandler}
        editorConfig={editorConfig}
        fileUploadHandler={fileUploadHandler}
        guideFiles={guideFiles}
        deleteHandler={deleteHandler}
        cancelHandler={cancelHandler}
        fileName={fileName}
        savedFile={savedFile}
      />
    </div>
  );
};

export default GuideEditPage;
