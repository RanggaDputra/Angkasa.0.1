'use client';
import { useRouter } from 'next/navigation'
import React, { useState } from 'react';
import ilus from '../Assets/ilus2.png';
import Image from 'next/image';
import icon from '../Assets/illustration.png';
import styles from '../style/login.module.css';
import Link from 'next/link';
import axios from 'axios'
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default function Page() {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [inputData, setInputData] = useState({
    email: '',
    password: ''
  });
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState('');

  // const API_URL = `https://easy-lime-seal-toga.cyclic.app/`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, inputData); // Ganti 'login' dengan endpoint yang sesuai
      Swal.fire({
        icon: "success",
        title: "Login Success!",
        timer: 2000,
        showConfirmButton: false,
    }).then(() => {
        const token = response.data.data.access_token;
        console.log(response.data.data.access_token);
        Cookies.set("token", token);
        // localStorage.set("token", token);
        router.push("/");
        setLoading(false);
    });
} catch (error) {
    setLoading(false);
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message,
    });
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
        <div  className={styles['img-login']} style={{ backgroundColor: '#2395FF', width: 800, height: 646 }}>
          <div className={styles['img-login']}style={{ marginLeft: 200, marginTop: 150 }}>
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
          <div className={styles['tag-main']} style={{ marginLeft: 150, marginTop: 150 }}>
            
              <>
                <h2 className={styles['tag-main2']} style={{ marginBottom: 30 }}>Login</h2>
                <form onSubmit={handleSubmit} className={styles['tag-main2']}>
                  <input type="text" value={inputData.email} onChange={handleChange} name="email" placeholder='Email' className={styles['input-login']}></input><br />
                  <input type="password" value={inputData.password} onChange={handleChange} name="password" placeholder='Kata Sandi' className={styles['input-login']}></input><br />
                  <button type="submit" className="btn btn-primary" style={{ marginTop: 20, width: 250, marginBottom: 20 }}>Masuk</button>
                </form>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <p className={styles['tag-main2']}>Apakah Anda lupa kata sandi Anda?</p>
                <Link href="/forgot" style={{ }}><p className={styles['tag-main2']}>Klik di sini untuk reset</p></Link>
                
                <Link href="/register" ><p style={{marginLeft:100 }}>Sign Up</p></Link>
              </>
            
             
            
          </div>
        </div>
      </div>
    </>
  )
}
