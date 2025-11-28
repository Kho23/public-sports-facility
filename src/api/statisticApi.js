import axios from "axios"

const API_HOST_URL = "http://localhost:8080/api/admin/stat"
export const getAgeGenderStat = async()=>{
    const res = await axios.get(`${API_HOST_URL}/ageGender`)
    console.log("연령대별 성비=",res.data)
    return res.data
}