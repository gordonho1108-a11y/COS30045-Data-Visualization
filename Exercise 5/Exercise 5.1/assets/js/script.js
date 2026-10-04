document.addEventListener("DOMContentLoaded", function () {
  setFooterYear();
  initFaqAccordion();
  initCalculator();
});


function setFooterYear() {
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}


function initFaqAccordion() {
  var items = document.querySelectorAll(".faq-item");
  if (!items.length) return;

  items.forEach(function (item) {
    var question = item.querySelector(".faq-item__q");
    var answer = item.querySelector(".faq-item__a");
    if (!question || !answer) return;

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("is-open");

      if (isOpen) {
        closeFaqItem(item, question, answer);
      } else {
        openFaqItem(item, question, answer);
      }
    });
  });
}

function openFaqItem(item, question, answer) {
  item.classList.add("is-open");
  question.setAttribute("aria-expanded", "true");

  answer.style.maxHeight = answer.scrollHeight + "px";
}

function closeFaqItem(item, question, answer) {
  item.classList.remove("is-open");
  question.setAttribute("aria-expanded", "false");
  answer.style.maxHeight = "0px";
}


function initCalculator() {
  var form = document.getElementById("calc-form");
  if (!form) return;

  var applianceSelect = document.getElementById("appliance");
  var customField = document.getElementById("custom-watt-field");
  var customWattsInput = document.getElementById("custom-watts");
  var hoursInput = document.getElementById("hours");
  var priceInput = document.getElementById("price");
  var resultsBody = document.getElementById("results-body");
  var resetBtn = document.getElementById("calc-reset");

  var errorWatts = document.getElementById("error-watts");
  var errorHours = document.getElementById("error-hours");
  var errorPrice = document.getElementById("error-price");

  applianceSelect.addEventListener("change", function () {
    var isCustom = applianceSelect.value === "custom";
    customField.hidden = !isCustom;
    if (!isCustom) {
      customWattsInput.value = "";
      errorWatts.textContent = "";
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    runCalculation();
  });

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      window.setTimeout(function () {
        [errorWatts, errorHours, errorPrice].forEach(function (el) {
          el.textContent = "";
        });
        customField.hidden = true;
        resultsBody.innerHTML =
          '<p class="calculator__placeholder">Enter your details and select ' +
          '"Calculate" to see daily, monthly and yearly energy use and cost.</p>';
      }, 0);
    });
  }

  function runCalculation() {
    var watts = getWattage();
    var hours = parseFloat(hoursInput.value);
    var price = parseFloat(priceInput.value);

    var valid = true;

    errorWatts.textContent = "";
    if (applianceSelect.value === "custom") {
      if (isNaN(watts) || watts <= 0) {
        errorWatts.textContent = "Enter a power usage greater than 0 watts.";
        valid = false;
      } else if (watts > 10000) {
        errorWatts.textContent = "That seems too high — check the value in watts.";
        valid = false;
      }
    }

    errorHours.textContent = "";
    if (isNaN(hours) || hours < 0) {
      errorHours.textContent = "Enter hours of use as a number of 0 or more.";
      valid = false;
    } else if (hours > 24) {
      errorHours.textContent = "Hours per day can't exceed 24.";
      valid = false;
    }

    errorPrice.textContent = "";
    if (isNaN(price) || price < 0) {
      errorPrice.textContent = "Enter an electricity price of 0 or more.";
      valid = false;
    } else if (price > 200) {
      errorPrice.textContent = "That price looks unusually high — check the value (c/kWh).";
      valid = false;
    }

    if (!valid) {
      resultsBody.innerHTML =
        '<p class="calculator__placeholder">Please fix the highlighted fields and try again.</p>';
      return;
    }

    renderResults(watts, hours, price);
  }

  function getWattage() {
    if (applianceSelect.value === "custom") {
      return parseFloat(customWattsInput.value);
    }
    return parseFloat(applianceSelect.value);
  }

  function renderResults(watts, hoursPerDay, priceCentsPerKwh) {
    var dailyKwh = (watts * hoursPerDay) / 1000;
    var monthlyKwh = dailyKwh * 30;
    var yearlyKwh = dailyKwh * 365;
    var yearlyCost = (yearlyKwh * priceCentsPerKwh) / 100; 
    var monthlyCost = (monthlyKwh * priceCentsPerKwh) / 100;

    resultsBody.innerHTML =
      buildResultRow("Daily energy use", dailyKwh.toFixed(2) + " kWh") +
      buildResultRow("Monthly energy use", monthlyKwh.toFixed(1) + " kWh") +
      buildResultRow("Yearly energy use", yearlyKwh.toFixed(0) + " kWh") +
      buildResultRow("Estimated monthly cost", "$" + monthlyCost.toFixed(2)) +
      buildResultRow("Estimated yearly cost", "$" + yearlyCost.toFixed(2));
  }

  function buildResultRow(label, value) {
    return (
      '<div class="result-row">' +
      '<span class="result-row__label">' + label + "</span>" +
      '<span class="result-row__value">' + value + "</span>" +
      "</div>"
    );
  }
}
