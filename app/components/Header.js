// Header strip
// Contains "Start Over" button and "Upload New Sticker" button

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
            Start Over
          </a>
          <div className="heading-div">
            <div className='heading1'> Play with Pictures </div>
            <p className="heading2"> Upload a Pic and add stickers on it.</p>
          </div>
          <a className="c-button s-button"><StickerModal uploadSticker={this.props.uploadSticker}/></a>
        </div>
    )
  }
}


module.exports= Header;