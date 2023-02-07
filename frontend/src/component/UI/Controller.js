import React, { useState, useEffect, useRef, forwardRef, Children } from 'react'
import $ from 'jquery'


const Switch = ({ style, label, name, clickHandler, checked, disabled = false}) => {

    return(
        <div className={`flex_container v_center f_gap_10 no-select ${ style }`}>
            <div className="switch_area">
                <div className="toggle-button-cover" tabindex='0'>
                    <div className="button">
                        <input onChange={() => clickHandler(name, !checked) } type="checkbox" className="switch" name={name} id={name} checked={checked} disabled={disabled} tabIndex='-1'/>
                        <div className="knobs z_1 overflow_hidden br_3 no_event"></div>
                        <div className="layer absolute top_0 right_0 left_0 bottom_0 br_3"></div>
                    </div>
                </div>
            </div>
            {
                label && <label className='comfortaa fs_90 pointer' htmlFor={name}>{label}</label>
            }
        </div>
    )
}


const Checkbox = forwardRef(({ children, name, clickHandler, checked}, ref) => {

    return(
        <div className={`checkbox flex-container v-center gap-10 no-select`}>
            <input ref={ref} onChange={() => clickHandler(name, !checked) } type="checkbox" className="relative bd-1 br-1 pointer overflow-hidden" name={name} id={name} checked={checked} tabIndex='0'/>
            <label className='fs-90 pointer' htmlFor={name}>{ children }</label>
        </div>
    )
})







export { Switch, Checkbox }
