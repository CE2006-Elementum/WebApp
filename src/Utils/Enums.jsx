import React from 'react';

/**
 * Enum for dropdown list for room type
 */
export const flatType = [
    {
        label: "1-Room", 
        enc: "1"
    },
    {
        label: "2-Room",
        enc: "2"
    },
    {
        label: "3-Room",
        enc: "3"
    },
    {
        label: "4-Room",
        enc: "4"
    },
    {
        label: "5-Room",
        enc: "5"
    },
    {
        label: "Executive",
        enc: "exec"
    },
    {
        label: "Multi-Generation",
        enc: "mg"
    }
]

/**
 * Demarker for slider
 */
export const rangeMarks = {
    0.1:  "0.1",
    0.2:  "0.2",
    0.3:  "0.3",
    0.4:  "0.4",
    0.5:  "0.5",
    0.6:  "0.6",
    0.7:  "0.7",
    0.8:  "0.8",
    0.9:  "0.9",
    1.0: "1.0",
    1.1: "1.1",
    1.2: "1.2",
    1.3: "1.3",
    1.4: "1.4",
    1.5: "1.5",
    1.6: "1.6",
    1.7: "1.7",
    1.8: "1.8",
    1.9: "1.9",
    2.0: "2.0",
}

/**
 * Labels for the filter buttons
 */
export const labels = [
    {
        label: "Parks",
        enc: "rc_parks"
    },
    {
        label: "Bus Stops",
        enc: "ts_bus_stops"
    },
    {
        label: "Bus Interchanges",
        enc: "ts_bus_interchange"
    },
    {
        label: "MRT & LRT Stations",
        enc: "ts_mrt_lrt"
    },
    {
        label: "Clinics",
        enc: "hc_clinic"
    },
    {
        label: "Polyclinics",
        enc: "hc_polyclinic"
    },
    {
        label: "Hospital",
        enc: "hc_hospital"
    },
    {
        label: "Preschool & Childcare",
        enc: "edu_preschool_childcare"
    },
    {
        label: "Primary",
        enc: "edu_primary"
    },
    {
        label: "Secondary",
        enc: "edu_secondary"
    },
    {
        label: "Tertiary",
        enc: "edu_tertiary"
    },
    {
        label: "Universities",
        enc: "edu_uni"
    }
]

/**
 * Accordion info for locationfinder form
 */
export const accordionInfo = [
    {
        title: "Recreational Facilities",
        children: 
            [
                {
                    label: "Parks",
                    enc: "rc_parks"
                }
            ]
    },
    {
        title: "Transportation Facilities",
        children:
            [
                {
                    label: "Bus Stops",
                    enc: "ts_bus_stops"
                },
                {
                    label: "Bus Interchanges",
                    enc: "ts_bus_interchange"
                },
                {
                    label: "MRT & LRT Stations",
                    enc: "ts_mrt_lrt"
                }
            ]
    },
    {
        title: "Healthcare Facilties",
        children:
            [
                {
                    label: "Clinics",
                    enc: "hc_clinic"
                },
                {
                    label: "Polyclinics",
                    enc: "hc_polyclinic"
                },
                {
                    label: "Hospital",
                    enc: "hc_hospital"
                }
            ]
    },
    {
        title: "Education",
        children:
            [
                {
                    label: "Preschool & Childcare",
                    enc: "edu_preschool_childcare"
                },
                {
                    label: "Primary",
                    enc: "edu_primary"
                },
                {
                    label: "Secondary",
                    enc: "edu_secondary"
                },
                {
                    label: "Tertiary",
                    enc: "edu_tertiary"
                },
                {
                    label: "Universities",
                    enc: "edu_uni"
                }
            ]
    }
]

/**
 * Info used in landing page carousel
 */
export const carouselLanding = [
    {
        image: require("../assets/9017bd11de396347fe96bc9c622d2aa8.jpg"),
        childElement: [
            "Want to get a estimated valuation?",
            "Look no further"
        ]
        
    },
    {
        image: require("../assets/efadfcdc914de20a969a4c073ce3d3a1.jpg"),
        childElement: [
            "Searching for your dream home?",
            "Look no further"
        ]
    }
];

/**
 * Info for carousel beside home page form
 */
export const carouselInfo = [
    {
        image: require("../assets/8ae91f6abc33048928f3daebb152af9f.jpg")
    }
];

/**
 * Info for FAQ
 */
export const faqAns = [
    {
        class: "faq-general",
        title: "Frequently Asked Questions",
        qa: [
            {
                question: "What is Elementum Housing all about?",
                answer: "Elementum Housing is a platform that aims to simplify HDB buyers and sellers’ property journey. With thousands of past resale prices and facilities in Singapore, property owners can seek out reliable information about their valuation and also find out more about the facilities surrounding their property."
            },
            {    
                question: "Is Elementum Housing a real estate agency?",
                answer: "No, we only provide valuation and information about properties to help your property buying/selling journey."
            },
            {    
                question: "How can Elementum Housing help me?",
                answer: "For property buyers, with the help of our algorithm, we are able to identify potential HDB flats that can meet your needs and budgets. For property sellers, our algorithm can show your estimated valuation and also surrounding facilities, with the information, you are more informed of your flat’s worth when selling."
            },
            {    
                question: "Are the information shown reliable?",
                answer: "All data used are from official sources such as Data.gov.sg. We do not use unofficial sources so that we are able to give the most accurate information."
            }
        ]
    },
    {
        class: "faq-buyers",
        title: "Buyers",
        qa: [
            {
                question: "What type of flats are available?",
                answer: "As our data is only based on resale flats, the type of flats available are only limited to the past HDB flats."
            },
            {
                question: "What facilities can I choose?",
                answer: "The current facilities available are based on popular options which are schools, healthcare, recreational, transport and flat properties."
            },
            {
                question: "Why did my agent quote me a higher price than shown?",
                answer: "As we rely on past resale data, there are several factors that will affect the price of the flat, such as the interior designs and the overall property market. The valuation shown should only be used as a reference."
            },
            {
                question: "How do I contact Elementum Housing about the properties I would like to purchase?",
                answer: "We can be contacted via the form or email at the Contact Us page, however we are unable to help with property buying or selling, buyers should seek professional opinions from licensed property agents."
            }
        ]
    },
    {
        class: "faq-sellers",
        title: "Sellers",
        qa: [
            {
                question: "Why is my flat valuation so low?",
                answer: "As our data is based on Data.gov.sg, we are unable to control the prices. The prices shown are based on past sales and should only be used as a reference."
            },
            {
                question: "Why are there missing facilities near my flat?",
                answer: "As our data is based on official sources, we are unable to capture all the facilities surrounding your flats, however you may contact us via email or the contact us form about missing facilities."
            },
            {
                question: "Why did my agent quote me a lower price than shown?",
                answer: "As we rely on past resale data, there are several factors that will affect the price of the flat, such as the interior designs and the overall property market. The valuation shown should only be used as a reference."
            },
            {
                question: "How do I contact Elementum Housing about selling my flat?",
                answer: "We can be contacted via the form or email at the Contact Us page, however we are unable to help with property buying or selling, sellers should seek professional opinions from licensed property agents."
            }
        ]
    }
]

/**
 * Template for locationfinder form submission
 */
export const search = {
    search: {
        roi: {
            center: "",
            radius: 0.5
        },
        facilities: {
            musthave: [],
            distance: 0.0
        },
        flat_properties: {
            price_range: {
                min: 0.1,
                max: 0.1
            },
            room_types: [],
            area_range: {
                min: 20,
                max: 20
            },
            storey_range: {
                min: 1,
                max: 1
            }
        }
    }
}

/**
 * Template for valuation form submission
 */
export const valuation = {
    valuation: {
        location: "",
        room_type: "",
        area: 20
    }
}

/**
 * Template for contact form submission
 */
export const contact = {
    contact: {
        first_name: "",
        last_name: "",
        phone: "",
        role: "",
        message: "",
        email: ""
    }
}