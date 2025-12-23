import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { duplicateEmail, duplicateId, sendJoinMail, verifyJoinCode } from '../../api/authApi';
import { registerAsync } from '../../store/auth/authSlice';

const initState = {
    memberLoginId: "",
    memberPassword: "",
    passwordConfirm: "",
    memberName: "",
    memberAddress: "",
    memberEmail: "",
    memberPhoneNumber: "",
    memberBirthDate: "",
    memberGender: "Male"
}
// 정규식 정의 (아이디, 비밀번호, 이메일 유효성 검사)
const idRegex = /^[a-zA-Z0-9]{7,16}$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,16}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/;

const RegisterPageComponent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector(state => state.auth);

    // 단계 관리
    const [step, setStep] = useState(1);

    // 회원정보 상태
    const [registerInfo, setRegisterInfo] = useState(initState);

    // 약관 동의 상태
    const [agreements, setAgreements] = useState({
        all: false,
        terms: false,
        privacy: false,
        marketing: false
    });

    // 🔥 [추가] 중복 확인 상태 (true: 사용 가능 확인됨, false: 미확인)
    const [duplicateCheck, setDuplicateCheck] = useState({
        id: false,
        email: false
    });

    const [validationErrors, setValidationErrors] = useState({ // 유효성검사 에러메세지 처리
        memberLoginId: "",
        memberPassword: "",
        passwordConfirm: "",
        memberEmail: ""
    });

    const [emailVerification, setEmailVerification] = useState({
        sent: false,
        verified: false,
        code: ""
    })

    const [detailAddress, setDetailAddress] = useState("");


    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: (addressData) => {
                setRegisterInfo((prev) => ({
                    ...prev,
                    memberAddress: addressData.address
                }));
                setDetailAddress("")
            },
        }).open();
    };

    const handleSendMail = async () => {
        if (!registerInfo.memberEmail) {
            alert("이메일을 입력해주세요.")
            return;
        }
        if (!emailRegex.test(registerInfo.memberEmail)) {
            alert("올바른 이메일 형식이 아닙니다.")
            return;
        }
        try {
            await sendJoinMail(registerInfo.memberEmail)
            alert("인증번호가 발송되었습니다. 메일함을 확인해주세요.")
            setEmailVerification(prev => ({ ...prev, sent: true, verified: false }))
        } catch (error) {
            alert(error.response?.data || "메일 전송에 실패했습니다.")
        }
    }

    const handleVerifyCode = async () => {
        if (!emailVerification.code) {
            alert("인증번호를 입력해주세요.")
            return;
        }
        try {
            await verifyJoinCode({
                memberEmail: registerInfo.memberEmail,
                authCode: emailVerification.code
            })
            alert("이메일 인증이 완료되었습니다.")
            setEmailVerification(prev => ({ ...prev, verified: true }))
            setDuplicateCheck(prev => ({ ...prev, email: true }));
        } catch (error) {
            alert("인증번호가 일치하지 않습니다.");
        }
    }

    // --- [Step 1] 약관 동의 로직 ---
    const handleAgreementChange = (e) => {
        const { name, checked } = e.target;
        const nextAgreements = { ...agreements, [name]: checked };
        if (nextAgreements.terms && nextAgreements.privacy && nextAgreements.marketing) {
            nextAgreements.all = true;
        } else {
            nextAgreements.all = false;
        }
        setAgreements(nextAgreements);
    };

    const handleAllAgreementChange = (e) => {
        const { checked } = e.target;
        setAgreements({
            all: checked,
            terms: checked,
            privacy: checked,
            marketing: checked
        });
    };

    const handleNextStep = () => {
        if (!agreements.terms || !agreements.privacy) {
            alert("필수 약관에 동의해주셔야 회원가입이 가능합니다.");
            return;
        }
        setStep(2);
        window.scrollTo(0, 0);
    };

    // --- [Step 2] 정보 입력 및 중복 체크 로직 ---

    // 🔥 [추가] 아이디 중복 확인
    const handleIdCheck = async () => {
        if (!registerInfo.memberLoginId) {
            alert("아이디를 입력해주세요.");
            return;
        }
        try {
            // 백엔드 API 호출 (true: 중복, false: 사용가능 가정)
            const isDuplicate = await duplicateId(registerInfo.memberLoginId);

            if (isDuplicate) {
                alert("이미 사용 중인 아이디입니다.");
                setDuplicateCheck(prev => ({ ...prev, id: false }));
                setRegisterInfo(prev => ({ ...prev, memberLoginId: "" })); // 입력창 비우기
            } else {
                alert("사용 가능한 아이디입니다.");
                setDuplicateCheck(prev => ({ ...prev, id: true }));
            }
        } catch (error) {
            console.error(error);
            alert("중복 확인 중 오류가 발생했습니다.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target
        setRegisterInfo({ ...registerInfo, [name]: value })

        if (name === "memberLoginId") {
            setDuplicateCheck(prev => ({ ...prev, id: false }));
        }
        if (name === "memberEmail") {
            setDuplicateCheck(prev => ({ ...prev, email: false }));
        }
        let errorMsg = ""
        if (name == "memberLoginId") {
            if (!idRegex.test(value)) {
                errorMsg = "아이디는 영문, 숫자 포함 7~16자여야 합니다."
            }
        } else if (name == "memberPassword") {
            if (!passwordRegex.test(value)) {
                errorMsg = "비밀번호는 영문, 숫자, 특수문자 포함 8~16자여야 합니다."
            }
        } else if (name == "passwordConfirm") {
            if (value != registerInfo.memberPassword) {
                errorMsg = "비밀번호가 일치하지 않습니다."
            }
        } else if (name == "memberEmail") {
            if (!emailRegex.test(value)) {
                errorMsg = "이메일이 올바른 형식이 아닙니다."
            }
        }
        setValidationErrors(prev => ({ ...prev, [name]: errorMsg }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // 🔥 [추가] 중복 확인 여부 검사
        if (!duplicateCheck.id) {
            alert("아이디 중복 확인을 해주세요.");
            return;
        }
        if (!duplicateCheck.email) {
            alert("이메일 중복 확인을 해주세요.");
            return;
        }

        if (registerInfo.memberPassword !== registerInfo.passwordConfirm) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (!emailVerification.verified) {
            alert("이메일 인증을 완료해주세요.");
            return;
        }
        const finalMemberInfo = {
            ...registerInfo,
            // 예: "서울시 강남구" + " " + "101호" -> "서울시 강남구 101호"
            memberAddress: `${registerInfo.memberAddress} ${detailAddress}`.trim()
        };

        try {
            const result = await dispatch(registerAsync(finalMemberInfo));
            if (registerAsync.fulfilled.match(result)) {
                alert("회원가입에 성공했습니다. 로그인 페이지로 이동합니다.");
                navigate("/auth/login");
            } else {
                alert(result.payload || "입력 내용을 확인해주세요.");
            }
        } catch (error) {
            console.error("회원가입 에러", error)
            alert("오류가 발생했습니다.");
        }
    }
    const today = new Date().toISOString().split("T")[0];

    return (
        <div className="flex flex-col items-center min-h-screen bg-white pt-10 md:pt-20 pb-20">

            {/* 상단 헤더 */}
            <div className="w-full max-w-4xl px-4 mb-8">
                <div className="flex justify-between items-end border-b-2 border-gray-300 pb-4 mb-6">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">회원가입</h1>
                    <div className="text-gray-500 text-sm font-medium flex items-center">
                        <span className={step === 1 ? "text-[#2b4075] font-bold" : ""}>01 약관동의</span>
                        <span className="mx-2 text-gray-300">&gt;</span>
                        <span className={step === 2 ? "text-[#2b4075] font-bold" : ""}>02 정보입력</span>
                    </div>
                </div>
                <div className="text-center text-sm text-gray-600 mb-4 leading-relaxed">
                    {step === 1 && "서비스 이용을 위해 약관에 동의해주세요."}
                    {step === 2 && "회원 정보를 입력해주세요."}
                </div>
            </div>

            <div className="w-full max-w-2xl border border-gray-300 bg-white p-8 md:p-12 shadow-sm">

                {/* --- STEP 1: 약관 동의 화면 --- */}
                {step === 1 && (
                    <div className="space-y-8 px-2 md:px-6">
                        <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">이용약관 동의</h2>

                        <div className="border border-gray-300 p-5 bg-gray-50 rounded-md">
                            <label className="flex items-center cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="all"
                                    checked={agreements.all}
                                    onChange={handleAllAgreementChange}
                                    className="w-5 h-5 accent-[#2b4075]"
                                />
                                <span className="ml-3 font-bold text-gray-900 text-lg">전체 약관에 동의합니다.</span>
                            </label>
                            <p className="ml-8 mt-1 text-xs text-gray-500">
                                필수 약관 및 선택 약관에 대한 동의를 포함합니다.
                            </p>
                        </div>

                        <hr className="border-gray-200" />

                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="terms"
                                    checked={agreements.terms}
                                    onChange={handleAgreementChange}
                                    className="w-4 h-4 accent-[#2b4075]"
                                />
                                <span className="ml-2 text-sm text-gray-800 font-medium"><span className="text-[#2b4075]">(필수)</span> 서비스 이용약관 동의</span>
                            </label>
                            <div className="h-32 overflow-y-auto border border-gray-200 p-3 text-xs text-gray-500 bg-white rounded leading-relaxed scrollbar-thin scrollbar-thumb-gray-300">
                                (약관 내용 생략...)
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="privacy"
                                    checked={agreements.privacy}
                                    onChange={handleAgreementChange}
                                    className="w-4 h-4 accent-[#2b4075]"
                                />
                                <span className="ml-2 text-sm text-gray-800 font-medium"><span className="text-[#2b4075]">(필수)</span> 개인정보 수집 및 이용 동의</span>
                            </label>
                            <div className="h-32 overflow-y-auto border border-gray-200 p-3 text-xs text-gray-500 bg-white rounded leading-relaxed scrollbar-thin scrollbar-thumb-gray-300">
                                (약관 내용 생략...)
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    name="marketing"
                                    checked={agreements.marketing}
                                    onChange={handleAgreementChange}
                                    className="w-4 h-4 accent-[#2b4075]"
                                />
                                <span className="ml-2 text-sm text-gray-800 font-medium">(선택) 마케팅 정보 수신 동의</span>
                            </label>
                            <div className="h-24 overflow-y-auto border border-gray-200 p-3 text-xs text-gray-500 bg-white rounded leading-relaxed scrollbar-thin scrollbar-thumb-gray-300">
                                (약관 내용 생략...)
                            </div>
                        </div>

                        <button
                            onClick={handleNextStep}
                            className="w-full bg-[#2b4075] hover:bg-[#1e3161] text-white font-bold text-lg py-3 mt-6 transition-colors shadow-sm rounded-sm"
                        >
                            다음 단계로
                        </button>
                    </div>
                )}


                {/* --- STEP 2: 정보 입력 화면 --- */}
                {step === 2 && (
                    <>
                        <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">정보 입력</h2>
                        <form className="flex flex-col space-y-6 px-2 md:px-6" onSubmit={handleSubmit}>

                            {/* 🔥 아이디 (중복 확인 버튼 추가됨) */}
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                </span>
                                <input
                                    name="memberLoginId"
                                    value={registerInfo.memberLoginId}
                                    onChange={handleChange}
                                    placeholder="아이디"
                                    className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleIdCheck}
                                    disabled={duplicateCheck.id}
                                    className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${duplicateCheck.id
                                        ? "bg-green-100 text-green-700 cursor-default"
                                        : "bg-[#2b4075] text-white hover:bg-[#1e3161]"
                                        }`}
                                >
                                    {duplicateCheck.id ? "확인완료" : "중복확인"}
                                </button>
                            </div>
                            {validationErrors.memberLoginId && (<p className="text-red-500 text-xs mt-1 ml-10">{validationErrors.memberLoginId}</p>)}

                            {/* 비밀번호 */}
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                                </span>
                                <input
                                    name="memberPassword"
                                    type="password"
                                    value={registerInfo.memberPassword}
                                    onChange={handleChange}
                                    placeholder="비밀번호"
                                    className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    required
                                />
                            </div>
                            {validationErrors.memberPassword && (<p className="text-red-500 text-xs mt-1 ml-10">{validationErrors.memberPassword}</p>)}
                            {/* 비밀번호 확인 */}
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </span>
                                <input
                                    name="passwordConfirm"
                                    type="password"
                                    value={registerInfo.passwordConfirm}
                                    onChange={handleChange}
                                    placeholder="비밀번호 확인"
                                    className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    required
                                />
                            </div>
                            {validationErrors.passwordConfirm && (<p className="text-red-500 text-xs mt-1 ml-10">{validationErrors.passwordConfirm}</p>)}
                            {/* 이름 */}
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0c0 .884.896 1.643 2 1.643 2 0 2-.76 2-1.643" /></svg>
                                </span>
                                <input
                                    name="memberName"
                                    value={registerInfo.memberName}
                                    onChange={handleChange}
                                    placeholder="이름"
                                    className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    required
                                />
                            </div>

                            <div className="flex flex-col border-b border-gray-300 py-2">
                                {/* 1. 이메일 입력칸 + 전송 버튼 */}
                                <div className="flex items-center">
                                    <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </span>
                                    <input
                                        name="memberEmail"
                                        type="email"
                                        value={registerInfo.memberEmail}
                                        onChange={handleChange}
                                        placeholder="이메일"
                                        // 인증 완료되면 수정 못하게 막음
                                        disabled={emailVerification.verified}
                                        className={`flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none ${emailVerification.verified ? "text-gray-400" : ""}`}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={handleSendMail}
                                        // 인증 완료됐거나, 이미 전송했으면(재전송 방지) 버튼 비활성
                                        disabled={emailVerification.verified}
                                        className={`text-xs font-bold px-3 py-1.5 rounded transition-colors ${emailVerification.verified
                                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            : "bg-[#2b4075] text-white hover:bg-[#1e3161]"
                                            }`}
                                    >
                                        {emailVerification.verified ? "인증완료" : "인증번호 전송"}
                                    </button>
                                </div>

                                {/* 에러 메시지 (정규식 틀렸을 때) */}
                                {validationErrors.memberEmail && (
                                    <p className="text-red-500 text-xs mt-1 ml-10">{validationErrors.memberEmail}</p>
                                )}

                                {/* 2. 인증번호 입력칸 (전송은 했는데 아직 인증 안 됐을 때만 보임) */}
                                {emailVerification.sent && !emailVerification.verified && (
                                    <div className="flex items-center mt-3 pl-10 gap-2">
                                        <input
                                            type="text"
                                            placeholder="인증번호 6자리"
                                            value={emailVerification.code}
                                            onChange={(e) => setEmailVerification({ ...emailVerification, code: e.target.value })}
                                            className="flex-1 border border-gray-300 p-2 rounded text-sm focus:outline-none focus:border-[#2b4075]"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleVerifyCode}
                                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-xs whitespace-nowrap"
                                        >
                                            확인
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* 주소 입력 부분 */}
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                    {/* 아이콘 (집 모양) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                </span>
                                <input
                                    name="memberAddress"
                                    value={registerInfo.memberAddress}
                                    placeholder="주소 (클릭하여 검색)"
                                    readOnly // 🔥 직접 타이핑 못하게 막음 (오타 방지)
                                    onClick={handleAddressSearch} // 🔥 클릭하면 검색창 열림
                                    className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none cursor-pointer"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={handleAddressSearch} // 🔥 버튼 눌러도 검색창 열림
                                    className="bg-[#2b4075] hover:bg-[#1e3161] text-white text-xs font-bold px-3 py-1.5 rounded transition-colors"
                                >
                                    주소검색
                                </button>
                            </div>
                            <div className="flex items-center border-b border-gray-300 py-2">
                                 <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                    {/* 아이콘 (집 모양) */}
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                </span>
                                <input
                                    name="detailAddress"
                                    value={detailAddress}
                                    placeholder="상세주소"
                                    onChange={(e)=>setDetailAddress(e.target.value)}
                                    className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none cursor-pointer"
                                />
                            </div>

                            {/* 전화번호 */}
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </span>
                                <input
                                    name="memberPhoneNumber"
                                    type="tel"
                                    value={registerInfo.memberPhoneNumber}
                                    onChange={handleChange}
                                    placeholder="전화번호 (010-1234-5678)"
                                    className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    required
                                />
                            </div>

                            {/* 성별 */}
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                </span>
                                <select
                                    name="memberGender"
                                    value={registerInfo.memberGender}
                                    onChange={handleChange}
                                    className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none cursor-pointer"
                                    required
                                >
                                    <option value="Male">남성</option>
                                    <option value="Female">여성</option>
                                </select>
                            </div>

                            {/* 생년월일 */}
                            <div className="flex items-center border-b border-gray-300 py-2">
                                <span className="text-gray-400 w-8 mr-2 flex justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </span>
                                <input
                                    name="memberBirthDate"
                                    type="date"
                                    value={registerInfo.memberBirthDate}
                                    onChange={handleChange}
                                    max={today}
                                    className="flex-1 appearance-none bg-transparent border-none text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                                    required
                                />
                            </div>

                            {/* 에러 메시지 */}
                            {error && (
                                <div className="text-red-600 text-sm text-center p-2 bg-red-50 rounded-md">
                                    {error.message || '회원가입에 실패했습니다.'}
                                </div>
                            )}

                            {/* 버튼 영역 */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="flex-1 bg-white border border-gray-300 text-gray-700 font-bold py-3 hover:bg-gray-50 transition-colors shadow-sm rounded-sm"
                                >
                                    이전
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-[2] bg-[#2b4075] hover:bg-[#1e3161] text-white font-bold text-lg py-3 transition-colors shadow-sm disabled:bg-gray-400 rounded-sm"
                                >
                                    {isLoading ? '처리 중...' : '회원가입 완료'}
                                </button>
                            </div>
                        </form>
                    </>
                )}

            </div>
        </div>
    )
}

export default RegisterPageComponent;