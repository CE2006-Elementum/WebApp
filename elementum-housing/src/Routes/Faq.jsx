import React from 'react';

import { faqAns } from '../Utils/Enums';

export default function FAQ(){
    return (
        <div className="faq-container" style={{display: "flex", flexDirection: "column"}}>
            {
                faqAns.map((element, i) => {
                    return (
                        <div key={element.title} style={{display: "flex", flexDirection: "row", backgroundImage: `linear-gradient(${i % 2 === 0 ? "to right" : "to left"}, #F8F1E4, #FFFFFF)`}}>
                            <div className={element.class} style={{flex: 1, margin: 50}}>
                                <h1>{element.title}</h1>
                            </div>
                            <div className="faq-ans" style={{display: "flex", flexDirection: "column", flex: 1, margin: 50}}>
                                {
                                    element.qa.map(qaElement => {
                                        return (
                                            <div key={qaElement.answer}>
                                                <h4>{qaElement.question}</h4>
                                                <p>{qaElement.answer}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}