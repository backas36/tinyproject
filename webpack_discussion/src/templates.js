
 export const formTemplate = `
    <div class="row ">
      <form class="add__comment__form">
        <div class="mb-3 mt-3">
          <label for="nickname" class="form-label">暱稱</label>
          <input type="text" class="form-control" id="nickname" name="nickname">
        </div>
        <div class="mb-3">
          <label for="comment__content" class="form-label">留言內容</label>
          <textarea class="form-control" id="comment__content" rows="5" name="content"></textarea>
        </div>
        <div class="mb-3">
          <button type="submit" class="btn btn-primary mb-3">送出</button>
        </div>
      </form>
    </div>

    <div class="row comments">
    </div>
    <div class="row d-grid gap-2 col-4 mx-auto load__field">
      </div>
  `