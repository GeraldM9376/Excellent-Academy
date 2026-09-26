let expenses = [];

                                                       // adds items and amount to the array/list and also calls the other function to display the list.
function add_item(){
    let item = document.getElementById("itm").value;
    let amount =document.getElementById("amt").value;
    expenses.push({item: item, amount: amount });

    console.log(expenses);
    displayExpenses();                                   // calling the function to display
    calculate_total();                                  // calls total function once button is clicked
}

function displayExpenses(){
    let Result = document.getElementById("results");    //gets the div storage and stores it in the Result valiable
    Result.innerHTML="";                                   // clears what was initialy in the display area
    for(let i = 0; i < expenses.length; i++){           //.length gives the number of items in the list
        Result.innerHTML += "<p>" + expenses[i].item + " = Ksh." + expenses[i].amount + "</p>"; // += add new things to array without replacing the previous ones
    } 
}
function calculate_total(){
    let total = 0;

    for(let i = 0; i < expenses.length; i++){
        total = total + Number(expenses[i].amount);
    }
    console.log(total);
}
function delete_item(){
    expenses.pop();
    displayExpenses();
    calculate_total();
}
