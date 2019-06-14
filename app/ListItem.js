import React from 'react'
import { Component } from 'react'
class ListItem extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleFinish = this.handleFinish.bind(this)
    this.handelChange = this.handelChange.bind(this)
    this.handleshowInput = this.handleshowInput.bind(this)
  }


  allChecked() {
    let isAllChecked = false;
    if (this.state.List.every(todo => todo.status)) {
      isAllChecked = true;
    }
    this.setState({   //改变状态，组件重绘
      todos: this.state.todos,
      isAllChecked: isAllChecked
    });
  }

  handleDelete() {
    this.props.delItem(this.props.index)
  }

  handelChange() {
    var value = this.refs.myInput2.value
    this.props.changeItem(value, this.props.index)
    this.refs.myInput2.style.display ="none"
    this.refs.mylab.style.display = "inline-block"
    this.refs.myInput2.value='';
  }

  handleFinish() {
    let status = !(this.props.item.status);
    this.props.changestate(this.props.index, status);
  }
  handleshowInput()
  {
    console.log('zhixing');
    this.refs.myInput2.style.display ="inline-block"
    this.refs.mylab.style.display ="none"
  }

  render() {
    const item = this.props.item;
    // const index = this.props.index;
    return (
      <li>
        <div className='view'>
        <input type='checkbox' className='toggle' checked={this.props.item.status} onClick={this.handleFinish} />
        <label className="todo" style={{display:'inline-block'}}  onClick={this.handleshowInput} ref ="mylab">{item.title}</label>
        <input style={{display:'none'}} ref="myInput2" onBlur={this.handelChange} className="todo" />
        <button className='destory' onClick={this.handleDelete}></button>
        </div>
        
      </li>
      
    )
  }

}
export default ListItem;




// render() {
//   const item = this.props.item;
//   // const index = this.props.index;
//   return (
//     <li>
//       <div>
//       <input type='checkbox' className='checkBox' checked={this.props.item.status} onClick={this.handleFinish} />
//       <label  style={{display:this.state.labstyle}}  onClick={this.handleshowInput} ref ="mylab">{item.title}</label>
//       <input style={{display:this.state.inputstyle}} ref="myInput2" onBlur={this.handelChange} />
//       <button className='delButton' onClick={this.handleDelete}>del</button>
//       </div>
//     </li>
//   )
// }