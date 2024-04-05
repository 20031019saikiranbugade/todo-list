import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import './register.css';
import Swal from 'sweetalert2';

const Register = () => {
    const navigate = new useNavigate();
    const [userDetails, setUserDetails] = useState({
        userName: "",
        userEmail: "",
        password: "",
        confirmPassword: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserDetails({
            ...userDetails,
            [name]: value,
        })
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userDetails.password != userDetails.confirmPassword) {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "Password and Confirm Password are not matching",
            });
        } else {
            const url = process.env.REACT_APP_API_URL;
            const result = await fetch(`${url}userRegister`, {
                method: "POST",
                body: JSON.stringify({ userDetails }),
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const finalResult = await result.json();
            if (finalResult.msg) {
                Swal.fire({
                    icon: "success",
                    title: "Successfully Registered",
                }).then(() => {
                    navigate('/');
                });

            } else {
                Swal.fire({
                    icon: "error",
                    title: "Something went wrong",
                });
            }
        }



    }
    return (
        <>
            <div class="container-fluid">
                <form class="mx-auto" onSubmit={handleSubmit}>
                    <h4 class="text-center">New Registration</h4>
                    <div class="mb-3 mt-5">
                        <label for="exampleInputuserName" class="form-label">User Name</label>
                        <input type="text" required class="form-control" id="exampleInputuserName" name='userName' onChange={handleChange} />
                    </div>

                    <div class="mb-3 mt-5">
                        <label for="exampleInputEmail1" class="form-label">Email</label>
                        <input type="email" required class="form-control" id="exampleInputEmail1" name='userEmail' onChange={handleChange} aria-describedby="emailHelp" />
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" required class="form-control" id="exampleInputPassword1" name='password' onChange={handleChange} />
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputconfirmPassword1" class="form-label">Confirm Password</label>
                        <input type="password" required class="form-control" id="exampleInputconfirmPassword1" name='confirmPassword' onChange={handleChange} />
                    </div>
                    <div class="row">
                        <div class="col mb-1">
                            <div id="newRegister" class="form-text mt-3">Already have an account ? <Link to='/'><a href="#">Login</a></Link></div>
                        </div>
                    </div>

                    <button type="submit" class="btn btn-primary mt-5">Register</button>
                </form>
            </div>
        </>
    )
}

export default Register