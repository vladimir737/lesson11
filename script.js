'use strict';

let calculateButton = document.getElementById('start'), 

    oneButton = document.getElementsByTagName('button')[0],
    twoButton = document.getElementsByTagName('button')[1], 

    depositCheck = document.querySelector('#deposit-check'),
    
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    incomeItem = document.querySelectorAll('.income-items');
let meaning = function checkNumMeaning(variable, info) {
    do {
      variable = +prompt('Пожалуйста введите ' + info);
    } while (!variable || variable <=0);
    return variable;
  };
  let meaningStr = function checkStrMeaning(variable, info) {
    do {
      variable = prompt('Пожалуйста введите ' + info);
    } while (!variable || variable.includes(+variable));
    return variable;
  };

//присвоение значений переменным
  
 let appData = {
     income:{},
     addIncome:[],
     expenses:{},
     incomeMonth: 0,
     addExpenses:[],
     deposit: false,
     percentDeposit:0,
     moneyDeposit:0,
     budgetDay:0,
     budgetMonth:0,
     expensesMonth:0,
     budget: 0,
     start: function() {        
    
    appData.budget = +salaryAmount.value;        
    appData.getExpenses();
    appData.getIncome();
     appData.getExpensesMonth();
     appData.getAddExpenses();
     appData.getAddIncome();     
     appData.getBudget();
     appData.showResult();
    }, 
    showResult: function(){
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        incomePeriodValue.value = appData.calcSavedMoney();
        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = appData.calcSavedMoney();
          });
    },
    addExpensesBlock: function(){
        
        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, twoButton);
        expensesItems = document.querySelectorAll('.expenses-items');
        if(expensesItems.length === 3){
            twoButton.style.display = 'none';
        }
    },
    addIncomeBlock: function(){
        
        let cloneIncomeItem = incomeItem[0].cloneNode(true);
        incomeItem[0].parentNode.insertBefore(cloneIncomeItem, oneButton);
        incomeItem = document.querySelectorAll('.income-items');
        if(incomeItem.length === 3){
            oneButton.style.display = 'none';
        }
    },
    getExpenses: function() {
        expensesItems.forEach(function(item){
             let itemExpenses = item.querySelector('.expenses-title').value;
             let cashExpenses = item.querySelector('.expenses-amount').value; 
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }       
        });
    }, 
    getIncome:function(){
        incomeItem.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome != '' && cashIncome != ''){
              appData.income[itemIncome] = cashIncome;  
            }        
       });
        for (let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    getAddExpenses:function(){
        let addExpenses = additionalExpensesItem.value.split(',');
        addExpenses.forEach(function(item) {
            item = item.trim();
            if(item !== ''){
                appData.addExpenses.push(item);
            }
        })
    },
    getAddIncome: function(){
        additionalIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
            }
        });
    },
    
     getExpensesMonth:function() {
        for (let key in appData.expenses) {
            appData.expensesMonth += +appData.expenses[key];
            }
    },
    
     getBudget:function() {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },
    getTargetMonth:function() {
        return targetAmount.value / appData.budgetMonth;
        
    },
    getStatusIncome:function(){
        if (appData.budgetDay > 1200){
            return ('У вас высокий уровень дохода');
        } else if (appData.budgetDay >= 600 && appData.budgetDay <= 1200) {
        return ('У вас средний уровень дохода');
        } else if (appData.budgetDay >= 0 && appData.budgetDay < 600) {
            return('К сожалению ваш уровень дохода ниже среднего');
        } else {
            return ('Что то пошло не так');
        }
     },
     getInfoDeposit: function(){
         if(appData.deposit){
            let depositRate, depositRateInfo = 'Какой годовой процент?';
            let depositAmount, depositAmountInfo = 'Какая сумма заложена?';
            appData.percentDeposit = meaning(depositRate, depositRateInfo);
            appData.moneyDeposit = meaning(depositAmount, depositAmountInfo);
         }
     },
     calcSavedMoney:function(){
         return appData.budgetMonth * periodSelect.value;
     }

};
function submit(param, event) {
    param.addEventListener(event, function(){
      if (!(+param.value) || +param.value <= 0){
      calculateButton.disabled = true;
      console.log('заблокирована');
    } else {
      console.log('активная');
      calculateButton.disabled = false;
      calculateButton.addEventListener('click', appData.start);
    }
    });
  } 

start.addEventListener('click', appData.start);

oneButton.addEventListener('click', appData.addIncomeBlock);

twoButton.addEventListener('click', appData.addExpensesBlock);

submit(salaryAmount, 'change');

 /*console.log('Расходы за месяц: ' + appData.expensesMonth);

 for (let key in appData) {
     console.log("Наша программа включает в себя данные:" + key + " :" + appData[key]);
 }*/
 function arrToString(){
    let arr = appData.addExpenses;
    let str = '';
    let newStr = str.split('').join(', ');
    for(let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
      newStr += arr[i] + ', ';
    }
    console.log(newStr);
  }
  arrToString();

  periodSelect.addEventListener('input', function(){
    document.querySelector('.period-amount').innerHTML = this.value;
  });

  
