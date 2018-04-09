// Side nav bar contains stickers

var React= require('react');
var Sticker= require('./Sticker.js');


class StickerArea extends React.Component{
  constructor(props){
    super(props);
    this.state= {
      stickers: this.props.stickers
    };
    this.deleteSticker= this.deleteSticker.bind(this);
  }

  // Deletes a sticker
  deleteSticker(id){
    var node= document.getElementById(id);
    node.parentNode.removeChild(node)
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
                 deleteSticker= {this.deleteSticker} 
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