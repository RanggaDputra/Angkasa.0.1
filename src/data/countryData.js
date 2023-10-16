const countryData = [
    {
        code: "AF",
        name: "Afghanistan",
    },
    {
        code: "AL",
        name: "Albania",
    },
    {
        code: "DZ",
        name: "Algeria",
    },
    {
        code: "AD",
        name: "Andorra",
    },
    {
        code: "AO",
        name: "Angola",
    },
    {
        code: "AI",
        name: "Anguilla",
    },
    {
        code: "AG",
        name: "Antigua and Barbuda",
    },
    {
        code: "AR",
        name: "Argentina",
    },
    {
        code: "AM",
        name: "Armenia",
    },
    {
        code: "AW",
        name: "Aruba",
    },
    {
        code: "AU",
        name: "Australia",
    },
    {
        code: "AT",
        name: "Austria",
    },
    {
        code: "AZ",
        name: "Azerbaijan",
    },
    {
        code: "BS",
        name: "Bahamas",
    },
    {
        code: "BH",
        name: "Bahrain",
    },
    {
        code: "BD",
        name: "Bangladesh",
    },
    {
        code: "BB",
        name: "Barbados",
    },
    {
        code: "BY",
        name: "Belarus",
    },
    {
        code: "BE",
        name: "Belgium",
    },
    {
        code: "BZ",
        name: "Belize",
    },
    {
        code: "BJ",
        name: "Benin",
    },
    {
        code: "BM",
        name: "Bermuda",
    },
    {
        code: "BT",
        name: "Bhutan",
    },
    {
        code: "BO",
        name: "Bolivia",
    },
    {
        code: "BA",
        name: "Bosnia and Herzegovina",
    },
    {
        code: "BW",
        name: "Botswana",
    },
    {
        code: "BR",
        name: "Brazil",
    },
    {
        code: "BN",
        name: "Brunei",
    },
    {
        code: "BG",
        name: "Bulgaria",
    },
    {
        code: "BF",
        name: "Burkina Faso",
    },
    {
        code: "BI",
        name: "Burundi",
    },
    {
        code: "KH",
        name: "Cambodia",
    },
    {
        code: "CM",
        name: "Cameroon",
    },
    {
        code: "CA",
        name: "Canada",
    },
    {
        code: "CV",
        name: "Cape Verde",
    },
    {
        code: "KY",
        name: "Cayman Islands",
    },
    {
        code: "CF",
        name: "Central African Republic",
    },
    {
        code: "TD",
        name: "Chad",
    },
    {
        code: "CL",
        name: "Chile",
    },
    {
        code: "CN",
        name: "China",
    },
    {
        code: "CO",
        name: "Colombia",
    },
    {
        code: "KM",
        name: "Comoros",
    },
    {
        code: "CG",
        name: "Congo (Brazzaville)",
    },
    {
        code: "CD",
        name: "Congo (Kinshasa)",
    },
    {
        code: "CR",
        name: "Costa Rica",
    },
    {
        code: "HR",
        name: "Croatia",
    },
    {
        code: "CU",
        name: "Cuba",
    },
    {
        code: "CY",
        name: "Cyprus",
    },
    {
        code: "CZ",
        name: "Czech Republic",
    },
    {
        code: "DK",
        name: "Denmark",
    },
    {
        code: "DJ",
        name: "Djibouti",
    },
    {
        code: "DM",
        name: "Dominica",
    },
    {
        code: "DO",
        name: "Dominican Republic",
    },
    {
        code: "EC",
        name: "Ecuador",
    },
    {
        code: "EG",
        name: "Egypt",
    },
    {
        code: "SV",
        name: "El Salvador",
    },
    {
        code: "GQ",
        name: "Equatorial Guinea",
    },
    {
        code: "ER",
        name: "Eritrea",
    },
    {
        code: "EE",
        name: "Estonia",
    },
    {
        code: "ET",
        name: "Ethiopia",
    },
    {
        code: "FJ",
        name: "Fiji",
    },
    {
        code: "FI",
        name: "Finland",
    },
    {
        code: "FR",
        name: "France",
    },
    {
        code: "GF",
        name: "French Guiana",
    },
    {
        code: "GA",
        name: "Gabon",
    },
    {
        code: "GM",
        name: "Gambia",
    },
    {
        code: "GE",
        name: "Georgia",
    },
    {
        code: "DE",
        name: "Germany",
    },
    {
        code: "GH",
        name: "Ghana",
    },
    {
        code: "GR",
        name: "Greece",
    },
    {
        code: "GL",
        name: "Greenland",
    },
    {
        code: "GD",
        name: "Grenada",
    },
    {
        code: "GP",
        name: "Guadeloupe",
    },
    {
        code: "GT",
        name: "Guatemala",
    },
    {
        code: "GN",
        name: "Guinea",
    },
    {
        code: "GW",
        name: "Guinea-Bissau",
    },
    {
        code: "GY",
        name: "Guyana",
    },
    {
        code: "HT",
        name: "Haiti",
    },
    {
        code: "HN",
        name: "Honduras",
    },
    {
        code: "HK",
        name: "Hong Kong, SAR China",
    },
    {
        code: "HU",
        name: "Hungary",
    },
    {
        code: "IS",
        name: "Iceland",
    },
    {
        code: "IN",
        name: "India",
    },
    {
        code: "ID",
        name: "Indonesia",
    },
    {
        code: "IR",
        name: "Iran",
    },
    {
        code: "IQ",
        name: "Iraq",
    },
    {
        code: "IE",
        name: "Ireland",
    },
    {
        code: "IL",
        name: "Israel",
    },
    {
        code: "IT",
        name: "Italy",
    },
    {
        code: "JM",
        name: "Jamaica",
    },
    {
        code: "JP",
        name: "Japan",
    },
    {
        code: "JO",
        name: "Jordan",
    },
    {
        code: "KZ",
        name: "Kazakhstan",
    },
    {
        code: "KE",
        name: "Kenya",
    },
    {
        code: "KI",
        name: "Kiribati",
    },
    {
        code: "KP",
        name: "Korea (North)",
    },
    {
        code: "KR",
        name: "Korea (South)",
    },
    {
        code: "KW",
        name: "Kuwait",
    },
    {
        code: "KG",
        name: "Kyrgyzstan",
    },
    {
        code: "LA",
        name: "Laos",
    },
    {
        code: "LV",
        name: "Latvia",
    },
    {
        code: "LB",
        name: "Lebanon",
    },
    {
        code: "LS",
        name: "Lesotho",
    },
    {
        code: "LR",
        name: "Liberia",
    },
    {
        code: "LY",
        name: "Libya",
    },
    {
        code: "LI",
        name: "Liechtenstein",
    },
    {
        code: "LT",
        name: "Lithuania",
    },
    {
        code: "LU",
        name: "Luxembourg",
    },
    {
        code: "MO",
        name: "Macao, SAR China",
    },
    {
        code: "MK",
        name: "Macedonia, Republic of",
    },
    {
        code: "MG",
        name: "Madagascar",
    },
    {
        code: "MW",
        name: "Malawi",
    },
    {
        code: "MY",
        name: "Malaysia",
    },
    {
        code: "MV",
        name: "Maldives",
    },
    {
        code: "ML",
        name: "Mali",
    },
    {
        code: "MT",
        name: "Malta",
    },
    {
        code: "MQ",
        name: "Martinique",
    },
    {
        code: "MR",
        name: "Mauritania",
    },
    {
        code: "MU",
        name: "Mauritius",
    },
    {
        code: "YT",
        name: "Mayotte",
    },
    {
        code: "MX",
        name: "Mexico",
    },
    {
        code: "MD",
        name: "Moldova",
    },
    {
        code: "MC",
        name: "Monaco",
    },
    {
        code: "MN",
        name: "Mongolia",
    },
    {
        code: "ME",
        name: "Montenegro",
    },
    {
        code: "MS",
        name: "Montserrat",
    },
    {
        code: "MA",
        name: "Morocco",
    },
    {
        code: "MZ",
        name: "Mozambique",
    },
    {
        code: "MM",
        name: "Myanmar (Burma)",
    },
    {
        code: "NA",
        name: "Namibia",
    },
    {
        code: "NR",
        name: "Nauru",
    },
    {
        code: "NP",
        name: "Nepal",
    },
    {
        code: "NL",
        name: "Netherlands",
    },
    {
        code: "NC",
        name: "New Caledonia",
    },
    {
        code: "NZ",
        name: "New Zealand",
    },
    {
        code: "NI",
        name: "Nicaragua",
    },
    {
        code: "NE",
        name: "Niger",
    },
    {
        code: "NG",
        name: "Nigeria",
    },
    {
        code: "NU",
        name: "Niue",
    },
    {
        code: "NF",
        name: "Norfolk Island",
    },
    {
        code: "NO",
        name: "Norway",
    },
    {
        code: "OM",
        name: "Oman",
    },
    {
        code: "PK",
        name: "Pakistan",
    },
    {
        code: "PS",
        name: "Palestinian Territories",
    },
    {
        code: "PA",
        name: "Panama",
    },
    {
        code: "PG",
        name: "Papua New Guinea",
    },
    {
        code: "PY",
        name: "Paraguay",
    },
    {
        code: "PE",
        name: "Peru",
    },
    {
        code: "PH",
        name: "Philippines",
    },
    {
        code: "PN",
        name: "Pitcairn Islands",
    },
    {
        code: "PL",
        name: "Poland",
    },
    {
        code: "PT",
        name: "Portugal",
    },
    {
        code: "QA",
        name: "Qatar",
    },
    {
        code: "RE",
        name: "Réunion",
    },
    {
        code: "RO",
        name: "Romania",
    },
    {
        code: "RU",
        name: "Russia",
    },
    {
        code: "RW",
        name: "Rwanda",
    },
    {
        code: "BL",
        name: "Saint Barthélemy",
    },
    {
        code: "SH",
        name: "Saint Helena",
    },
    {
        code: "KN",
        name: "Saint Kitts and Nevis",
    },
    {
        code: "LC",
        name: "Saint Lucia",
    },
    {
        code: "MF",
        name: "Saint Martin",
    },
    {
        code: "PM",
        name: "Saint Pierre and Miquelon",
    },
    {
        code: "WS",
        name: "Samoa",
    },
    {
        code: "SM",
        name: "San Marino",
    },
    {
        code: "ST",
        name: "São Tomé and Príncipe",
    },
    {
        code: "SA",
        name: "Saudi Arabia",
    },
    {
        code: "SN",
        name: "Senegal",
    },
    {
        code: "RS",
        name: "Serbia",
    },
    {
        code: "SC",
        name: "Seychelles",
    },
    {
        code: "SL",
        name: "Sierra Leone",
    },
    {
        code: "SG",
        name: "Singapore",
    },
    {
        code: "SX",
        name: "Sint Maarten",
    },
    {
        code: "SK",
        name: "Slovakia",
    },
    {
        code: "SI",
        name: "Slovenia",
    },
    {
        code: "SB",
        name: "Solomon Islands",
    },
    {
        code: "SO",
        name: "Somalia",
    },
    {
        code: "ZA",
        name: "South Africa",
    },
    {
        code: "GS",
        name: "South Georgia and the South Sandwich Islands",
    },
    {
        code: "SS",
        name: "South Sudan",
    },
    {
        code: "ES",
        name: "Spain",
    },
    {
        code: "LK",
        name: "Sri Lanka",
    },
    {
        code: "SD",
        name: "Sudan",
    },
    {
        code: "SR",
        name: "Suriname",
    },
    {
        code: "SJ",
        name: "Svalbard and Jan Mayen",
    },
    {
        code: "SZ",
        name: "Swaziland",
    },
    {
        code: "SE",
        name: "Sweden",
    },
    {
        code: "CH",
        name: "Switzerland",
    },
    {
        code: "SY",
        name: "Syria",
    },
    {
        code: "TW",
        name: "Taiwan",
    },
    {
        code: "TJ",
        name: "Tajikistan",
    },
    {
        code: "TZ",
        name: "Tanzania",
    },
    {
        code: "TH",
        name: "Thailand",
    },
    {
        code: "TL",
        name: "Timor-Leste",
    },
    {
        code: "TG",
        name: "Togo",
    },
    {
        code: "TK",
        name: "Tokelau",
    },
    {
        code: "TO",
        name: "Tonga",
    },
    {
        code: "TT",
        name: "Trinidad and Tobago",
    },
    {
        code: "TN",
        name: "Tunisia",
    },
    {
        code: "TR",
        name: "Turkey",
    },
    {
        code: "TM",
        name: "Turkmenistan",
    },
    {
        code: "TC",
        name: "Turks and Caicos Islands",
    },
    {
        code: "TV",
        name: "Tuvalu",
    },
    {
        code: "UG",
        name: "Uganda",
    },
    {
        code: "UA",
        name: "Ukraine",
    },
    {
        code: "AE",
        name: "United Arab Emirates",
    },
    {
        code: "GB",
        name: "United Kingdom",
    },
    {
        code: "US",
        name: "United States of America",
    },
    {
        code: "UY",
        name: "Uruguay",
    },
    {
        code: "UZ",
        name: "Uzbekistan",
    },
    {
        code: "VU",
        name: "Vanuatu",
    },
    {
        code: "VA",
        name: "Vatican City",
    },
    {
        code: "VE",
        name: "Venezuela",
    },
    {
        code: "VN",
        name: "Vietnam",
    },
    {
        code: "VG",
        name: "Virgin Islands, British",
    },
    {
        code: "VI",
        name: "Virgin Islands, US",
    },
    {
        code: "WF",
        name: "Wallis and Futuna",
    },
    {
        code: "EH",
        name: "Western Sahara",
    },
    {
        code: "YE",
        name: "Yemen",
    },
    {
        code: "ZM",
        name: "Zambia",
    },
    {
        code: "ZW",
        name: "Zimbabwe",
    },
];

export default countryData;