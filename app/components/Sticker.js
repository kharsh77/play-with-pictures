var React= require('react')


class Sticker extends React.Component{
  constructor(props){
    super(props);
    this.renderImg= this.renderImg.bind(this);
  }

  renderImg(input,id){
    var reader = new FileReader();

    reader.onload = function (e) {
        document.getElementById(id).src= e.target.result;
    };

    reader.readAsDataURL(input.files[0]);    
  }
  
  componentDidMount(){
    this.renderImg(this.props.imgObj, this.props.id)
  }

  render(){
    return(
        <div className="sticker">
          <p> {this.props.title}</p>
          <img id={this.props.id} src=""/> 
        </div>

      )
  }
}


module.exports= Sticker;