// Sticker upload modal window
// Validate sticker image upload and title of the sticker
// Don't allow image greater than 500kb to upload

var React= require('react');
import Modal from 'react-modal';

// Modal styles
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
      title:"",
      imgObj:"",
      buttonBlur: true,
      errors:[]
    };
    
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleImgUpload= this.handleImgUpload.bind(this);
    this.handleImgTitle= this.handleImgTitle.bind(this);
    this.handleSubmit= this.handleSubmit.bind(this);
    this.checkValidImage= this.checkValidImage.bind(this);
    this.checkTitle= this.checkTitle.bind(this);
  }

  // Triggers the modal to open
  handleOpenModal () {
    this.setState({ showModal: true });
  }
  
  // Closes the modal and cleans previous state values
  handleCloseModal () {
    this.setState({
      showModal: false,
      title:"",
      imgObj:"",
      buttonBlur: true,
      errors:[]
    })
  }

  // Sticker image uploaded are handeled here
  handleImgUpload(input) {
    var error;
    var arr= this.state.errors;

    if (this.checkValidImage(input)) {

    }else{
      if(!this.state.imgObj) error=3;

      arr.push(error);
      this.setState({errors: arr});
    }

  }

  // Validate the uploaded image
  checkValidImage(input){
    
    var arr= this.state.errors;
    
    if(input && input.files[0]){
      if((input.files[0].type).substring(0, 5) == 'image') {
      // this is an image
        if(input.files[0].size <500000){
          arr.filter(e => e !== 3);
          arr.filter(e => e !== 4);
          arr.filter(e => e !== 5);

          var buttonBlur= (this.state.title.length == 0);
          this.setState({imgObj: input, errors: arr, buttonBlur: buttonBlur});
          return true;
        } else {
          // invalid filesize
          arr.push(5);
          this.setState({errors: arr});
          return false;
        }
      }else {
        // invalid image
        arr.push(4);
        this.setState({errors: arr});
        return false;
      }     
    }else{
       // empty image file
      arr.push(3);
      this.setState({errors: arr});
      return false;
    }

  }
  
  // Handles  entered sticker title 
  handleImgTitle(e){
    var error;
    var arr= this.state.errors;

    if (this.checkTitle(e.value)){
      arr.filter(e => e !== 1);
      arr.filter(e => e !== 2);

      var buttonBlur= this.state.imgObj.length ==0;
      this.setState({title: e.value, errors: arr, buttonBlur:buttonBlur});

    }else{
      if(! e.value) error= 1
        else error=2
        
      arr.push(error);
      this.setState({errors: arr});
    }
  }

  // Validates the sticker title object
  checkTitle(input){
    return (/^[a-zA-Z- ]{1,30}$/.test(input))
  }

  // When submit button of modal is clicked
  handleSubmit(){
    var obj= {
      title: this.state.title,
      imgObj:this.state.imgObj,
      key:''
    };

    this.props.uploadSticker(obj);

    this.handleCloseModal();
  };

  
  render () { 
    var submitButton="";

    if(this.state.buttonBlur){
      submitButton= <button type="button" style={{backgroundColor: '#b5b1b1', color:'white' }}> Submit</button>
    }else{
      submitButton= <button  onClick={this.handleSubmit}> Submit</button>
    }


    return (
      <div id="sticker-modal">
        <div className='c-button' onClick={this.handleOpenModal}>Upload a sticker</div>
        <Modal 
           isOpen={this.state.showModal}
           contentLabel="Minimal Modal Example"
           style= {customStyles}
        >
          <form >
            Title: <input type="text" onChange={ (e) => this.handleImgTitle(e.target) }/> <br/>
            Sticker: <input type="file" onChange={ (e) => this.handleImgUpload(e.target) } /><br/>
            
          </form>
          {submitButton}
                  
          <button onClick={this.handleCloseModal}>Close Modal</button>

          <ErrorDiv errors={this.state.errors} errorMsg= {this.state.errorMsg}/>

        </Modal>
      </div>
    );
  }
}


// Error in sticker image or sticker title upload
class ErrorDiv extends React.Component{
  constructor(props){
    super(props);
  }

  componentWillReceiveProps(){
    var node= document.getElementById("submit-error");
    node.innerHTML= "";
  }
  

    render() {

      const Errors= {
        0: "",
        1: "Sticker title can't be empty.",
        2: "Sticker title is not valid.",
        3: "Please choose a sticker image.",
        4: "Uploaded sticker is not a valid image",
        5: "Uploaded image size excceds the limits.(size <500kb is valid)"
      };

      var errorCodes= this.props.errors;

      var display= errorCodes.length == 0 ? "none": "block";

      var errorHtml= (errorCodes).map((obj) => (
        <div>
        <span>Errors: </span> 
        <span style ={{color:"#ca0505"}}> {Errors[obj]} </span>
        </div>
      ))

      return (
        <div id="submit-error" style ={{display:display, fontSize:"small"}}>
          {errorHtml}
        </div>
    )
  }
}


module.exports= StickerModal;