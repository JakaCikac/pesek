Name of the developer:
- Jaka Cikač
- Anže Rezelj
- Anže Schwarzmann

Name of the game:
- CatchMice

Information about game resources. Use JSON format - see example below
- Human friendly name of the resource
- Machine readable name of the resource (the name you're using in your code to recognize the resource)
- Value of the resource (string if the resource is text, or name of the image file attached to the submission)
- Example:
    Parents:
    [
        { 
        "friendly_name": "Closed Tile",
        "machine_name": "memory_game_closed_tile",
        "value": "closed_tile.png"
        }
    ]

    Other components:
    [
        { 
        "friendly_name": "Melons",
        "machine_name": "memory_game_tile"
        "value": "melonds.png",
        "parent_machine_name": memory_game_closed_tile 
        },

        { 
        "friendly_name": "Oranges",
        "machine_name": "memory_game_tile"
        "value": "oranges.png",
        "parent_machine_name": memory_game_closed_tile 
        },

        { 
        "friendly_name": "Win message",
        "machine_name": "memory_game_win_message"
        "value": "Congratulations, you certainly are a great fruit detective!"
        }
    ]

Dependency list and their respecful versions:
- Phaser v2.2.1 - https://github.com/photonstorm/phaser
    CDNJS: //cdnjs.cloudflare.com/ajax/libs/phaser/2.2.1/phaser.min.js
- jQuery v2.1.3 - http://jquery.com/download/
    CDN:   //code.jquery.com/jquery-2.1.3.min.js