import React, { useEffect, useMemo, useState } from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import GuideComponent from "./components/GuideComponent";
import { useParams } from "react-router-dom";
import { getCategory } from "../../api/guideApi";

const GuidePage = () => {
  const [html, setHtml] = useState("");
  const { category } = useParams();
  const [categoryName, setCategoryName] = useState({
    TIME: "운영시간",
    RENT: "상품대여",
    CAR: "차량등록",
    PRICE: "요금안내",
    REFUND: "할인/환불/연기",
  });
  const [nowCategory, setNowCategory] = useState("");
  const [Createddate, setCreatedDate] = useState("");
  const [guideList, setGuideList] = useState({});

  useEffect(() => {
    const f = async () => {
      const res = await getCategory(category.toUpperCase());
      setGuideList(res);
      setCreatedDate(res.updatedDate.slice(0, 10));
      setHtml(res.html ?? "");
    };
    f();
  }, [category]);

  useEffect(() => {
    const changeCategory = () => {
      setNowCategory(categoryName[category.toUpperCase()]);
    };
    changeCategory();
  }, [category]);

  const cleanHtml = useMemo(() => {
    return DOMPurify.sanitize(html);
  }, [html]);

  return (
    <div>
      <GuideComponent
        cleanHtml={cleanHtml}
        nowCategory={nowCategory}
        Createddate={Createddate}
        guideList={guideList}
      />
    </div>
  );
};

export default GuidePage;
