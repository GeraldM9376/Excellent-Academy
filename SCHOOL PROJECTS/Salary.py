#inputs
n = str (input("FULL NAME: "))
s = int(input("CURRENT SALARY: "),5)

#process
for count in range(10):
    if s >= 50000:
        NS = s *0.25
    elif s >= 30000:
        NS = s * 0.15
    elif s >= 20000:
        NS = s * 0.10
    else: NS = s * 0.05
    
    increment = NS - s

#OUPUTS
    print(s, NS, increment)
        
    
    
        
