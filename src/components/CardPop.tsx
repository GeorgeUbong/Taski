import React, { useState } from "react";
import '../cssfiles/nav.css';

interface CardProps {
        onClose: () => void;
        onCreate: (taskName: string) => void;
    
    }

export default function CardPop({ onClose, onCreate }: CardProps) {
    const [taskName, setTaskName] = useState("");


    return (
        <div style={styles.popup}>
            <h3 style={styles.head}>Enter a task name</h3>
            <input 
            type="text"
            placeholder="what are you thinking of"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
             />

             <div style={styles.buttonClass}>
                <button className='button-nav' onClick={() => {
                if (taskName.trim().length > 0) {
                    onCreate(taskName);
                    setTaskName("");
                }
             }}>Create</button>
             <button className="close-butt" onClick={onClose}> Cancel</button>
             </div>
        </div>
    )
}


const styles: { [key: string]: React.CSSProperties } = {
popup:{
    position: 'absolute',
    border: '1px solid black',
    padding: '30px',
    zIndex: 90,
    backgroundColor: 'white',
    borderRadius: '10px',
},
head:{
    fontWeight: '700',
    fontSize: '20px',
    padding: '5px',
},
buttonClass: {
    padding: '30px',
}
}