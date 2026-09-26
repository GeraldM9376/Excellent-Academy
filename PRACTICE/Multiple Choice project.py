 # Smart Quiz App
print("🎓 Welcome to the Smart Quiz!")
print("------------------------------")

questions = [
    {
        "question": "1. What is the output of print(2 ** 3)?",
        "options": ["A. 6", "B. 8", "C. 9", "D. 23"],
        "answer": "B"
    },
    {
        "question": "2. Which of these is a Python data type?",
        "options": ["A. integer", "B. number", "C. numeric", "D. digit"],
        "answer": "A"
    },
    {
        "question": "3. What does len() function do?",
        "options": ["A. adds numbers", "B. counts items", "C. converts type", "D. exits program"],
        "answer": "B"
    }
]

score = 0

for q in questions:
    print("\n" + q["question"])
    for opt in q["options"]:
        print(opt)
    answer = input("Enter your answer (A, B, C, or D): ").upper()
    if answer == q["answer"]:
        print("✅ Correct!")
        score += 1
    else:
        print(f"❌ Wrong! Correct answer is {q['answer']}")

print("\n------------------------------")
print(f"Your Final Score: {score}/{len(questions)}")

if score == len(questions):
    print("🏆 Excellent! You’re a Python genius!")
elif score == 2:
    print("👍 Good job! Keep practicing.")
else:
    print("💡 Keep learning, you’ll get there!")
  