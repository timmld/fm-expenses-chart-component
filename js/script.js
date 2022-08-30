const chartDays = document.querySelectorAll(".e-spending__chart-bar__day span");
const chartBars = document.querySelectorAll(".e-spending__chart-bar");
const chartValues = document.querySelectorAll(".e-spending__chart-bar__value span");

function normalize(val, min, max) {
    return (val - min) / (max - min);
}

function updateChart(data) {
    const minAmount = Math.min(...data.map(item => item.amount))
    const maxAmount = Math.max(...data.map(item => item.amount));
    for (let i = 0; i < chartDays.length; i++) {
        chartDays[i].textContent = data[i].day;
        chartBars[i].style.height = normalize(data[i].amount, minAmount, maxAmount) * 100 + 50 + "px";
        chartValues[i].textContent = "$" + data[i].amount;
        if (data[i].amount == maxAmount) {
            chartBars[i].classList.add("e-highest");
        };
    };
};

fetch('../data/data.json')
    .then((response) => response.json())
    .then((data) => updateChart(data));