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
import axios from "axios";

export default function Header() {
    const router = useRouter()
    const token = Cookies.get("token");
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = `https://easy-lime-seal-toga.cyclic.app/`;
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
                            marginRight={10}
                        />
                        Angkasa

                    </a>
                    <form className={styles['form-header']}>
                        <input className={styles['input-header']} type="search" placeholder="Search..." />
                    </form>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            {/* <li class="nav-item">
                                <div className="dropdown" style={{ marginRight: 20 }}>
                                    <button type="button" style={{ backgroundColor: 'white', color: 'black', border: 'none', borderBottom: 1 }} className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" data-bs-auto-close="outside" checked>
                                        Find Ticket
                                    </button>
                                    <form id={styles['drop-item']} className="dropdown-menu p-4" style={{ width: 400 }}>
                                        <div className="mb-3">
                                            <h3 style={{ fontSize: 20 }}>Hey,</h3>
                                            <h2 className={styles['tag-item']}style={{ fontSize: 23 }}>Where you want to go?</h2><br />
                                            <Link href="/login" style={{ textDecoration: 'none' }}>Recently Searched</Link><br />

                                            <div style={divStyle}>
                                                <div style={{ width: 150 }}>
                                                    <h4 style={{ fontSize: 15, color: '#979797' }}>From</h4>
                                                    <h2 style={{ fontSize: 25 }}>Medan</h2>
                                                    <h4 style={{ fontSize: 15, color: '#979797' }}>Indonesia</h4>
                                                </div>
                                                <div style={{ width: 50 }}><FontAwesomeIcon style={{ marginTop: 50 }} icon={faArrowRightArrowLeft}></FontAwesomeIcon></div>
                                                <div style={{ width: 150 }}>
                                                    <h4 style={{ fontSize: 15, color: '#979797' }}>To</h4>
                                                    <h2 style={{ fontSize: 25 }}>Tokyo</h2>
                                                    <h4 style={{ fontSize: 15, color: '#979797' }}>Japan</h4>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
                                                <button type="button" class="btn btn-primary"> <Image
                                                    src={plane}
                                                    width={20}
                                                // marginRight={10}
                                                /><span style={{ marginLeft: 10 }}>One Way</span></button>
                                                <button type="button" class="btn btn-secondary" style={{ backgroundColor: '#F0F0F0', color: '#595959', border: 'none', fontWeight: 'bold' }}>
                                                    <Image
                                                        src={repeat}
                                                        width={20}
                                                    // marginRight={10}
                                                    />
                                                    <span style={{ marginLeft: 10 }}>Round Trip</span></button>
                                            </div>
                                            <label for="exampleDropdownFormEmail2" className="form-label" style={{ marginTop: 10, color: '#979797' }}>Departure</label>
                                            <input type="date" className="form-control" id="exampleDropdownFormEmail2" placeholder="email@example.com" />
                                        </div>
                                        <label for="exampleDropdownFormEmail2" className="form-label" style={{ marginTop: 10, color: '#979797' }}>How many person?</label>
                                        <div className="mb-3" style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>

                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>1 Child</option>
                                                <option value="1">2 Child</option>
                                                <option value="2">3 Child</option>
                                                <option value="3">4 Child</option>
                                            </select>
                                            <select class="form-select" aria-label="Default select example">
                                                <option selected>1 Adult</option>
                                                <option value="1">2 Adult</option>
                                                <option value="2">3 Adult</option>
                                                <option value="3">4 Adult</option>
                                            </select>
                                        </div>
                                        <div  className="mb-3">
                                            <label for="exampleDropdownFormEmail2" className="form-label" style={{ marginTop: 10, color: '#979797' }}>Which class do you want?</label>
                                            <div id={styles['tag-lab']} className="form-check" style={{ display: 'flex', justifyContent: 'center', gap: 5, marginRight: 20 }}>
                                                <div class="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                    <label className="form-check-label" for="flexRadioDefault1">
                                                        Economy
                                                    </label>
                                                </div>
                                                <div className="form-check">
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                                    <label className="form-check-label" for="flexRadioDefault2">
                                                        Bussines
                                                    </label>
                                                </div>
                                                <div  className="form-check" >
                                                    <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                                    <label id={styles['tag-spec']} className="form-check-label" for="flexRadioDefault1">
                                                        First Class
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <button id={styles['btn-item']}type="submit" className="btn btn-primary" style={{ width: 350 }}> <Link href="/booking" style={{ textDecoration: 'none',color:'white' }}>SEARCH FLIGHT</Link></button>
                                    </form>
                                </div>
                            </li> */}
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/booking">Find Tiket</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/search">My booking</a>
                            </li>
                            {token ? (
                        <div className="">
                            <Image src={mess} width={30} alt="notif" className="cursor-pointer"style={{marginLeft:150,marginRight:30}}/>
                            <Image src={bell} width={30} alt="message" className="cursor-pointer" style={{marginRight:30}} />
                            <Image src={prof} onClick={handleProfile} width={40} alt="ImgProfile" className="rounded-full border-2 border-main p-0.5 cursor-pointer" />
                        </div>
                    ) : (
                        <div style={{marginLeft:20}}>
                           <a type="button" class="btn btn-primary" href="/login">Sign in</a>
                        </div>
                    )}
                        </ul>
                    </div>
                </div>
            </nav>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js" integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW" crossorigin="anonymous"></script>
        </header>
    );
}
