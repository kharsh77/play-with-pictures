var React= require('react')
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '20%',
    left                  : 'auto',
    right                 : '50%',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class StickerModal extends React.Component {
  constructor () {
    super();
    this.state = {
      showModal: false,
      title:'',
      imgObj:[]
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleImgUpload= this.handleImgUpload.bind(this);
    this.handleImgTitle= this.handleImgTitle.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
  }
  
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  }

  handleImgUpload(input) {
    if (input.files && input.files[0]) {

        this.setState({imgObj: input});
    }
  }

  handleImgTitle(e){
    // e.preventDefault();
    this.setState({title: e.value});
  }

  handleSubmit(){
    var obj= {
      title: this.state.title,
      imgObj:this.state.imgObj,
      key:'',
      isDragging: false, 
      isResizing: false, 
      top:0, 
      left: 0,   
      width:150, 
      height:150 
    };

    this.props.uploadSticker(obj);

    this.handleCloseModal();
  };
  
  render () {
    return (
      <div>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style= {customStyles}
        >
          <form >
            Title:<input type="text" onChange={ (e) => this.handleImgTitle(e.target) }/> <br/>
            Sticker: <input type="file" onChange={ (e) => this.handleImgUpload(e.target) } /><br/>
            
          </form>
          <button type="button" onClick={this.handleSubmit}> Submit</button>
                  
          <button onClick={this.handleCloseModal}>Close Modal</button>
        </Modal>
      </div>
    );
  }
}


module.exports= StickerModal;