'use strict';

// have some preloaded exercises with the option to add more

$('.muscle-group').on('change', generateExercise);
$('.add-set').on('click', addSet);
$('.undo').on('click', removeSet);

let totalWeight = 0;
let workout = [];

function generateExercise(event){
  event.preventDefault();
  $('.muscle-group').children('.placeholder').remove();
  const group = $('.muscle-group').find(':selected').val().toLowerCase();
  const url = 'exercises.json';

  $.getJSON(url, function(res){
    $('.exercise').html(function(){
      return res[group].map(function(exercise){
        return `<option data-exercise=${exercise}>${exercise}</option>`;
      });
    }).show();
  });

  $('.user-input').show();
  $('.add-set').show();
}

function addSet(event){
  event.preventDefault();

  const group = $('.muscle-group').find(':selected').val();
  const exercise = $('.exercise').find(':selected').val();
  const weight = $('.weight').val();
  const reps = $('.reps').val();

  const set = {
    group: group,
    exercise: exercise,
    lift: {
      weight: weight,
      reps: reps
    }
  };

  if(!weight||!reps){
    alert('Cannot Be 0');
    return;
  }
  
  $('.workout').append(
    `<div class='${exercise} result'>${exercise}: ${weight} lbs for ${reps} reps</div>`
  ).show();

  showTotalWeight(set);
  buildWorkOut(set);

}

function showTotalWeight(set){

  const setWeight = set.lift.weight*set.lift.reps;
  totalWeight = totalWeight + setWeight;

  $('.total').html(totalWeight+'lbs moved');
}

function buildWorkOut(set){
  workout.push(set);
  console.log(workout);
}

function removeSet(event){
  event.preventDefault();
  const child = $('.workout').children('.result').last();
  
  for(let i=0; i<child.length; i++){
    const liftData = child[i].innerHTML.match(/(\d+)/g);
    const setWeight = liftData[0]*liftData[1];
    totalWeight = totalWeight - setWeight;
  }

  child.remove();
  workout.pop();

  $('.total').html(totalWeight+'lbs moved');

  if(totalWeight===0){
    $('.total').html('');
  }
  
}
