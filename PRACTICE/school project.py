import tkinter as tk

def calculate_sum():
    first = int(first_Box.get())
    second = int(second_Box.get())
    total = first + second
    result.config(text="Sum of the two numbers is " + str(total))

window = tk.Tk()
window.title("Addition Program")
window.geometry("400x300")

tk.Label(window, text="Enter the first number").pack()
first_Box = tk.Entry(window).pack()

tk.Label(window, text="Enter the second number").pack()
second_Box = tk.Entry(window).pack()

tk.Button(window, text="Calculate Sum", command=calculate_sum).pack()


result = tk.Label(window, text="")
result.pack()

window.mainloop()