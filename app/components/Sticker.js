// A sticker object

var React= require('react')

class Sticker extends React.Component{
  constructor(props){
    super(props);
    this.renderImg= this.renderImg.bind(this);
    this.dragStart= this.dragStart.bind(this);
    this.deleteSticker= this.deleteSticker.bind(this);
  }
 
  // Handles image uploaded in sticker
  renderImg(input,id){
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById(id).src= e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }

  
  // Handles when a sticker is dragged
  dragStart(event) {
    const node = this.refs.node;
    var rect = node.getBoundingClientRect();
      event.dataTransfer.setData( 'application/json', JSON.stringify({
        id: event.target.id,
        // mouse position in a draggable element
        x: event.clientX - parseInt(rect.left),
        y: event.clientY - parseInt(rect.top),
      }));

  }
  
  // Calls parent to delete this sticker
  deleteSticker(){
    this.props.deleteSticker("sticker-"+this.props.id)
  }

  
  componentDidMount(){
    this.renderImg(this.props.imgObj, this.props.id)
  }


  render(){ 
    return(
      <div id={"sticker-"+ this.props.id} ref={"node"} accept="image/*" onDragStart={this.dragStart} draggable="true"  className="sticker" >
        <p> {this.props.title} <button onClick={this.deleteSticker} className="delete-sticker">x </button></p>
        <img id={this.props.id} src=""/> 
      </div>
    )
  }
}


module.exports= Sticker;