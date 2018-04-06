var React= require('react')

class PicArea extends React.Component{
  constructor(props){
    super(props);
    this.state={
      active: false
    };

    this.handleClick= this.handleClick.bind(this);
    this.readURL= this.readURL.bind(this);
  };

  handleClick(e){
    e.preventDefault();
    this.props.activateDrawing();
    
  }

  readURL(input) {
      if (input.files && input.files[0]) {

          this.props.activateDrawing();
          var reader = new FileReader();

          reader.onload = function (e) {
            
              document.getElementById('blah').src= e.target.result;
              console.log(document.getElementById('blah').src);
          };

          reader.readAsDataURL(input.files[0]);
      }
  }
  render(){
    var html='';

    if (!this.props.drawActive){
  
      html= (<input type="file" onChange={ (e) => this.readURL(e.target) } />);  

    }else{
      html= (
        <div>          
          <img id="blah" src="http://placehold.it/180" alt="your image" />
        </div>
      );

    }
      return(
      <div className="pic-area">
        {html}
      </div>
    )
  }
}


module.exports= PicArea;