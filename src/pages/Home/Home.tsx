import React, { useEffect, useRef, useState } from "react";
import "./Home.scss";
import { databaseInstance, database } from "firebaseConfig";
import { yyyymmdd } from "utils/dateFormat";
import ScheduleForm from "componenets/modals/ScheduleForm/ScheduleForm";

export default function Home() {
    const [editorOpen, setEditorOpen] = useState(false);
    const [emtpy, setEmpty] = useState(true);

    const outModal = useRef<HTMLDivElement | null>(null);

    const toggleEditor = () => {
        setEditorOpen(!editorOpen);
    };

    const getAllSchedule = async () => {
        const docSnap = await databaseInstance.getDocs(databaseInstance.collection(database, "schedules"));
        setEmpty(docSnap.empty);
        console.log(emtpy);
    };

    useEffect(() => {
        getAllSchedule();
    }, [emtpy]);

    return (
        <div className="Home">
            {/* 일정 에디터 */}
            {editorOpen ? <ScheduleForm editorOpen={editorOpen} toggleEditor={toggleEditor} outModal={outModal} /> : <></>}

            {emtpy ? (
                <div className="container">
                    <div className="text">
                        아직 등록된 일정이 없습니다
                        <br />
                        일정을 추가하고 이용해 보세요!
                    </div>
                    <button className="join" onClick={toggleEditor}>
                        일정 추가
                    </button>
                </div>
            ) : (
                <></>
            )}
        </div>
    );
}
