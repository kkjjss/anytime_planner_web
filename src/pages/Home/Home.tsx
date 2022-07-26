import React, { useState } from "react";
import "./Home.scss";
import { databaseInstance, database } from "firebaseConfig";
import { yyyymmdd } from "utils/dateFormat";

export default function Home() {
    const [text, setText] = useState("");
    const [type, setType] = useState("0");
    const [startdate, setStartdate] = useState(yyyymmdd(new Date()));
    const [enddate, setEnddate] = useState(yyyymmdd(new Date()));

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        databaseInstance.addDoc(databaseInstance.collection(database, "text"), { text: text }).then(() => alert("저장완료"));
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.currentTarget.name) {
            case "title":
                setText(event.target.value);
                break;
            case "type":
                setType(event.target.value);
                break;
            case "startdate":
                setStartdate(event.target.value);
                if (new Date(enddate) < new Date(event.target.value)) setEnddate(event.target.value);
                break;
            case "enddate":
                setEnddate(event.target.value);
                if (new Date(event.target.value) < new Date(startdate)) setEnddate(startdate);
                break;
            default:
                break;
        }
    };

    return (
        <div className="Home">
            <form onSubmit={onSubmit}>
                <div className="title">
                    <span>제목</span>
                    <input name="title" type="text" value={text} onChange={onChange} />
                </div>
                <div className="type">
                    <span>타입</span>
                    <select name="type" id="type" value={type} onChange={onChange}>
                        <option value="0">한번만</option>
                        <option value="1">주기마다</option>
                        <option value="2">직접지정</option>
                    </select>
                </div>
                {type === "0" && (
                    <div>
                        <div className="start">
                            <span>시작일</span>
                            <input type="date" name="startdate" value={startdate} onChange={onChange} />
                        </div>
                        <div className="end">
                            <span>종료일</span>
                            <input type="date" name="enddate" value={enddate} onChange={onChange} />
                        </div>
                    </div>
                )}
                {type === "1" && (
                    <div>
                        <div className="period">
                            <span>주기</span>
                            <select name="period">
                                <option value="day">매일</option>
                                <option value="week">매주</option>
                                <option value="month">매달</option>
                                <option value="year">매년</option>
                            </select>
                        </div>
                    </div>
                )}
                <input type="submit" value="send" />
            </form>
        </div>
    );
}
