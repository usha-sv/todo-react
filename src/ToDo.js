import React,{Component} from 'react';
import  "./ToDo.css"
function ToDoList(props){
  const items = props.items;
  const listItems = items.map(item =>{
    return <div className="list" key={item.key}>
      <p>
         <span class="listText"> {item.text}</span>
         <span>
            <button class="delete" onClick={() => {props.handleDelete(item.key)}} >Del</button>
            <button class="edit" onClick={() => {props.handleEdit(item.key)}} >Edit</button>
        </span>
      </p>
    </div>})
    return (
      <div>{listItems}</div>
    )
  }

class ToDo extends Component{
  constructor(props){
    super(props);
    this.state = {
      items:[],
      key:'',     
      text:'',
      selectedKey:'',
      updateItem:false,
    }       
  }
  handleInput=(entered)=>{
    this.setState({
      text: entered.target.value, //entered text is set
      key:Date.now()              //key is created
    })
  }

  handleAdd=()=>{
    const newItem ={
      key:this.state.key, //creting new item
      text:this.state.text,
    }
    if(newItem.text!== ""){
     const items = [...this.state.items, newItem];//destructuring using spread(adding new item to items[])
      this.setState({
        items: items,      
        text:'',
        key:''
      })        
    }
    else
      alert("List items cannot be empty!!")
  }  
  handleEdit=(key)=>{
    let {items}=this.state;
    const selectedItem=items.find(item=>item.key === key)
    this.setState({
      selectedKey:key,        //storing the key of selected item
      text: selectedItem.text,//updating the text
      updateItem :true,
    });
  }
  handleUpdate=()=>{
    let {selectedKey,items,text}=this.state;  //destructuring assignment
    let selectedItem = items.find(item => item.key == selectedKey);//selcting the item from items[] 
    let indexOfSelectedItem= items.indexOf(selectedItem) //finding the index of selected item
    let newItems=items;
    newItems[indexOfSelectedItem]={key:selectedKey,text}  //updating the item at its index
    console.log(newItems[indexOfSelectedItem])
    this.setState({
      items: newItems,      
      text:'',
      key:'',
      updateItem:false
     })        
  }

  handleDelete=(key)=>{
    const filteredItems= this.state.items.filter(item =>item.key!==key);//removing the item of selected key
    this.setState({
      items: filteredItems  //updating items[] from flitered items
    })
  }
  
  handleEdit=(key)=>{
    const selectedItem=this.state.items.find(item=>item.key === key)
    this.setState({
      selectedKey:key,            //storing the key of selected item
      text: selectedItem.text,
      updateItem :true, 
    });
  }

  render(){
    let {items,updateItem}=this.state; //destructuring assignment
    return(
      <div class="todoForm">
        <h1>To-Do App</h1><br/>
        <input type="text" placeholder="Enter your todos" 
        value={this.state.text} 
        onChange={this.handleInput} 
        />
        <button class="button" onClick={updateItem ? ()=>this.handleUpdate() : ()=>this.handleAdd()}> 
        {updateItem ?'Update':'Add'}  
        </button>       
        <ToDoList items={items} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
      </div>
    );
  } 
}
export default ToDo;

