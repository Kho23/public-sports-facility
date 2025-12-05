import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getLessonStat } from '../../../api/statisticApi';

// 색상 팔레트
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#ec4899'];

// 한글 매핑
const CATEGORY_MAP = {
    GOLF: '골프',
    HEALTH: '헬스',
    SWIMMING: '수영',
    POOL: '수영',
    FUTSAL: '풋살',
    DANCE: '무용',
};

const LessonStatPageComponent = () => {
    const [chartData, setChartData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);

    useEffect(() => {
        const getStat = async () => {
            try {
                const res = await getLessonStat();
                if (res && res.stats) {
                    setTotalCount(res.totalCount);
                    const processed = processData(res.stats);
                    setChartData(processed);
                }
            } catch (error) {
                console.log("에러발생", error);
            }
        }; 
        getStat();
    }, [])

    const processData = (data) => {
        // 데이터가 많은 순서대로 정렬하면 보기가 더 좋습니다
        return data.map(item => ({
            name: CATEGORY_MAP[item.category] || item.category,
            value: item.count
        })).sort((a, b) => b.value - a.value); // 내림차순 정렬
    };

   const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            // payload[0].value는 건수입니다.
            // totalCount는 상위 스코프에 있는 전체 합계입니다.
            // 직접 계산: (현재값 / 전체값) * 100
            const currentValue = payload[0].value;
            const percentage = totalCount > 0 ? ((currentValue / totalCount) * 100).toFixed(1) : 0;

            return (
                <div className="bg-white p-3 border border-gray-200 shadow-md rounded-lg text-sm">
                    <p className="font-bold text-gray-700 mb-1">{`${payload[0].name}`}</p>
                    <p className="text-blue-600 font-semibold">
                        {`${currentValue}건`}
                    </p>
                    <p className="text-gray-400">
                        {`(${percentage}%)`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full p-8 bg-white rounded-xl shadow-lg mt-4 border border-gray-100">
            {/* 타이틀 영역 */}
            <div className="flex justify-between items-end border-b border-gray-200 pb-4 mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">종목별 인기 현황</h2>
                    <p className="text-gray-500 text-sm mt-1">카테고리별 수강신청 비율 통계</p>
                </div>
                <div className="text-right">
                    <span className="text-gray-500 text-sm">총 신청 건수</span>
                    <p className="text-3xl font-extrabold text-blue-600">{totalCount}<span className="text-base font-normal text-gray-500 ml-1">건</span></p>
                </div>
            </div>

            {/* 컨텐츠 영역: 차트 + 리스트 */}
            <div className="flex flex-col lg:flex-row gap-8 items-center">
                
                {/* 1. 차트 영역 */}
                <div className="w-full lg:w-1/2 h-[350px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={chartData}
                                cx="50%"
                                cy="50%"
                                innerRadius={80} // 도넛 모양
                                outerRadius={140}
                                paddingAngle={2} // 조각 사이 간격
                                dataKey="value"
                            >
                                {chartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            {/* Legend는 커스텀 리스트로 대체하여 숨김 */}
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* 2. 상세 데이터 리스트 영역 */}
                <div className="w-full lg:w-1/2">
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">상세 통계</h3>
                        <ul className="space-y-3">
                            {chartData.map((entry, index) => (
                                <li key={index} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="flex items-center gap-3">
                                        {/* 색상 표시 원 */}
                                        <div 
                                            className="w-4 h-4 rounded-full shadow-sm" 
                                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                        ></div>
                                        <span className="font-bold text-gray-700">{entry.name}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-6">
                                        {/* 건수 */}
                                        <span className="font-extrabold text-gray-800 text-lg">
                                            {entry.value}
                                            <span className="text-xs font-normal text-gray-400 ml-1">건</span>
                                        </span>
                                        {/* 비율 */}
                                        <span className="text-sm font-medium text-gray-500 w-12 text-right">
                                            {totalCount > 0 ? ((entry.value / totalCount) * 100).toFixed(1) : 0}%
                                        </span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        
                        {chartData.length === 0 && (
                            <div className="text-center py-10 text-gray-400 text-sm">
                                데이터가 없습니다.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LessonStatPageComponent;