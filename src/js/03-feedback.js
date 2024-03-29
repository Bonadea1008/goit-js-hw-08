import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const formEmail = document.querySelector('.feedback-form input');
const formMessage = document.querySelector('.feedback-form textarea');
const STORAGE_KEY = 'feedback-form-state';
const feedbackFormData = {};

formEl.addEventListener('input', throttle(onFeedbackFormInput, 500));
formEl.addEventListener('submit', onFormSubmit);

populateData();

function onFeedbackFormInput() {
  feedbackFormData.email = formEmail.value;
  feedbackFormData.message = formMessage.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(feedbackFormData));
}

function populateData() {
  const savedFeedbackData = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (savedFeedbackData) {
    formEmail.value = savedFeedbackData.email;
    formMessage.value = savedFeedbackData.message;
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  if (formEmail.value.trim() !== '' && formEl.message.value.trim() !== '') {
    console.log(JSON.parse(localStorage.getItem(STORAGE_KEY)));
    evt.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
  }
  return;
}
