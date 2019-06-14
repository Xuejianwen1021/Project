import '../css/style.css'
import React from 'react'
import ReactDom from 'react-dom'
import Dialog from './dialog'
import ListItem from './ListItem'
import Footer from './Footer'
import { Component } from 'react'

class TodoList extends Component {
  constructor(props) {
    super(props)
    Storage = window.localStorage;
    this.state = {
      List: JSON.parse(Storage.getItem("List")) || [],
      isAllChecked: false,  //有bug  每次刷新之后就会导致失去全选状态（原因：没有存到List里，刷新之后自动变为false）
      selection: 'All'
    }
  }
  changeTodoState(index, status, isAllChecked = false) {   //初始化isChangeAll为false
    if (isAllChecked) {     //全部操作
      this.setState({
        List: this.state.List.map((todo) => {
          todo.status = status;
          return todo;
        }),
        isAllChecked: status
      });
    } else {   //操作其中一个todo
      this.state.List[index].status = status;
      this.allChecked();
    }
    // this.db.set('todos', this.state.todos);
    this.saveItem()
  }

  allChecked() {
    let isAllChecked = false;
    if (this.state.List.every(todo => todo.status)) {
      isAllChecked = true;
    }
    // if (arr.forEach(function(todo) {return todo.isDone;} )) {
    //     isAllChecked = true;
    // }
    this.setState({   //改变状态，组件重绘
      List: this.state.List,
      isAllChecked: isAllChecked
    });
  }
  addItem(newItem) {
    var allItem = this.state.List;
    allItem.push(newItem);
    this.setState({
      List: allItem
    }
    );
    this.saveItem();
    // Storage.setItem("List",JSON.stringify(this.state.List));
    // console.log(this.state.List);
  }//添加新todo             传入新的item

  deleteItem(index) {
    this.state.List.splice(index, 1);
    this.setState({ List: this.state.List });
    this.saveItem()
    // Storage.setItem("List",JSON.stringify(this.state.List));
  }

  delAllItem() {
  //  let newList = this.state.List.filter((todo) => (!todo.status));
   this.setState({   
      List: this.state.List.filter((todo) => (!todo.status)),
      isAllChecked: false
    });
    console.log(this.state.List)
    this.saveItem()
    ;//有bug  第一次点击页面上刷新了，但是并没用改变setstate，重新点击后改变
  

  }









  //在线编辑
  // changeItem(item){
  //   console.log('执行了changefangfa' )
  //   this.setState({title:this.props.item.title});
  // }

  all() {
    this.setState({
      selection: 'All'
    })
  }
  active() {
    this.setState({
      selection: 'Active'
    })
  }
  completed() {
    this.setState({
      selection: 'Completed'
    })
  }

  saveItem() {
    Storage.setItem("List", JSON.stringify(this.state.List));
  }


  changeItem(value,index){
  let List = this.state.List.map((todo,id) => {
      if (id==index)
      {
      todo.title=value
      }  
    return todo; 
   
    })
    this.setState({
      List:List,   
      inputstyle: "block",
      labstyle:"none"
    })
   this.saveItem();
   
    // this.props.chItem(title);
  }

  showInput(){
    this.setState({
      inputstyle:"block",
      labstyle :"none"
    })

  }


  render() {

    var shownTodos = this.state.List.filter(function (todo) {
      switch (this.state.selection) {
        case 'Active':
          return !todo.status;
        case 'Completed':
          return todo.status;
        default:
          return true;
      }
    }, this);

    return (
      <div className="fram">
        <header className="header">
          <h1>todos</h1>
        </header >
        <section className="main">  
          <Dialog
            addItem={this.addItem.bind(this)}
            nums={this.state.List.length}
            changeState={this.changeTodoState.bind(this)}
          />
          <ul className='todo-list'>
            {shownTodos.map((item, index) =>
              <ListItem
                item={item}
                index={index}
                delItem={this.deleteItem.bind(this)}
                changestate={this.changeTodoState.bind(this)} 
                changeItem = {this.changeItem.bind(this)}
              // chItem ={this.changeItem.bind(this)}
              />
            )}
          </ul>
          <footer className="footer">
            <Footer
              nums={this.state.List.length}
              isDone={(this.state.List && this.state.List.filter((todo) => todo.status)).length || 0}
        
              isAllChecked={this.state.isAllChecked}
              all={this.all.bind(this)}
              active={this.active.bind(this)}
              completed={this.completed.bind(this)}
              delAll={this.delAllItem.bind(this)}
            //  clearDone={this.clearDone.bind(this)} 
            />

        </footer>
          
        
        </section>

      </div>

    )
  }
}
ReactDom.render(
  <TodoList />,
  document.getElementById('root')
);
export default TodoList;