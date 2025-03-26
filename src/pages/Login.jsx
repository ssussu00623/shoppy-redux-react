import React, { useState, useRef, useContext, useEffect } from 'react';
import '../styles/login.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { validateLogin } from '../utils/funcValidate.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext.js';
import { getLogin, getLoginReset } from '../services/authApi.js';
import {useSelector, useDispatch} from 'react-redux'; 

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.login.isLoggedIn);
    const isError = useSelector(state=> state.login.isError)
    // const로 선언한 값들은 자바스크립트의 호이스팅을 지켜줘야함. 변수형태로 선언된 것들은 위에서부터 순서대로 생성되기 때문에...
    // 로그인 성공/실패값을 보내는 current값을 정상적으로 보내기 위해 위에서 선언해준다. 
    const refs = {
        "idRef": useRef(null),
        "pwdRef": useRef(null)
    }
    const msgRefs = {
        "msgRef": useRef(null)
    }
    
    const [formData, setFormData] = useState({ 'id': '', 'pwd': '' });

    //로그인 실패 안내
    useEffect (()=>{
        if(isError){
            alert("로그인 실패\n아이디와 비밀번호가 일치하지 않습니다.")
            navigate("/login")
            refs.idRef.current.value=""; // 이 값보다 먼저 const refs가 위에 있어야한다. 
            refs.pwdRef.current.value="";
            // isError를 초기화하지 않으면 틀린 아이디-비번으로 로그인했을 때 alert가 뜨지 않는다.
            // isError 리셋
            dispatch(getLoginReset());
            // 이 로그인 값을 authSlice에 보내야하는데 값은 authApi에 있고 이 동작의 트리거는 Login에 있는 것.
            // 따라서 빈 값인 껍데기를 보낸다. 단방향이므로 돌아오지 않으니 주의
        }
    }, [isError]);

    //로그인 성공 안내
    useEffect (()=>{
        if(isLoggedIn){
            alert("로그인 성공\n홈화면으로 이동합니다.")
            navigate("/") 
        } 
    }, [isLoggedIn]);

    // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    /** form 데이터 입력 함수 */
    const handleChangeForm = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    /** Submit 함수 */
    const handleLoginSubmit = (event) => {
        event.preventDefault();
        if (validateLogin(refs, msgRefs)) {
            dispatch(getLogin(formData));
            //slice까지 여기부터 데이터가 넘어가는 시작점 ! 

            //리액트 ---> 노드서버(express) 데이터 전송 로그인
            // axios
            //     .post('http://43.201.27.254:9000/member/login', formData)
            //     .then(res => {
            //         // console.log('res.data-->', res.data) 
            //         if(res.data.result_rows === 1) {
            //             alert("로그인 성공!!");
            //             localStorage.setItem("token", res.data.token);
            //             localStorage.setItem("user_id", formData.id);                        
            //             setIsLoggedIn(true);
            //             navigate('/');
            //         } else {
            //             alert("로그인 실패!!");
            //         }
            //     })
            //     .catch(error => {
            //         alert("로그인 실패!!");
            //         console.log(error);
            //     });    

        }
    }

    return (
        <div className="content">
            <h1 className="center-title">LOGIN</h1>

            <form className="login-form" onSubmit={handleLoginSubmit}>
                <ul>
                    <li>
                        <p className="login-form-message">✔ 아이디와 비밀번호를 입력하신 후, 로그인을 진행해주세요.</p>
                    </li>
                    <li>
                        <div className="login-form-input">
                            <span className="login-form-input-icons"><FaUser /></span>
                            <input type="text"
                                name="id"
                                id="id"
                                ref={refs.idRef}
                                onChange={handleChangeForm}
                                placeholder="아이디를 입력해주세요" />
                        </div>
                        <p id="error-msg-id"></p>
                    </li>
                    <li>
                        <div className="login-form-input">
                            <span className="login-form-input-icons"><FaLock /></span>
                            <input type="password"
                                name="pwd"
                                id="pwd"
                                ref={refs.pwdRef}
                                onChange={handleChangeForm}
                                placeholder="패스워드를 입력해주세요" />
                        </div>
                        <p id="error-msg-pwd"></p>
                    </li>
                    <li><span style={{ fontSize: "0.7em", color: "white" }}
                        ref={msgRefs.msgRef}>아이디 또는 패스워드를 입력해주세요</span></li>
                    <li>
                        <button type="submit" className="login-button">로그인</button>
                    </li>
                    <li>
                        <div className="login-form-checkbox">
                            <input type="checkbox" name="status" />
                            <label for="">아이디 저장</label>
                        </div>
                        <div>
                            <a href="#">아이디 찾기</a>
                            <span>&gt;</span>
                            <a href="#">패스워드 찾기</a>
                            <span>&gt;</span>
                        </div>
                    </li>
                    <li>
                        <button type="button" className="login-button-naver">네이버 로그인</button>
                    </li>
                </ul>
                <div className="loginplus-image">
                    <img src="https://adimg.cgv.co.kr//images/202206/loginplus/350x300.png" alt="" />
                </div>
            </form>
        </div>
    );
}

