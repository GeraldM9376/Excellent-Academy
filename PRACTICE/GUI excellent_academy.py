import tkinter as tk

def subject_grading(subject):
    if(subject>=80):
        return("A")
    elif(subject>=70):
        return("B")
    elif(subject>=50):
        return("C")
    elif(subject>=30):
        return("D")
    else:
        return("E")
    
def Mean_grade(average):
    if(average>=80):
        return("A")
    elif(average>=70):
        return("B")
    elif(average>=60):
        return("C")
    elif(average>=50):
        return("D")
    else:
        return("E")
 
def get_Calculate():
    Name = Name_box.get()
    
    try:
        Math = int(Math_box.get())
        Eng = int(Eng_box.get())
        Kisw = int(Kisw_box.get())
    
        Total_marks = Math + Eng + Kisw
        Average = Total_marks / 3
    
        Math_grade = subject_grading(Math)
        Eng_grade = subject_grading(Eng)
        Kisw_grade = subject_grading(Kisw)
    
        Mean_Grade = Mean_grade(Average)
    
        results.config(
            text=f"Hellow {Name}, your scores are as follows:\n"
                 f"Total Marks: {Total_marks}\n"
                 f"Average: {Average:.2f}\n"
                 f"Mathematics: {Math_grade}\n"
                 f"English: {Eng_grade}\n"
                 f"Kiswahili: {Kisw_grade}\n"
                 f"Mean Grade: {Mean_Grade}"
                 )
    except ValueError:
        results.config(text=" !!!Please enter a valid number for the marks !!!")
    
    
    
page =tk.Tk()
page.title("Excellent Academy")
page.geometry("400x300")

tk.Label(page, text="Enter your full Name").pack()
Name_box = tk.Entry(page)
Name_box.pack()


tk.Label(page, text="Enter Mathematics marks").pack()
Math_box = tk.Entry(page)
Math_box.pack()

tk.Label(page, text="Enter English marks").pack()
Eng_box = tk.Entry(page)
Eng_box.pack()

tk.Label(page, text="Enter Kiswahili marks").pack()
Kisw_box = tk.Entry(page)
Kisw_box.pack()

Calculate_button = tk.Button(page, text="Calculate", command=get_Calculate)
Calculate_button.pack()

results = tk.Label(page,text="")
results.pack()

page.mainloop()