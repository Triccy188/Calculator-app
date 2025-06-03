const inputField = document.getElementById("calc-screen");
const buttons = document.querySelectorAll(".btn");
const themeNumbers = document.querySelectorAll(".theme-numbers span");
const sliderKnob = document.querySelector(".slider-knob");

// Knob left positions (px) for themes 1, 2, 3
const knobPositions = {
  1: 3,
  2: 23,
  3: 43,
};

let expression = "";

// Set theme function
function setTheme(themeNumber) {
  document.documentElement.setAttribute("data-theme", themeNumber);
  sliderKnob.style.left = knobPositions[themeNumber] + "px";
  localStorage.setItem("theme", themeNumber);
}

// Calculator button logic
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "DEL") {
      expression = expression.slice(0, -1);
    } else if (value === "RESET") {
      expression = "";
    } else if (value === "=") {
      try {
        // Replace 'x' with '*' for multiplication
        const sanitized = expression.replace(/x/g, "*");
        // Evaluate expression
        const result = eval(sanitized);
        expression = result.toString();
      } catch (error) {
        expression = "Error";
      }
    } else {
      expression += value;
    }

    inputField.value = expression || "0";
  });
});

// Theme toggle clicks
themeNumbers.forEach((span) => {
  span.addEventListener("click", () => {
    const selectedTheme = span.getAttribute("data-theme");
    setTheme(selectedTheme);
  });
});

// Initialize theme on page load
initTheme();

