'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Footer from '../../../../../Components/footer'
import Header from '../../../../../Components/header'
import axios from "axios";
import Cookies from "js-cookie";
import React from 'react'
import Image from 'next/image';
import styles from '../../../../../style/booking.module.css'
import Link from 'next/link';
import plane from '../../../../../Assets/plane2.png'
import countryData from "@/data/countryData";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import qr from '../../../../../Assets/qrcode.png'
import border from '../../../../../Assets/border.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";

const token = Cookies.get("token");

export default function page() {
    const router = useRouter();
    const params = useParams();
    const code = params.code;
    const [dataTicket, setDataTicket] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const API_URL = `https://easy-lime-seal-toga.cyclic.app/`;

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${API_URL}booking/tickets/${code}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((response) => {
                const data = response.data.data;
                // console.log(data);

                const flight = data.result.ticket;
                const takeoffTime = flight.takeoff.substr(11, 5);
                const landingTime = flight.landing.substr(11, 5);
                const takeoffDate = flight.takeoff.substr(0, 10);
                const landingDate = flight.landing.substr(0, 10);

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

                const modifiedData = {
                    ...data,
                    takeoffTime,
                    landingTime,
                    takeoffDate: formattedTakeoffDate,
                    landingDate: formattedLandingDate,
                    timeDistance: formattedTimeDistance,
                };

                setDataTicket(modifiedData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
            });
    }, []);

    console.log(dataTicket);

    const dataClass = () => {
        const price = dataTicket?.result?.ticket?.price;
        let result = "";

        if (price <= 200) {
            return (result = "Economy");
        } else if (price >= 200) {
            return (result = "Business");
        } else if (price >= 500) {
            return (result = "First Class");
        }
    };



    return (
        <>
            <Header />
            <div>

                <div style={{ backgroundColor: '#2395FF', height: 660, width: 1342, marginLeft: 'auto', marginRight: 'auto' }}><p style={{ color: 'transparent' }}>a</p>
                    <div style={{ backgroundColor: 'white', marginTop: 50, marginRight: 50, marginLeft: 50, height: 500, borderRadius: 15, width: 700, marginLeft: 'auto', marginRight: 'auto' }}>
                        <div style={{ padding: 50 }}>

                            <p>Booking Pass<span style={{ float: 'right' }}><FontAwesomeIcon icon={faEllipsisVertical} width={20} /></span></p>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Image src={border} width={600} >

                            </Image>

                        </div>
                        <div style={{ marginTop: -300, marginLeft: 100 }}>
                            <div style={{ display: 'flex' }}>

                                <Image src={dataTicket?.result?.ticket?.airline?.photo} width={100}  height={70} />
                                
                                <p style={{marginTop:25,marginLeft:30,fontWeight:'bold'}}>{dataTicket?.result?.ticket?.from?.code} </p>
                                <Image src={plane} width={20} style={{marginTop:25,marginLeft:30}} />
                                <p style={{marginTop:25,marginLeft:30,fontWeight:'bold'}}>{dataTicket?.result?.ticket?.to?.code}</p>
                            </div>
                            <div className="row mt-4">
                                <div className="col-6" style={{ width: 100, marginRight: 150 }}><label>Code</label><br /><p >{`${dataTicket?.result?.ticket?.from?.code.substr(0, 2)}-${dataTicket?.result?.id}`}</p></div>
                                <div className="col-6" style={{ width: 100 }}><label>Class</label><br /><p>{dataClass()}</p></div>

                            </div>
                            <div className="row">
                                <div className="col-6" style={{ width: 100, marginRight: 150 }}><p>{dataTicket?.result?.ticket?.from?.terminal}</p></div>
                                <div className="col-6" style={{ width: 100}}><label>Gate</label><br /><p>{dataTicket?.result?.id}</p></div>

                            </div>
                            <label>Departure</label>
                            <p>{`${dataTicket.takeoffDate} - ${dataTicket.takeoffTime}`}</p>

                        </div>
                        <div style={{ marginLeft: 530, marginTop: -230 }}>
                            <Image src={qr} width={50} /><br />
                            <Image src={qr} width={50} /><br />
                            <Image src={qr} width={50} /><br />
                            <Image src={qr} width={50} />

                        </div>
                        <div style={{ width: 250,marginLeft:480,marginTop:-129 }}>

                            <p className={styles['tag']}>1234 5678 90AS 6543 21CV</p>
                        </div>

                    </div>
                </div>


            </div>
            <script src="https://unpkg.com/react-phone-input-2@2.x/dist/lib.js"></script>
            <Footer />
        </>
    )
}