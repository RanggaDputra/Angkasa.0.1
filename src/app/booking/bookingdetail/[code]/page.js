'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Footer from '../../../Components/footer'
import Header from '../../../Components/header'
import axios from "axios";
import Cookies from "js-cookie";
import React from 'react'
import Image from 'next/image';
import styles from '../../../style/booking.module.css'
import Link from 'next/link';
import Swal from "sweetalert2";
import fly from '../../../Assets/fly.png'
import countryData from "@/data/countryData";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import garuda from '../../../Assets/Garuda.png'
// import fly2 from '../../../Assets/fly2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import centang from '../../../Assets/centang.png'
import { privateRoute } from "../../../../data/Private";
import { faArrowRightArrowLeft, faChevronUp, faArrowsUpDown, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'

const token = Cookies.get("token");

function Page() {
    const router = useRouter();
    const params = useParams();
    const code = params.code;
    const API_URL = `https://easy-lime-seal-toga.cyclic.app/`;
    const [isFlightPayment, setIsFlightPayment] = useState(true);
    const [isPassenger, setIsPassenger] = useState(true);
    const [insurance, setInsurance] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedCountry1, setSelectedCountry1] = useState("Indonesia");
    const [selectedCountry2, setSelectedCountry2] = useState("Indonesia");
    const [isFlightData, setIsFlightData] = useState([]);
    const [contactPerson, setContactPerson] = useState({
        title1: "Mr.",
        fullname1: "",
        nationality1: "",
    });
    const [passengerDetails, setPassengerDetails] = useState({
        title2: "",
        fullname2: "",
        nationality2: "",
    });

    const handleCountryChange1 = (event) => {
        setSelectedCountry1(event.target.value);
    };

    const handleCountryChange2 = (event) => {
        setSelectedCountry2(event.target.value);
    };
    const handleInsurance = () => {
        if (insurance) {
            setInsurance(false);
        } else {
            setInsurance(true);
        }
    };

    const handleProceed = () => {
        let isValid = true;
        setLoading(true);

        if (!contactPerson.fullname1 || !selectedCountry1) {
            Swal.fire("Please fill in all fields", "To continue, please fill in all fields correctly", "warning");
            isValid = false;
            console.log("di data 1");
            console.log(contactPerson.fullname1);
            console.log(selectedCountry1);
            setLoading(false);
        }

        if (!isPassenger && (!passengerDetails.title2 || !passengerDetails.fullname2 || !selectedCountry2)) {
            Swal.fire("Please fill in all fields", "To continue, please fill in all fields correctly", "warning");
            isValid = false;
            console.log("di data 2");
            setLoading(false);
        }

        if (isValid) {
            const postData = {
                title1: contactPerson.title1,
                fullname1: contactPerson.fullname1,
                nationality1: selectedCountry1,
                title2: isPassenger ? passengerDetails.title2 : contactPerson.title1,
                fullname2: isPassenger ? passengerDetails.fullname2 : contactPerson.fullname1,
                nationality2: isPassenger ? selectedCountry2 : selectedCountry1,
            };

            axios
                .post(`${API_URL}booking/tickets/${code}`, postData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    console.log("Response from API:", response.data);

                    const responseData = response.data.data;
                    const responseCode = responseData.code;

                    if (responseCode) {
                        setTimeout(() => {
                            router.push(`/booking/bookingdetail/payment/${responseCode}`);
                            setLoading(false);
                        }, 2000);
                    } else {
                        console.error("API response does not contain code.");
                    }
                })
                .catch((error) => {
                    console.error("Error sending data to API:", error);
                    setLoading(false);
                });
        }
    };

    useEffect(() => {
        axios
            .get(`${API_URL}airlines/flight/${code}`)
            .then((response) => {
                const data = response.data.data;

                const flight = data;
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
                    ...flight,
                    takeoffTime,
                    landingTime,
                    takeoffDate: formattedTakeoffDate,
                    landingDate: formattedLandingDate,
                    timeDistance: formattedTimeDistance,
                };

                setIsFlightData(modifiedData);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
            });
    }, []);

    return (
        <>
            <Header />
            <div className='container'>

                <div className={styles['col-menu']}>
                    <Image
                        color='#02C1FE'
                        src={fly}
                        width={150}
                    />
                    <div className={styles['box-item']}>
                        <div style={{ width: 600, marginLeft: -100, borderRadius: 10 }}><p className='text-white'>Contact Person Details</p>
                            <div className={styles['box']}>
                                <form className={styles['tag-main2']}>
                                    <label for="exampleFormControlInput1" class="form-label" style={{ color: '#9B96AB' }}>Full Name</label><br />
                                    <input type="text" name="name" placeholder='Username' className={styles['input-login']}  value={contactPerson.fullname1}
                                        onChange={(e) => setContactPerson({ ...contactPerson, fullname1: e.target.value })}></input><br />
                                    <label for="exampleFormControlInput1" class="form-label" style={{ color: '#9B96AB' }}>Email</label><br />
                                    <input type="email" name="Email" placeholder='Email' className={styles['input-login']}></input><br />
                                    <label for="exampleFormControlInput1" class="form-label" style={{ color: '#9B96AB' }}>Country</label><br />
                                    <select name="country1" id={styles['drop']} className="form-select" value={selectedCountry1} onChange={handleCountryChange1}>
                                        {countryData.map((country) => (
                                            <option key={country.code} value={country.name}>
                                                {country.name}
                                            </option>
                                        ))}
                                    </select>

                                </form>
                            </div>
                        </div>
                        <div style={{  width: 400, marginLeft: 100 }}><p className='text-white'>Flight Details<span className='text-white' style={{ marginLeft: 130 }}>View Detail</span></p>
                            <div className={styles['box2']}>
                                <div className={styles['main-col22']}>
                                    <Image
                                        className={styles['img-main-col']}
                                        color='#02C1FE'
                                        src={isFlightData.photo}
                                        width={100}
                                        height={60}
                                    />
                                    <p style={{ marginTop: 30, fontSize: 13, marginLeft: 10 }}>{isFlightData.name}</p>
                                </div>
                                {isFlightData && isFlightData.from && isFlightData.to && (
                                    
                                <div style={{  marginLeft: 15, marginTop: 20 }} className={styles['box-item3']}>
                                    <div className={styles['box-chil']}>

                                        <h2 style={{  fontSize: 20, color: 'black', fontWeight: 'bold' }}>{isFlightData.from.location}</h2>

                                    </div>
                                    <div style={{marginLeft:-20}} className={styles['box-chil2']}><FontAwesomeIcon style={{ marginTop: 35, color: '#979797'}} icon={faPlaneDeparture}></FontAwesomeIcon></div>
                                    <div  className={styles['box-chil']}>

                                        <h2 style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{isFlightData.to.location}</h2>

                                    </div>

                                    
                                </div>
                                    )}
                                <div style={{ display: 'flex', gap: 10, marginTop: 20, fontSize: 15, marginLeft: 15 }}>

                                    <p>{isFlightData.takeoffDate}</p>
                                    <li>{`${isFlightData.takeoffTime} - ${isFlightData.landingTime}`}</li>
                                </div>
                                <div style={{ display: 'flex', marginLeft: 15 }}>
                                    <Image
                                        // className={styles['img-main-col']}
                                        color='#02C1FE'
                                        src={centang}
                                        width={20}
                                    /><p style={{ color: '#2395FF', marginLeft: 10 }}>Refundable</p>
                                </div>
                                <div style={{ display: 'flex', marginLeft: 15 }}>
                                    <Image
                                        // className={styles['img-main-col']}
                                        color='#02C1FE'
                                        src={centang}
                                        width={20}
                                    /><p style={{ color: '#2395FF', marginLeft: 10 }}>Can reschedule</p>
                                </div><hr style={{ marginTop: -5 }} />
                                <div style={{ display: 'flex', marginLeft: 15 }}>
                                    <h4>Total Payment</h4>
                                    <h4 style={{ marginLeft: 40, color: '#2395FF' }}> {!isPassenger ? `$ ${insurance ? isFlightData.price * 2 + 2 : isFlightData.price * 2},00` : `$ ${insurance ? isFlightData.price + 2 : isFlightData.price},00`}</h4>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div style={{ height: 1150, backgroundColor: '#F5F6FA' }}>
                    <h1 style={{ paddingTop: 300, marginLeft: 50, fontSize: 25 }}>Passenger Details</h1>
                    <div className={styles['box3']}>
                        <div style={{color:'transparent'}}>a</div>
                        <div style={{ display: 'flex', backgroundColor: '#8AF3CD', fontSize: 15, marginTop: 20, width: 630, marginLeft: 5, borderRadius: 10,marginBottom:20 }}>
                            <p style={{ marginLeft: 20, marginTop: 20}}>Passenger : 1 Adult</p>
                            <div className="form-check form-switch form-check-reverse" style={{ marginLeft: 150, marginTop: 20 }}>
                                <input className="form-check-input" type="checkbox" id="flexSwitchCheckReverse" />
                                <label className="form-check-label" for="flexSwitchCheckReverse">Reverse switch checkbox input</label>
                            </div>
                        </div>
                        <div >
                            <label for="exampleFormControlInput1" class="form-label" style={{ color: '#9B96AB' }}>Title</label><br />
                            <div  className="input-group mb-3" style={{ width: 100 }}>

                                <select id={styles['drop']} className="form-select"  value={passengerDetails.title2}
                                        onChange={(e) => setPassengerDetails({ ...passengerDetails, title2: e.target.value })} >
                                    <option selected value={"Mr."}>Mr.</option>
                                    <option value={"Ms."}>Mrs.</option>


                                </select>
                                
                            </div><hr style={{width:600}}/>
                            <form>

                            <label for="exampleFormControlInput1" class="form-label" style={{ color: '#9B96AB' }}>Full Name</label><br />
                            <input id={styles['drop']} type="text" name="name" placeholder='Username' className={styles['input-login']}  value={passengerDetails.fullname2}
                                        onChange={(e) => setPassengerDetails({ ...passengerDetails, fullname2: e.target.value })}></input><br />
                            </form><hr style={{width:600}}/>
                            
                            
                            <label for="exampleFormControlInput1" class="form-label" style={{ color: '#9B96AB' }}>Title</label><br />
                            <div className="input-group mb-3" style={{ width: 150 }}>

                                <select  id={styles['drop']} className="form-select"  name="country" value={selectedCountry2}
                                        onChange={handleCountryChange2} >
                                     {countryData.map((country) => (
                                            <option key={country.code} value={country.name}>
                                                {country.name}
                                            </option>
                                        ))}


                                </select>
                                
                            </div><hr style={{width:600}}/>

                        </div>
                    </div>
                    <h1 style={{ marginLeft: 50, fontSize: 25 ,marginTop:30,marginBottom:20}}>Passenger Details</h1>
                    <div className={styles['box4']}>
                        <div style={{ display: 'flex'}}>
                            <div className="form-check" style={{marginTop:20,marginLeft:20}}>
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"  onClick={handleInsurance}/>
                                    <label className="form-check-label" for="flexCheckDefault">
                                    Travel Insurance
                                    </label>
                            </div>
                            <p style={{color:'#2395FF',marginLeft:400,marginTop:20}}>$ 2,00<span style={{color:'#979797'}}>/pax</span></p>
                        </div><hr/>
                        <div>
                        <p style={{marginLeft:20}}>Get travel compensation up to $ 10.000,00</p>
                        </div>
                        
                        
                    </div>

                    <button id={styles['btn-save']} style={{marginLeft:200,width:300,marginTop:30,backgroundColor:'#2395FF'}}type="button" onClick={handleProceed} class="btn btn-primary"><Link href="/search" style={{ textDecoration: 'none',color:'white' }}>Proceed to Payment</Link></button>
                </div>


            </div>
            <script src="https://unpkg.com/react-phone-input-2@2.x/dist/lib.js"></script>
            <Footer />
        </>
    )
}
export default privateRoute(Page);