import React, { useEffect, useState } from "react";
import "./ScheduleEditor.scss";
import { databaseInstance, database } from "firebaseConfig";
import { yyyymmdd } from "utils/dateFormat";

export default function Editor(props: any) {
    const { editorOpen, toggleEditor, outModal } = props;

    const daysOfWeek = [
        { key: "mon", value: "월" },
        { key: "tue", value: "화" },
        { key: "wed", value: "수" },
        { key: "thur", value: "목" },
        { key: "fri", value: "금" },
        { key: "sat", value: "토" },
        { key: "sun", value: "일" },
    ];
    const datesOfMonth = [...new Array(31)].map((_, i) => i + 1);

    const _selectedDays: selectedDaysAndDateType = {};
    const _selectedDates: selectedDaysAndDateType = {};

    const [title, setTitle] = useState("");
    const [repeatingType, setRepeatingType] = useState("0");
    const [startdate, setStartdate] = useState(yyyymmdd(new Date()));
    const [enddate, setEnddate] = useState(yyyymmdd(new Date()));
    const [period, setPeriod] = useState("");
    const [selectionType, setSelectionType] = useState("oneday");
    const [selectedDays, setSelectedDays] = useState(_selectedDays);
    const [selectedDates, setSelectedDates] = useState(_selectedDates);

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        databaseInstance.addDoc(databaseInstance.collection(database, "title"), { title: title }).then(() => alert("저장완료"));
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.currentTarget.name) {
            case "title":
                setTitle(event.target.value);
                break;
            case "repeatingType":
                setRepeatingType(event.target.value);
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
            case "selectionType":
                setSelectionType(event.target.value);
                break;
            default:
                break;
        }
    };

    const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        const value = event.currentTarget.value;
        switch (event.currentTarget.name) {
            case "selectionType":
                setSelectionType(value);
                break;
            case "day":
                setSelectedDays({ ...selectedDays, [value]: !selectedDays[value] ? "selected" : "" });
                break;
            case "date":
                setSelectedDates({ ...selectedDates, [value]: !selectedDates[value] ? "selected" : "" });
                console.log(selectedDates);
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
                            <div className="title inputbox">
                                <input name="title" type="text" placeholder="제목" required value={title} onChange={onChange} />
                            </div>
                            <div className="type selectBox">
                                <div>반복</div>
                                <select name="repeatingType" id="repeatingType" value={repeatingType} onChange={onChange}>
                                    <option value="0">한번만</option>
                                    <option value="1">주기마다</option>
                                    <option value="2">직접지정</option>
                                </select>
                            </div>
                            {repeatingType === "0" && (
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
                            )}
                            {repeatingType === "1" && (
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
                                            <div className={"week selectionType buttonBox " + selectionType}>
                                                <button type="button" className="week oneday" name="selectionType" value="oneday" onClick={onClick}>
                                                    단일
                                                </button>
                                                <button type="button" className="week duration" name="selectionType" value="duration" onClick={onClick}>
                                                    기간
                                                </button>
                                            </div>
                                            {selectionType === "oneday" && (
                                                <div className="days daysBox">
                                                    {daysOfWeek.map(({ key, value }: { key: string; value: string }) => (
                                                        <button type="button" key={key} className={"day " + key + " " + selectedDays[key]} name="day" value={key} onClick={onClick}>
                                                            {value}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            {selectionType === "duration" && (
                                                <div>
                                                    <div className="start  selectBox">
                                                        <div>시작 요일</div>
                                                        <select name="startday" id="startday">
                                                            {daysOfWeek.map(({ key, value }) => (
                                                                <option key={key} value={key}>
                                                                    {value}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="end  selectBox">
                                                        <div>종료 요일</div>
                                                        <select name="endday" id="endday">
                                                            {daysOfWeek.map(({ key, value }) => (
                                                                <option key={key} value={key}>
                                                                    {value}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                    {period === "month" && (
                                        <div>
                                            <div className={"month selectionType buttonBox " + selectionType}>
                                                <button type="button" className="month oneday" name="selectionType" value="oneday" onClick={onClick}>
                                                    단일
                                                </button>
                                                <button type="button" className="month duration" name="selectionType" value="month" onClick={onClick}>
                                                    기간
                                                </button>
                                            </div>
                                            {selectionType === "oneday" && (
                                                <div className="date dateBox">
                                                    {datesOfMonth.map((date) => (
                                                        <button type="button" key={date} className={"date " + date + " " + selectedDates[date]} name="date" value={date} onClick={onClick}>
                                                            {date}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                            {selectionType === "duration" && (
                                                <div>
                                                    <div className="start  selectBox">
                                                        <div>시작일</div>
                                                        <select name="startdate" id="startdate">
                                                            {datesOfMonth.map((date) => (
                                                                <option key={date} value={date}>
                                                                    {date}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="end  selectBox">
                                                        <div>종료일</div>
                                                        <select name="enddate" id="enddate">
                                                            {datesOfMonth.map((date) => (
                                                                <option key={date} value={date}>
                                                                    {date}
                                                                </option>
                                                            ))}
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

type selectedDaysAndDateType = {
    [key: string]: string;
};
