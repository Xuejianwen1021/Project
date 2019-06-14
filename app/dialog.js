// import React, { Component } from 'react';
// class dialog extends Component {
//   constructor(props) {
//     super(props);
//     this.handleClick = this.handleClick.bind(this);
//   }

//   handleClick() {
//     var len = this.props.nums;   
//     var newid = len > 0 ? len : 0;
//     var value = this.refs.myText.value;       //?
//     if (value !== '') {
//       var obj = {
//         id: newid,
//         name: value,
//         status: 0
//       };
//       this.refs.myText.value = '';
//       this.props.addNewTask(obj);
//     }
//   }
// render(){
//   return(
//     <div className='dialog'>
// <div>
//   <h3>Task</h3>
//   <input type="text" ref="myText" placeholder='写下新的todo'/>
// </div>
// <div>
//   <input type="button" value="Save Task" onClick={this.handleClick}/>
// </div>
//     </div>
//   );
// }

// }
// export default dialog;


import React from 'react'
import { Component } from 'react'

class Dialog extends Component {
  constructor(props) {
    super(props)
    this.handlerKeyUp = this.handlerKeyUp.bind(this);
  }

  handlerSelectAll(e) {
    this.props.changeState(null, e.target.checked, true);
  }
  handlerKeyUp(event){
    if(event.keyCode === 13){
      var len = this.props.nums
      var newid = len+1>0? len:0
      var  value =this.refs.myInput.value
      
        var obj ={
          id:newid,
          title: value,
          status:false
        };
      
      this.props.addItem(obj);
      this.refs.myInput.value='';
    }
  }
  
  render() {
    return (
      <div className='header'> 
   <input className='new-todo' type='text' placeholder='写下新的todo' ref="myInput"  onKeyUp={this.handlerKeyUp.bind(this)}/>
   <input className="toggle-all" type="checkbox" checked={this.props.isAllChecked} onChange={this.handlerSelectAll.bind(this)} />
   </div>

  );
  
}
 
}
export default Dialog;