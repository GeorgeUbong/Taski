import React, { useState } from "react";
import '../cssfiles/nav.css';

interface CardProps {
        onClose: () => void;
        onCreate: (taskName: string) => void;
    
    }

export default function CardPop({ onClose, onCreate }: CardProps) {
    const [taskName, setTaskName] = useState("");


    return (
        <div>
            <h3>Enter a task name</h3>
            <input 
            type="text"
            placeholder="what are you thinking of"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
             />

             <button className='button-nav' onClick={() => {
                if (taskName.trim().length > 0) {
                    onCreate(taskName);
                    setTaskName("");
                }
             }}>Create</button>
             <button className="close-butt" onClick={onClose}> Cancel</button>
        </div>
    )
}
