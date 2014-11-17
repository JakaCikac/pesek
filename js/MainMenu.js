CatchMice.MainMenu = function(){};

CatchMice.MainMenu.prototype = {
  create: function() {
  	//show the space tile, repeated
    this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background_main');
    
    //give it speed in x
    //this.background.autoScroll(-20, 0);

    //highest score
    text = "Highest score: "+this.highestScore;
    style = { font: "15px Arial", fill: "#fff", align: "center" };
  
    var h = this.game.add.text(this.game.width/2, 10, text, style);
    h.anchor.set(0.5);
      
    var buttonPlay = this.game.add.button(this.game.width-193, 10, 'button_play', this.buttonPlayEvent, this, 1, 2, 0);
    
    var buttonMap = this.game.add.button(this.game.width-193, 81, 'button_map', this.buttonMapEvent, this, 1, 2, 0);
    buttonMap.on = false;
  },
    
    buttonPlayEvent: function (btn){
        this.game.state.start('Game');
    },
    
    buttonMapEvent: function (btn){
        this.state.start('MapMenu');
    },

    buttonCallback: function (btn){
        btn.on = !btn.on;
        btn.setFrames(1, (btn.on)?0:2, 0);
        btn.frame = (btn.on)?0:2;
    },

    // Display highest score, if any
   init: function(score) {
       var score = score || 0;
       this.highestScore = this.highestScore || 0;
       this.highestScore = Math.max(score, this.highestScore);
   },
    
  update: function() {
      
  }

};