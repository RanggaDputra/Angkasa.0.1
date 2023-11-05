"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Header from '../Components/header'
import styles from '../style/booking.module.css'
import Image from 'next/image';
import fly from '../Assets/fly.png'
import fly2 from '../Assets/fly2.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightArrowLeft, faChevronUp, faArrowsUpDown, faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link';
import Footer from '../Components/footer'
import axios from "axios";
import { useRouter } from "next/navigation";
import { privateRoute } from "../../data/Private";

function Page() {
    const [initialData, setInitialData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortData, setSortData] = useState(false);
    const [flightData, setFlightData] = useState([]);
    const router = useRouter()
    const [filtersTransit, setFiltersTransit] = useState({
        direct: false,
        transit: false,
        transit2plus: false,
    });
    const [filtersFacilities, setFiltersFacilities] = useState({
        baggage: false,
        meal: false,
        wifi: false,
    });

    const [filtersDepartureTime, setFiltersDepartureTime] = useState({
        "0-6": false,
        "6-12": false,
        "12-18": false,
        "18-24": false,
    });

    const [filtersArrivalTime, setFiltersArrivalTime] = useState({
        "0-6": false,
        "6-12": false,
        "12-18": false,
        "18-24": false,
    });

    const [filtersAirlines, setFiltersAirlines] = useState({
        garudaId: false,
        airAsia: false,
        lionAir: false,
        singaporeAirlines: false,
        Citylink: false,
    });

    const [filtersFrom, setFiltersFrom] = useState({
        "New York, USA": false,
        "London, UK": false,
        "Paris, France": false,
        "Sydney, Australia": false,
        "Tokyo, Japan": false,
        "Bali, Indonesia": false,
        "Jakarta, Indonesia": false,
        "Singapore, Singapore": false,
        "Kuala Lumpur, Malaysia": false,
        "Medan, Indonesia": false,
    });

    const [filtersTo, setFiltersTo] = useState({
        "New York, USA": false,
        "London, UK": false,
        "Paris, France": false,
        "Sydney, Australia": false,
        "Tokyo, Japan": false,
        "Bali, Indonesia": false,
        "Jakarta, Indonesia": false,
        "Singapore, Singapore": false,
        "Kuala Lumpur, Malaysia": false,
        "Medan, Indonesia": false,
    });
    const toggleFilter = (filterName) => {
        setFiltersTransit((prevFilters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };

    const toggleFilterFacilities = (filterName) => {
        setFiltersFacilities((prevFilters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };

    const toggleFilterDeparture = (filterName) => {
        setFiltersDepartureTime((prevFilters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };

    const toggleFilterArrival = (filterName) => {
        setFiltersArrivalTime((prevFilters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };

    const toggleFilterAirlines = (filterName) => {
        setFiltersAirlines((prevFilters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };

    const toggleFilterFrom = (filterName) => {
        setFiltersFrom((prevFilters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };

    const toggleFilterTo = (filterName) => {
        setFiltersTo((prevFilters) => ({
            ...prevFilters,
            [filterName]: !prevFilters[filterName],
        }));
    };

    const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
    const [priceRangeMobile, setPriceRangeMobile] = useState({ min: 0, max: 1000 });

    const sortedFlightData = sortData ? flightData.slice().reverse() : [...flightData];
    const filteredData = sortedFlightData.filter((flight) => {
        let isFlightMatched = true;

        if (!filtersTransit.direct && !filtersTransit.transit && !filtersTransit.transit2plus) {
        } else {
            if (!((filtersTransit.direct && flight.transit === 0) || (filtersTransit.transit && flight.transit === 1) || (filtersTransit.transit2plus && flight.transit >= 2))) {
                isFlightMatched = false;
            }
        }

        if (!filtersFacilities.baggage && !filtersFacilities.meal && !filtersFacilities.wifi) {
        } else {
            const selectedFacilities = [];

            if (filtersFacilities.baggage) selectedFacilities.push("baggage");
            if (filtersFacilities.meal) selectedFacilities.push("meal");
            if (filtersFacilities.wifi) selectedFacilities.push("wifi");

            if (!selectedFacilities.every((facility) => flight.facilities.includes(facility))) {
                isFlightMatched = false;
            }
        }

        if (!filtersDepartureTime["0-6"] && !filtersDepartureTime["6-12"] && !filtersDepartureTime["12-18"] && !filtersDepartureTime["18-24"]) {
        } else {
            const flightDepartureHour = parseInt(flight.takeoffTime.split(":")[0]);

            if (
                (filtersDepartureTime["0-6"] && flightDepartureHour >= 0 && flightDepartureHour < 6) ||
                (filtersDepartureTime["6-12"] && flightDepartureHour >= 6 && flightDepartureHour < 12) ||
                (filtersDepartureTime["12-18"] && flightDepartureHour >= 12 && flightDepartureHour < 18) ||
                (filtersDepartureTime["18-24"] && flightDepartureHour >= 18)
            ) {
            } else {
                isFlightMatched = false;
            }
        }

        if (!filtersArrivalTime["0-6"] && !filtersArrivalTime["6-12"] && !filtersArrivalTime["12-18"] && !filtersArrivalTime["18-24"]) {
        } else {
            const flightArrivalHour = parseInt(flight.landingTime.split(":")[0]);

            if (
                (filtersArrivalTime["0-6"] && flightArrivalHour >= 0 && flightArrivalHour < 6) ||
                (filtersArrivalTime["6-12"] && flightArrivalHour >= 6 && flightArrivalHour < 12) ||
                (filtersArrivalTime["12-18"] && flightArrivalHour >= 12 && flightArrivalHour < 18) ||
                (filtersArrivalTime["18-24"] && flightArrivalHour >= 18)
            ) {
            } else {
                isFlightMatched = false;
            }
        }

        if (!filtersAirlines.garudaId && !filtersAirlines.airAsia && !filtersAirlines.lionAir && !filtersAirlines.singaporeAirlines && !filtersAirlines.Citylink) {
        } else {
            const selectedAirlines = [];

            if (filtersAirlines.garudaId) selectedAirlines.push("Garuda Indonesia");
            if (filtersAirlines.airAsia) selectedAirlines.push("AirAsia Indonesia");
            if (filtersAirlines.lionAir) selectedAirlines.push("Lion Air");
            if (filtersAirlines.singaporeAirlines) selectedAirlines.push("Singapore Airlines");
            if (filtersAirlines.Citylink) selectedAirlines.push("Citilink");

            if (!selectedAirlines.includes(flight.name)) {
                isFlightMatched = false;
            }
        }

        if (
            !filtersFrom["New York, USA"] &&
            !filtersFrom["London, UK"] &&
            !filtersFrom["Paris, France"] &&
            !filtersFrom["Sydney, Australia"] &&
            !filtersFrom["Tokyo, Japan"] &&
            !filtersFrom["Bali, Indonesia"] &&
            !filtersFrom["Jakarta, Indonesia"] &&
            !filtersFrom["Singapore, Singapore"] &&
            !filtersFrom["Kuala Lumpur, Malaysia"] &&
            !filtersFrom["Medan, Indonesia"]
        ) {
        } else {
            const selectedFrom = [];

            if (filtersFrom["New York, USA"]) selectedFrom.push("New York, USA");
            if (filtersFrom["London, UK"]) selectedFrom.push("London, UK");
            if (filtersFrom["Paris, France"]) selectedFrom.push("Paris, France");
            if (filtersFrom["Sydney, Australia"]) selectedFrom.push("Sydney, Australia");
            if (filtersFrom["Tokyo, Japan"]) selectedFrom.push("Tokyo, Japan");
            if (filtersFrom["Bali, Indonesia"]) selectedFrom.push("Bali, Indonesia");
            if (filtersFrom["Jakarta, Indonesia"]) selectedFrom.push("Jakarta, Indonesia");
            if (filtersFrom["Singapore, Singapore"]) selectedFrom.push("Singapore");
            if (filtersFrom["Kuala Lumpur, Malaysia"]) selectedFrom.push("Kuala Lumpur, Malaysia");
            if (filtersFrom["Medan, Indonesia"]) selectedFrom.push("Medan, Indonesia");

            if (!selectedFrom.includes(flight.from.location)) {
                isFlightMatched = false;
            }

            // console.log(flight.from.country);
        }

        if (
            !filtersTo["New York, USA"] &&
            !filtersTo["London, UK"] &&
            !filtersTo["Paris, France"] &&
            !filtersTo["Sydney, Australia"] &&
            !filtersTo["Tokyo, Japan"] &&
            !filtersTo["Bali, Indonesia"] &&
            !filtersTo["Jakarta, Indonesia"] &&
            !filtersTo["Singapore, Singapore"] &&
            !filtersTo["Kuala Lumpur, Malaysia"] &&
            !filtersTo["Medan, Indonesia"]
        ) {
        } else {
            const selectedTo = [];

            if (filtersTo["New York, USA"]) selectedTo.push("New York, USA");
            if (filtersTo["London, UK"]) selectedTo.push("London, UK");
            if (filtersTo["Paris, France"]) selectedTo.push("Paris, France");
            if (filtersTo["Sydney, Australia"]) selectedTo.push("Sydney, Australia");
            if (filtersTo["Tokyo, Japan"]) selectedTo.push("Tokyo, Japan");
            if (filtersTo["Bali, Indonesia"]) selectedTo.push("Bali, Indonesia");
            if (filtersTo["Jakarta, Indonesia"]) selectedTo.push("Jakarta, Indonesia");
            if (filtersTo["Singapore, Singapore"]) selectedTo.push("Singapore");
            if (filtersTo["Kuala Lumpur, Malaysia"]) selectedTo.push("Kuala Lumpur, Malaysia");
            if (filtersTo["Medan, Indonesia"]) selectedTo.push("Medan, Indonesia");

            if (!selectedTo.includes(flight.to.location)) {
                isFlightMatched = false;
            }
        }

        if (flight.price < priceRange.min || flight.price > priceRange.max) {
            return false;
        }

        if (flight.price < priceRangeMobile.min || flight.price > priceRangeMobile.max) {
            return false;
        }

        return isFlightMatched;
    });
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}airlines/flight-all`)
            .then((response) => {
                const data = response.data.data.tickets;

                const modifiedData = data.map((flight) => {
                    const takeoffTime = flight.takeoff.substr(11, 5);
                    const landingTime = flight.landing.substr(11, 5);

                    const takeoffHour = parseInt(takeoffTime.split(":")[0]);
                    const takeoffMinute = parseInt(takeoffTime.split(":")[1]);
                    const landingHour = parseInt(landingTime.split(":")[0]);
                    const landingMinute = parseInt(landingTime.split(":")[1]);

                    const hours = landingHour - takeoffHour;
                    const minutes = landingMinute - takeoffMinute;

                    const formattedTimeDistance = `${hours} hours ${minutes} minutes`;

                    return {
                        ...flight,
                        takeoffTime,
                        landingTime,
                        timeDistance: formattedTimeDistance,
                    };
                });

                setFlightData(modifiedData);
                setInitialData(modifiedData);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data: ", error);
                setIsLoading(false);
            });
    }, []);

    const resetFilters = () => {
        setFiltersTransit({
            direct: false,
            transit: false,
            transit2plus: false,
        });
        setFiltersFacilities({
            baggage: false,
            meal: false,
            wifi: false,
        });
        setFiltersDepartureTime({
            "0-6": false,
            "6-12": false,
            "12-18": false,
            "18-24": false,
        });
        setFiltersArrivalTime({
            "0-6": false,
            "6-12": false,
            "12-18": false,
            "18-24": false,
        });
        setFiltersAirlines({
            garudaId: false,
            airAsia: false,
            lionAir: false,
            singaporeAirlines: false,
            Citylink: false,
        });
        setPriceRange({ min: 0, max: 1000 });
        setPriceRangeMobile({ min: 0, max: 1000 });
        setFiltersFrom({
            "New York, USA": false,
            "London, UK": false,
            "Paris, France": false,
            "Sydney, Australia": false,
            "Tokyo, Japan": false,
            "Bali, Indonesia": false,
            "Jakarta, Indonesia": false,
            "Singapore, Singapore": false,
            "Kuala Lumpur, Malaysia": false,
            "Medan, Indonesia": false,
        });
        setFiltersTo({
            "New York, USA": false,
            "London, UK": false,
            "Paris, France": false,
            "Sydney, Australia": false,
            "Tokyo, Japan": false,
            "Bali, Indonesia": false,
            "Jakarta, Indonesia": false,
            "Singapore, Singapore": false,
            "Kuala Lumpur, Malaysia": false,
            "Medan, Indonesia": false,
        });
    };

    return (
        <>
            <Header />
            <div className='container'>
                <div className={styles['col-menu']}>
                    <Image
                    alt="icon"
                        color='#02C1FE'
                        src={fly}
                        width={150}
                    />
                    <Image
                    alt="icon"
                        className={styles['img-item']}
                        src={fly2}
                        width={50}
                    />
                    <div className={styles['box-item']}>
                        <div className={styles['box-chil']}>
                            <h5 style={{ fontSize: 13, color: 'white' }}>From</h5>
                            <h2 style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Medan(IDN)</h2>
                        </div>
                        <div className={styles['box-chil2']}><FontAwesomeIcon style={{ marginTop: 50 }} icon={faArrowRightArrowLeft}></FontAwesomeIcon></div>
                        <div className={styles['box-chil']}>
                            <h5 style={{ fontSize: 13, color: 'white', textAlign: 'right' }}>To</h5>
                            <h2 style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Tokyo(JPN)</h2>
                        </div>
                    </div>
                    <div className={styles['box-item2']}>
                        <p>Monday, 20 July 20</p>
                        <li>6 Passenger</li>
                        <li>Economy</li>
                    </div>
                    <p style={{ textAlign: 'right', color: 'white', marginTop: -70, marginRight: 40 }}>Change Search</p>
                </div>
                <div className={styles['col-chil']}>
                    <div className={styles['row-chil2']}>
                        <div className={styles['col-tag']}>
                            <h2 >Filter</h2>
                            <a style={{ marginLeft: 250, textDecoration: 'none' }} onClick={resetFilters} >Reset</a>
                        </div>
                        <div className={styles['row-chill']}>
                            <div>
                                <p>
                                    <button style={{ border: 'none' }} className="btn btn-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample2" aria-expanded="false" aria-controls="collapseWidthExample2">
                                        Transit <FontAwesomeIcon style={{ color: '#2395FF', marginLeft: 250 }} icon={faChevronUp}></FontAwesomeIcon>
                                    </button>
                                </p>
                                <div>
                                    <div className="collapse collapse-horizontal" id="collapseWidthExample2">
                                        <div className="card card-body" style={{ width: 350, border: 'none' }}>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Direct
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersTransit.direct} onChange={() => toggleFilter("direct")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Transit
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersTransit.transit} onChange={() => toggleFilter("transit")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Transit 2+
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersTransit.transit2plus} onChange={() => toggleFilter("transit2plus")} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className={styles['line-tag']} />
                            <div >
                                <p>
                                    <button style={{ border: 'none' }} className="btn btn-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample3" aria-expanded="false" aria-controls="collapseWidthExample3">
                                        Facilities <FontAwesomeIcon style={{ color: '#2395FF', marginLeft: 235 }} icon={faChevronUp}></FontAwesomeIcon>
                                    </button>
                                </p>
                                <div>
                                    <div className="collapse collapse-horizontal" id="collapseWidthExample3">
                                        <div className="card card-body" style={{ width: 350, border: 'none' }}>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Baggage
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersFacilities.baggage} onChange={() => toggleFilterFacilities("baggage")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Meal
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersFacilities.meal} onChange={() => toggleFilterFacilities("meal")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Wifi
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersFacilities.wifi} onChange={() => toggleFilterFacilities("wifi")} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className={styles['line-tag']} />
                            <div >
                                <p>
                                    <button style={{ border: 'none', fontSize: 14 }} className="btn btn-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample4" aria-expanded="false" aria-controls="collapseWidthExample">
                                        Departure Time <FontAwesomeIcon style={{ color: '#2395FF', marginLeft: 198, fontSize: 18 }} icon={faChevronUp}></FontAwesomeIcon>
                                    </button>
                                </p>
                                <div>
                                    <div className="collapse collapse-horizontal" id="collapseWidthExample4">
                                        <div className="card card-body" style={{ width: 350, border: 'none' }}>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    00:00 - 06:00
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersDepartureTime["0-6"]} onChange={() => toggleFilterDeparture("0-6")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    06:00 - 12:00
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersDepartureTime["6-12"]} onChange={() => toggleFilterDeparture("6-12")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    12:00 - 18:00
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersDepartureTime["12-18"]} onChange={() => toggleFilterDeparture("12-18")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    18:00 - 24:00
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersDepartureTime["18-24"]} onChange={() => toggleFilterDeparture("18-24")} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className={styles['line-tag']} />
                            <div>
                                <p>
                                    <button style={{ border: 'none' }} className="btn btn-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample5" aria-expanded="false" aria-controls="collapseWidthExample">
                                        Time Arrived<FontAwesomeIcon style={{ color: '#2395FF', marginLeft: 210 }} icon={faChevronUp}></FontAwesomeIcon>
                                    </button>
                                </p>
                                <div>
                                    <div className="collapse collapse-horizontal" id="collapseWidthExample5">
                                        <div className="card card-body" style={{ width: 350, border: 'none' }}>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    00:00 - 06:00
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersArrivalTime["0-6"]} onChange={() => toggleFilterArrival("0-6")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    06:00 - 12:00
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersArrivalTime["6-12"]} onChange={() => toggleFilterArrival("6-12")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    12:00 - 18:00
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersArrivalTime["12-18"]} onChange={() => toggleFilterArrival("12-18")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    18:00 - 24:00
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersArrivalTime["18-24"]} onChange={() => toggleFilterArrival("18-24")} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className={styles['line-tag']} />
                            <div >
                                <p>
                                    <button style={{ border: 'none' }} className="btn btn-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample6" aria-expanded="false" aria-controls="collapseWidthExample">
                                        Airlines<FontAwesomeIcon style={{ color: '#2395FF', marginLeft: 250 }} icon={faChevronUp}></FontAwesomeIcon>
                                    </button>
                                </p>
                                <div>
                                    <div className="collapse collapse-horizontal" id="collapseWidthExample6">
                                        <div className="card card-body" style={{ width: 350, border: 'none' }}>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Garuda Indonesia
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersAirlines.garudaId} onChange={() => toggleFilterAirlines("garudaId")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Air Asia
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersAirlines.airAsia} onChange={() => toggleFilterAirlines("airAsia")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Lion Air
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersAirlines.lionAir} onChange={() => toggleFilterAirlines("lionAir")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Singapore Airlines
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersAirlines.singaporeAirlines} onChange={() => toggleFilterAirlines("singaporeAirlines")} />
                                            </div>
                                            <div className="form-check">
                                                <label className="form-check-label" htmlFor="flexCheckDefault">
                                                    Citilink
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={filtersAirlines.Citylink} onChange={() => toggleFilterAirlines("Citylink")} />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                            <hr className={styles['line-tag']} />
                          
                           
                            {/* <div >
                                <p>
                                    <button style={{ border: 'none' }} className="btn btn-transparent" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample7" aria-expanded="false" aria-controls="collapseWidthExample">
                                        Ticket Price<FontAwesomeIcon style={{ color: '#2395FF', marginLeft: 215 }} icon={faChevronUp}></FontAwesomeIcon>
                                    </button>
                                </p>
                                <div>
                                    <div className="collapse collapse-horizontal" id="collapseWidthExample7">
                                        <div className="card card-body" style={{ width: 350, border: 'none' }}>
                                            <div class="form-check">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Default checkbox
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                            <div class="form-check">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Default checkbox
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                            <div class="form-check">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    Default checkbox
                                                </label>
                                                <input style={{ marginLeft: 280, marginTop: -20 }} class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className={styles['line-tag']} />  */}





                        </div>
                    </div>
                    <div className={styles['row-chil']}>

                        <div className={styles['col-tag2']}>
                            <h2 style={{ fontSize: 23 }}>Select Ticket<span style={{ fontSize: 12 }}>{`(${filteredData.length} flight found)`}</span></h2>
                            <p style={{ marginLeft: 280 }}>Sort By <FontAwesomeIcon style={{}} icon={faArrowsUpDown}></FontAwesomeIcon></p>
                        </div>
                        {isLoading ? (
                            <div className="flex flex-col justify-center items-center mt-32">
                                {/* <Image src={airplaneLoading} alt="Loading" width={100} height={100} className="bg-slate-100" /> */}
                                <p className="text-main text-lg font-semibold">Loading...</p>
                            </div>
                        ) : (
                            <div>
                                {filteredData.length === 0 ? (
                                    <div className="flex flex-col justify-center items-center mt-32">
                                        {/* <Image src={notfoundFlight} width={100} alt="NotFoundFlight" /> */}
                                        <p className="text-abu text-lg font-poppins font-semibold">Flight not found</p>
                                    </div>
                                ) : (
                                    filteredData.map((flight, index) => (
                                        <div key={index}>
                                            <div className={styles['box-master']} style={{ backgroundColor: 'white', marginTop: 20 }}>
                                                <div className={styles['main-col']}>
                                                    <Image
                                                    alt="icon"
                                                        className={styles['img-main-col']}
                                                        color='#02C1FE'
                                                        src={flight.photo}
                                                        width={90}
                                                        height={52}
                                                    />
                                                    <p style={{ marginTop: 30, fontSize: 13, marginLeft: 10 }}>{flight.name}</p>
                                                </div>
                                                <div className={styles['main2-col']}>
                                                    <div style={{ width: 150, marginLeft: 20 }}>
                                                        <div className={styles['box-item3']}>
                                                            <div className={styles['box-chil']}>

                                                                <h2 style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{flight.from.code}</h2>
                                                                <h5 style={{ fontSize: 13, color: '#6B6B6B' }}>{flight.takeoffTime}</h5>
                                                            </div>
                                                            <div className={styles['box-chil2']}><FontAwesomeIcon style={{ marginTop: 50, color: '#979797' }} icon={faPlaneDeparture}></FontAwesomeIcon></div>
                                                            <div className={styles['box-chil']}>

                                                                <h2 style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>{flight.to.code}</h2>
                                                                <h5 style={{ fontSize: 13, color: '#6B6B6B' }}>{flight.landingTime}</h5>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div style={{ width: 120, fontSize: 13 }}>
                                                        <p style={{ textAlign: 'center' }}>{flight.timeDistance}</p>
                                                        <p style={{ textAlign: 'center', marginTop: -10 }}>{`${flight.transit} transit`}
                                                        </p></div>
                                                    <div style={{ width: 80 }}>
                                                        <div style={{ marginTop: 10 }}>

                                                            {flight.facilities.includes("baggage") && (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 26 26" fill="none" className="block">
                                                                    <path
                                                                        d="M18.4167 6.49999H16.25V3.24999C16.25 2.65416 15.7625 2.16666 15.1667 2.16666H10.8334C10.2375 2.16666 9.75002 2.65416 9.75002 3.24999V6.49999H7.58335C6.39169 6.49999 5.41669 7.47499 5.41669 8.66666V20.5833C5.41669 21.775 6.39169 22.75 7.58335 22.75C7.58335 23.3458 8.07085 23.8333 8.66669 23.8333C9.26252 23.8333 9.75002 23.3458 9.75002 22.75H16.25C16.25 23.3458 16.7375 23.8333 17.3334 23.8333C17.9292 23.8333 18.4167 23.3458 18.4167 22.75C19.6084 22.75 20.5834 21.775 20.5834 20.5833V8.66666C20.5834 7.47499 19.6084 6.49999 18.4167 6.49999ZM10.2917 19.5H8.66669V9.74999H10.2917V19.5ZM13.8125 19.5H12.1875V9.74999H13.8125V19.5ZM14.625 6.49999H11.375V3.79166H14.625V6.49999ZM17.3334 19.5H15.7084V9.74999H17.3334V19.5Z"
                                                                        fill="#979797"
                                                                    />
                                                                </svg>
                                                            )}
                                                            {flight.facilities.includes("meal") && (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 22 21" fill="none">
                                                                    <path
                                                                        d="M19.9375 10.5H2.0625C1.51549 10.5 0.990886 10.7371 0.604092 11.159C0.217298 11.581 0 12.1533 0 12.75C0 13.3467 0.217298 13.919 0.604092 14.341C0.990886 14.7629 1.51549 15 2.0625 15H19.9375C20.4845 15 21.0091 14.7629 21.3959 14.341C21.7827 13.919 22 13.3467 22 12.75C22 12.1533 21.7827 11.581 21.3959 11.159C21.0091 10.7371 20.4845 10.5 19.9375 10.5ZM20.625 16.5H1.375C1.19266 16.5 1.0178 16.579 0.888864 16.7197C0.759933 16.8603 0.6875 17.0511 0.6875 17.25V18C0.6875 18.7956 0.977231 19.5587 1.49296 20.1213C2.00868 20.6839 2.70815 21 3.4375 21H18.5625C19.2918 21 19.9913 20.6839 20.507 20.1213C21.0228 19.5587 21.3125 18.7956 21.3125 18V17.25C21.3125 17.0511 21.2401 16.8603 21.1111 16.7197C20.9822 16.579 20.8073 16.5 20.625 16.5ZM2.51969 9H19.4803C20.9657 9 21.8273 6.94219 20.9765 5.44312C19.25 2.4 15.4494 0.0046875 11 0C6.55102 0.0046875 2.75 2.4 1.02352 5.44266C0.171875 6.94172 1.03426 9 2.51969 9ZM16.5 3.75C16.636 3.75 16.7689 3.79399 16.882 3.8764C16.995 3.95881 17.0831 4.07594 17.1352 4.21299C17.1872 4.35003 17.2008 4.50083 17.1743 4.64632C17.1478 4.7918 17.0823 4.92544 16.9861 5.03033C16.89 5.13522 16.7675 5.20665 16.6341 5.23559C16.5008 5.26453 16.3625 5.24968 16.2369 5.19291C16.1113 5.13614 16.0039 5.04001 15.9284 4.91668C15.8528 4.79334 15.8125 4.64834 15.8125 4.5C15.8125 4.30109 15.8849 4.11032 16.0139 3.96967C16.1428 3.82902 16.3177 3.75 16.5 3.75ZM11 2.25C11.136 2.25 11.2689 2.29399 11.382 2.3764C11.495 2.45881 11.5831 2.57594 11.6352 2.71299C11.6872 2.85003 11.7008 3.00083 11.6743 3.14632C11.6478 3.2918 11.5823 3.42544 11.4861 3.53033C11.39 3.63522 11.2675 3.70665 11.1341 3.73559C11.0008 3.76453 10.8625 3.74968 10.7369 3.69291C10.6113 3.63614 10.5039 3.54001 10.4284 3.41668C10.3528 3.29334 10.3125 3.14834 10.3125 3C10.3125 2.80109 10.3849 2.61032 10.5139 2.46967C10.6428 2.32902 10.8177 2.25 11 2.25ZM5.5 3.75C5.63597 3.75 5.7689 3.79399 5.88195 3.8764C5.99501 3.95881 6.08313 4.07594 6.13517 4.21299C6.1872 4.35003 6.20082 4.50083 6.17429 4.64632C6.14776 4.7918 6.08228 4.92544 5.98614 5.03033C5.88999 5.13522 5.76749 5.20665 5.63412 5.23559C5.50076 5.26453 5.36253 5.24968 5.23691 5.19291C5.11128 5.13614 5.00391 5.04001 4.92836 4.91668C4.85282 4.79334 4.8125 4.64834 4.8125 4.5C4.8125 4.30109 4.88493 4.11032 5.01386 3.96967C5.1428 3.82902 5.31766 3.75 5.5 3.75Z"
                                                                        fill="#979797"
                                                                    />
                                                                </svg>
                                                            )}
                                                            {flight.facilities.includes("wifi") && (
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 18" fill="none">
                                                                    <path
                                                                        d="M21.825 4.93714C15.7348 -1.64692 6.26276 -1.64451 0.17494 4.93714C-0.053998 5.18464 -0.0584668 5.60371 0.162908 5.86045L1.33991 7.22531C1.55097 7.4704 1.8906 7.47563 2.10991 7.24058C7.12591 1.86951 14.8734 1.8683 19.8904 7.24058C20.1097 7.47563 20.4493 7.47 20.6604 7.22531L21.8374 5.86045C22.0584 5.60371 22.054 5.18464 21.825 4.93714ZM11 12.8571C9.78482 12.8571 8.79998 14.0083 8.79998 15.4286C8.79998 16.8489 9.78482 18 11 18C12.2151 18 13.2 16.8489 13.2 15.4286C13.2 14.0083 12.2151 12.8571 11 12.8571ZM17.9668 9.49862C14.0047 5.40321 7.99079 5.40763 4.03319 9.49862C3.796 9.74371 3.78844 10.1692 4.0136 10.4288L5.19747 11.7944C5.40372 12.0323 5.73579 12.0483 5.95544 11.8266C8.84123 8.9108 13.1653 8.91723 16.0442 11.8266C16.2638 12.0483 16.5959 12.0327 16.8021 11.7944L17.986 10.4288C18.2115 10.1692 18.2036 9.7433 17.9668 9.49862Z"
                                                                        fill="#979797"
                                                                    />
                                                                </svg>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div style={{ width: 90, marginTop: 15 }}><p style={{ color: '#2395FF', fontSize: 13 }}> {`$ ${flight.price},00 `}<span style={{ color: '#979797' }}>/Pax</span></p></div>
                                                    <div style={{ width: 100 }}><button id={styles['btn-sub']} type="button" className="btn btn-primary"><Link href={`/booking/bookingdetail/${flight.code}`} style={{ textDecoration: 'none', color: 'white' }}>Select</Link></button></div>
                                                </div>
                                            </div>

                                        </div>
                                    ))
                                )}
                            </div>
                        )}





<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>


                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default privateRoute(Page);