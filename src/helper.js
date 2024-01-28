import axios from 'axios';
async function regSw () {
  if ('serviceWorker' in navigator) {
    let url = process.env.PUBLIC_URL + '/sw.js';
    const reg = await navigator.serviceWorker.register (url, {scope: '/'});
    console.log ('service config is', {reg});
    return reg;
  }
  throw Error ('serviceworker not supported');
}

async function subscribe (serviceWorkerReg) {
    let subscription = await serviceWorkerReg.pushManager.getSubscription ();
    console.log ({subscription});
    if (subscription === null) {
      subscription = await serviceWorkerReg.pushManager.subscribe ({
        userVisibleOnly: true,
        applicationServerKey: 'BMQOKdrpuYRNgI3wXtDoQstTJEt1rnO9w6b9KM3MnJek8V4DH72OYNYoACbpveEVg_1snYmI8EZIdJV_5qjfMo4',
      });
    }
	try{
		axios.post(`${process.env.REACT_APP_BACKEND}message/subscribe`, subscription);
	}
	catch(error){
		console.log(error);
	}
  }

  export {regSw, subscribe};