'use client';
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Footer from '../../../../Components/footer'
import Header from '../../../../Components/header'
import axios from "axios";
import Cookies from "js-cookie";
import React from 'react'
import Image from 'next/image';
import styles from '../../../../style/booking.module.css'
import Link from 'next/link';
import cc from '../../../../Assets/cc.jpg'
import countryData from "@/data/countryData";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import paypal from '../../../../Assets/Paypal.svg'
import mc from '../../../../Assets/mc.png'
import visa from '../../../../Assets/visa.png'
import stripe from '../../../../Assets/stripe.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import lock from '../../../../Assets/lock.jpeg'
import { faCreditCard } from '@fortawesome/free-solid-svg-icons'
import Swal from "sweetalert2";

const token = Cookies.get("token");

export default function Page() {
    const router = useRouter();
    const params = useParams();
    const code = params.code;
    const [loading, setLoading] = useState(false);
    const API_URL = `https://easy-lime-seal-toga.cyclic.app/`;

    const handleConfirm = async () => {
        console.log("Confirm button clicked");
        try {
            setLoading(true);
            const response = await axios.put(`${API_URL}booking/status/${code}`, { statusId: 2 });
            if (response.status === 200) {
                router.push(`/booking/bookingdetail/payment/done/${code}`);
            } else {
                console.error("Failed to confirm payment.");
            }
        } catch (error) {
            console.error("Error confirming payment:", error);
        } finally {
            setLoading(false);
        }
    };

   

    return (
        <>
            <Header />
            <div>

                <div style={{ backgroundColor: '#2395FF', height: 660, width: 1342, marginLeft: 'auto', marginRight: 'auto' }}><p style={{color:'transparent'}}>a</p>
                    <div style={{ backgroundColor: 'white', marginTop: 50, marginRight: 50, marginLeft: 50, height: 500 }}>
                        <div className="row">
                            <div className="col-6" style={{ marginLeft: 50, width: 600, marginTop: 70 }}>
                                <p>Payment Method</p>
                                <div style={{ width: 550, backgroundColor: '#F5F6FA', padding: 10 }}>
                                    <p>Paypal <Image style={{ float: 'right', marginRight: 30 }} src={paypal} width={20}></Image> </p>
                                    <p>Credit Card <span style={{ float: 'right', marginRight: 30 }}> <Image src={mc} width={40} /><Image style={{ marginLeft: 10 }} src={visa} width={40} /><Image style={{ marginLeft: 10 }} src={stripe} width={40} /><Image style={{ marginLeft: 10 }} src={mc} width={40} /></span> </p>
                                </div>
                                <div>
                                    <label>
                                        Card number
                                    </label>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text" style={{ backgroundColor: 'transparent' }} ><Image src={cc} width={20} /></span>
                                        <input id={styles['spn']} type="text" className="form-control" placeholder="000 000 000 000 00" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                        <div className="row">
                                            <div className="col-6"><label>Expiry Date</label>
                                            <div className="input-group mb-3">
                                        <input type="date" className="form-control" placeholder="000 000 000 000 00" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                            </div>
                                            <div className="col-6"> <div className="col-6"><label>CVC/CVV</label>
                                            <div className="input-group mb-3" style={{width:276}}>
                                            <span className="input-group-text" style={{ backgroundColor: 'transparent' }} ><Image src={lock} width={20} /></span>
                                        <input id={styles['spn']} type="text" className="form-control" placeholder="000" aria-label="Username" aria-describedby="basic-addon1" />
                                    </div>
                                            </div></div>
                                        </div>
                                        <p><Image src={lock} width={20} />Your transcation is secured with ssl certificate</p>
                                </div>
                            </div>
                            <div className="col-6" style={{ width: 500, marginTop: 70 }}>
                                <p>Summary</p>
                                <div>
                                    <p style={{marginBottom:-5}}>Pro(Billed mothly)<span style={{float:'right'}}>/month</span></p>
                                    <a href="#" style={{fontSize:10}}>Save 20% with annual billing</a><hr/>
                                    <p style={{marginBottom:-5}}>Refferal Bonouses<span style={{float:'right'}}>-</span></p><br/>
                                    <p style={{marginBottom:-5}}>Vat<span style={{float:'right'}}>-</span></p><hr/>
                                    <p style={{marginBottom:0}}>Today you pay(US Dollars)<span style={{float:'right'}}>/month</span></p>
                                    <p style={{fontSize:10}}>After 30 days $9.59</p><br/>

                                    <button type="button" class="btn btn-primary" style={{width:500}} onClick={handleConfirm}>Try it Free 30 Days</button>
                                    <a style={{marginLeft:170}} href="#">Have a promo Code ?</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
            <script src="https://unpkg.com/react-phone-input-2@2.x/dist/lib.js"></script>
            <Footer />
        </>
    )
}