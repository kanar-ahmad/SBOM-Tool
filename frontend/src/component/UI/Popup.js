import React, { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import $ from 'jquery'


const Popup = ({ type, message }) => {
    const component = useRef()

    // Type options:
    // info
    // warning
    // error
    // success
    // standard

    const ICON = {
        "error": "fas fa-times-circle",
        "success": "fas fa-check-circle",
    }


    useEffect(() => {
        initPop(component.current)
    }, [])


    const initPop = (component) => {
        const closeOnClick = () => {
            // $("#overlay").removeClass("active");
            $(component).removeClass("active");
            clearTimeout(timeout)
    
        }
        let timeout = null
    
    
        $(component).addClass("active");
        // $("#overlay").addClass("active");
        window.addEventListener("click", closeOnClick);
    
    
        timeout = setTimeout(() => {
            // $("#overlay").removeClass("active");
            $(component).removeClass("active");
            window.removeEventListener("click", closeOnClick)
        }, 2000)
    }


    return(
        <>
            {
                ReactDOM.createPortal((
                    <div className={`popup flex-container h-center gap-10 p-5px pl-10px pr-10px br-4 no-event z-10 pop-${type}`} ref={component}>
                        <div className="symbol fs-120">
                            <i className={ICON[type]}></i>
                        </div>
                        <div>
                            {message}
                        </div>
                    </div>
                ), document.getElementById("extra-root"))
            }
        </>
    )
}



export default Popup