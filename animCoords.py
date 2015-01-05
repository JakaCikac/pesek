import sys
coordinates = []

def parse():
    f2 = open("coordinates.txt", "r")
    stVrstic =  0
    for line in f2:
        coordinateThris = [] 
        stVrstic += 1
        stStolpcev = 0
        for x in line.split(" "):
            if stVrstic == 1: 
                if stStolpcev == 0:
                    #pripnemo x koordinato
                    x = x.strip()
                    x = int(float(x))
                    coordinateThris.append(x)
                if stStolpcev == 1:
                    x = x.strip()
                    x = int(float(x))
                    coordinateThris.append(x)
                if stStolpcev == 2:
                    x = x.strip()
                    x = int(float(x))
                    coordinateThris.append(x)
            if stVrstic > 1: 
                if stStolpcev == 1:
                    x = x.strip()
                    x = int(float(x))
                    coordinateThris.append(x)
                if stStolpcev == 2:
                    x = x.strip()
                    x = int(float(x))
                    coordinateThris.append(x)
                if stStolpcev == 3:
                    x = x.strip()
                    x = int(float(x))
                    coordinateThris.append(x)
            stStolpcev +=1
        coordinates.append(coordinateThris)
    return coordinates
        
def generateScript():
    print coordinates
    print "Generating script.."
    
    f1 = open("anim_" + level + "_" + mouseHole + "_" + food +".txt", 'w+')
    f1.write("LEVEL: " + str(level) + " MOUSEHOLE: " + str(mouseHole) + " FOOD: " + str(food) + "\n\n")
    f1.write("----------- GENERATED CODE ------------------\n\n")
    f1.write("this.game.add.tween(mouses[" + mouseHole + "])\n")
    for coordinateThris in coordinates:
        f1.write(".to({x: " + str(coordinateThris[0]) + ", y: " + str(coordinateThris[1])  + ", angle: " + str(coordinateThris[2]) + "}, 4000, Phaser.Easing.Linear.None)\n")
    f1.write(";")
    f1.close()
    
def enterX():
    print "Enter the X coordinate (then press enter; default = 0):"
    x = raw_input()
    if x == '':
        x = 0
        print "X set to default value: 0."
    if not x == "STOP":
        return int(x)
    elif x == "STOP":
        print "Quitting now, generating the script.."
        #generate script
        generateScript()
        quit()
    else: 
        enter(X)
        
def enterY():
    print "Enter the Y coordinate (then press enter; default = 0):"
    y = raw_input()
    if y == '':
        y = 0
        print "Y set to default value: 0."
    if not y == "STOP":
        return int(y)
    elif y == "STOP":
        print "Quitting now, generating the script.."
        #generate script
        generateScript()
        quit()
    else:
        enterY()
        
def enterAngle():
    print "Enter the ANGLE value (then press enter; default = 0):"
    angle = raw_input()
    if angle == '':
        angle = 0
        print "Angle set to default value: 0."
    if not angle == "STOP":
        return int(angle)
    elif angle == "STOP":
        print "Quitting now, generating the script.."
        #generate script
        generateScript()
        quit()
    else:
        enterAngle()

if len(sys.argv) < 3:
    print """\n  USAGE:\n 
    python animCoords.py LEVEL MOUSEHOLE FOOD\n\n
    LEVEL = the level on which the animation is played (int)\n
    MOUSEHOLE = number of mousehole you're animating the mice for(int)\n
    FOOD = which food are you animating TO (string, eg. 'apple')\n\n
    
    After running start entering coordinates for positions.
    First enter the X coordinate, then the Y coordinate, then the rotation!
    To stop entering coordinates and generate the script type STOP.\n"""
    quit()
else:
    print """\n 
    Start entering coordinates for positions.
    First enter the X coordinate, then the Y coordinate, then the rotation!
    To stop entering coordinates and generate the script type STOP.\n"""
    level = sys.argv[1]
    mouseHole = sys.argv[2]
    food = sys.argv[3]
    # parse document containing coordinates eg. x y angle direction
    
    movingOn = True
    #while movingOn:
        # UNCOMMENT FOR MANUAL ADDING
        #coordinateThris = []
        #print "-------- NEXT ENTRY -----------"
        #x = enterX()
        #coordinateThris.append(x)
        #y = enterY()
        #coordinateThris.append(y)
        #angle = enterAngle()
        #coordinateThris.append(angle)
        #coordinates.append(coordinateThris)
        #print "Coordinates added: "
        #print coordinateThris
    coordinates = parse()
    generateScript()