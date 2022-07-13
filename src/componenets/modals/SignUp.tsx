import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useRef } from "react";
import "./SignUp.scss";

export default function SignUp(props: any) {
    // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
    const { open, close, header, onClickSignUp, outContent } = props;

    const closeModal = () => {
        onClickSignUp();
    };

    // createUserWithEmailAndPassword

    return (
        // 모달이 열릴때 openModal 클래스가 생성된다.
        <div
            className={open ? "openModal modal" : "modal"}
            ref={outContent}
            onClick={(e) => {
                if (outContent.current === e.target) {
                    closeModal();
                }
            }}
        >
            {open ? (
                <section>
                    <header>
                        {header}
                        <button className="close" onClick={closeModal}>
                            &times;
                        </button>
                    </header>
                    <main>{props.children}</main>
                    <footer>
                        <button className="close" onClick={closeModal}>
                            close
                        </button>
                    </footer>
                </section>
            ) : null}
        </div>
    );
}
