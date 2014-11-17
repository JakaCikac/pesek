CatchMice.MainMenu = function(){};

CatchMice.MainMenu.prototype = {
  create: function() {
  	//show the space tile, repeated
    this.background = this.game.add.tileSprite(this.game.width/5, this.game.height/5, 800, 600, 'background');
    
    //give it speed in x
    //this.background.autoScroll(-20, 0);

    //start game text
    var text = "Click to begin!";
    var style = { font: "30px Arial", fill: "#fff", align: "center" };
    var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    t.anchor.set(0.5);

    //highest score
    text = "Highest score: "+this.highestScore;
    style = { font: "15px Arial", fill: "#fff", align: "center" };
  
    var h = this.game.add.text(this.game.width/2, this.game.height/2 + 50, text, style);
    h.anchor.set(0.5);
      
    var newButton = this.game.add.button(this.game.width/2, this.game.height/2, 'button', this.buttonCallback, this, 1, 0, 2);
    //newButton.on = false;
    
  },
    

    buttonCallback: function (btn){
        this.btn.on = !this.btn.on;
        this.btn.setFrames(1, (this.btn.on)?2:0, 2);
        this.btn.frame = (this.btn.on)?2:0;
    },

    // Display highest score, if any
   init: function(score) {
       var score = score || 0;
       this.highestScore = this.highestScore || 0;
       this.highestScore = Math.max(score, this.highestScore);
   },
    
  update: function() {
      // what to do on click?
      if(this.game.input.activePointer.justPressed()) {
          this.game.state.start('Game');
      }
  }

};