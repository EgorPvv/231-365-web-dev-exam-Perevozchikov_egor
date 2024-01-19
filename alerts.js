'use strict';

let cross_button = document.querySelector('.cross-button');

function closeAlerts() {
    let alerts = document.querySelector(".alerts");
    alerts.style.display = "none";
};

cross_button.addEventListener("click", closeAlerts);