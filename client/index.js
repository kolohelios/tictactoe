'use strict';

(function(){
  var allowSelections = false;

  $(document).ready(init);

  function init(){
    $('#reset').click(reset);
    $('#start').click(start);
    $('td').click(selecting);
    reset();
  }

  function reset(){
    $('#chooser').show();
    $('#players').hide();
    $('td').css('background-color', 'white');
    $('#container').css('background-color', 'inherit');
    $('#winordraw').hide();
  }

  function start(){
    allowSelections = true;
    $('#players').show();
    var p1 = $('#p1-choose').val();
    var p2 = $('#p2-choose').val();
    $('#p1').css('background-color', p1);
    $('#p2').css('background-color', p2);
    $('#chooser').hide();
    var rnd = Math.floor(Math.random() * 2) + 1;
    $('.player').removeClass('active');
    $('#p' + rnd).addClass('active');
  }

  function selecting(){
    if((allowSelections) && ($(this).css('background-color') === 'rgb(255, 255, 255)')){
      var color = $('.active').css('background-color');
      $(this).css('background-color', color);
      $('.player').toggleClass('active');
      gameEndConditionCheck();
    }
  }

  function getArrayOfSquares(){
    var p1 = $('#p1').css('background-color');
    var p2 = $('#p2').css('background-color');
    var boardArray = [];
    for(var i = 0; i < $('td').length; i++){
      var color = $('td').eq(i).css('background-color');
      if(color === p1){
        boardArray.push('p1');
      }else if(color === p2){
        boardArray.push('p2');
      }else{
        boardArray.push('');
      }
    }
    console.log(boardArray);
    return boardArray;
  }

  function gameEndConditionCheck(){
    var boardArray = getArrayOfSquares();
    if(boardArray.indexOf('') === -1){
        gameEnd('dr');
    }
    var p1Array = [], p2Array = [];
    boardArray.forEach(function(value, index){
      if(value === 'p1'){
        p1Array.push(index);
      }else if(value === 'p2'){
        p2Array.push(index);
      }
    });
    var wins = [[0,1,2],[0,4,8],[0,3,6],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];
    var p1matches = 0, p2matches = 0;
    // if there are no blanks left and there isn't a win condition this must be a draw
    wins.forEach(function(array){
      p1matches = 0;
      p2matches = 0;
      for(var i = 0; i < 3; i++) {
        if(p1Array.indexOf(array[i]) > -1){
          p1matches++;
        }else if(p2Array.indexOf(array[i]) > -1){
          p2matches++;
        }
      }
      if(p1matches === 3){
        gameEnd('p1');
      }
      if(p2matches === 3){
        gameEnd('p2');
      }
    });
  }

  function gameEnd(winner){
    var p1 = $('#p1').css('background-color');
    var p2 = $('#p2').css('background-color');
    $('#winordraw').show();
    switch(winner){
      case 'dr':
        $('#container').css('background-color', 'blue');
        $('#winordraw').text('It was a draw.');
        break;
      case 'p1':
        $('#winordraw').text('Player 1 won!')
        $('#container').css('background-color', p1);
        break;
      case 'p2':
        $('#winordraw').text('Player 2 won!')
        $('#container').css('background-color', p2);
    }
    $('#reset').show();
    allowSelections = false;
  }
})($);
