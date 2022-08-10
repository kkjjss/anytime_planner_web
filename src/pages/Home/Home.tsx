import React, { useRef, useState } from "react";
import "./Home.scss";
import { databaseInstance, database } from "firebaseConfig";
import { yyyymmdd } from "utils/dateFormat";
import ScheduleEditor from "componenets/modals/ScheduleEditor/ScheduleEditor";

export default function Home() {
    const [editorOpen, setEditorOpen] = useState(false);

    const outModal = useRef<HTMLDivElement | null>(null);

    const toggleEditor = () => {
        setEditorOpen(!editorOpen);
    };

    return (
        <div className="Home">
            {editorOpen ? <ScheduleEditor editorOpen={editorOpen} toggleEditor={toggleEditor} outModal={outModal} /> : <></>}
            <button className="join" onClick={toggleEditor}>
                회원가입
            </button>
        </div>
    );
}
