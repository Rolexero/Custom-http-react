import React, { useEffect, useState, useCallback } from 'react';
import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/useHttp';

function App() {
  const [tasks, setTasks] = useState([]);
  const {isLoading, error, sendRequest: fetchTasks} = useHttp();
  
  useEffect(() => {
      const applyData = (tasksObj) => {
        const loadedTasks = [];
        for (const taskKey in tasksObj) {
          loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
        }
        setTasks(loadedTasks);
      };

      const responseConfig = {
        url: "https://react-tasks-4ed96-default-rtdb.firebaseio.com/tasks.json",
      };

    fetchTasks(responseConfig, applyData);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
