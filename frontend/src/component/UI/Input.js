import React, { forwardRef, useState, useRef } from 'react'
import $, { event } from 'jquery'



const SelectInput = forwardRef(({ options, initial_display_type, typeChanger, buttonStyle, style }, ref) => {
    const [state, setState] = useState(initial_display_type)
    const selection_panel = useRef()


    const actionHandler = (event) => {
        const display_type = $(event.target).data('option')
        setState(display_type)
        typeChanger(display_type)
    }

    const toggleSelection = (event) => {
        event.stopPropagation()
        $(selection_panel.current).removeClass('none')
        setTimeout(() => {
            $(selection_panel.current).removeClass('opacity-0')
            $(selection_panel.current).addClass('active')
        }, 10)
        document.addEventListener('click', unClick)
    }

    const unClick = (event) => {
        if(!$(event.target).closest(selection_panel.current).length || !$(event.target).is($(event.target).find('button'))){
            $(selection_panel.current).addClass('opacity-0')
            $(selection_panel.current).removeClass('active')
            setTimeout(() => {
                $(selection_panel.current).addClass('none')
            }, 500)
            document.removeEventListener('click', unClick)
        }
    }

    return(
        <div ref={ref} className='relative inline-block no-wrap'>
            <button onClick={(event) => toggleSelection(event)} className={`ripple-button relative full-height br-1 p-5 pl-10px pr-10px hover trans-duration-1 pointer fw-500 ${buttonStyle}`}>{ state }</button>
            <div ref={selection_panel} className={`dropdown-selector shadow-3 bg-color-1 bd-1 br-1 p-5px absolute top-100 mt-5 z-1 none opacity-0 trans-duration-2 no-select scroll-y hidden-bar ${style}`}>
                <div className='flex-container column gap-5 full-height'>
                    {
                        options.map((option, index) => {
                            return(
                                <div className='bg-color-2 opacity-hover-4 br-1 p-5px pl-10px pr-10px fs-90 pointer trans-smooth' data-option={ option } onClick={ (event) => actionHandler(event) } tabIndex='0' key={`${option}-${index}`}>
                                    { option }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
})


const TextInput = ({ name, value, changeHandler, placeholder=null }, ref) => {
    return(
        <input onChange={event => changeHandler(event.target.value)} className='p-10px pl-15px pr-15px bg-color-1 br-1' name={name} type="text" placeholder={placeholder} value={value}/>
    )
}



export { SelectInput, TextInput }