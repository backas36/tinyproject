import {getComments, addComments} from './api'
import {appendCommentToDOM} from './utils'
import {formTemplate} from './templates'
import $ from 'jquery'


let commentsDOM = null
const requestData = {
  site_key: '',
  before: 0,
  lastId: null,
  isEnd: false,
  apiUrl: '',
  containerSelector: null
}

$(document).ready(() => {
  requestData.site_key = 'ashi'
  requestData.apiUrl = 'http://localhost:8888/webpack_discussion/'
  requestData.containerSelector = '.comments-area'
  init(requestData)
})

const init = (requestData) => {

  const containerElement = $(requestData.containerSelector)
  containerElement.append(formTemplate)
  commentsDOM = $('.comments')

  getNewComments(requestData)

  $('.load__field').on('click', $('.load__btn'), () => {
    getNewComments(requestData)
  })


  const addCommentCb = (requestData, newCommentData) => {
    addComments(requestData, newCommentData, (error, response) => {
      if (error) {
        alert(error)
        return
      }

      alert('留言新增成功')
      commentsDOM.empty()
      requestData.before = 0
      requestData.lastId = null
      requestData.isEnd = false
      getNewComments(requestData)

      $('input[name=nickname]').val('')
      $('textarea[name=content]').val('')
    })
  }

  $('.add__comment__form').on('submit', (event) => {
    event.preventDefault()
    const newCommentData = {
      site_key:requestData.site_key, 
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val()
    }
    addCommentCb(requestData, newCommentData)


  })
}



const getNewComments = (requestData) => {
  $('.load__field').empty()

  if (requestData.isEnd) {
    return
  }
  getComments(requestData, (error, response) => {
    if (error) {
      alert(error)
      return
    }
    const comments = response.discussions
    const commentsLength = comments.length
    comments.forEach(comment => [
      appendCommentToDOM(commentsDOM, comment)
    ])
    if (commentsLength === 0) {
      requestData.isEnd = true
      return
    } else {
      requestData.lastId = comments[comments.length - 1].id
      requestData.before = requestData.lastId

      $('.load__field').html(`<button type="button" class="btn btn-primary load__btn">Load more</button>`)
    }
  })
}