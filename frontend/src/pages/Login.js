import React, { useState } from 'react'
import './login.css';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const Login = () => {
    const [userDetails, setUserDetails] = useState({
        userEmail: '',
        password: '',
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = process.env.REACT_APP_API_URL;
        const result = await fetch(`${url}userLogin`, {
            method: "POST",
            body: JSON.stringify({ userDetails }),
            headers: {
                "Content-Type": "application/json",
            }
        });
        const res = await result.json();
        if (res.msg) {
            localStorage.setItem('isLogin',true);
            const isLogin=localStorage.getItem('isLogin');
            localStorage.setItem('email',res.email);
            window.location = '/user/home';
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Invalid email or password",
            });
        }
    }
    return (
        <>
            <body className='body'>
                <div class="container-fluid">
                    <form class="mx-auto" onSubmit={handleSubmit}>
                        <h4 class="text-center">Login</h4>
                        <div class="mb-3 mt-5">
                            <label for="exampleInputEmail1" class="form-label">Email</label>
                            <input type="email" required class="form-control" id="exampleInputEmail1" name='userEmail' onChange={handleChange} />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputPassword1" class="form-label">Password</label>
                            <input type="password" required class="form-control" id="exampleInputPassword1" name='password' onChange={handleChange} />
                        </div>
                        <div class="row">

                            <div class="col mb-1">
                                <div id="newRegister" class="form-text mt-3">Dont't have an account ? <Link to='/register'><a href="#">Register</a></Link></div>
                            </div>
                        </div>

                        <button type="submit" class="btn btn-primary mt-5">Login</button>
                    </form>
                </div>
            </body>
        </>
    )
}

export default Login