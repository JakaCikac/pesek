import sys

coordinates = []

        
def generateScript():
    print coordinates
    print "Generating script.."
    
    f1 = open("generatedCODE.txt", 'w+')
    f1.write("this.game.add.tween(mouses[" + mouseHole + "])\n")
    for coordinateThris in coordinates:
        f1.write(".to({x: " + str(coordinateThris[0]) + ", y: " + str(coordinateThris[1])  + ", angle: " + str(coordinateThris[2]) + "}, 4000, Phaser.Easing.Linear.None)\n")
    f1.write(";")
    f1.close()

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
    movingOn = True
    while movingOn:
        coordinateThris = []
        print "-------- NEXT ENTRY -----------"
        print "Enter the X coordinate (then press enter; default = 0):"
        x = raw_input()
        if x == '':
            x = 0
            print "X set to default value: 0."
        if not x == "STOP":
            coordinateThris.append(int(x))
        else:
            print "Quitting now, generating the script.."
            #generate script
            generateScript()
            quit()
        print "Enter the Y coordinate (then press enter; default = 0):"
        y = raw_input()
        if y == '':
            y = 0
            print "Y set to default value: 0."
        if not y == "STOP":
            coordinateThris.append(int(y))
        else:
            print "Quitting now, generating the script.."
            #generate script
            generateScript()
            quit()
        print "Enter the ANGLE value (then press enter; default = 0):"
        angle = raw_input()
        if angle == '':
            angle = 0
            print "Angle set to default value: 0."
        if not angle == "STOP":
            coordinateThris.append(int(angle))
        else:
            print "Quitting now, generating the script.."
            #generate script
            generateScript()
            quit()
        coordinates.append(coordinateThris)
        print "Coordinates added: "
        print coordinateThris