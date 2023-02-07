import $ from 'jquery'

export const linkHandler = event => {
    event.preventDefault()
    
    var a = document.createElement('a');
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.href = event.target.dataset.url;
    a.click();
}



export const splitString = (component, className = "like-number") => {
    component.innerHTML = component.textContent.replace(/\S/g, `<span class='${className}'>$&</span>`);
}



export const requestFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
    }
}

export const exitFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}


export function setCookie(name,value,days) {
    var expires = "; expires=" + (10 * 365 * 24 * 60 * 60);
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
export function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
export function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}






export const setNumber = (number) => {
    let tempNumber = number.toString()
    if(tempNumber.length <= 3){
        return number
    }else if(tempNumber.length > 3 && tempNumber.length <= 6){
        //return tempNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        return (number / 1000).toFixed(1).replace(/\.0$/, '') + 'K'
    }else if(tempNumber.length > 6){
        return (number / 1000000).toFixed(1).replace(/\.0$/, '') + 'M'
    }
}

export const thousandSeperator = (number, en = true) => {
  if(en){
    return parseInt(number).toLocaleString('en')
  }else{
    return parseInt(number).toLocaleString('en').replaceAll(",", ".")
  }
}



export const getAgent = () => {
    const ua = navigator.userAgent
    if (/android/i.test(ua)) {
      return "android"
    }else if((/iPad|iPhone|iPod/.test(ua)) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)){
      return "ios"
    }
    return "other"
}



export const toDate = (rawDate) => {
    let datetime = rawDate.split("T");
    let date = datetime[0].split("-");
    date = date[2] + "." + date[1] + "." + date[0];
    //let time = datetime[1].replace("Z", "");

    return date;
}




export const toggleAccordion = (toggler) => {
    $(`[data-toggle-content='${$(toggler).data('toggle-id')}']`).toggleClass('active')
}



