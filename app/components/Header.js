var React= require('react')
var StickerModal= require('./StickerModal.js')


class Header extends React.Component{
  constructor(props){
    super(props);


    this.refershClick= this.refershClick.bind(this);
  };

  refershClick(){
    this.props.refreshFn();
  }



  render(){
    return(
        <div className="header">
          <a className="c-button" onClick={this.refershClick}>

          </a>
          <span className='heading'> My App </span>
          <a className="c-button s-button"><StickerModal uploadSticker={this.props.uploadSticker}/></a>
        </div>
    )
  }
}


module.exports= Header;