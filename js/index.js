/**
 * 目标1：渲染图书列表
 *  1.1 获取数据
 *  1.2 渲染数据
 */
const creator = '我'
// 封装-获取并渲染图书列表函数
function getBookList() {
  // 1.1 获取数据
  axios({
    url:'http://hmajax.itheima.net/api/books',
    params:{
      creator
    }
  }).then(result=>{
    const bookList = result.data.data
    //1.2渲染数据
    const htmlStr = bookList.map((item,index)=>{
      return `<tr>
      <td>${index+1}</td>
      <td>${item.bookname}</td>
      <td>${item.author}</td>
      <td>${item.publisher}</td>
      <td>
        <span class="del">删除</span>
        <span class="edit">编辑</span>
      </td>
    </tr>`
    }).join('')
    document.querySelector('.list').innerHTML = htmlStr
  })
}

// 网页加载运行后，获取并渲染列表一次
getBookList()

/*
目标2：新增图书
2.1新增弹框->显示和隐藏
2.2收集表单数据，并提交到服务器保存
2.3刷新图书列表
*/ 

//2.1 创建弹框对象
const addModalDom = document.querySelector('.add-modal')
const addModal = new bootstrap.Modal(addModalDom)
document.querySelector('.add-btn').addEventListener('click',()=>{
// 2.2收集表单数据，并提交到服务器保存
const addForm = document.querySelector('.add-form')
const bookObj = serialize(addForm,{hash:true,empty:true})
console.log(bookObj);
axios({
  url:'http://hmajax.itheima.net/api/books',
  method:'post',
  data:{
    ...bookObj,
    creator
  }
}).then(result=>{
  // 2.3刷新图书列表
  getBookList()
  // 重置表单
  addForm.reset()
  // 隐藏弹框
  addModal.hide()
})
})
