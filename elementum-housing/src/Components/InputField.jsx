import React from 'react';

export function TextField({name, placeholder, styles, onChange, containerStyle}) {
    return (
        <div style={containerStyle}>
            <input className="input-label" type="text" name={name} placeholder={placeholder} style={styles} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
}

export function DropDown({name, styles, children, onChange}) {
    return (
        <div style={{margin: 15}}>
            <select name={name} style={styles} onChange={(e) => onChange(e.target.value)}>
                {children}
            </select>
        </div>
    );
}

export function CheckBox({label, onChange, enc}) {
    return (
        <div style={{display: "flex", flexDirection: "row", padding: 5}}>
            <input className="checkbox" type="checkbox" name={enc} onChange={(e) => onChange(e.target.name)}></input>
            <label className="input-label" htmlFor={label} style={{color: "var(--font-color-active)"}}>{label}</label>
        </div>
    );
}

export function RadioButton({label, onChange, name, value}) {
    return (
        <div style={{display: "flex", flexDirection: "row", padding: 5}}>
            <input className="input-radio" type="radio" name={name} value={value} onChange={(e) => onChange(e.target.value)}></input>
            <label className="input-label" htmlFor={label} style={{color: "var(--font-color-active)"}}>{label}</label>
        </div>
    );
}

export function RangeSlider({label, min, max, step, marks, onChange, units, tooltip}) {
    const Slider = require('rc-slider').default;
    const createSliderWithToolTip = Slider.createSliderWithTooltip;
    const ToolTipSlider = createSliderWithToolTip(Slider);
    const { useState } = require('react');
    require('rc-slider/assets/index.css');

    const [maxRange, setMaxRange] = useState(min);
    return (
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", width: "100%", padding: 5}}>
            <label className="input-label" htmlFor={label} style={{paddingRight: 15, paddingTop: 10, paddingBottom: 10, color: "var(--font-color-active)"}}>{label}</label>
            <label className="input-label" htmlFor={label} style={{paddingRight: 15, paddingTop: 10, paddingBottom: 10, color: "var(--font-color-active)"}}>{min}{units}</label>
            { tooltip ? 
            <ToolTipSlider 
                className="input-slider"
                defaultValue={min} 
                min={min} 
                max={max} 
                step={step}
                dots
                marks={marks}
                onChange={(value) => {
                        setMaxRange(value);
                        onChange(value);
                    }
                }
                value={maxRange}
            />
                :
            <Slider 
                className="input-slider"
                defaultValue={min} 
                min={min} 
                max={max} 
                step={step}
                dots
                marks={marks}
                onChange={(value) => {
                    setMaxRange(value);
                    onChange(value);
                    }
                }/>
            }
            <label className="input-label" htmlFor={label} style={{paddingLeft: 10, paddingTop: 10, paddingBottom: 10, color: "var(--font-color-active)"}}>{max}{units}</label>
        </div>
    );
}

export function Button({onClickHandler, containerStyles, buttonStyles, innerHTML}) {
    return (
        <div style={containerStyles}>
            <button className="btn" onClick={onClickHandler} style={buttonStyles}>{innerHTML}</button>
        </div>
    )
}

export function TextArea({name, placeholder, styles, onChange, containerStyle, rows, cols}) {
    return (
        <div style={containerStyle}>
            <textarea rows={rows} cols={cols} name={name} placeholder={placeholder} style={styles} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
}
