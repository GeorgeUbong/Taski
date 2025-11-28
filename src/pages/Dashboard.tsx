import React from 'react'
import Navbar from '../components/Navbar'
import {useState} from 'react';
import CardPop from '../components/CardPop';
import '../cssfiles/nav.css';

const Dashboard = () => {
  const [name, setName] = useState("");
  const [showCard, setShowCard] = useState(false);
  const [tasks, setTasks] = useState<string[]>([]);

  const handleCreateTasks = (taskName: string) => {
    setTasks([...tasks, taskName]);//add the task
    setShowCard(false); //close after creation
  };


  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
      };
  return (

    <div>
      <Navbar />
      <div style={styles.container}>
        <h2 style={styles.txt}>Welcome to Dashboard</h2>
      <input
                type='text'
                value={name}
                onChange={handleNameChange}
                placeholder='what name would you like to be called'
                required
                style={styles.namex}
            />
     <p>Your choosen name is: {name}</p>
     <button style={styles.button} onClick={() => setShowCard(true)}>Create</button>
     

     {/*create the task/*/}
    
{showCard && (
      <CardPop onCreate={handleCreateTasks} onClose={() => setShowCard(false)}/>
     )}





    <div style={styles.todocon}>
       <div style={styles.taskslist}>
<p>To-Do List</p>{tasks.map((task, index) => (
  <div key={index} className='taskcard' style={styles.taskcard}>{task}</div>
))}
     </div>
    </div>
      </div>
    </div>
  )
}

export default Dashboard

const styles = {
  container:{
    
    padding: '20px',
  },
  taskcard: {
    border: '1px solid black',
    padding: '12px',
    margin: '10px',
  },
  taskslist:{
border: '1px solid black',
marginTop: '5rem',
width: '80%',
  },
  todocon: {
    display: 'flex',
alignItems: 'center',
justifyContent: 'center'
  },
  namex:{
   width: '100%',
   border: '1px solid #c3cc',
   padding: '5px',
   borderRadius: '4px',
        fontSize: '16px',
  },
  button:{
border: '1px solid blue',
padding: '5px',
borderRadius: '10px',
paddingHorizontal: '30px'
  },
  txt:{
    fontWeight: '700',
    fontSize: '30px'
  }
}