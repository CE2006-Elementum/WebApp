import React from 'react';

/**
 * Custom HTML Textfield
 * @component
 * @author Zhi Heng
 * @param {Object} props Component props
 * @param {string} props.name Aria-label
 * @param {string} props.placeholder Placeholder text
 * @param {object} props.styles Styles for input element
 * @param {function} props.onChange Function to handle onChange event
 * @param {object} props.containerStyle Styles for the wrapper element
 * @return {JSX.Element} An JSX Element
 */
function TextField({name, placeholder, styles, onChange, containerStyle}) {
    return (
        <div style={containerStyle}>
            <input aria-label={name} className="input-label" type="text" placeholder={placeholder} style={styles} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
}

/**
 * Custom HTML Dropdown
 * @component
 * @author Zhi Heng
 * @param {Object} props Component props
 * @param {string} props.name Aria-label for select element and name attribute
 * @param {object} props.styles Styles for the dropdown element
 * @param {JSX.Element} props.children Child elements to display
 * @param {function} props.onChange Handler for onChange event
 * @return {JSX.Element} An JSX Element
 */
function DropDown({name, styles, children, onChange}) {
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
 * @component
 * @author Zhi Heng
 * @param {object} props Component props
 * @param {string} props.label Aria-label, htmlFor attribute and display text
 * @param {function} props.onChange Handler for onChange Event
 * @param {string} props.enc Encoded value that is returned by onChange event
 * @return {JSX.Element} An JSX Element
 */
function CheckBox({label, onChange, enc}) {
    return (
        <div style={{display: "flex", flexDirection: "row", padding: 5}}>
            <input aria-label={label} className="checkbox" type="checkbox" name={enc} onChange={(e) => onChange(e.target.name)}></input>
            <label className="input-label" htmlFor={label} style={{color: "var(--font-color-active)"}}>{label}</label>
        </div>
    );
}

/**
 * Custom HTML RadioButton
 * @component
 * @author Zhi Heng
 * @param {object} props Component props
 * @param {string} props.label Aria-label, htmlFor attribute and display text
 * @param {function} props.onChange Handler for onChange Event
 * @param {string} props.name Use the same value for this if it's a group radiobutton
 * @param {string} props.value Value to return when radiobutton selected
 * @return {JSX.Element} An JSX Element
 */
function RadioButton({label, onChange, name, value}) {
    return (
        <div style={{display: "flex", flexDirection: "row", padding: 5}}>
            <input aria-label={label} className="input-radio" type="radio" name={name} value={value} onChange={(e) => onChange(e.target.value)}></input>
            <label className="input-label" htmlFor={label} style={{color: "var(--font-color-active)"}}>{label}</label>
        </div>
    );
}

/**
 * Custom HTML Slider
 * @component
 * @author Zhi Heng
 * @param {object} props Component props
 * @param {string} props.label Aria-label and htmlFor attribute
 * @param {number} props.min Minimum value that the slider can have
 * @param {number} props.max Maximum value that the slider can have
 * @param {object} props.step Value for each step
 * @param {boolean} props.marks To show marks or not
 * @param {function} props.onChange Handler for onChange Event
 * @param {string} props.units Displayed units
 * @param {string} props.name Name of slider
 * @return {JSX.Element} An JSX Element
 */
function RangeSlider({label, min, max, step, marks, onChange, units, name}) {
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
 * @component
 * @author Zhi Heng
 * @param {object} props Component props
 * @param {function} props.onClickHandler Handler for onClick Event
 * @param {object} props.containerStyles Styles for the wrapper element
 * @param {object} props.buttonStyles Styles for the button element
 * @param {string} props.innerHTML Text to be shown in the button
 * @return {JSX.Element} An JSX Element
 */
function Button({onClickHandler, containerStyles, buttonStyles, innerHTML, ...props}) {
    return (
        <div style={containerStyles}>
            <button {...props} className="btn" onClick={onClickHandler} style={buttonStyles}>{innerHTML}</button>
        </div>
    )
}

/**
 * Custom HTML Textarea
 * @component
 * @author Zhi Heng
 * @param {object} props Component props
 * @param {string} props.name name attribute
 * @param {string} props.placeholder Placeholder text to display
 * @param {object} props.styles Styles for the textarea element
 * @param {function} props.onChange Handler for onChange Event
 * @param {object} props.containerStyle Styles for the wrapper element
 * @param {number} props.rows Number of rows to display
 * @param {number} props.cols Number of cols to display
 * @param {string} props.ariaLabel Aria-label
 * @return {JSX.Element} An JSX Element
 */
function TextArea({name, placeholder, styles, onChange, containerStyle, rows, cols, ariaLabel}) {
    return (
        <div style={containerStyle}>
            <textarea aria-label={ariaLabel} rows={rows} cols={cols} name={name} placeholder={placeholder} style={styles} onChange={(e) => onChange(e.target.value)}/>
        </div>
    );
}

export {
    TextArea,
    Button,
    RadioButton,
    CheckBox,
    RangeSlider,
    DropDown,
    TextField
}