import React from 'react'
import { Component } from 'react'
class Footer extends Component {
  constructor(props) {
    super(props)
  }
  handleActive() {
    this.props.active();
  }
  handleAll() {
    this.props.all();
  }
  handleCompleted() {
    this.props.completed();
  }
  handlerDelAll() {
    this.props.delAll();
  }
  render() {
    return (
      <div className="todo-footer">
        <span className="todo-count"><span className="todo-count">已完成{this.props.isDone}</span> / 全部{this.props.nums}</span>
          <ul className="filters">
         <li> <a className="showAll" onClick={this.handleAll.bind(this)}>All</a></li>
         <li> <a  className="hide" onClick={this.handleActive.bind(this)}>Active</a></li>
         <li><a className="completed" onClick={this.handleCompleted.bind(this)}>Completed</a></li>
         <button className='clear-completed' onClick={this.handlerDelAll.bind(this)}>Clear completed</button>
          </ul>
      </div>
    )
  }
}
export default Footer;