nt(f"Fail! {n},pull up your socks. You scored E")for i in range(3):    
    n = str(input("Enter your full name: "))
    mao = int(input("Enter marks for mathematics: "))            
    if  mao >=70:
        print(" Math = A")
    elif mao >= 60:
        print("MATH = B")
    elif mao >= 50:
        print("MATH = C")
    elif mao >= 40:
        print("MATH = D")
    else:
        print("MATH = E")
    eng = int(input("Enter marks for English: "))
    if  eng >=70:
        print(" English = A")
    elif eng >= 60:
        print("English = B")
    elif eng >= 50:
        print("English = C")
    elif eng >= 40:
        print("English = D")
    else:
        print("English = E")
    kisw = int(input("Enter marks for Kiswahili: "))
    if kisw >=70:
        print("KISWAHILI = A")
    elif kisw >= 60:
        print("KISWAHILI = B")
    elif kisw  >= 50:
        print("KISWAHILI = C")
    elif kisw >= 40:
        print("KISWAHILI = D")
    else:
        print("KISWAHILI = E")
    Q = int(input("If you do Biology type 1 else 0: "))
    if Q == 1:
        bio = int(input("Enter marks for Biology: "))
        if bio >=70:
            print("BIOLOGY  = A")
        elif bio  >= 60:
            print("BIOLOGY = B")
        elif bio >= 50:
            print("BIOLOGY = C")
        elif bio >= 40:
            print("BIOLOGY = D")
        else:
            print("BIOLOGY = E")
    else:
        print("i dropped Biology")
    chem = int(input("Enter marks for Chemistry: "))
    if chem >=70:
        print("CHEMISTRY = A")
    elif chem >= 60:
        print("CHEMISTRY = B")
    elif chem >= 50:
        print("CHEMISTRY = C")
    elif chem >= 40:
        print("CHEMISTRY = D")
    else:
        print("CHEMSTRY = E")
    P = int(input("If you do Physics type 1 else 0: "))
    if P == 1:
        phy = int(input("Enter marks for Physics: "))
        if phy >=70:
            print("PHYSICS  = A")
        elif phy >= 60:
            print("PHYSICS = B")
        elif phy >= 50:
            print("PHYSICS = C")
        elif phy >= 40:
            print("PHYSICS = D")
        else:
            print("PHYSICS = E")
    else:
        phy = 0
        print(" i dropped Physics")
    T = int(input("If you do Business type 1 else 0: "))
    if T == 1:
        bs = int(input("Enter marks for Business: "))
        if bs >=70:
            print("BUSINESS = A")
        elif bs >= 60:
            print("BUSINESS = B")
        elif bs >= 50:
            print("BUSINESS = C")
        elif bs >= 40:
            print("BUSINESS = D")
        else:
            print("BUSINESS = E")
    else:
        bs = 0
        print(" I dropped Business")
    W = int(input("If you do Computer type 1 else 0: "))
    if W == 1:
        comp = int(input("Enter marks for Computer: "))
        if comp >=70:
            print("COMPUTER  = A")
        elif comp >= 60:
            print("COMPUTER = B")
        elif comp >= 50:
            print("COMPUTER = C")
        elif comp >= 40:
            print("COMPUTER  = D")
        else:
            print("COMPUTER = E")
    else:
        comp = 0
        print("I dropped Computer")
    V = int(input("If you do Agriculture type 1 else 0: "))
    if V == 1:
        agri = int(input("Enter marks for Agriculture: "))
        if agri >=70:
            print("AGRICULTURE = A")
        elif agri >= 60:
            print("AGRICULTURE = B")
        elif agri >= 50:
            print("AGRICULTURE = C")
        elif agri >= 40:
            print("AGRICULTURE = D")
        else:
            print("AGRICULTURE = E")
    else:
        agri = 0
        print("i dropped Agriculture")
    N = int(input("If you do History type 1 else 0: "))
    if N == 1:
        histo = int(input("Enter marks for History: "))
        if histo >=70:
            print("HISTORY = A")
        elif histo >= 60:
            print("HISTORY = B")
        elif histo >= 50:
            print("HISTORY = C")
        elif histo >= 40:
            print("HISTORY = D")
        else:
            histo = 0
            print("HISTORY = E")
    else:
        histo = 0
        print("I dropped History")
    G = int(input("If you do CRE type 1 else 0: "))
    if G == 1:
        cre = int(input("Enter marks for CRE: "))
        if cre >=70:
            print("CRE  = A")
        elif cre >= 60:
            print("CRE = B")
        elif cre >= 50:
            print("CRE = C")
        elif cre >= 40:
            print("CRE = D")
        else:
            print("CRE = E")
    else:
        cre = 0
        print("I dropped CRE")
    L = int(input("If you do Geography type 1 else 0: "))
    if L == 1:
        geo = int(input("Enter marks for Geography: "))
        if geo >=70:
            print(" GEOGRAPHY = A")
        elif geo >= 60:
            print("GEOGRAPHY = B")
        elif geo >= 50:
            print("GEOGRAPHY = C")
        elif geo >= 40:
            print("GEOGRAPHY = D")
        else:
            print(" GEOGRAPHY = E")
    else:
        geo = 0
        print("i dropped Geography")
    Total_marks = mao + eng + kisw + chem + bio + comp + histo + geo + cre + agri + bs + phy
    if Total_marks >= 700:
        print(f"Congraturations! {n}, you scored A")
    elif Total_marks >= 600:
        print(f"Very Good!! {n},you scored B")
    elif Total_marks >= 500:
        print(f"Good! {n}, you scored C")
    elif Total_marks >= 400:
        print(f"Nice trial!! {n},you scored D")
    else:
        print(f"Pull up your socks {n}, you scored mean grade of E")