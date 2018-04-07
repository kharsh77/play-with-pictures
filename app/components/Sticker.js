var React= require('react')


class Sticker extends React.Component{
  constructor(props){
    super(props);
    this.renderImg= this.renderImg.bind(this);
    this.dragStart= this.dragStart.bind(this);
  }

 
  renderImg(input,id){
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById(id).src= e.target.result;
    };
    reader.readAsDataURL(input.files[0]);
  }

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
  // componentWillMount(){
    //   console.log(this.checkValidImage(this.props.imgObj))
    // if (this.checkValidImage(this.props.imgObj)) return true
    // else return false
      // return false
  // }
  
  componentDidMount(){
    this.renderImg(this.props.imgObj, this.props.id)
  }


  render(){ 
    return(
      <div ref={"node"} accept="image/*" onDragStart={this.dragStart} draggable="true" id="dragtarget" className="sticker" >
        <p> {this.props.title}</p>
        <img id={this.props.id} src=""/> 
      </div>
    )
  }
}


module.exports= Sticker;