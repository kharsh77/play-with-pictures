// Drawing area
// Here main pic is uploaded
// All stickers are dragged and dropped here

var React= require('react')

class PicArea extends React.Component{
  constructor(props){
    super(props);
    this.state={
      active: false,
      resizing: false,
      drags: 0,
    };

    this.readURL= this.readURL.bind(this);
    this.drop= this.drop.bind(this);
    this.allowDrop= this.allowDrop.bind(this);
    this.handleResizeMouseUp= this.handleResizeMouseUp.bind(this);
    this.handleResizeMouseDown= this.handleResizeMouseDown.bind(this);
    this.handleResizeMouseMove= this.handleResizeMouseMove.bind(this);
    this.checkValidImage= this.checkValidImage.bind(this);
  };

  // Handles pic upload
  readURL(input) {
          var here= this;
          var reader = new FileReader();

          reader.onload = function (e) {

          if (here.checkValidImage(input)) {
              here.props.activateDrawing();
              document.getElementsByClassName('pic-area')[0].style.backgroundImage="url("+e.target.result+")";
              document.getElementsByClassName('pic-area')[0].style.backgroundSize= "contain";
            }else{
              document.querySelector(".pic-button input").value="";
              return false
            }
          };

          reader.readAsDataURL(input.files[0]);

  }
    // Validate the uploaded image
  checkValidImage(input){
    
    if(input && input.files[0]){
      if((input.files[0].type).substring(0, 5) == 'image') {
      // this is an image
        if(input.files[0].size <1000000){
          return true;
        } else {
          // invalid filesize
          alert("Invalid filesize. (filesize < 1mb )");
          return false;
        }
      }else {
        // invalid image
        alert("Invalid image.")
        return false;
      }     
    }else{
       // empty image file
       alert("Invalid image file.")
      return false;
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

  // Handles stickers when they are dropped.
  drop(event) {

    var data = event.dataTransfer.getData("application/json");
    
    if(!data) return // when drooped object has undefined data

    var obj     = JSON.parse(data);    
    var nodeCopy = document.getElementById(obj.id).cloneNode(true);

    var drags= this.state.drags;
    var newId= "drag-"+(drags+1);

    // Parent div containing dragged object
    var div= document.createElement('div');
    div.classList.add('sticker-img');
    div.classList.add('unselectable');
    div.id = newId
    div.style.height="150px";
    div.style.width="150px";
    div.style.top= (event.clientY-obj.y+20)+"px";
    div.style.left= (event.clientX-obj.x)+"px";
    div.style.position="absolute";
    div.setAttribute("unselectable", "on");
    
    // Used to resize the dropped objects
    var resizer= document.createElement('span');
    resizer.setAttribute("unselectable", "on");
    resizer.addEventListener('mouseup', this.handleResizeMouseUp);
    resizer.addEventListener('mousedown', this.handleResizeMouseDown);
    resizer.addEventListener('mousemove', this.handleResizeMouseMove.bind(this, newId)) ;
    resizer.classList.add('resizer');
    resizer.classList.add('unselectable');

    // Sticker image containing object
    nodeCopy.setAttribute("draggable", false);
    nodeCopy.setAttribute("unselectable", "on");
    nodeCopy.classList.add('unselectable');
    div.appendChild(nodeCopy);
    div.appendChild(resizer);

    // Append the prepared child
    event.target.appendChild(div);

    this.setState({drags:drags+1})
    event.preventDefault();
  }

  componentWillReceiveProps(nextProps){
    var node=document.getElementById('droptarget');
    if(nextProps.drawActive==false && node){   
      node.style.backgroundImage= null;
      node.innerHTML= '';
    }
  }

  handleResizeMouseUp(event){
     this.setState({resizing: false})
  }

  handleResizeMouseDown(event){
    this.setState({resizing: true})
  }
  
  handleResizeMouseMove(id, e){
    if(this.state.resizing){
      
      let node = document.getElementById(id);
      var rect = node.getBoundingClientRect();
      var width =   e.clientX - parseInt(node.offsetLeft)+ 8;
      var height =  e.clientY - parseInt(node.offsetTop) + 8;
      node.style.width= width+"px";
      node.style.height= height+"px";
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
        <div className="pic-area" id="droptarget" onDrop={this.drop} onDragOver={this.allowDrop} onMouseUp={this.handleResizeMouseUp}>
          
        </div>
        );
    }

  }
}


module.exports= PicArea;