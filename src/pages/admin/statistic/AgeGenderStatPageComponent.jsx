import React, { useEffect, useState } from 'react'
// 1. 차트 라이브러리 가져오기
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getAgeGenderStat } from '../../../api/statisticApi';
// API 함수 import (경로 확인!)

const AgeGenderStatPageComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [totalCount, setTotalCount] = useState(0); // 총 인원수도 보여주면 좋음

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. API 호출
        const res = await getAgeGenderStat(); 
        console.log("서버 응답 데이터:", res); // { stats: [...], totalCount: 3 }
        if (res && res.stats) {
            const rawData = res.stats;
            setTotalCount(res.totalCount); // 총 인원수 저장

            // 3. 데이터 가공
            const processed = processData(rawData);
            setChartData(processed);
        }

      } catch (error) {
        console.log("에러발생 ", error);
      }
    }

    fetchData(); 
  }, [])

  // 데이터 변환 함수 (수정됨)
  const processData = (data) => {
    const result = {};
    data.forEach(item => {
        // 그룹(연령대) 초기화
        if (!result[item.ageGroup]) {
            result[item.ageGroup] = { name: item.ageGroup, 남성: 0, 여성: 0 };
        }
        
        // [수정됨] 'Male' / 'Female' 체크
        // 대소문자 구분 없이 체크하거나, 백엔드 값 그대로 쓰기
        if (item.gender === 'Male' || item.gender === 'M') {
            result[item.ageGroup].남성 = item.count;
        } else if (item.gender === 'Female' || item.gender === 'F') {
            result[item.ageGroup].여성 = item.count;
        }
    });
    return Object.values(result);
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg mt-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">회원 연령대 및 성별 통계</h2>
        <p className="text-gray-500 mt-2">총 회원수: <span className="font-bold text-blue-600">{totalCount}명</span></p>
      </div>
      
      {/* 그래프 영역 */}
      <div style={{ width: '100%', height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} /> {/* 사람은 소수점이 없으니 정수만 표시 */}
                <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                {/* stackId="a"를 넣으면 누적 그래프가 됩니다 */}
                <Bar dataKey="남성" stackId="a" fill="#3b82f6" name="남성" radius={[0, 0, 4, 4]} />
                <Bar dataKey="여성" stackId="a" fill="#ec4899" name="여성" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default AgeGenderStatPageComponent