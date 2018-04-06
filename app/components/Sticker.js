var React= require('react')


class Sticker extends React.Component{
  constructor(props){
    super(props);
    this.renderImg= this.renderImg.bind(this);
  }

  renderImg(input,id){
    var reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById("sticker-img-"+id).src= e.target.result;
    };

    reader.readAsDataURL(input.files[0]);    
  }
  
  componentDidMount(){
    this.renderImg(this.props.imgObj, this.props.id)
  }

  render(){console.log("props", this.props)
    return(
        <div className="sticker">
          <p> {this.props.title}</p>
          <img id={"sticker-img-"+this.props.id} src=""/> 

                  <Resizer
                    ref={"resizerNode"}
                    id={this.props.id}
                    
                    isResizing={this.props.isResizing}
                    resizerWidth={16}
                    resizerHeight={16}
                    updateStateResizing={this.props.updateStateResizing}
                    funcResizing={this.props.funcResizing} />
                  </div>

      )
  }
}



// Resizer Component
class Resizer extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
  }
  componentWillUnmount(){
    window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
    window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
  }
  onMouseDown(e) {
    console.log("Resizer.onMouseDown");

    this.props.updateStateResizing( this.props.id, true);
  }
  onMouseMove(e) {
    console.log("Resizer.onMouseMove");
    if( this.props.isResizing ){
      this.props.funcResizing( this.props.id, e.clientX, e.clientY);
    }
  }
  onMouseUp(e) {
    console.log("Resizer.onMouseUp");
    if( this.props.isResizing ){
      this.props.updateStateResizing( this.props.id, false);
    }
  }
  render() {
    const style = {
      width:  this.props.resizerWidth,
      height: this.props.resizerHeight,
    };
    return (
      <div className="resizer"
            style={style}
            onMouseDown={this.onMouseDown.bind(this)}
        ></div>
    );
  }
};
Resizer.propTypes = {
  id:                   React.PropTypes.number.isRequired,
  isResizing:           React.PropTypes.bool.isRequired,
  funcResizing:         React.PropTypes.func.isRequired,
  updateStateResizing:  React.PropTypes.func.isRequired,
  resizerWidth:         React.PropTypes.number.isRequired,
  resizerHeight:        React.PropTypes.number.isRequired
};


module.exports= Sticker;