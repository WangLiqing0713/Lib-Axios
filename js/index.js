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
      <td data-id=${item.id}>
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
/*
目标3：删除图书
3.1 删除元素绑定点击事件->获取图书id
3.2 调用删除接口
3.3 刷新图书列表
*/
// 3.1 删除元素绑定点击事件->获取图书id
document.querySelector('.list').addEventListener('click', e =>{
  if(e.target.classList.contains('del')){
    const theId = e.target.parentNode.dataset.id
// 3.2 调用删除接口
    axios({
      url:`http://hmajax.itheima.net/api/books/${theId}`,
      method:'DELETE'
    }).then(()=>{
      getBookList()

    })
  }
})

/*
目标4：编辑图书
4.1 编辑弹框->显示和隐藏
4.2 获取当前编辑图书数据->回显到编辑表单中
4.3 提交保存修改，并刷新列表
*/

// 4.1 编辑弹框->显示和隐藏
const editDom = document.querySelector('.edit-modal')
const editModal = new bootstrap.Modal(editDom)
// 编辑元素->点击->弹框显示
document.querySelector('.list').addEventListener('click', e =>{
  // 判断是否为编辑元素
  if(e.target.classList.contains('edit')){
    //4.2 获取当前编辑图书数据->回显到编辑表单中
    const theId = e.target.parentNode.dataset.id
    axios({
      url:`http://hmajax.itheima.net/api/books/${theId}`
    }).then(result=>{
      const bookObj = result.data.data
      const keys = Object.keys(bookObj)
      keys.forEach(key=>{
      document.querySelector(`.edit-form .${key}`).value = bookObj[key]

      })

    })
    editModal.show()
  }
})
// 修改按钮->点击->隐藏弹框
document.querySelector('.edit-btn').addEventListener('click',()=>{
  //4.3 提交保存修改，并刷新列表
  const editForm = document.querySelector('.edit-form')
  const {id, bookname, author, publisher} = serialize(editForm,{hash:true,empty:true})

  axios({
    url:`http://hmajax.itheima.net/api/books/${id}`,
    method:'PUT',
    data:{
      bookname,
      author,
      publisher,
      creator
    }
  }).then(()=>{
    getBookList()
    editModal.hide()

  })
})

