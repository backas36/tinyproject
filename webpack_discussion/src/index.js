import $ from 'jquery' 
import css from './style.css'


$(document).ready(()=>{
  $('body').append('<button class="jqbtn">Clicke me</button>')
  $('.jqbtn').click(()=>{
    console.log(666)
    throw new Error('up')
  })
})