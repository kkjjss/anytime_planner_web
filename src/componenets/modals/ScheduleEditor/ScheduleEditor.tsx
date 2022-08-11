import React, { useEffect, useState } from "react";
import "./ScheduleEditor.scss";
import { databaseInstance, database } from "firebaseConfig";
import { yyyymmdd } from "utils/dateFormat";

export default function Editor(props: any) {
    const { editorOpen, toggleEditor, outModal } = props;

    const [text, setText] = useState("");
    const [type, setType] = useState("0");
    const [startdate, setStartdate] = useState(yyyymmdd(new Date()));
    const [enddate, setEnddate] = useState(yyyymmdd(new Date()));
    const [period, setPeriod] = useState("");
    const [daytype, setDaytype] = useState("oneday");
    const [selectedDays, setSelectedDays] = useState({ mon: "", tue: "", wed: "", thur: "", fri: "", sat: "", sun: "" });
    const [monday, setMonday] = useState("selected");
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        databaseInstance.addDoc(databaseInstance.collection(database, "text"), { text: text }).then(() => alert("저장완료"));
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.currentTarget.name) {
            case "text":
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

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        switch (event.currentTarget.name) {
            case "oneday":
            case "duration":
                setDaytype(event.currentTarget.name);
                break;
            case "mon":
            case "tue":
            case "wed":
            case "thur":
            case "fri":
            case "sat":
            case "sun":
                setSelectedDays({ ...selectedDays, [event.currentTarget.name]: !selectedDays[event.currentTarget.name] ? "selected" : "" });
                break;
            default:
                break;
        }
    };

    const closeModal = () => {
        toggleEditor();
    };

    return (
        <div
            className={editorOpen ? "openModal modal" : "modal"}
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
                            <div className="text inputbox">
                                <input name="text" type="text" placeholder="제목" required value={text} onChange={onChange} />
                            </div>
                            <div>
                                <div className="start selectBox">
                                    <div>시작일</div>
                                    <input type="date" name="startdate" value={startdate} onChange={onChange} />
                                </div>
                                <div className="end selectBox">
                                    <div>종료일</div>
                                    <input type="date" name="enddate" value={enddate} min={startdate} onChange={onChange} />
                                </div>
                            </div>
                            <div className="type selectBox">
                                <div>반복</div>
                                <select name="type" id="type" value={type} onChange={onChange}>
                                    <option value="0">한번만</option>
                                    <option value="1">주기마다</option>
                                    <option value="2">직접지정</option>
                                </select>
                            </div>
                            {type === "1" && (
                                <div>
                                    <div className="period selectBox">
                                        <div>주기</div>
                                        <select name="period" value={period} onChange={onChange}>
                                            <option value="day">매일</option>
                                            <option value="week">매주</option>
                                            <option value="month">매달</option>
                                            <option value="year">매년</option>
                                        </select>
                                    </div>
                                    {period === "week" && (
                                        <div>
                                            <div className={"daytype buttonBox " + daytype}>
                                                <button type="button" className="oneday" name="oneday" onClick={onClick}>
                                                    단일
                                                </button>
                                                <button type="button" className="duration" name="duration" onClick={onClick}>
                                                    기간
                                                </button>
                                            </div>
                                            {daytype === "oneday" && (
                                                <div className="days daysBox">
                                                    <button type="button" className={"day mon " + selectedDays.mon} name="mon" onClick={onClick}>
                                                        월
                                                    </button>
                                                    <button type="button" className={"day tue " + selectedDays.tue} name="tue" onClick={onClick}>
                                                        화
                                                    </button>
                                                    <button type="button" className={"day wed " + selectedDays.wed} name="wed" onClick={onClick}>
                                                        수
                                                    </button>
                                                    <button type="button" className={"day thur " + selectedDays.thur} name="thur" onClick={onClick}>
                                                        목
                                                    </button>
                                                    <button type="button" className={"day fri " + selectedDays.fri} name="fri" onClick={onClick}>
                                                        금
                                                    </button>
                                                    <button type="button" className={"day sat " + selectedDays.sat} name="sat" onClick={onClick}>
                                                        토
                                                    </button>
                                                    <button type="button" className={"day sun " + selectedDays.sun} name="sun" onClick={onClick}>
                                                        일
                                                    </button>
                                                </div>
                                            )}
                                            {daytype === "duration" && (
                                                <div>
                                                    <div className="start  selectBox">
                                                        <div>시작 요일</div>
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
                                                    <div className="end  selectBox">
                                                        <div>종료 요일</div>
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
                </main>
            </section>
        </div>
    );
}
