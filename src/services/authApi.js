import { setIsLoggedIn, setIsLogout, setLoginReset } from "../features/auth/authSlice.js";
import { axiosPost } from "./api.js";

export const getLoginReset =()=>(dispatch)=>{
    dispatch(setLoginReset());
}

export const getLogout = () => (dispatch) => {
    localStorage.clear()
    dispatch(setIsLogout());
}

export const getLogin = (formData) => async (dispatch) => {

    //리액트 ---> 노드서버(express) 데이터 전송 로그인
    const url = 'http://43.201.27.254:9000/member/login'
    const data = formData;
    
    const loginResult = await axiosPost({url, data})
    const result_rows = loginResult.result_rows;

    if (result_rows) { //성공
        alert("로그인 성공!!");
        localStorage.setItem("token", loginResult.token);
        localStorage.setItem("user_id", formData.id);
        dispatch(setIsLoggedIn({ result_rows })); // 리듀스(슬라이스)의 함수 호출
    } else { //실패
        dispatch(setIsLoggedIn({result_rows})); //  리듀스(슬라이스)의 함수 호출
    }
}
// 단방향이라 리턴을 줄 수는 있지만 의미없다.