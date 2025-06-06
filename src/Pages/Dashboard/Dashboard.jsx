import { useState, useContext, useEffect, useRef } from "react";

import "./Dashboard.css";

const Dashboard = () => {
    const initialTasks = [
        {content : "Kuraz Project", deadline : "22-01-2025 ", done : true},
        {content : "Submit UI/Ux design", deadline : "24-03-2005 ", done : false},
        {content : "Finish the react project", deadline : "25-08-2005 ", done : false}
    ]
    const [tasks, setTasks] = useState(initialTasks);
    const [tasksList, setTasksList] = useState(tasks);


    useEffect(()=>{
        setTasksList(tasks);
    }, [tasks])

    const form_container = useRef();
    const searchBar = useRef();

    const toggleAddForm = ()=>{
        form_container.current.classList.toggle("show");
    }

    const search = ()=>{
        const filtered = tasks.filter(task=>{
                const search_value = searchBar.current.value.toLocaleLowerCase();
                return task.content.toLocaleLowerCase().includes(search_value);
        })
        setTasksList(filtered);
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const form = e.target;
        setTasks(prev=>{
            return [{content : form.task.value, deadline : form.deadline.value}, ...prev]
        })

        toggleAddForm();
    }

    const handleDelete = (index)=>{
        setTasks(prev=>{
            return prev.filter((task, idx)=>{
                return idx != index;
            })
        })
    }

    const handleStateChange = (index)=>{
        console.log("hi")
        const update = [...tasks];
        update[index].done = !tasks[index].done;
        setTasks(update);
    }

    return (
        <>
            <header>
                <div className="search-container">
                    <input type="search" name="search" id="search-bar" ref = {searchBar} placeholder="Search tasks here.."/>
                    <button onClick={search}>Search</button>
                </div>
                <div className="new-task-btn" onClick={toggleAddForm}>
                    New Task
                </div>
            </header>
            <main>
                <div className="tasks-container">
                    <h1>Tasks</h1>
                    <div className="tasks-list">
                        {tasksList.length == 0 
                            ? <p className="no-tasks-text">No tasks yet.</p>
                            : tasksList.map((task, index) =>{
                                    return <li key = {index} className={`tasks ${task.done ? 'done' : ''}`}>
                                        <p className="content">
                                            {task.content}
                                        </p>
                                        <div className="task-props-container">
                                            <button className="done-btn" onClick={()=>handleStateChange(index)}>
                                                    {task.done ? "Done" : "Not Done"}
                                            </button>
                                            <p className="deadline">
                                                Ends: {task.deadline}
                                            </p>
                                        </div>
                                        <button className="del-btn" onClick={()=>{handleDelete(index)}}>Del</button>
                                    </li>
                            })
                        }
                    </div>
                </div>
            </main>

            <div className="new-task-form-container" ref={form_container}>
                <form action="#" onSubmit={(e)=>handleSubmit(e)}>
                    <div className="close-btn" onClick={toggleAddForm}>
                        X
                    </div>
                    <h1>New Task</h1>
                    <div className="form-group">
                        <label htmlFor="task">Task</label>
                        <input type="text" id='task' name="task" placeholder="write your task here" required/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="datetime">Deadline</label>
                        <input type="date" id='date' name="deadline" required/>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="submit-btn">Submit</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Dashboard;
