export  * from  './customerros.js'
export  * from './interceptors.js'
import  {api} from './api.js';

const opinnoAppi = api("http://localhost:8080/api")

async function getData(){
    return await opinnoAppi.get('/data.json')
}

async function pinta(){
    try{
        const data = await getData();
        data.forEach(element => {
            const {name,description} = element;
            const h1 = document.createElement('h1');
            h1.textContent = name;
            const h2 = document.createElement('h2');
            h2.textContent = description;
            const div = document.createElement('div');
            div.appendChild(h1)
            div.appendChild(h2)
            document.body.appendChild(div)
        });
    }
    catch(err){
        console.log(err)
    }
    
}

pinta();

