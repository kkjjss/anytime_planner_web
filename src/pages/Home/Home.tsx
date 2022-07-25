import React, { useState } from "react";
import "./Home.scss";
import { databaseInstance, database } from "firebaseConfig";

export default function Home() {
    const [text, setText] = useState("");

    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        databaseInstance.addDoc(databaseInstance.collection(database, "text"), { text: text });
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    return (
        <div className="Home">
            <form onSubmit={onSubmit}>
                <input type="text" value={text} onChange={onChange} />
                <input type="submit" value="send" />
            </form>
        </div>
    );
}
