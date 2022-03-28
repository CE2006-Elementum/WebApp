import React from 'react';

/**
 * Custom HTML Textfield
 */
export function TextField({name, placeholder, styles, onChange, containerStyle}) {
    return (
        <div style={containerStyle}>
            <input aria-label={name} className="input-label" type="text" placeholder={placeholder} style={styles} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
}

/**
 * Custom HTML Dropdown
 */
export function DropDown({name, styles, children, onChange}) {
    return (
        <div style={{margin: 15}}>
            <select aria-label={name} name={name} style={styles} onChange={(e) => onChange(e.target.value)}>
                {children}
            </select>
        </div>
    );
}

/**
 * Custom HTML CheckBox
 */
export function CheckBox({label, onChange, enc}) {
    return (
        <div style={{display: "flex", flexDirection: "row", padding: 5}}>
            <input aria-label={label} className="checkbox" type="checkbox" name={enc} onChange={(e) => onChange(e.target.name)}></input>
            <label className="input-label" htmlFor={label} style={{color: "var(--font-color-active)"}}>{label}</label>
        </div>
    );
}

/**
 * Custom HTML RadioButton
 */
export function RadioButton({label, onChange, name, value}) {
    return (
        <div style={{display: "flex", flexDirection: "row", padding: 5}}>
            <input aria-label={label} className="input-radio" type="radio" name={name} value={value} onChange={(e) => onChange(e.target.value)}></input>
            <label className="input-label" htmlFor={label} style={{color: "var(--font-color-active)"}}>{label}</label>
        </div>
    );
}

/**
 * Custom HTML Slider
 */
export function RangeSlider({label, min, max, step, marks, onChange, units, name}) {
    const { Slider } = require('@mui/material');
    const { useState } = require('react');

    const [value, setValue] = useState(min);
    return (
        <div style={{display: "flex", flexDirection: "row", alignItems: "center", width: "100%", padding: 5}}>
            <label className="input-label" htmlFor={label} style={{paddingRight: 15, paddingTop: 10, paddingBottom: 10, color: "var(--font-color-active)"}}>{name}</label>
            <label className="input-label" htmlFor={label} style={{paddingRight: 15, paddingTop: 10, paddingBottom: 10, color: "var(--font-color-active)"}}>{min}{units}</label>
            <Slider 
                aria-label={label}
                value={value}
                defaultValue={0}
                onChange={(e, value) => {
                    setValue(value);
                    onChange(value);
                }}
                step={step}
                marks
                min={min}
                max={max}
            />
            <label className="input-label" htmlFor={label} style={{paddingLeft: 10, paddingTop: 10, paddingBottom: 10, color: "var(--font-color-active)"}}>{max}{units}</label>
        </div>
    );
}

/**
 * Custom HTML Button
 */
export function Button({onClickHandler, containerStyles, buttonStyles, innerHTML, ...props}) {
    return (
        <div style={containerStyles}>
            <button {...props} className="btn" onClick={onClickHandler} style={buttonStyles}>{innerHTML}</button>
        </div>
    )
}

/**
 * Custom HTML Textarea
 */
export function TextArea({name, placeholder, styles, onChange, containerStyle, rows, cols, ariaLabel}) {
    return (
        <div style={containerStyle}>
            <textarea aria-label={ariaLabel} rows={rows} cols={cols} name={name} placeholder={placeholder} style={styles} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
}
