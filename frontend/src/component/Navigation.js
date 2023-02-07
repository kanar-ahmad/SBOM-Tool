import React, {useState, useRef, Component } from 'react'
import { SelectInput } from './UI/Input'
import { jsPDF } from "jspdf";




const InfoNavigation = () => {

    const actionHandler = event => {
        if(event.target.dataset.action === 'export-as-pdf'){
            const date = new Date()
            const doc = new jsPDF('p', 'mm');

            let font_size = 12
            let line_counter = 0
            const line_height = 5
            const boundary = 20

            // console.log(state.data)
            // console.log(doc.getFontList())
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
            // console.log(state.data)
            // for(const value of state.data){
            //     console.log(value)
            //     doc.text(boundary, boundary + (line_counter++ * line_height), 
            //         "package name: " + value.name
            //     )
            // }
            // state.data.forEach(function(employee, i){
            //     doc.text(20, 10 + (i * 10), 
            //         "First Name: " + employee.firstName +
            //         "Last Name: " + employee.lastName);
            // });
            doc.save(`SBOM_PDF_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.pdf`);
        }else if(event.target.dataset.action === 'export-as-json'){
            const date = new Date()
            // saveAs(new Blob([JSON.stringify(state.data, null, 4)], {type: "text/plain"}), `SBOM_JSON_${date.getDate()}-${date.getMonth()}-${date.getFullYear()}.txt`);
        }
    }


    const [exportType, setExportType] = useState('json')
    const exportChanger = (value) => {
        setExportType(value)
    }



    return(
        <div className='flex-container h-center space-between p-10px pl-15px pr-15px no-select full-width z-3' style={{ boxShadow: '0 2px 10px 0 #151620', boxShadow: 'rgb(19 20 29 / 30%) 0px 4px 0px 0px' }}>
            <div className='none'>
                <div className='flex-container h-center gap-10'>
                    <div className='flex-container h-center gap-10 font-dm-mono fs-90'>
                        <SelectInput options={['TensorFlow', 'API-Generator', 'flogram']} initial_display_type={'Project 1'} typeChanger={exportChanger} buttonStyle='opacity-hover-6 trans-duration-1 p-5px bd-1'/>
                        <span><i className="fa-solid fa-caret-right opacity-1"></i></span>
                    </div>
                    <div className='flex-container h-center gap-10'>
                        <div className='font-dm-mono'>
                            <SelectInput options={['https://github.com/kanar-ahmad/SBOM-Frontend.git', 'https://github.com/hockertz/API-Generator.git', 'https://github.com/testXC/flogram.git']} initial_display_type={'https://github.com/kanar-ahmad/SBOM-Frontend.git'} typeChanger={exportChanger} buttonStyle='opacity-hover-6 trans-duration-1 p-5px bd-1'/>
                        </div>
                        <div>
                            <span className='flex-container h-center gap-5 p-5px pl-10px pr-10px br-1 bg-green-soft green pointer opacity-hover-6 trans-duration-1'>
                                <span className='font-dm-mono fs-90'>
                                    master
                                </span>
                                <span data-action='toggle-nested' className='toggle-trigger fs-70'>
                                    {/* <i className="fa-solid fa-caret-down"></i> */}
                                    <i className="toggle-icon fa-solid fa-angle-down no-event trans-duration-3"></i>
                                </span>
                            </span>
                        </div>
                        <div>
                            <span className='p-5px opacity-1 opacity-hover-2 trans-duration-2'><i className="fa-solid fa-lock fs-80"></i></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex-container gap-20'>
                <div className='none'>
                    <div className='flex-container h-center gap-5'>
                        <span className='fs-80'>analyzed:</span>
                        <SelectInput options={['15/12/2022 09:25 GMT+1']} initial_display_type={'22/12/2022 13:37 GMT+1'} typeChanger={exportChanger} buttonStyle='opacity-hover-6 trans-duration-1 p-5px bd-1 fs-80'/>
                    </div>
                </div>
                <div>
                    <div>
                        <div>
                            <a onClick={event => actionHandler(event)} style={{ border: '1px solid' }} className='flex-container h-center gap-10 p-5px pl-15px pr-15px br-1 pointer font-baloo accent-bg-color-1 accent-color-1 opacity-hover-5 trans-duration-2'><span className='no-event'>create report </span><i className="fa-regular fa-file fs-80"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export { InfoNavigation }

