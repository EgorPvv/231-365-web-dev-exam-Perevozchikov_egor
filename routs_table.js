/* eslint-disable max-len */

'use strict';

let perPage = 4;
let currentPage = 1;
let totalPage = 0;
const API_KEY = '0e723aa4-c398-4c47-a8ea-ca5e60872a05';
const mainUrl = `http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/`;

let routeID = 0;

function changeValue(buttonId) {
    routeID = buttonId;
}

function renderOrders(orders) {
    const tbody_routs = document.querySelector(".tbody-routs");    
    const thead_routs = document.querySelector(".table-header-routs");
    tbody_routs.innerHTML = ''; 
    tbody_routs.appendChild(thead_routs);
    for (const result of orders) {
        console.log(orders);
        const tr = document.createElement("tr"); 
        tr.id = result.id; 
        const name = document.createElement("td"); 
        name.classList.add('route-name');
        name.setAttribute('id', 'route-name');
        name.textContent = result.name; 
        const button_accept = document.createElement("button");
        button_accept.textContent = 'Выбрать';
        button_accept.classList.add("accept-button");
        button_accept.setAttribute('id', tr.id);
        name.appendChild(button_accept);
        name.addEventListener('click', function(event) {
            if (event.target.tagName === "BUTTON") {
                let buttonId = event.target.id;
                changeValue(buttonId);
            } 
        });
        tr.append(name); 
        const description = document.createElement("td"); 
        description.classList.add('route-description');
        description.textContent = result.description; 
        tr.append(description); 
        const mainObject = document.createElement("td"); 
        mainObject.classList.add('d-md-table-cell');
        mainObject.classList.add('d-none');
        mainObject.classList.add('route-mainObject');
        mainObject.textContent = result.mainObject; 
        tr.append(mainObject); 
        tbody_routs.appendChild(tr); 
        
    }
}

function renderPagination() {
    const blockPagination = document.querySelector('.pagination');
    blockPagination.innerHTML = '';
    for (let i = 1; i <= totalPage; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        const page = document.querySelector(".page-counter");
        page.textContent = "Страница " + currentPage;
        btn.addEventListener('click', (event)=>{
            const target = event.target;
            currentPage = target.textContent;
            // eslint-disable-next-line no-use-before-define
            getOrgers();
        });
        blockPagination.append(btn);   
    }
}

function getOrgers() {
    const url = new URL('routes', mainUrl);
    url.searchParams.set('api_key', '0e723aa4-c398-4c47-a8ea-ca5e60872a05');
    let xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.send();
    xhr.onload = function() {
        const data = JSON.parse(this.response);
        totalPage = Math.ceil(data.length / perPage);
        const start = currentPage * perPage - perPage;
        const end = currentPage * perPage;
        renderOrders(data.slice(start, end));
        renderPagination();
    };

    xhr.onerror = function() {
        alert(`Ошибка соединения`);
    };
}

window.addEventListener('DOMContentLoaded', getOrgers);
