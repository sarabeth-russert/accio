'use strict';

let locationFeatureArray = [hagridsHut, centaurFirenze, bowtruckleTree, hippogryphFlight, weasleyCar, acromantulaCave];


renderFormLocationFeature(hagridsHut);
listener.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  let nextLocationName;
  let nextLocationObject;
  let optionChoices = document.getElementsByClassName('radioChoice');

  for (let i = 0; i < optionChoices.length; i++) {
    if (optionChoices[i].checked) {
      nextLocationName = optionChoices[i].value;
    }
  }

  for (let i = 0; i < locationFeatureArray.length; i++) {
    if (nextLocationName === locationFeatureArray[i].id) {
      if (locationFeatureArray[i] === locationFeatureArray[locationFeatureArray.length - 1]) {
        nextLocationObject = locationFeatureArray[i];
        listener.removeEventListener('submit', handleSubmit);
        questionForm.innerHTML = '';
        listener.innerHTML = '';
        console.log(nextLocationObject);
        renderFormObjectLocationFeature(nextLocationObject);
      } else {
      nextLocationObject = locationFeatureArray[i];
      questionForm.innerHTML = '';
      renderFormLocationFeature(nextLocationObject);
      }
    }
    //if (i === (locationFeatureArray.length -2)) {
      //questionForm.innerHTML = '';
      //renderFormObjectLocationFeature(nextLocationObject);
    //} else {
      //questionForm.innerHTML = '';
      //renderFormLocationFeature(nextLocationObject);
    //}
  }

  //will have to figure out a solution for when they answer the final question like
  //if (optionChoice === 'spider') or something like that... not sure yet may have to handle the last event differently
  //clear out form
}

/// fix the form so it checks to see if we are on the final question before evaluating the answer
