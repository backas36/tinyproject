// faq toggle area
document.querySelector('.faqs').addEventListener('click', (event) => {
  const element = event.target.closest('.faq')
  if(element){
    const answer = element.querySelector('.faq__answer')
    answer.classList.toggle('faq__answer-toggle')
  }
})
