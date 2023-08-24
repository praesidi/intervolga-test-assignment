const form = document.getElementById("form");
const localStorageItem = localStorage.getItem("formValues");

// проверяем есть ли в local storage запись со значениями
function checkLocalStorage() {
  if (localStorageItem !== null) {
    const inputValues = JSON.parse(localStorageItem);
    for (value in inputValues) {
      const input = document.getElementById(`${value}`);
      input.value = `${inputValues[value]}`;
    }
  } else {
    localStorage.setItem("formValues", JSON.stringify({}));
  }
}

// обновляем local storage при изменении полей
function updateLocalStorage(e) {
  const inputId = e.target.id;
  const inputValue = e.target.value;
  const savedFormValues = JSON.parse(localStorageItem);

  savedFormValues[inputId] = inputValue;

  const updatedFormValues = JSON.stringify(savedFormValues);

  localStorage.setItem("formValues", updatedFormValues);
}

// очищаем local storage, чтобы после перезагрузки страницы не вернулись старые значения
function clearLocalStorage() {
  localStorage.setItem("formValues", JSON.stringify({}));
}

// разрешаем ввести только цифры
function formatInput(e) {
  const input = e.target;

  if (input.id === "passport-serial" || e.target.id === "passport-number") {
    input.value = input.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
  }
}

// устанавливаем сегодняшний день минимальным значением в календаре
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("arrival-date").min = new Date()
    .toISOString()
    .split("T")[0];
});

form.addEventListener("input", (e) => {
  formatInput(e);
  updateLocalStorage(e);
});

form.addEventListener("reset", clearLocalStorage);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("form submitted");
});
checkLocalStorage();
