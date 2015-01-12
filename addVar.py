import sys
import os
from os import listdir
from os.path import isfile, join

print os.getcwd()
onlyfiles = [ f for f in listdir(os.getcwd()) ]
onlyfiles = [ f for f in onlyfiles if ".txt" in f]

for f in onlyfiles:
 f1 = open(f, 'r')
 new_name = "e_" + f
 f2 = open(new_name, 'w+')
 stVrstic =  0
 varName = []
 for line in f1:
        stVrstic += 1
        stStolpcev = 0
        
        level = 1
        mouseHole = 1
        food = "neki"
        if stVrstic == 1:
            for x in line.split(" "):
                print stStolpcev
                if stStolpcev == 1:
                    print x
                    #pripnemo x koordinato
                    x = x.strip()
                    level = int(float(x))
                    print level
                    varName.append(level)
                if stStolpcev == 3:
                    x = x.strip()
                    mouseHole = int(float(x))
                    varName.append(mouseHole)
                if stStolpcev == 5:
                    food = x.strip()
                    varName.append(food)
                stStolpcev +=1
            f2.write(line)
            print varName
        if stVrstic > 1 and not stVrstic == 3:
            f2.write(line)
        if stVrstic == 4:
            f2.write("var level" + str(varName[0]) + "Mouse" + str(varName[1]) + "To" + varName[2] + " = ")
 
 
 f1.close()
 f2.close()
    