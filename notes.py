grades = [85, 92, 78, 96, 88, 75, 90]
for lst,abd in enumerate(grades):
    print('Оцінка',str(lst) + ":", abd)
print('Кількість оцінок:',len(grades))

total=0
for number in grades:
    total += number 
print('Середня оцінка:',round(total/len(grades),2))

big=0
for number in grades:
    if number > big:
        big = number
print('Максимальна оцінка:', big)

smalest=100
for number in grades:
    if number < smalest:
        smalest = number
print('Мінімальна оцінка:', smalest)