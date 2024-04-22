  function calculate() {
            // Получаем значения из формы
            var depositType = document.getElementById("depositType").value;
            var depositTerm = document.getElementById("depositTerm").value;
            var depositAmount = parseFloat(document.getElementById("depositAmount").value);
            var resultElement = document.getElementById("resultMessage");

            // Проверка на валидность введенных данных
            if (isNaN(depositAmount) || depositAmount <= 0) {
                alert("Пожалуйста, введите корректную сумму вклада.");
                return;
            }

            var termTranslations = {
                "6_months": "6 месяцев",
                "1_year": "1 год",
                "1.5_years": "1.5 года",
                "2_years": "2 года",
                "3_months": "3 месяца",
                "9_months": "9 месяцев",
          
            };

            var translatedTerm = termTranslations.hasOwnProperty(depositTerm) ? termTranslations[depositTerm] : depositTerm;

            // Получаем годовую процентную ставку в зависимости от выбранного типа и срока вклада
            var interestRate;
            if (depositType === "popolnyaemy") {
                switch (depositTerm) {
                    case "6_months":
                        interestRate = 0.20;
                        break;
                    case "1_year":
                        interestRate = 0.22;
                        break;
                    case "1.5_years":
                        interestRate = 0.15;
                        break;
                    case "2_years":
                        interestRate = 0.10;
                        break;
                }
            } else if (depositType === "srochny") {
                switch (depositTerm) {
                    case "3_months":
                        interestRate = 0.20;
                        break;
                    case "6_months":
                        interestRate = 0.22;
                        break;
                    case "9_months":
                        interestRate = 0.23;
                        break;
                    case "1_year":
                        interestRate = 0.24;
                        break;
                    case "1.5_years":
                        interestRate = 0.18;
                        break;
                    case "2_years":
                        interestRate = 0.15;
                        break;
                }
            }

            // Вычисляем конечную сумму вклада
            var finalAmount = depositAmount * (1 + interestRate);

            // Выводим результат
            var resultMessage = "<b>Выбран тип вклада: </b>" + (depositType === "popolnyaemy" ? "Пополняемый" : "Срочный") + "<br>";
            resultMessage += "<b>Выбран срок вклада: </b>" +  translatedTerm + "<br>";
            resultMessage += "<b>Сумма вклада: </b>" + depositAmount + "<br>";
            resultMessage += "<b>Конечная сумма вклада: </b>" + finalAmount.toFixed(2);

            resultElement.style.display = "block";
            resultElement.innerHTML = resultMessage;
        }

        // Динамическое добавление опций для срока вклада при изменении типа вклада
        document.getElementById("depositType").addEventListener("change", function() {
            var depositType = this.value;
            var depositTermSelect = document.getElementById("depositTerm");
            depositTermSelect.innerHTML = "";

            var termOptions;
            if (depositType === "popolnyaemy") {
                termOptions = [
                    { value: "6_months", text: "6 месяцев" },
                    { value: "1_year", text: "1 год" },
                    { value: "1.5_years", text: "1.5 года" },
                    { value: "2_years", text: "2 года" }
                ];
            } else if (depositType === "srochny") {
                termOptions = [
                    { value: "3_months", text: "3 месяца" },
                    { value: "6_months", text: "6 месяцев" },
                    { value: "9_months", text: "9 месяцев" },
                    { value: "1_year", text: "1 год" },
                    { value: "1.5_years", text: "1.5 года" },
                    { value: "2_years", text: "2 года" }
                ];
            }

            termOptions.forEach(function(option) {
                var optionElem = document.createElement("option");
                optionElem.value = option.value;
                optionElem.textContent = option.text;
                depositTermSelect.appendChild(optionElem);
            });
        });