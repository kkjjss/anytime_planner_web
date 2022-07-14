import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./SignUp.scss";
import { authService } from "firebaseConfig";
import { async } from "@firebase/util";

export function SignUp(props: any) {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { signUp, toggleSignUp, outModal } = props;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordCheck, setPasswordCheck] = useState("");
    // const [nickname, setNickname] = useState("");

    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const onChangePasswordCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordCheck(event.target.value);
    };

    // const onChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setNickname(event.target.value);
    // };

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        //Event 인터페이스의 preventDefault() 메서드는 어떤 이벤트를 명시적으로 처리하지 않은 경우, 해당 이벤트에 대한 사용자 에이전트의 기본 동작을 실행하지 않도록 지정합니다.
        event.preventDefault();

        if (password !== passwordCheck) {
            alert("비밀번호를 다시 확인해 주세요");
        } else {
            try {
                //계정 생성
                const data = await createUserWithEmailAndPassword(authService, email, password);

                console.log(data);

                if (data) {
                    alert("회원가입이 완료되었습니다");
                    closeModal();
                }
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
    };

    const closeModal = () => {
        toggleSignUp();
    };

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div
            className={signUp ? "openModal modal" : "modal"}
            ref={outModal}
            onClick={(e) => {
                if (outModal.current === e.target) {
                    closeModal();
                }
            }}
        >
            <section>
                <header>
                    <button className="close" onClick={closeModal}>
                        &times; {/* 곱셈기호 x */}
                    </button>
                </header>
                <main>
                    <div className="signupbox">
                        <form onSubmit={onSubmit}>
                            <div className="title">회원가입</div>
                            <div className="inputbox">
                                <input className="email" type="text" placeholder="이메일" required value={email} onChange={onChangeEmail} />
                            </div>
                            <div className="inputbox">
                                <input className="password" type="password" placeholder="비밀번호" required value={password} onChange={onChangePassword} />
                            </div>
                            <div className="inputbox">
                                <input className="passwordCheck" type="password" placeholder="비밀번호 확인" required value={passwordCheck} onChange={onChangePasswordCheck} />
                            </div>
                            {/* <div className="inputbox">
                                <input className="nickname" type="text" placeholder="별명" required value={nickname} onChange={onChangeNickname} />
                            </div> */}
                            <button>
                                <input type="submit" value="회원가입" />
                            </button>
                        </form>
                    </div>
                </main>
            </section>
        </div>
    );
}

export default React.memo(SignUp);
