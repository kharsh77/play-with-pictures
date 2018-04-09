var React= require('react')
var Header= require('./Header.js')
var PicArea= require('./PicArea.js')
var StickerArea= require('./StickerArea.js')

// Multiples stickers can be uploaded on side nav area.
// A pic is uploaded in drawing area. On this area stickers are dragged and placed.


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      counter:0, //counts number of stickers uploaded
      drawActive: false, // True when a pic is uploaded in drawing area
      stickers: [] // contains sticker objects created
    };

    this.refershClick= this.refershClick.bind(this);
    this.uploadSticker= this.uploadSticker.bind(this);
    this.activateDrawing= this.activateDrawing.bind(this);
  };

  // startover function
  refershClick(){
    this.setState({drawActive: false})
  }

 // when drawing is activated
  activateDrawing(){
    this.setState({drawActive: true})
  }

  // handles sticker upload
  uploadSticker(obj){
    
    var arr= this.state.stickers;
    var newCounter= this.state.counter+1;
    obj.key= "sticker-"+(newCounter).toString();
    arr.push(obj);
    this.setState({obj: arr, counter: newCounter});
  }

  
  render(){
    return(
      <div>
        <Header refreshFn={this.refershClick} uploadSticker={this.uploadSticker} />
        <div id="content" className='content'>
          
          <PicArea drawActive={this.state.drawActive} activateDrawing={this.activateDrawing}/>
          <StickerArea stickers={this.state.stickers}/>

        </div>
      </div>
    )
  }
}


module.exports= App;