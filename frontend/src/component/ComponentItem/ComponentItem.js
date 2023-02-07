import React, {useState, useRef, Component, useEffect } from 'react'
import axios from 'axios'
import $ from 'jquery'

const ComponentItem = ({ data, clickHandler, active }) => {
    const component = useRef()
    // const [state, setState] = useState({
    //     active: active
    // })

    const actionHandler = () => {
        clickHandler(component.current, data, data.id)
        // setState(prevState => {
        //     return { ...prevState, active: active }
        // })
        // console.log(state.active, " ", number)
    }

    useEffect(() => {
        if(active == data.id){
            console.log(active, " | ", data.id)
        }
    }, [active])

    return (
        <div onClick={() => actionHandler()} ref={component} className={`component pointer parent-opacity trans-duration-2 trans-smooth ${ active == data.id && 'selected' }`}>
            <div className={`flex-container h-center even full-width child-opacity trans-smooth ${ active != data.id && 'opacity-6' }`}>
                <div className={`component-header fw-600 font-sen p-10px pl-15px sticky left-0 min-width-180px ${ active == data.id && 'selected' }`}>
                    { data.name }
                </div>
                <div className='min-width-180px opacity-7'>
                    { data.license }
                </div>
                <div className='min-width-180px'>
                    <span className={`p-5px pl-10px pr-10px br-1 ${ data.risk_level === 0 ? '' : data.risk_level === 1 ? 'error-yellow' : data.risk_level === 2 ? 'error-orange' : data.risk_level === 3 && 'error-red' }`}>
                        { data.risk_level === 0 ? '-' : data.risk_level === 1 ? 'low' : data.risk_level === 2 ? 'medium' : data.risk_level === 3 && 'high' }
                    </span>
                </div>
                {/* <div className='min-width-180px opacity-7'>
                    {
                        data.proprietary_license &&(
                            <span className='br-1 bg-green-soft p-5px pl-10px pr-10px green fs-90'>
                                <span className='opacity-7'><i className="fa-solid fa-check"></i></span>
                            </span>
                        )
                    }
                </div> */}
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>{ data.version }</span>
                </div>
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>npm</span>
                </div>
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>1.2</span>
                </div>
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>9</span>
                </div>
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>5</span>
                </div>
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>4</span>
                </div>
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>97</span>
                </div>
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>2</span>
                </div>
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>2</span>
                </div>
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>-</span>
                </div>
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>10</span>
                </div>
                <div className='min-width-180px'>
                    <span className='opacity-7 font-jost'>-</span>
                </div>
            </div>
        </div>
    )
}


const NestedComponentItem = ({ data, clickHandler, nested_level, number }) => {
    const component = useRef()
    const nested_components = useRef()

    const actionHandler = event => {
        if(event.target.dataset.action === 'toggle-nested'){
            toggleHandler(event)
        }else if(event.target.dataset.action === 'component'){
            clickHandler(data.id, data)
        }
    }


    const toggleHandler = (event) => {
        event.stopPropagation()
        const toggle_element = document.querySelector(`.toggle-element[data-toggle-element-id=${event.target.dataset.toggleElementId}]`)
        // toggle_element.style.height = `${ Boolean(event.target.dataset.toggleActive) ? toggle_element.scrollHeight : 0}px`
        toggle_element.style.height = event.target.dataset.toggleActive === 'false' ? 'inherit' : '0px'
        event.target.dataset.toggleActive = event.target.dataset.toggleActive === 'true' ? 'false' : 'true'
    }

    return (
        <div ref={component} onClick={event => actionHandler(event)} className={`nested-component`}>
            <div data-action='component' className={`nested-component flex-container space-between p-5px pl-10px br-1 pointer opacity-hover-5 trans-duration-2 trans-smooth ${ data.risk_level === 0 ? 'bg-color-2' : data.risk_level === 1 ? 'error-yellow' : data.risk_level === 2 ? 'error-orange' : data.risk_level === 3 && 'error-red' }`}>
                <div className='fs-80 font-sen no-event'>
                    { data.name }
                </div>
                <div className='flex-container gap-5'>
                    {/* <div className='fs-80'>
                        <span className='opacity-7'>v. { data.version }</span>
                    </div> */}
                    {
                        data.nested_components && (
                            <span data-toggle-element-id={`nested-component-${nested_level}-${number}`} data-toggle-active='false' data-nested-level={nested_level} data-action='toggle-nested' className='toggle-trigger br-1 flex-container v-center h-center fs-70 ml-5' style={{ backgroundColor: 'rgba(255,255,255, 0.05)', width: '16px', height: '16px' }}>
                                {/* <i className="fa-solid fa-caret-down"></i> */}
                                <i className="toggle-icon fa-solid fa-angle-down opacity-6 no-event trans-duration-3"></i>
                            </span>
                        )
                    }
                </div>
            </div>
            {
                data.nested_components && (
                    <div ref={nested_components} data-toggle-element-id={`nested-component-${nested_level}-${number}`} className='toggle-element nested overflow-hidden trans-duration-3' data-nested-level={nested_level}>
                        <div className='flex-container gap-10 pt-5px pl-5px'>
                            <div className='relative'>
                                <div className='absolute bg-color-3' style={{ height: 'calc(100% - 15px)', transform: 'translateY(-50%)', top: '50%', width: '1px' }}></div>
                            </div>
                            <div className='flex-container column gap-5 full-width'>
                                {
                                    data.nested_components?.map((lib, x) => {
                                        return(
                                            <NestedComponentItem data={lib} clickHandler={clickHandler} key={lib.id} nested_level={nested_level + 1} number={x} />
                                        )
                                    }) 
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export { ComponentItem, NestedComponentItem };
