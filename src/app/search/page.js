"use client";
import React, { useState, useEffect } from "react";
import Footer from '../Components/footer'
import Header from '../Components/header'
import styles from '../style/search.module.css'
import circle from '../Assets/circle.png'
import Image from 'next/image';
import aset from '../Assets/aset.png'
import { faLocationDot, faPlaneDeparture, faChevronRight, faStar, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link';
import Cookies from "js-cookie";
import axios from "axios"
import { privateRoute } from "../../data/Private";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

function Page() {
    const router = useRouter();
    const token = Cookies.get("token");
    const [openProfile, setOpenProfile] = useState(false);
    const [flightData, setFlightData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleLogout = () => {
        Swal.fire({
            title: "Confirm",
            text: "Are you sure want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#F24545",
            cancelButtonColor: "#979797",
            confirmButtonText: "Yes, sure",
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire("Logout success", "Semoga Harimu Menyenangkan", "success").then((confirm) => {
                    setOpenProfile(false);
                    if (confirm) {
                        Cookies.remove("token");
                        router.push("/login");
                    }
                });
            }
        });
    };

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}booking/tickets`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const data = response.data.data.result;
                const dataUser = response.data.data.user;

                const modifiedData = data.map((flight) => {
                    const takeoffTime = flight.ticket.takeoff.substr(11, 5);
                    const landingTime = flight.ticket.landing.substr(11, 5);
                    const takeoffDate = flight.ticket.takeoff.substr(0, 10);
                    const landingDate = flight.ticket.landing.substr(0, 10);

                    const takeoffHour = parseInt(takeoffTime.split(":")[0]);
                    const takeoffMinute = parseInt(takeoffTime.split(":")[1]);
                    const landingHour = parseInt(landingTime.split(":")[0]);
                    const landingMinute = parseInt(landingTime.split(":")[1]);

                    const hours = landingHour - takeoffHour;
                    const minutes = landingMinute - takeoffMinute;

                    const formattedTimeDistance = `${hours} hours ${minutes} minutes`;

                    const takeoffDateTime = new Date(takeoffDate);
                    const landingDateTime = new Date(landingDate);
                    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
                    const formattedTakeoffDate = takeoffDateTime.toLocaleDateString("en-US", options);
                    const formattedLandingDate = landingDateTime.toLocaleDateString("en-US", options);

                    return {
                        ...flight,
                        takeoffTime,
                        landingTime,
                        takeoffDate: formattedTakeoffDate,
                        landingDate: formattedLandingDate,
                        timeDistance: formattedTimeDistance,
                    };
                });

                setFlightData(modifiedData);
                setUserData(dataUser);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
            });
    }, []);
    return (
        <>
            <Header />
            <div className='container'>

                <div className='row bg-light' style={{ height: 1500 }}>
                    <div id={styles['aw']} className='col-12 col-sm-6 col-md-3'>
                        <div className={styles['aw12']}>

                            <Image
                            alt="icon"
                                color='#02C1FE'
                                src={circle}
                                width={150}
                            />
                            <Image
                            alt="icon"
                                className={styles['aw23']}
                                color='#02C1FE'
                                src={aset}
                                width={130}
                            />
                        </div>
                        <div >
                            <button id={styles['qwe']} type="button" className="btn btn-transparent text-primary">Select Photo</button>
                        </div>
                        <h1 className='text-center' style={{ fontSize: 25, fontWeight: 'bold' }}>{userData.name}</h1>
                        <div className='text-center' style={{ marginBottom: 40 }}>
                            <FontAwesomeIcon style={{ color: '#2395FF' }} icon={faLocationDot}></FontAwesomeIcon><span style={{ marginLeft: 20 }}>Medan, Indonesia</span>
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <p style={{ marginLeft: 20 }}>Cards<span style={{ color: '#2395FF', float: 'right' }}>+ Add</span></p>

                        </div>
                        <div className='container' style={{ backgroundColor: '#2395FF', borderRadius: 10, width: 300, height: 70 }}>
                            <h5 className='text-center text-white ' style={{ paddingTop: 10 }}>4441 1235 5512 5551</h5>
                            <h5 style={{ color: '#AEFAFF', paddingBottom: 18 }}>X card <span style={{ float: 'right', color: '#AEFAFF' }}>$ 1,440.2</span></h5>
                        </div>
                        <div style={{}}>
                            <div style={{ margin: 15 }}>
                                <button className='btn btn-transparent' style={{ width: 320 }}>
                                    <FontAwesomeIcon style={{ float: 'left', marginRight: 50, marginTop: 3, fontSize: 20, marginLeft: 5 }} icon={faLocationDot}></FontAwesomeIcon><span style={{ float: 'left' }}><Link href="/profile" style={{ textDecoration: 'none', color: 'black' }}>Profile</Link></span><FontAwesomeIcon style={{ color: '#2395FF', float: 'right', marginTop: 5 }} icon={faChevronRight}></FontAwesomeIcon>
                                </button>
                            </div>
                            <div style={{ margin: 15 }}>
                                <button className='btn btn-transparent' style={{ width: 320 }}>
                                    <FontAwesomeIcon style={{ float: 'left', marginRight: 50, marginTop: 3, fontSize: 20 }} icon={faStar}></FontAwesomeIcon><span style={{ float: 'left' }}>My Review</span><FontAwesomeIcon style={{ color: '#2395FF', float: 'right', marginTop: 5 }} icon={faChevronRight}></FontAwesomeIcon>
                                </button>
                            </div>
                            <div style={{ margin: 15 }}>
                                <button className='btn btn-transparent' style={{ width: 320 }}>
                                    <FontAwesomeIcon style={{ float: 'left', marginRight: 50, marginTop: 3, fontSize: 20 }} icon={faGear}></FontAwesomeIcon><span style={{ float: 'left' }}>Settings</span><FontAwesomeIcon style={{ color: '#2395FF', float: 'right', marginTop: 5 }} icon={faChevronRight}></FontAwesomeIcon>
                                </button>
                            </div>
                            <div style={{ margin: 15 }}>
                                <button className='btn btn-transparent' style={{ width: 320, color: 'red' }} onClick={handleLogout}>
                                    <FontAwesomeIcon style={{ float: 'left', marginRight: 50, marginTop: 3, fontSize: 20 }} icon={faRightFromBracket}></FontAwesomeIcon><span style={{ float: 'left' }}>Logout</span><FontAwesomeIcon style={{ color: 'red', float: 'right', marginTop: 5 }} icon={faChevronRight}></FontAwesomeIcon>
                                </button>
                            </div>


                        </div>
                    </div>

                        <div id={styles['aw2']} className='col-12 col-sm-6 col-md-3'>
                            <div className={styles['asd']}>
                                <p style={{ color: '#2395FF', paddingTop: 20, paddingLeft: 30, fontSize: 12 }}>M Y B O O K I N G</p>
                                <h3 style={{ fontWeight: 'bold', paddingLeft: 30, fontSize: 20, marginTop: -10 }}>My Booking<span style={{ color: '#2395FF', float: 'right', fontSize: 15, marginRight: 20 }}>Order History</span></h3>
                            </div>
                    {flightData.map((flight, index) => (
                            <div key={index} className={styles['asd2']}>
                                <p style={{ fontSize: 15 }}>{`${flight.takeoffDate}-${flight.takeoffTime}`}</p>
                                <div>
                                    <p style={{ fontWeight: 'bold', fontSize: 20 }}>{flight.ticket?.from?.code} <FontAwesomeIcon style={{ color: '#979797' }} icon={faPlaneDeparture} className='mx-2'></FontAwesomeIcon> <span>{flight.ticket?.to?.code}</span></p>
                                    <p style={{ color: '#979797', fontSize: 15, marginTop: -10 }}>{`${flight.ticket?.airline?.name}, ${flight.ticket?.from?.code.substr(0, 2)}-${flight.id}`}</p>

                                </div><hr />
                                <div>

                                    <p >Status<span className={`${flight.status.id === 1 ? "bg-warning" : flight.status.id === 2 ? "bg-success" : flight.status.id === 3 ? "bg-danger" : ""}`} style={{ width: 60, color: 'white', marginLeft: 50, padding: 10, borderRadius: 10, fontSize: 15 }}>{flight.status?.name}</span></p>
                                    <a  style={{color:'blue'}} onClick={() => {
                                        if (flight.status.id === 1) {
                                            router.push(`/booking/bookingdetail/payment/${flight.code}`);
                                        } else if (flight.status.id === 2) {
                                            router.push(`/booking/bookingdetail/payment/done/${flight.code}`);
                                        } else if (flight.status.id === 3) {
                                            Swal.fire({
                                                icon: "error",
                                                title: "Oops...",
                                                text: "It appears you have canceled this flight",
                                            });
                                        }
                                    }}>View Detail</a>
                                </div>

                            </div>

))}
                        </div>



                </div>
            </div>
            <Footer />
        </>
    )
}
export default privateRoute(Page);