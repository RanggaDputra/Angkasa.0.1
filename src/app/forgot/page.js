'use client';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import ilus from '../Assets/ilus2.png';
import Image from 'next/image';
import icon from '../Assets/illustration.png';
import styles from '../style/login.module.css';
import Link from 'next/link';
import axios from 'axios'

export default function Page() {
    const router = useRouter()
    const [inputData, setInputData] = useState({
        email: '',
        password: ''
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [error, setError] = useState('');

    const API_URL = `https://easy-lime-seal-toga.cyclic.app/`;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/auth/login`, inputData); // Ganti 'login' dengan endpoint yang sesuai
            console.log(response.data);

            if (response.status === 200) {
                setLoggedIn(true);
                setError('');
            } else {
                setError('Login failed. Please check your credentials.');
                setLoggedIn(false);
            }
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            setLoggedIn(false);
        }
    };


    const handleChange = (e) => {
        setInputData({
            ...inputData,
            [e.target.name]: e.target.value
        });
    };
    const handleClick = (e) => {
        e.preventDefault()
        router.push('/')
    }

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div className={styles['img-login']} style={{ backgroundColor: '#2395FF', width: 800, height: 646 }}>
                    <div className={styles['img-login']} style={{ marginLeft: 200, marginTop: 150 }}>
                        <Image
                            color='#02C1FE'
                            src={ilus}
                            width={350}
                        />
                    </div>
                </div>
                <div style={{ width: 600 }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50, marginLeft: -150 }}>
                        <Image
                            color='#02C1FE'
                            src={icon}
                            width={50}
                        />
                        <h4>Ankasa</h4>
                    </div>
                    <div className={styles['tag-main']} style={{ marginLeft: 150, marginTop: 80 }}>
                        {!loggedIn ? (
                            <>
                                <h2 className={styles['tag-main2']} style={{ marginBottom: 30 }}>Forgot Password</h2>
                                <form onSubmit={handleSubmit} className={styles['tag-main2']}>
                                   
                                    <input type="text" value={inputData.email} onChange={handleChange} name="email" placeholder='Email' className={styles['input-login']}></input><br />
                                   
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: 20, width: 250, marginBottom: 20 }}>Masuk</button>
                                    
                                </form>
                                {error && <p style={{ color: 'red' }}>{error}</p>}
                              
                                <p style={{marginLeft:-20}}>You’ll get message soon on your email</p>
                               
                            </>
                        ) : (
                            <div>
                                <p>Selamat, Anda sudah masuk!</p>
                                <button type="submit" onClick={handleClick} className="btn btn-primary" style={{ marginTop: 20, width: 250, marginBottom: 20 }}>Masuk</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
