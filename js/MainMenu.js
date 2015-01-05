SortingGame.MainMenu = function(){};

SortingGame.MainMenu.prototype = {
  create: function() {
  	//show the space tile, repeated
    //this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'background');
    this.background = this.game.add.tileSprite(0, 0, 800, 600, 'background');
    
    // naredi, da v ozadju padajo različne zadeve...
    //give it speed in x
    //this.background.autoScroll(-20, 0);

    //start game text
    //var text = "Click to begin!";
    //var style = { font: "30px Arial", fill: "#fff", align: "center" };
    //var t = this.game.add.text(this.game.width/2, this.game.height/2, text, style);
    //t.anchor.set(0.5);

      
    //highest score
    text = "Highest score: "+this.highestScore;
    style = { font: "15px Arial", fill: "#fff", align: "center" };
    var h = this.game.add.text(this.game.width/2, 10, text, style);
    h.anchor.set(0.5);
    
      
    // buttons:
    var button_play = this.game.add.button(this.game.width/2, this.game.height/2 - 81, 'button_play', this.buttonPlayClick );
    button_play.anchor.set(0.5);
      
    var button_levels = this.game.add.button(this.game.width/2, this.game.height/2, 'button_levels', this.buttonLevelsClick );
    button_levels.anchor.set(0.5);
      
      var button_points = this.game.add.button(this.game.width/2, this.game.height/2+81, 'button_points', this.buttonPointsClick );
    button_points.anchor.set(0.5);
    
  },

    buttonPlayClick: function (btn){
        this.game.state.start('Game');
    },
    
    buttonLevelsClick: function (btn){
        this.game.state.start('Levels');
    },
    
    buttonPointsClick: function (btn){
        this.game.state.start('Points');
    },
    
    // Display highest score, if any
   init: function(score) {
       var score = score || 0;
       this.highestScore = this.highestScore || 0;
       this.highestScore = Math.max(score, this.highestScore);
   },
    
  update: function() {
      // what to do on click?
      /*
      if(this.game.input.activePointer.justPressed()) {
          this.game.state.start('Game');
      }
      */
  }

};