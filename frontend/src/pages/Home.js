import React, { useEffect, useState } from 'react'
import './home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = new useNavigate();
    const [taskDetails, setTaskDetails] = useState([]);
    const getTaskData = async (e) => {
        const url = process.env.REACT_APP_API_URL;
        const email = localStorage.getItem('email');
        const result = await fetch(`${url}getTask`, {
            method: "POST",
            body: JSON.stringify({ email }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const res = await result.json();
        if (res.msg) {
            setTaskDetails(res.todo);
        } else {
            setTaskDetails([]);
        }

    }
    useEffect(() => {
        getTaskData();
    }, []);
    let isLogin;
    if (localStorage.getItem('isLogin') === null) {
        isLogin = false;
    } else {
        isLogin = true;
    }

    return (
        <>
            <h4>{isLogin}   </h4>
            {
                isLogin === false ? (
                    window.location = '/'
                ) : (
                    <>
                        <HomeDetails taskDetails={taskDetails} getTaskData={getTaskData} />
                    </>
                )
            }

        </>
    )
}

export const HomeDetails = ({ taskDetails, getTaskData }) => {
    const [workDetails, setWorkDetails] = useState('');
    const [editWork, seteditWork] = useState('');
    const handleChange = (e) => {
        setWorkDetails(e.target.value);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailId = localStorage.getItem('email');
        const url = process.env.REACT_APP_API_URL;
        const result = await fetch(`${url}addTask`, {
            method: "POST",
            body: JSON.stringify({ workDetails, emailId }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const res = await result.json();
        if (res.msg) {
            setWorkDetails('');
            getTaskData();
        }
    }



    const handledelete = async (todo_task) => {
        const url = process.env.REACT_APP_API_URL;
        const email = localStorage.getItem('email');
        const result = await fetch(`${url}deleteTask`, {
            method: "POST",
            body: JSON.stringify({ email, todo_task }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const res = await result.json();
        if (res.msg) {
            getTaskData();
        }
    }
    const handleEditChange = (e) => {
        console.log(e.target.value);
        seteditWork(e.target.value);
    }
    const handleClose = () => {
        seteditWork("");
    }
    const handleEdit = (id) => {
        seteditWork("")
        seteditWork(id);
    }
    const handleUpdate = (word) => {
        alert(editWork)
    }
    return (
        <>
            <div className='container-fluid'>
                <div className='mx-auto box'>
                    <h4 class="text-center mb-4 text-secondary"><span>TO DO LIST</span></h4>
                    {/* <form onSubmit={handleSubmit}> */}
                    <div className='row'>
                        <div className='col-md-9' >
                            <input type="text" required class="form-control" value={workDetails} placeholder='Enter the work that has to be done ?' onChange={handleChange} />
                        </div>
                        <div className='col-md-3'>
                            <span className='text-center'><button className='btn btn-secondary' onClick={handleSubmit}>Create</button></span>
                        </div>
                    </div>
                    {/* </form> */}

                    {
                        taskDetails.length == 0 ? (
                            <>
                                <h4>Not added any tasks</h4>
                            </>
                        ) : (
                            taskDetails.map((todo, index) => {
                                return (
                                    <>
                                        <div class="row list-box justify-content-between align-items-center">
                                            <div class="col-auto">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input" type="checkbox" id={index} />
                                                    <label class="form-check-label" for={index}>{todo}</label>
                                                </div>
                                            </div>
                                            <div class="col-auto">
                                                <button className='btn edit btn-danger mt-0' onClick={() => handledelete(todo)}>Delete</button>
                                            </div>
                                        </div>
                                    </>
                                )
                            })

                        )
                    }
                    <div className='mt-3'>
                        <button className='btn save btn-success'>save</button>
                    </div>
                </div>

            </div>

            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Edit Your Task</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div class="modal-body">
                            <div class="mb-3">
                                <textarea class="form-control" rows="3" defaultValue={editWork} onChange={handleEditChange}></textarea>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <span><button type="button" class="btn btn-secondary" onClick={handleClose} data-bs-dismiss="modal" >Close</button></span>
                            <button type="button" class="btn btn-success" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home