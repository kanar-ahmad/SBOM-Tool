import React, {useState, useRef } from 'react'
import './App.css';
import axios from 'axios'
import { ComponentItem, NestedComponentItem } from './component/ComponentItem/ComponentItem';
import { jsPDF } from "jspdf";
import { saveAs } from 'file-saver';
import { TextInput } from './component/UI/Input';
import Popup from './component/UI/Popup';
import { DoughnutChart } from './component/charts/Charts';

const App = () => {
    const component = useRef()
    const [state, setState] = useState({
        data: null,
        loaded: false,
        pending: {
            start: false,
            completed: false
        } 
    })
    const [filter, setFilter] = useState({
        // risk_type: ['risk_none', 'risk_low', 'risk_moderate', 'risk_high'],
        sort_by_risk_level_none: false,
        sort_by_risk_level_low: false,
        sort_by_risk_level_moderate: false,
        sort_by_risk_level_high: false,
        sort_by_proprietary_license: false
    })

    const [detail, setDetail] = useState({})

    const [source, setSource] = useState('repository')

    const submitData = () => {

        setState(prevState => {
            return { ...prevState, pending: {
                    start: true,
                    completed: false
                } 
            }
        })


        let data = null
        if(source === 'repository'){
            data = { source: 'web_client', url: component.current.querySelector('input[name=repository]').value }
            console.log(data)
        }else{
            fetch((component.current.querySelector('input[name=filesystem-files]').value))
            .then(res => {
                console.log(res)
            },
            error => {
                console.log(error)
            })
        }
        axios({
            url: 'http://127.0.0.1:5000',
            method: 'post',
            data: data,
            responseType: 'json', // default
            // data: JSON.stringify({'inputVar': 1}),
            // contentType: "application/json",
        })
        .then(res => {
            // res = JSON.parse(res)
            console.log(res)

            // setTimeout(() => {
            //     setState(prevState => {
            //         return { ...prevState, pending: {
            //                 start: false,
            //                 completed: true
            //             } 
            //         }
            //     })
            //     setTimeout(() => {
            //         setState(prevState => {
            //             return {
            //                 ...prevState,
            //                 source_of_truth: res.data,
            //                 data: res.data,
            //                 pending: {
            //                     start: false,
            //                     completed: false
            //                 },
            //                 loaded: false
            //             }
            //         })
            //         setTimeout(() => {
            //             document.getElementById('result-list').classList.add('active')
            //             setTimeout(() => {
            //                 let elements = document.getElementsByClassName('component');
            //                 for(let x = 0; x < elements.length; x++){
            //                     elements[x].style.transitionDelay = '0ms'
            //                 }
            //             }, 500)
            //         }, 500)
            //     }, 500)
            // }, 1000)
        },
        error => {
            console.log(error)
            // setState({
            //     data: null,
            //     laoded: false
            // })
        })


        setTimeout(() => {
            setState(prevState => {
                return { ...prevState, pending: {
                        start: false,
                        completed: true
                    } 
                }
            })
            setTimeout(() => {
                setState(prevState => {
                    return {
                        ...prevState,
                        source_of_truth: [
                            {
                                id: 1,
                                name: 'astroid',
                                version: '2.12.13',
                                license: 'LGPL-2.1-or-later',
                                proprietary_license: false,
                                package_size: '478',
                                risk_level: 0,
                                repository_link: null,
                                web_link: null,
                                nested_components: [
                                    {
                                        id: 1,
                                        name: 'lazy-object-proxy',
                                        version: '1.4.0',
                                        license: 'BSD 2-Clause License',
                                        repository_link: 'https://github.com/ionelmc/python-lazy-object-proxy',
                                        risk_level: 0,
                                    },
                                    {
                                        id: 2,
                                        name: 'typed-ast',
                                        version: '1.4.0',
                                        license: 'Apache License 2.0',
                                        repository_link: 'https://github.com/python/typed_ast',
                                        risk_level: 0,
                                        nested_components: null
                                    },
                                    {
                                        id: 3,
                                        name: 'typing-extensions',
                                        version: '3.10',
                                        license: 'PSF',
                                        repository_link: 'https://github.com/python/typed_ast',
                                        risk_level: 0,
                                        nested_components: [
                                            {
                                                id: 1,
                                                name: 'typing',
                                                version: '3.7.4',
                                                license: 'PSF',
                                                repository_link: 'https://docs.python.org/3.5/library/typing.html',
                                                risk_level: 0,
                                                nested_components: null
                                            }
                                        ]
                                    },
                                    {
                                        id: 4,
                                        name: 'wrapt',
                                        version: '1.14.1',
                                        license: 'BSD',
                                        repository_link: 'https://github.com/GrahamDumpleton/wrapt',
                                        risk_level: 0,
                                        nested_components: null
                                    }
                                ]
                            },
                            {
                                id: 2,
                                name: 'certifi',
                                version: '2022.12.7',
                                license: 'BSD',
                                proprietary_license: false,
                                package_size: '478',
                                risk_level: 0,
                                repository_link: 'https://github.com/certifi/python-certifi',
                                nested_components: null
                            }
                        ],
                        data: [
                            {
                                id: 1,
                                name: 'astroid',
                                version: '2.12.13',
                                license: 'LGPL-2.1-or-later',
                                proprietary_license: false,
                                package_size: '478',
                                risk_level: 0,
                                repository_link: null,
                                web_link: null,
                                nested_components: [
                                    {
                                        id: 1,
                                        name: 'lazy-object-proxy',
                                        version: '1.4.0',
                                        license: 'BSD 2-Clause License',
                                        repository_link: 'https://github.com/ionelmc/python-lazy-object-proxy',
                                        risk_level: 0,
                                    },
                                    {
                                        id: 2,
                                        name: 'typed-ast',
                                        version: '1.4.0',
                                        license: 'Apache License 2.0',
                                        repository_link: 'https://github.com/python/typed_ast',
                                        risk_level: 0,
                                        nested_components: null
                                    },
                                    {
                                        id: 3,
                                        name: 'typing-extensions',
                                        version: '3.10',
                                        license: 'PSF',
                                        repository_link: 'https://github.com/python/typed_ast',
                                        risk_level: 0,
                                        nested_components: [
                                            {
                                                id: 1,
                                                name: 'typing',
                                                version: '3.7.4',
                                                license: 'PSF',
                                                repository_link: 'https://docs.python.org/3.5/library/typing.html',
                                                risk_level: 0,
                                                nested_components: null
                                            }
                                        ]
                                    },
                                    {
                                        id: 4,
                                        name: 'wrapt',
                                        version: '1.14.1',
                                        license: 'BSD',
                                        repository_link: 'https://github.com/GrahamDumpleton/wrapt',
                                        risk_level: 0,
                                        nested_components: null
                                    }
                                ]
                            },
                            {
                                id: 2,
                                name: 'certifi',
                                version: '2022.12.7',
                                license: 'BSD',
                                proprietary_license: false,
                                package_size: '478',
                                risk_level: 0,
                                repository_link: 'https://github.com/certifi/python-certifi',
                                nested_components: null
                            }
                        ],
                        pending: {
                            start: false,
                            completed: false
                        },
                        loaded: false
                    }
                })
                setTimeout(() => {
                    document.getElementById('result-list').classList.add('active')
                    setTimeout(() => {
                        let elements = document.getElementsByClassName('component');
                        for(let x = 0; x < elements.length; x++){
                            elements[x].style.transitionDelay = '0ms'
                        }
                    }, 500)
                }, 500)

                setTimeout(() => {
                    console.log(state)
                }, 1000)

            }, 500)

        }, 1000)

    }


    const actionHandler = event => {
        if(event.target.dataset.action === 'source'){
            setSource(event.target.dataset.type)
        }else if(event.target.dataset.action === 'export-as-pdf'){
            const date = new Date()
            const doc = new jsPDF('p', 'mm');

            let font_size = 12
            let line_counter = 0
            const line_height = 5
            const boundary = 20

            font_size = 24
            doc.setFontSize(font_size).text('Software Bill of Materials', boundary, boundary + (line_counter++ * line_height))
            line_counter += 2

            font_size = 8
            doc.setTextColor(100,100,100).setFontSize(font_size).text(`document created: ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}`, boundary, boundary + (line_counter++ * line_height))
            doc.text(`packages found: 434`, boundary, boundary + (line_counter++ * line_height))

            line_counter += 2
            font_size = 20
            doc.setFontSize(font_size).setTextColor(0,0,0).text(`Packages`, boundary, boundary + (line_counter++ * line_height))
            line_counter += 1
            doc.setFontSize(12)
            console.log(state.data)
            for(const value of state.data){
                console.log(value)
                doc.text(boundary, boundary + (line_counter++ * line_height), 
                    "package name: " + value.name
                )
            }
            doc.save(`SBOM_PDF_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.pdf`);
        }else if(event.target.dataset.action === 'export-as-json'){
            const date = new Date()
            saveAs(new Blob([JSON.stringify(state.data, null, 4)], {type: "text/plain"}), `SBOM_JSON_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.txt`);
        }else if(event.target.dataset.action === 'sort-by-name-asc'){
            console.log(state.source_of_truth)
            setState(prevState => {
                return { ...prevState, data: state.source_of_truth.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).filter(Boolean) }
            })
        }else if(event.target.dataset.action === 'sort-by-risk-level-asc'){
            setState(prevState => {
                return { ...prevState, data: state.source_of_truth.sort((a, b) => a.risk_level - b.risk_level ).filter(Boolean) }
            })
        }else if(event.target.dataset.action === 'sort-by-risk-level-desc'){
            setState(prevState => {
                return { ...prevState, data: state.source_of_truth.sort((a, b) => b.risk_level - a.risk_level ).filter(Boolean) }
            })
        }else if(event.target.dataset.action === 'sort-by-proprietary-license'){
            // if(!filter.sort_by_proprietary_license){
            let temp_data = Object.assign([], state.source_of_truth)
            for(var x in temp_data) {
                if(!temp_data[x].proprietary_license) {
                    delete temp_data[x];
                }
            }
            temp_data = temp_data.filter(Boolean)
            console.log(temp_data)
            setState(prevState => {
                return { ...prevState, data: temp_data }
            })
            // }
            setFilter(prevState => {
                return { ...prevState, sort_by_proprietary_license: !filter.sort_by_proprietary_license }
            })
        }else if(event.target.dataset.action === 'sort-by-risk-level-none'){
            let temp_data = Object.assign([], state.source_of_truth)
            for(var x in temp_data) {
                if(temp_data[x].risk_level != 0) {
                    delete temp_data[x];
                }
            }
            temp_data = temp_data.filter(Boolean)
            setState(prevState => {
                return { ...prevState, data: temp_data }
            })
        }else if(event.target.dataset.action === 'sort-by-risk-level-low'){
            let temp_data = Object.assign([], state.source_of_truth)
            for(var x in temp_data) {
                if(temp_data[x].risk_level != 1) {
                    delete temp_data[x];
                }
            }
            temp_data = temp_data.filter(Boolean)
            setState(prevState => {
                return { ...prevState, data: temp_data }
            })
        }else if(event.target.dataset.action === 'sort-by-risk-level-moderate'){
            let temp_data = Object.assign([], state.source_of_truth)
            for(var x in temp_data) {
                if(temp_data[x].risk_level != 2) {
                    delete temp_data[x];
                }
            }
            temp_data = temp_data.filter(Boolean)
            setState(prevState => {
                return { ...prevState, data: temp_data }
            })
        }else if(event.target.dataset.action === 'sort-by-risk-level-high'){
            if(!filter.sort_by_risk_level_high){
                let temp_data = Object.assign([], state.source_of_truth)
                for(var x in temp_data) {
                    if(temp_data[x].risk_level != 3) {
                        delete temp_data[x];
                    }
                }
                temp_data = temp_data.filter(Boolean)
                setState(prevState => {
                    return { ...prevState, data: temp_data }
                })
            }
            setFilter(prevState => {
                return { ...prevState, sort_by_risk_level_high: !filter.sort_by_risk_level_high }
            })
        }
    }


    const componentClickHandler = (component, data, number) => {
        component.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        document.getElementById('component-list').scroll({
            top: component.offsetTop,
            left: 0,    
            behavior: 'smooth'
        })
        setDetail(data)
        console.log(number)
        setActiveComponent(number)
    }

    const nestedComponentClickHandler = (component_id, data) => {
        console.log(data)
        setDetail(data)
    }


    const toggleHandler = (event) => {
        const toggle_element = document.querySelector(`.toggle-element[data-toggle-element-id=${event.target.dataset.toggleElementId}]`)
        toggle_element.style.height = event.target.dataset.toggleActive === 'false' ? 'inherit' : '0px'
        event.target.dataset.toggleActive = event.target.dataset.toggleActive === 'true' ? 'false' : 'true'
    }

    const [activeComponent, setActiveComponent] = useState(null)


    const [repoLink, setRepoLink] = useState('https://github.com/sonatype-nexus-community/ossindex-python')


    if(!state.loaded || state.data == null){
        return (
            <div className='relative full-flex'>
                {
                    !state.data && !state.pending?.start && !state.pending?.completed && (
                        <div ref={component} className='m-20'>
                            <h2 className='font-questrial fs-200 m-0 mb-20'>Upload your source code</h2>
                            <div className='p-15px br-1 bg-color-2'>
                                <div className='flex-container v-end mb-20 gap-5'>
                                    <button data-action='source' data-type='repository' onClick={event => actionHandler(event)} className='flex-container v-center h-center br-1 bg-color-3 pointer p-10 opacity-hover-5 trans-duration-2' style={{ width: '35px', height: '35px' }}>
                                        <i className="fa-brands fa-git no-event"></i>
                                    </button>
                                    <button data-action='source' data-type='filesystem' onClick={event => actionHandler(event)} className='flex-container v-center h-center br-1 bg-color-3 pointer p-10 opacity-hover-5 trans-duration-2' style={{ width: '35px', height: '35px' }}>
                                        <i className="fa-solid fa-file-arrow-up no-event"></i>
                                    </button>
                                </div>
                                <div className='relative no-select overflow-hidden'>
                                    <div className={`flex-container column ${ !source === 'fyilesystem' && 'none' }`}>
                                        <div className='br-1 full-width overflow-hidden'>
                                            <div className='flex-container even trans-duration-5' style={{ width: '200%', transform: `translateX(${ source === 'repository' ? '0' : '-50' }%)`}}>
                                                <TextInput name='repository' value={repoLink} changeHandler={value => setRepoLink(value)} placeholder='provide a git url...' />
                                                <div className='p-10px pl-15px pr-15px bg-color-1 br-1'>
                                                    cli coming soon
                                                </div>
                                            </div>
                                        </div>
                                        <div className='mt-10'>
                                            <button className='pl-15px pr-15px br-1 pointer font-sen p-10px accent-bg-color-1 accent-color-1 opacity-hover-5 trans-duration-2' onClick={() => submitData()}>analyze</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
                {
                    state.data && !state.pending?.start && (
                        <div id='sbom-result' className='p-20 no-select'>
                            <Popup type='success' message='analysis successful' />
                            <div className='flex-container even gap-10'>
                                <div className='bg-color-1 br-3 p-20px'>
                                    <DoughnutChart/>
                                </div>
                                <div>
                                    <div className='flex-container column gap-10 full-height even'>
                                        <div className='flex-container even gap-10'>
                                            <div className='bg-color-1 br-2 p-10px'>
                                                <div className='p-5px pl-10px pr-10px inline-block br-1 mb-20'>dependencies</div>
                                                <div className='p-10px'>
                                                    <div className='txt-center'>
                                                        <div className='fs-200 fw-600 green font-jost'>2091</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='bg-color-1 br-2 p-10px'>
                                                <div className='p-5px pl-10px pr-10px inline-block br-1 mb-20'>licenses</div>
                                                <div className='p-10px'>
                                                    <div className='txt-center'>
                                                        <div className='fs-200 fw-600 font-jost'>471</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='bg-color-1 br-2 p-10px'>
                                            <div className='p-5px pl-10px pr-10px inline-block br-1 mb-20'>total vulnerabilities</div>
                                            <div className='flex-container even p-10px'>
                                                <div className='txt-center yellow'>
                                                    <div className='fs-200 fw-600 font-jost'>36</div>
                                                    <div>low</div>
                                                </div>
                                                <div className='txt-center orange'>
                                                    <div className='fs-200 fw-600 font-jost'>11</div>
                                                    <div>medium</div>
                                                </div>
                                                <div className='txt-center red'>
                                                    <div className='fs-200 fw-600 font-jost'>3</div>
                                                    <div>high</div>
                                                </div>
                                                <div className='txt-center red'>
                                                    <div className='fs-200 fw-600 font-jost'>1</div>
                                                    <div>critical</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex-container mt-50 gap-5'>
                                <button data-action='sort-by-name-asc' onClick={event => actionHandler(event)} className='flex-container v-center h-center br-1 bg-color-3 pointer p-10 opacity-hover-5 trans-duration-2' style={{ width: '35px', height: '35px' }}>
                                    <i className="fa-solid fa-arrow-down-a-z no-event"></i>
                                </button>
                                <button data-action='sort-by-risk-level-asc' onClick={event => actionHandler(event)} className='flex-container v-center h-center br-1 bg-color-3 pointer p-10 opacity-hover-5 trans-duration-2' style={{ width: '35px', height: '35px' }}>
                                    <i className="fa-solid fa-arrow-down-short-wide no-event"></i>
                                </button>
                                <button data-action='sort-by-risk-level-desc' onClick={event => actionHandler(event)} className='flex-container v-center h-center br-1 bg-color-3 pointer p-10 opacity-hover-5 trans-duration-2' style={{ width: '35px', height: '35px' }}>
                                    <i className="fa-solid fa-arrow-up-wide-short no-event"></i>
                                </button>
                                <button data-action='sort-by-proprietary-license' onClick={event => actionHandler(event)} className='flex-container v-center h-center br-1 bg-color-3 pointer p-10 opacity-hover-5 trans-duration-2' style={{ width: '35px', height: '35px' }}>
                                    <i className="fa-solid fa-dollar-sign no-event"></i>
                                </button>
                                <button data-action='sort-by-risk-level-none' onClick={event => actionHandler(event)} className={`filter flex-container v-center h-center br-1 bg-color-3 pointer p-10 opacity-hover-5 trans-duration-2 font-sen fw-600 ${ filter.sort_by_risk_level_none && 'active' }`} style={{ height: '35px' }}>
                                    no risk
                                </button>
                                <button data-action='sort-by-risk-level-low' onClick={event => actionHandler(event)} className={`filter flex-container v-center h-center br-1 bg-color-3 pointer p-10 opacity-hover-5 trans-duration-2 font-sen fw-600 ${ filter.sort_by_risk_level_low && 'active' }`} style={{ height: '35px' }}>
                                    low risk
                                </button>
                                <button data-action='sort-by-risk-level-moderate' onClick={event => actionHandler(event)} className={`filter flex-container v-center h-center br-1 bg-color-3 pointer p-10 opacity-hover-5 trans-duration-2 font-sen fw-600 ${ filter.sort_by_risk_level_moderate && 'active' }`} style={{ height: '35px' }}>
                                    medium risk
                                </button>
                                <button data-action='sort-by-risk-level-high' onClick={event => actionHandler(event)} className={`filter flex-container v-center h-center br-1 bg-color-3 pointer p-10 opacity-hover-5 trans-duration-2 font-sen fw-600 ${ filter.sort_by_risk_level_high && 'active' }`} style={{ height: '35px' }}>
                                    high risk
                                </button>
                            </div>
                            <div className='flex-container gap-10 mt-20 sticky top-0'>
                                <div className='flex-container column full-width scroll-x hidden-bar relative bg-color-1 br-2'>
                                    <div className='flex-container column absolute top-0 left-0 right-0 bottom-0 overflow-hidden' style={{ width: 'min-content' }}>
                                        <div className='flex-container h-center even full-width bg-color-1 sticky top-0 z-3 overflow-hidden' style={{ borderBottom: '4px solid #1b1c28' }}>
                                            <div className='flex-container gap-5 bg-color-1 p-15px sticky left-0 min-width-180px'>
                                                {/* <span style={{ color: '#0090ff' }}>
                                                    <i className="fa-solid fa-cube fs-80"></i>
                                                </span> */}
                                                <span>
                                                    package name
                                                </span>
                                            </div>
                                            <div className='flex-container gap-5 min-width-180px'>
                                                {/* <span style={{ color: '#ff00f9' }}>
                                                    <i className="fa-regular fa-file fs-80"></i>
                                                </span> */}
                                                <span>
                                                    licenses
                                                </span>
                                            </div>
                                            <div>
                                                <div className='flex-container gap-5 min-width-180px'>
                                                    {/* <span>
                                                        <i className="fa-solid fa-triangle-exclamation fs-80 opacity-3"></i>
                                                    </span> */}
                                                    <span>
                                                        risk severity
                                                    </span>
                                                </div>
                                            </div>
                                            {/* <div className='min-width-180px'>
                                                {t('is proprietary')}
                                            </div> */}
                                            <div className='flex-container gap-5 min-width-180px'>
                                                <span>
                                                    <i className="fa-solid fa-code fs-80"></i>
                                                </span>
                                                <span>
                                                    version
                                                </span>
                                            </div>
                                            <div className='min-width-180px'>
                                                package manager
                                            </div>
                                            <div className='min-width-180px'>
                                                attack vector
                                            </div>
                                            <div className='min-width-180px'>
                                                attack complexity
                                            </div>
                                            <div className='min-width-180px'>
                                                privileges required
                                            </div>
                                            <div className='min-width-180px'>
                                                user interaction
                                            </div>
                                            <div className='min-width-180px'>
                                                scope
                                            </div>
                                            <div className='min-width-180px'>
                                                confidentiality impact
                                            </div>
                                            <div className='min-width-180px'>
                                                integrity impact
                                            </div>
                                            <div className='min-width-180px'>
                                                availability impact
                                            </div>
                                            <div className='min-width-180px'>
                                                exploitability score
                                            </div>
                                            <div className='min-width-180px'>
                                                impact score
                                            </div>
                                        </div>
                                        <div id='component-list' className='scroll-y hidden-bar relative'>
                                            <div id='result-list' className='flex-container column trans-duration-5'>
                                                {
                                                    state.data?.map((component, x) => {
                                                        return(
                                                            <ComponentItem data={component} clickHandler={componentClickHandler} active={activeComponent} key={component.id} />
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {
                                    detail && (
                                        <div className='flex-container column inline-block p-10px br-2 bg-color-1 overflow-hidden' style={{ width: '29%', top: '10px', height: 'calc(70vh - 20px)' }}>
                                            <h3 className='m-0 mb-20 font-questrial fw-300 p-5px bg-color-1 txt-center'>Details</h3>
                                            <div className='flex-container column full-height overflow-hidden'>
                                                <div>
                                                    <div onClick={event => toggleHandler(event)} data-toggle-element-id='general-information' data-toggle-active='false' className='toggle-trigger flex-container space-between mt-20 mb-40 font-questrial br-1 p-5px pl-10px pointer opacity-hover-8 trans-duration-1' style={{ backgroundColor: '#1c1c28' }}>
                                                        <span className='flex-container gap-5'>
                                                            <span>
                                                                <span className='no-event'>general</span>
                                                            </span>
                                                        </span>
                                                        <span className='br-1 flex-container v-center h-center fs-70 ml-5 no-event' style={{ width: '16px', height: '16px' }}>
                                                            <i className="toggle-icon fa-solid fa-angle-down opacity-6 trans-duration-3"></i>
                                                        </span>
                                                    </div>
                                                    <div data-toggle-element-id='general-information' className='toggle-element overflow-hidden trans-duration-2'>
                                                        <div className='flex-container column gap-5 font-questrial fs-90 bg-color-1 br-1 p-10px'>
                                                            <div className='flex-container space-between'>
                                                                <span className='opacity-3'>comp. name: </span><span className='fw-600 txt-right'>{ detail.name }</span>
                                                            </div>
                                                            <div className='flex-container space-between'>
                                                                <span className='opacity-3'>comp. version: </span><span className='fw-600 font-jost'>{ detail.version }</span>
                                                            </div>
                                                            <div className='flex-container space-between'>
                                                                <span className='opacity-3'>license type: </span><a href={`https://spdx.org/licenses/${ detail.license_link }`} className='fw-600'>{ detail.license }</a>
                                                            </div>
                                                            <div className='flex-container space-between'>
                                                                <span className='opacity-3'>security risk level: </span><span className={`fw-600 ${ detail.risk_level === 1 ? 'yellow' : detail.risk_level === 2 ? 'orange' : detail.risk_level === 3 && 'red' }`}>{ detail.risk_level }</span>
                                                            </div>
                                                            <div className='flex-container space-between'>
                                                                <span className='opacity-3'>package size: </span><span className='fw-600'>{ detail.package_size } kB</span>
                                                            </div>
                                                            {
                                                                detail.repository_link && (
                                                                    <div className='flex-container space-between'>
                                                                        <span className='opacity-3'>public repository: </span><a className='normal-link flex-container h-center gap-5 fw-600 trans-duration-1' href={`${ detail.repository_link }`} target='_blank' rel='noopener noreferrer'><span>{ detail.name }</span><i className="fa-solid fa-arrow-up-right-from-square fs-70"></i></a>
                                                                    </div>
                                                                )
                                                            }
                                                            {
                                                                detail.web_link && (
                                                                    <div className='flex-container space-between'>
                                                                        <span className='opacity-3'>website: </span><a className='normal-link flex-container h-center gap-5 fw-600 trans-duration-1' href={`${ detail.web_link }`} target='_blank' rel='noopener noreferrer'><span>{ detail.name }</span><i className="fa-solid fa-arrow-up-right-from-square fs-70"></i></a>
                                                                    </div>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div onClick={event => toggleHandler(event)} data-toggle-element-id='aggregated-information' data-toggle-active='false' className='toggle-trigger flex-container space-between mt-20 mb-40 font-questrial br-1 p-5px pl-10px pointer opacity-hover-8 trans-duration-1' style={{ backgroundColor: '#1c1c28' }}>
                                                        <span className='no-event'>aggregated</span>
                                                        <span className='br-1 flex-container v-center h-center fs-70 ml-5 no-event' style={{ width: '16px', height: '16px' }}>
                                                            <i className="toggle-icon fa-solid fa-angle-down opacity-6 trans-duration-3"></i>
                                                        </span>
                                                    </div>
                                                    <div data-toggle-element-id='aggregated-information' className='toggle-element overflow-hidden trans-duration-2'>
                                                        <div className='flex-container column gap-5 font-questrial fs-90 bg-color-1 br-1 p-10px'>
                                                            <div className='flex-container space-between'>
                                                                <span className='opacity-3'>amount nested components: </span><span className='fw-600'>{ detail.nested_components ? detail.nested_components.length : 0 }</span>
                                                            </div>
                                                            <div className='flex-container space-between'>
                                                                <span className='opacity-3'>amount nested risk level 0: </span><span className='fw-600'>{ 12 }</span>
                                                            </div>
                                                            <div className='flex-container space-between'>
                                                                <span className='opacity-3'>amount nested risk level 1: </span><span className='fw-600'>{ 3 }</span>
                                                            </div>
                                                            <div className='flex-container space-between'>
                                                                <span className='opacity-3'>amount nested risk level 2: </span><span className='fw-600'>{ 2 }</span>
                                                            </div>
                                                            <div className='flex-container space-between'>
                                                                <span className='opacity-3'>amount nested risk level 3: </span><span className='fw-600'>{ 1 }</span>
                                                            </div>
                                                            <div className='flex-container space-between'>
                                                                <span className='opacity-3'>max. nested depth: </span><span className='fw-600'>{ 23 }</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='flex-container gap-5 mt-20 mb-40 font-questrial'>
                                                    <span style={{ color: '#af00ff' }}>
                                                        <i className="fa-solid fa-circle-nodes fs-90"></i>
                                                    </span>
                                                    <span>
                                                        nested components
                                                    </span>
                                                </div>
                                                <div className='full-height scroll-y scroll-bar-2 bg-color-1 br-1'>
                                                    <div className='flex-container column gap-5 full-width'>
                                                        {
                                                            detail.nested_components?.map((lib, x) => {
                                                                return(
                                                                    <NestedComponentItem data={lib} clickHandler={nestedComponentClickHandler} key={lib.id} nested_level={0} number={x} />
                                                                )
                                                            }) 
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }else{
        
    }
}

export default App;
