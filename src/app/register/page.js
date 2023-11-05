'use client';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import ilus from '../Assets/ilus2.png';
import Image from 'next/image';
import icon from '../Assets/illustration.png';
import styles from '../style/login.module.css';
import Link from 'next/link';
import axios from "axios";
import Swal from "sweetalert2";

export default function Page() {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [inputData, setInputData] = useState({
        name: "",
        email: "",
        password: "",
    });


    const toLogin = () => {
        router.push("/login");
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        if (inputData.name === "" || inputData.email === "" || inputData.password === "") {
            Swal({
                title: "Register",
                text: "Must fill in all fields",
                icon: "warning",
                dangerMode: true,
            }).then((confirm) => {
                setLoading(false);
                if (confirm) {
                    
                }
            });
        } else {
            const body = {
                name: inputData.name,
                email: inputData.email,
                password: inputData.password,
            };
            axios
                .post(`${process.env.NEXT_PUBLIC_API_URL}auth/register`, body)
                .then((res) => {
                    console.log(res.data);
                    Swal.fire({
                        title: "Register",
                        text: "Register Successfully!",
                        icon: "success",
                    }).then((confirm) => {
                        setLoading(false);
                        if (confirm) {
                            router.push("/login");
                        }
                    });
                })
                .catch((err) => {
                    console.log(err.response);
                    setLoading(false);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err.response?.data?.message || "An error occurred during registration.",
                    });
                });
        }
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles['img-login']} style={{ backgroundColor: '#2395FF', width: 800, height: 646 }}>
                    <div className={styles['img-login']} style={{ marginLeft: 200, marginTop: 150 }}>
                        <Image
                        alt='icon'
                            color='#02C1FE'
                            src={ilus}
                            width={350}
                        />
                    </div>
                </div>
                <div style={{ width: 600 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50, marginLeft: -150 }}>
                        <Image
                        alt='icon'
                            color='#02C1FE'
                            src={icon}
                            width={50}
                        />
                        <h4>Ankasa</h4>
                    </div>
                    <div className={styles['tag-main']} style={{ marginLeft: 150, marginTop: 80 }}>
                        
                            <>
                                <h2 className={styles['tag-main2']} style={{ marginBottom: 30 }}>Register</h2>
                                <form onSubmit={handleSubmit} className={styles['tag-main2']}>
                                    <input type="text" value={inputData.name} onChange={(e) => setInputData({ ...inputData, name: e.target.value })} placeholder='Full Name' className={styles['input-login']}></input><br />
                                    <input type="email" value={inputData.email} onChange={(e) => setInputData({ ...inputData, email: e.target.value })} placeholder='Email' className={styles['input-login']}></input><br />
                                    <input type="password" value={inputData.password} onChange={(e) => setInputData({ ...inputData, password: e.target.value })} placeholder='Kata Sandi' className={styles['input-login']}></input><br />
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: 20, width: 250, marginBottom: 20 }}>Daftar</button>
                                    <div className="form-check">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label className="form-check-label" htmlFor="flexCheckDefault">
                                            Accept Terms And Conditions
                                        </label>
                                    </div>
                                </form>
                             
                               <hr className={styles['hrw']}/>
                                <p style={{marginLeft:20}}>Already have an Account?</p>
                                <button id={styles['btn23']}type="submit" className="btn btn-primary" style={{ marginTop: 20, width: 250, marginBottom: 20 }} onClick={toLogin}>Log In</button>
                            </>
                        
                           
                        
                    </div>
                </div>
            </div>
        </>
    )
}
