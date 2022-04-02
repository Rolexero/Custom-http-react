import { useState } from 'react';
import useHttp from '../../hooks/useHttp';
import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(null);
const {isLoading, error, sendRequest: sendTaskRequest} = useHttp();
const applyData = (taskText, data)=>{
          const generatedId = data.name; // firebase-specific => "name" contains generated id
          const createdTask = { id: generatedId, text: taskText };
          props.onAddTask(createdTask);

}

  const enterTaskHandler = async (taskText) => {
    const requestConfig = {
      url: "https://react-tasks-4ed96-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
    };
    sendTaskRequest(requestConfig, applyData.bind(null, taskText))
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
