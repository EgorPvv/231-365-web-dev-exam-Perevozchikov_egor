/* eslint-disable max-len */

'use strict';

function getAge(age) {
    if (age % 10 === 1 && age !== 11) {
        return 'год';
    };
    if (age % 10 >= 2 && age % 10 <= 4 && (age < 10 || age > 20)) { 
        return 'года'; 
    } 
    return 'лет';
};

function renderGuides(guides) {
    const tbody_guides = document.querySelector(".tbody-guides");    
    const thead_guides = document.querySelector(".table-header-guides");
    tbody_guides.innerHTML = ''; 
    tbody_guides.appendChild(thead_guides);
    for (const result of guides) {
        console.log(guides);
        const tr = document.createElement("tr"); 
        tr.id = result.id;
        const name = document.createElement("td"); 
        name.classList.add('table-cell');
        name.textContent = result.name; 
        tr.append(name);
        const language = document.createElement("td"); 
        language.classList.add('table-cell');
        language.textContent = result.language; 
        tr.append(language); 
        const workExperience = document.createElement("td"); 
        workExperience.classList.add('table-cell');
        workExperience.textContent = result.workExperience + ' ' + getAge(result.workExperience); 
        tr.append(workExperience); 
        const pricePerHour = document.createElement("td"); 
        pricePerHour.classList.add('table-cell');
        pricePerHour.textContent = result.pricePerHour + " ₽ / час"; 
        tr.append(pricePerHour); 
        const butt = document.createElement("td");
        butt.textContent = document.createElement("button");
        tbody_guides.appendChild(tr); 
    }
}

function getGuides() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', `http://exam-2023-1-api.std-900.ist.mospolytech.ru/api/routes/${routeID}/guides?api_key=0e723aa4-c398-4c47-a8ea-ca5e60872a05`);
    xhr.send();
    xhr.onload = function() {
        const data = JSON.parse(this.response);
        renderGuides(data);
    };

    xhr.onerror = function() {
        alert(`Ошибка соединения`);
    };
}


window.addEventListener('click', getGuides);
