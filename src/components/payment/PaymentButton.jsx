import React, { useEffect, useState } from "react";
import { getOne } from "../../api/memberApi";
import axios from "axios";
// 인터셉터가 있으므로 axios만 import하면 됩니다. (별도 설정 X)
const PaymentButton = ({ info }) => {
    const [buyer, setBuyer] = useState(null);

    // 1. 초기화: 회원 정보 조회 & 포트원 SDK 로드
    useEffect(() => {
        getOne().then(data => setBuyer(data)).catch(console.error);
    }, []);
    const handlePayment = () => {
        console.log("전달받은 결제 정보:", info); 
        console.log("결제 금액:", info.price);
        if (!window.IMP) return alert("결제 모듈 로딩 중...");
        if (!buyer) return alert("회원 정보 로딩 중...");

        const { IMP } = window;
        IMP.init('imp04278342'); // ★ 본인 식별코드 입력

        // 2. 결제 요청
        IMP.request_pay({
            pg: 'html5_inicis',
            pay_method: 'card',
            merchant_uid: `mid_${new Date().getTime()}`,
            name: info.title,           // props로 받은 강의명
            amount: info.price,         // props로 받은 가격
            buyer_email: buyer.memberEmail || buyer.email, 
            buyer_name: buyer.memberName,
            buyer_tel: buyer.memberPhoneNumber || buyer.phoneNumber,
        }, async (rsp) => {
            if (rsp.success) {
                // 3. 백엔드 검증 요청 (헤더 설정 삭제함 -> 인터셉터가 처리)
                const requestData = {
                    paymentId: rsp.imp_uid,
                    productType: "LESSON",
                    targetId: info.lessonId,  // props로 받은 ID
                    price: rsp.paid_amount
                };

                try {
                    // ★ 여기가 수정됨: 헤더 설정 없이 body만 보냄
                    await axios.post("/api/payment/complete", requestData);
                    
                    alert("수강신청 완료!");
                    window.location.reload();
                } catch (error) {
                    const msg = error.response?.data || "서버 응답 없음";
                    alert(`결제 검증 실패: ${msg}`);
                }
            } else {
                alert(`결제 실패: ${rsp.error_msg}`);
            }
        });
    };

    return (
        <button
            onClick={handlePayment}
            disabled={!buyer}
            className="px-8 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition h-[48px]"
        >
            {buyer ? `${info.price?.toLocaleString()}원 결제하기` : "로딩 중..."}
        </button>
    );
  };
  return (
    <button
      onClick={handlePayment}
      disabled={!buyer}
      className="px-8 py-3 rounded-lg font-bold text-white bg-blue-600 hover:bg-blue-700 transition h-[48px]"
    >
      {buyer ? `${info.price?.toLocaleString()}원 결제하기` : "로딩 중..."}
    </button>
  );
};
export default PaymentButton;
