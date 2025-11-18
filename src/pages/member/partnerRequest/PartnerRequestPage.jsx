import { useEffect, useState } from "react";
import PartnerRequestComponent from "./components/PartnerRequestComponent";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { partnerReqFileRegister } from "../../../api/memberApi";
import { getPartnerStatus } from "../../../api/partnerApi";

const PartnerRequestPage = () => {
  const [partnerClass, setPartnerClass] = useState({
    수영: false,
    헬스: false,
    골프: false,
    무용: false,
    풋살: false,
  });

  const [partnerAgree, setPartnerAgree] = useState({
    privacyAgreement: false,
    thirdAgreement: false,
    serviceAgreement: false,
    partnerAgreement: false,
    taxAgreement: false,
    insuranceAgreement: false,
  });

  const [allChecked, setAllChecked] = useState(false);

  const [fileName, setFileName] = useState({
    resumeFiles: [],
    certFiles: [],
    bankFiles: [],
  });

  const navigate = useNavigate();

  const [classCheck, setClassCheck] = useState(false);
  const [fileCheck, setFileCheck] = useState(false);
  const [agreeCheck, setAgreeCheck] = useState(false);

  const resumeRef = useRef(null);
  const certRef = useRef(null);
  const bankRef = useRef(null);

  const { id } = useParams();

  const [statusCheck, setStatusCheck] = useState("");

  useEffect(() => {
    const status = async () => {
      const res = await getPartnerStatus(id);
      setStatusCheck(res);
    };
    status();

    const classChecked = Object.values(partnerClass).some((i) => i === true);
    setClassCheck(classChecked);

    const agreeChecked = Object.values(partnerAgree).every((i) => i === true);
    setAgreeCheck(agreeChecked);

    const fileCheck =
      fileName.resumeFiles.length > 0 && fileName.bankFiles.length > 0;
    setFileCheck(fileCheck);
  }, [partnerClass, partnerAgree, fileName, id]);

  const checkClassHandler = (e) => {
    const { name } = e.target;
    const selectClass = partnerClass[name];
    setPartnerClass({ ...partnerClass, [name]: !selectClass });
  };

  const checkFileHandler = (e) => {
    const { name, files } = e.target;
    const fileList = [];
    for (const file of files) {
      fileList.push(file.name);
    }
    setFileName({ ...fileName, [name]: fileList });
  };

  const checkAgreeHandler = (e) => {
    const { name } = e.target;
    const selectAgreement = partnerAgree[name];
    setPartnerAgree({ ...partnerAgree, [name]: !selectAgreement });
  };

  const checkAllAgreeHandler = () => {
    const newValue = !allChecked;
    setAllChecked(newValue);

    const newValues = Object.keys(partnerAgree).reduce((item, key) => {
      item[key] = newValue;
      return item;
    }, {});
    setPartnerAgree(newValues);
  };

  const cancelHandler = () => {
    if (window.confirm("파트너 신청을 취소하시겠습니까?")) {
      alert("신청이 취소되었습니다.");
      navigate("/member/:id");
    }
  };

  const requestHandler = async () => {
    if (classCheck && agreeCheck && fileCheck) {
      const formData = new FormData();
      formData.append("resumeFiles", resumeRef.current.files[0]);
      const certFiles = certRef.current.files;
      for (let i of certFiles) {
        formData.append("certFiles", i);
      }
      formData.append("bankFiles", bankRef.current.files[0]);

      const selectedClass = Object.keys(partnerClass).filter(
        (key) => partnerClass[key] === true
      );
      formData.append("partnerClass", selectedClass);
      formData.append("memberId", id);

      try {
        await partnerReqFileRegister(id, formData);
        alert("신청이 완료되었습니다.");
        navigate("/");
      } catch (err) {
        alert("신청 중 오류가 발생했습니다.");
      }
    } else if (fileCheck && !classCheck && agreeCheck) {
      alert("강좌 분야는 최소 한 개 이상 체크해 주세요");
    } else if (!fileCheck && classCheck && agreeCheck) {
      alert("이력서와 계좌 사본은 필수입니다");
    } else if (classCheck && fileCheck && !agreeCheck) {
      alert("필수 동의 사항을 체크해 주세요");
    } else {
      alert("양식을 다시 확인해 주세요");
    }
  };

  return (
    <PartnerRequestComponent
      checkClassHandler={checkClassHandler}
      checkAgreeHandler={checkAgreeHandler}
      checkFileHandler={checkFileHandler}
      checkAllAgreeHandler={checkAllAgreeHandler}
      allChecked={allChecked}
      resumeRef={resumeRef}
      certRef={certRef}
      bankRef={bankRef}
      fileName={fileName}
      cancelHandler={cancelHandler}
      requestHandler={requestHandler}
      statusCheck={statusCheck}
    />
  );
};

export default PartnerRequestPage;
