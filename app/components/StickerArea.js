var React= require('react')
var Sticker= require('./Sticker.js')
import Draggable from 'react-draggable'; // The default

class StickerArea extends React.Component{

  constructor(props){
    super(props);
    this.state= {
      stickers: this.props.stickers
    } 
  }

  componentWillReceiveProps(nextProps){
    this.setState({stickers: nextProps.stickers})
  }



  render(){ 

    let html;
    html= (this.state.stickers).map((obj) => (
            
            <Sticker title={obj.title}
                           imgObj = {obj.imgObj}
                           id= {obj.key}
                           key={obj.key}
            />
            
          ))

    return( 
      <div className="sidenav">

        {html}

      </div>
    )
  }
}


module.exports= StickerArea;