'use strict';

// have user choose what muscle group they worked on
// legs chest etc
// have some preloaded exercises with the option to add more
// have an input for weight, reps
// calculate the amount of weight per exercise
// calculate total weight moved

$('.muscle-group').on('change', generateExercise);
$('.add-it').on('click', addSet);

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
  $('.add-it').show();
}

function addSet(event){
  event.preventDefault();
  const weight = $('.weight').val();
  const reps = $('.reps').val();

  
}