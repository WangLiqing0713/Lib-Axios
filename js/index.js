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
    console.log(result)
    const bookList = result.data.data
    console.log(bookList)
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
    console.log(htmlStr);
    document.querySelector('.list').innerHTML = htmlStr
  })
}

// 网页加载运行后，获取并渲染列表一次
getBookList()
