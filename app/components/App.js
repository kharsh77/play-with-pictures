var React= require('react')
var Header= require('./Header.js')
var PicArea= require('./PicArea.js')
var StickerArea= require('./StickerArea.js')


class App extends React.Component{
  constructor(props){
    super(props);
    this.state={
      counter:0,
      drawActive: false,
      stickers: []
    };

    this.refershClick= this.refershClick.bind(this);
    this.uploadSticker= this.uploadSticker.bind(this);
    this.activateDrawing= this.activateDrawing.bind(this);
  };

  refershClick(){
    this.setState({drawActive: false})
  }

  activateDrawing(){
    this.setState({drawActive: true})
  }

  uploadSticker(obj){
    
    var arr= this.state.stickers;
    var newCounter= this.state.counter+1;
    obj.id= (newCounter).toString();
    obj.top=50+200*arr.length;
    obj.left= 0;
    arr.push(obj);
    this.setState({obj: arr, counter: newCounter});
  }

  
  render(){
    return(

      <div>
        <Header refreshFn={this.refershClick} uploadSticker={this.uploadSticker} />
  
        <div className='content'>
          
          <PicArea drawActive={this.state.drawActive} activateDrawing={this.activateDrawing}/>
          <StickerArea stickers={this.state.stickers}/>

        </div>


      </div>
    )
  }
}


module.exports= App;