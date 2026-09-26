#Calculating function
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
    

#MAIN CODE
print("EXCELLENT ACADEMY")
Name = input("Enter your Full Name: ")

Math = int(input("Enter mathematics marks: "))
Eng = int(input("Enter English marks: "))
Kisw = int(input("Enter Kiswahili marks: "))

Total_marks = (Math + Eng + Kisw)
Average = (Total_marks / 3)

print("Hellow," + Name + " your scores are as follows:")
print("Total marks: ",Total_marks)
print("Average: ",f"{Average:.2f}")

#first function
Grade=subject_grading(Math)
print("Math: "+ Grade)
Grade=subject_grading(Eng)
print("English: "+ Grade)
Grade=subject_grading(Kisw)
print("Kiswahili: "+ Grade)


#2nd function
mean=Mean_grade(Average)
print("Mean Grade: " + mean)
    