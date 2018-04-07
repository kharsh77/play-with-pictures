var React= require('react')
import { DragDropContainer, DropTarget } from 'react-drag-drop-container';

class PicArea extends React.Component{
  constructor(props){
    super(props);
    this.state={
      active: false
    };

    this.handleClick= this.handleClick.bind(this);
    this.readURL= this.readURL.bind(this);
    this.drop= this.drop.bind(this);
    this.allowDrop= this.allowDrop.bind(this);
  };

  handleClick(e){
    e.preventDefault();
    this.props.activateDrawing();
    
  }

  readURL(input) {
      if (input.files && input.files[0]) {

          this.props.activateDrawing();
          var reader = new FileReader();

          reader.onload = function (e) {
            document.getElementsByClassName('pic-area')[0].style.backgroundImage="url("+e.target.result+")";
            document.getElementsByClassName('pic-area')[0].style.backgroundSize= "contain";
          };

          reader.readAsDataURL(input.files[0]);
      }
  }

  allowDrop(event) {
    
    // var data = event.dataTransfer.getData("application/json");
    // var node= document.getElementById(data);
    // console.log('target',node);

    // if (event.target.getAttribute("draggable") == "true") 
    //       {alert();
    //     event.dataTransfer.dropEffect = "none";} // dropping is not allowed
    // else
    //     event.dataTransfer.dropEffect = "all"; // drop it like it's hot
    // // document.getElementById("demo").innerHTML = "The p element is OVER the droptarget.";
    // event.target.style.border = "4px dotted green";
    event.preventDefault(); 
  }

  drop(event) {

    var data = event.dataTransfer.getData("application/json");
    var obj     = JSON.parse(data);    

    var nodeCopy = document.getElementById(obj.id).cloneNode(true);

    nodeCopy.id = "new-"+obj.id;
    nodeCopy.style.height="150px";
    nodeCopy.style.width="150px";
    nodeCopy.style.top= (event.clientY-obj.y)+"px";
    nodeCopy.style.left= (event.clientX-obj.x)+"px";
    nodeCopy.style.position="absolute";

    event.target.appendChild(nodeCopy);
    event.preventDefault();
  }
  componentWillReceiveProps(nextProps){
    var node=document.getElementById('droptarget');
    if(nextProps.drawActive==false && node){
      
      node.style.backgroundImage= null;
      node.innerHTML= '';
    }
  }
  

  render(){
    var html='';

    if (!this.props.drawActive){
  
      return (
          <div className="pic-button">
            <input type="file" onChange={ (e) => this.readURL(e.target) } />
          </div>
        );  

    }else{
      return (
        <div className="pic-area" id="droptarget" onDrop={this.drop} onDragOver={this.allowDrop}>
          
        </div>
        );
    }

  }
}


module.exports= PicArea;