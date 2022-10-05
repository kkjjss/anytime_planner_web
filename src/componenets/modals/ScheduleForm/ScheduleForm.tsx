import React, { useReducer } from "react";
import "./ScheduleForm.scss";
import { databaseInstance, database } from "firebaseConfig";
import { yyyymmdd } from "utils/dateFormat";

interface initalState {
    title: string;
    repeatingType: "once" | "repeat";
    startdate: string;
    enddate: string;
    cycle: string;
    period: string;
}

const initialState: initalState = {
    title: "",
    repeatingType: "once",
    startdate: yyyymmdd(new Date()),
    enddate: yyyymmdd(new Date()),
    cycle: "",
    period: "",
};

const reducer = (state: initalState, action: any) => {
    switch (action.type) {
        case "SET_STATE":
            return {
                ...state,
                [action.name]: action.value,
            };
        case "SET_REPEATING_TYPE":
            return {
                ...initialState,
                [action.name]: action.value,
                title: state.title,
            };
        default:
            return state;
    }
};

export default function Editor({ editorOpen, toggleEditor, outModal }: any) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const scheduleData = state.repeatingType === "once" ? { title: state.title, repeatingType: state.repeatingType, startdate: state.startdate, enddate: state.enddate } : state;
        try {
            await databaseInstance.addDoc(databaseInstance.collection(database, "schedules"), scheduleData);
            alert("성공!");
            closeModal();
        } catch (error) {
            console.error("Database Insert Error", error);
        }
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        switch (event.currentTarget.name) {
            case "repeatingType":
                dispatch({ type: "SET_REPEATING_TYPE", name: event.currentTarget.name, value: event.target.value });
                break;
            case "startdate":
                dispatch({ type: "SET_STATE", name: event.currentTarget.name, value: event.target.value });
                if (new Date(state.enddate) < new Date(event.target.value)) dispatch({ type: "SET_STATE", name: "enddate", value: event.target.value });
                break;
            case "cycle":
                let cycleValue = Number(event.target.value);
                console.log(Number(event.target.value));
                if (cycleValue < 1) cycleValue = 1;
                dispatch({ type: "SET_STATE", name: event.currentTarget.name, value: cycleValue });
                break;
            case "period":
                let periodValue = Number(event.target.value);
                console.log(Number(event.target.value));
                if (periodValue < 1) periodValue = 1;
                else if (periodValue > Number(state.cycle)) periodValue = Number(state.cycle);
                dispatch({ type: "SET_STATE", name: event.currentTarget.name, value: periodValue });
                break;
            default:
                dispatch({ type: "SET_STATE", name: event.currentTarget.name, value: event.target.value });
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
                                <input name="title" type="text" placeholder="제목" required value={state.title} onChange={onChange} />
                            </div>
                            <div className="type selectBox">
                                <div>반복</div>
                                <select name="repeatingType" id="repeatingType" value={state.repeatingType} onChange={onChange}>
                                    <option value="once">한번만</option>
                                    <option value="repeat">주기마다</option>
                                </select>
                            </div>
                            {state.repeatingType === "once" && (
                                <div>
                                    <div className="start selectBox">
                                        <div>시작일</div>
                                        <input type="date" name="startdate" value={state.startdate} onChange={onChange} />
                                    </div>
                                    <div className="end selectBox">
                                        <div>종료일</div>
                                        <input type="date" name="enddate" value={state.enddate} min={state.startdate} onChange={onChange} />
                                    </div>
                                </div>
                            )}
                            {state.repeatingType === "repeat" && (
                                <div>
                                    <div className="cycle textBox">
                                        <div>주기</div>
                                        <input type="number" name="cycle" value={state.cycle} onChange={onChange} />
                                        <div>일 마다</div>
                                    </div>
                                    <div className="period textBox">
                                        <div>기간</div>
                                        <input type="number" name="period" value={state.period} onChange={onChange} />
                                        <div>일 동안</div>
                                    </div>
                                    <div className="start selectBox">
                                        <div>반복 시작일</div>
                                        <input type="date" name="startdate" value={state.startdate} onChange={onChange} />
                                    </div>
                                    <div className="end selectBox">
                                        <div>반복 종료일</div>
                                        <input type="date" name="enddate" value={state.enddate} min={state.startdate} onChange={onChange} />
                                    </div>
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
