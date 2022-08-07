// TODO: 使用者可以新增待辦事項
const addNewTodo = () => {
  // 1.取得使用者的值
  const value = $('#todo').val();

  // 2. 插入資料
  $('.todolist__item').append(`
  <li class="no-completed">
  <input class="todolist__input" type="checkbox">
  <span>${value}</span>
  <a class="delete" href="#">
    <i class="fa fa-x" aria-hidden="true"></i>
  </a>
  </li>`)

  //3.清空 input
  $('#todo').val('');
}

// 更新已完成項目
const updateCompletedCount = () => {
  const count = $('.todolist__item').find('.completed').length
  $('.todolist__info').find('a').text(count)
}

//新增變數,若已完成項目,則使用者不能透過此來刪除項目
let c = 0;

// TODO: 使用者可以刪除待辦事項
const deleteTodo = (e) => {
  //$(e.target).parent().closest('li').remove();
  if(c == 1){
    alert('已完成項目不能透過此刪除,請使用下方的"清除已完成項目"來刪除');
  }
  else{
    $(e.target).parent().closest('li').remove();
  }
}
// TODO: 清除已完成項目
const clearCompletedTodo = () => {
  // 找到 completed 的待辦事項，並移除 .completed class
  c = 0;
  $('.todolist__item').find('.completed').remove();
  // 更新已完成項目
  // 抓出 .todolist__item 待辦事項的 .completed class 數量
  // 用 jQuery text() 方式更新 html 已完成 [數字] 項目
  updateCompletedCount();
}

// 監聽
$(() => {
  // TODO: 每一條代辦事項 delete 監聽 click 事件
  $('.todolist__item').on('click', '.delete', (e) => deleteTodo(e))

  // 狀態：全部、待完成、已完成
  $('.todolist__tabs li').each(function () {
    $(this).click(function () {
      $(this).siblings().find('a').removeClass('active')
      $(this).find('a').addClass('active')
    })
  })

  // TODO: 使用者可以將待辦事項設定成已完成
  // 步驟一：監聽每一個 todo list，前面 checkbox 有被點擊時執行 Function
  $('.todolist__item').on('click', 'input', (e) => {
    // 步驟二：每條待辦事項根據條件，加上不同的 class：completed, no-complete
    const a = $(e.target).parent()
    if(a.hasClass('completed')){
      c = 0;
      console.log(c);
      a.addClass('no-completed');
      a.removeClass('completed');
    }else{
      c = 1;
      console.log(c);
      a.addClass('completed');
      a.removeClass('no-completed');
    }
    // 步驟三：更新已完成項目的數字
    const b = $('.todolist__item').find('.completed').length
    $('.todolist__info span a').text(b);
  })

  // 篩選全部
  $('.todolist__tabs').on('click', '.all', () => {
    $('.todolist__item').children().show()
  })

  // TODO: 篩選待完成
  $('.todolist__tabs').on('click', '.no-completed', () => {
    $('.todolist__item').find('.completed').hide();
    $('.todolist__item').find('.no-completed').show();
  })

  // TODO: 篩選已完成
  $('.todolist__tabs').on('click', '.completed', () => {
    $('.todolist__item').find('.completed').show()
    $('.todolist__item').find('.no-completed').hide()
  })
})