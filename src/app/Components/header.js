'use client';
import React, { useState, useEffect } from "react";
import Link from 'next/link'
import Image from 'next/image';
import icon from '../Assets/illustration.png'
import styles from '../style/header.module.css'
import { useRouter } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons'
import plane from '../Assets/plane.png'
import repeat from '../Assets/repeat.png'
import mess from '../Assets/mess.png'
import bell from '../Assets/bell.png'
import prof from '../Assets/prof.png'
import Cookies from "js-cookie";
import dynamic from "next/dynamic";


function Header() {
    const router = useRouter()
    const token = Cookies.get("token");
    const [isLoading, setIsLoading] = useState(false);
   
    const logout = () => {

        router.push('/login')
    }
    const handleProfile = () => {
        router.push("/profile");
    };
   

    
    const divStyle = {
        border: '1px solid #FFF', // Contoh border hitam dengan ketebalan 1px
        borderRadius: 10,
        boxShadow: '3px 4px 8px 2px rgba(0, 0, 0, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        gap: 10,
        marginBottom: 30,
        marginTop: 30,// Contoh padding
    };
    return (
        <header className="container">
            <nav id={styles['nav-item']} className="navbar navbar-expand-lg bg-body-transparant">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        <Image
                            src={icon}
                            width={20}
                            alt="icon"
                        />
                        Angkasa

                    </a>
                    <form className={styles['form-header']}>
                        <input className={styles['input-header']} type="search" placeholder="Search..." />
                    </form>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/booking">Find Tiket</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/search">My booking</a>
                            </li>
                            {token ? (
                        <div className="">
                            <Image src={mess} width={30} alt="notif" className="cursor-pointer"style={{marginLeft:150,marginRight:30}}/>
                            <Image src={bell} width={30} alt="message" className="cursor-pointer" style={{marginRight:30}} />
                            <Image src={prof} onClick={handleProfile} width={40} alt="ImgProfile" className="rounded-full border-2 border-main p-0.5 cursor-pointer" />
                        </div>
                    ) : (
                        <div style={{marginLeft:20}}>
                           <a type="button" className="btn btn-primary" href="/login">Sign in</a>
                        </div>
                    )}
                        </ul>
                    </div>
                </div>
            </nav>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>

        </header>
    );
}
export default dynamic (() => Promise.resolve(Header), {ssr: false})
