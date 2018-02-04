'use strict';

// have some preloaded exercises with the option to add more

$('.muscle-group').on('change', generateExercise);
$('.add-set').on('click', createSet);
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

function createSet(event){
  event.preventDefault();

  const group = $('.muscle-group').find(':selected').val();
  const exercise = $('.exercise').find(':selected').val();
  const weight = $('.weight').val();
  const reps = $('.reps').val();

  const set = {
    group: group,
    exercise: exercise,
    weight: weight,
    reps: reps
  };

  if(!weight||!reps){
    alert('Cannot Be 0');
    return;
  }
  
  // $('.workout').append(
  //   `<div class='result'>${exercise}: ${weight}lbs for ${reps} reps</div>`
  // ).show();

  // retrieveSetData();
  nameWorkout(group);
  createTable(set);
  buildWorkOut(set);

}

function createTable(set){

  const setTotal = set.weight*set.reps;
  const existingTable = $('.workout').children(`.${set.exercise}-table`);

  console.log(existingTable);

  if(existingTable.length){
    existingTable.append(
      `<tr>
        <td></td>
        <td>${set.weight}</td>
        <td>${set.reps}</td>
        <td>${setTotal}</td>
      </tr>
      `
    );
  }
  if(!existingTable.length){
    $('.workout').append(
      `<table class="${set.exercise}-table">
      <tr>
        <th>${set.exercise}</th>
        <th>Weight</th>
        <th>Reps</th>
        <th>Total</th>
      </tr>
      <tr>
      <td></td>
        <td>${set.weight}</td>
        <td>${set.reps}</td>
        <td>${setTotal}</td>
      </tr>
    </table>`
    ).show();
  }
}

function nameWorkout(group){
  event.preventDefault();
  if(!$(`.${group}`).length){
    $('#workout-name').append(`<h4 class=${group}>${group}</h4>`);
  }
}

function buildWorkOut(set){
  workout.push(set);
}

function retrieveSetData(){
  let liftData;
  
  const children = $('.workout').children('.result');

  for(let i=0; i<children.length; i++){
    liftData = children[i].innerHTML.match(/(\d+)/g);
  }

  const setWeight = liftData[0]*liftData[1];

  totalWeight = totalWeight + setWeight;

  showTotalWeight();
}

function showTotalWeight(){
  $('.total').html(totalWeight+'lbs moved');
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
  showTotalWeight();

  if(totalWeight===0){
    $('.total').html('');
  }
  
}
