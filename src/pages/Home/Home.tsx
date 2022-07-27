import React, { useState } from "react";
import "./Home.scss";
import { databaseInstance, database } from "firebaseConfig";
import { yyyymmdd } from "utils/dateFormat";

export default function Home() {
    const [text, setText] = useState("");
    const [type, setType] = useState("0");
    const [startdate, setStartdate] = useState(yyyymmdd(new Date()));
    const [enddate, setEnddate] = useState(yyyymmdd(new Date()));
    const [period, setPeriod] = useState("");
    const [daytype, setDaytype] = useState("");

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
                // if (new Date(event.target.value) < new Date(startdate)) setEnddate(startdate);
                break;
            case "period":
                setPeriod(event.target.value);
                break;
            case "daytype":
                setDaytype(event.target.value);
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
                            <input type="date" name="enddate" value={enddate} min={startdate} onChange={onChange} />
                        </div>
                    </div>
                )}
                {type === "1" && (
                    <div>
                        <div className="period">
                            <span>주기</span>
                            <select name="period" value={period} onChange={onChange}>
                                <option value="day">매일</option>
                                <option value="week">매주</option>
                                <option value="month">매달</option>
                                <option value="year">매년</option>
                            </select>
                        </div>
                        {period === "week" && (
                            <div>
                                <div className="daytype">
                                    <select name="daytype" id="daytype" value={daytype} onChange={onChange}>
                                        <option value="oneday">지정</option>
                                        <option value="duration">기간</option>
                                    </select>
                                </div>
                                {daytype === "oneday" && (
                                    <div>
                                        <div className="mon">
                                            <input type="checkbox" name="mon" id="mon" />월
                                        </div>
                                        <div className="tue">
                                            <input type="checkbox" name="tue" id="tue" />화
                                        </div>
                                        <div className="wed">
                                            <input type="checkbox" name="wed" id="wed" />수
                                        </div>
                                        <div className="thur">
                                            <input type="checkbox" name="thur" id="thur" />목
                                        </div>
                                        <div className="fri">
                                            <input type="checkbox" name="fri" id="fri" />금
                                        </div>
                                        <div className="sat">
                                            <input type="checkbox" name="sat" id="sat" />토
                                        </div>
                                        <div className="sun">
                                            <input type="checkbox" name="sun" id="sun" />일
                                        </div>
                                    </div>
                                )}
                                {daytype === "duration" && (
                                    <div>
                                        <div className="start">
                                            <span>시작 요일</span>
                                            <select name="startday" id="startday">
                                                <option value="mon">월</option>
                                                <option value="tue">화</option>
                                                <option value="wed">수</option>
                                                <option value="thur">목</option>
                                                <option value="fri">금</option>
                                                <option value="sat">토</option>
                                                <option value="sun">일</option>
                                            </select>
                                        </div>
                                        <div className="end">
                                            <span>종료 요일</span>
                                            <select name="startday" id="startday">
                                                <option value="mon">월</option>
                                                <option value="tue">화</option>
                                                <option value="wed">수</option>
                                                <option value="thur">목</option>
                                                <option value="fri">금</option>
                                                <option value="sat">토</option>
                                                <option value="sun">일</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}
                <input type="submit" value="send" />
            </form>
        </div>
    );
}
