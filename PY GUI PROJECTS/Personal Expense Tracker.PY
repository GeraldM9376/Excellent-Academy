Expenses = []
Cost = []

No_items = int(input("Enter the number of items you plan to buy: "))
i = 0
if(No_items > 0):
    while(i != No_items):
        item = input("Enter the item you plan to buy: ")
        Expenses.append("item")
        Charges = int(input("Enter it's Approximate Cost: "))
        Cost.append("Charges")
        i = i + 1
j = 0
remove = int(input("how many items do you want to remove from the list: "))
if(remove > 0):
    while(j != remove):
        Unwanted = int(input("Enter the number of item to remove from the list: "))
        Expenses.pop(j-1-"Unwanted")
        Cost.pop("Unwanted")
        j = j + 1
else:
    print(Expenses, "Ksh.", Cost)

    
