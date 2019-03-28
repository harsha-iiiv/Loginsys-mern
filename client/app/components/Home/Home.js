import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import React, { Component } from "react";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "../../utils/storage";



class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: "",
      signUpError: "",
      signInError: "",
      signInEmail: "",
      signInPassword: "",
      signUpEmail: "",
      signUpPassword: "",
      signUpPassword1: "",
      show: false,
      show1: false,
      open: false,
      open1:false,
      showPass: false,
      passComp: ""

    };
 
    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(
      this
    );
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(
      this
    );
    this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(
      this
    );
    this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(
      this
    );
    this.onTextboxChangeSignUpPassword1 = this.onTextboxChangeSignUpPassword1.bind(
      this
    );

    this.onSignIn = this.onSignIn.bind(this);
    this.onSignUp = this.onSignUp.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify tokenkjn
      //console.log("hey" + fetch("/api/account/verify?token=" + token));
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value
    });
  }

  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value
    });
  }
  onTextboxChangeSignUpPassword1(event) {
    this.setState({
      signUpPassword1: event.target.value
    });
    if(signUpPassword1!=signInPassword){
      this.setState({
        passComp:"Password is not matching"
      });
    }
  }
  

  onSignUp() {
    // Grab state
    const { signUpEmail, signUpPassword } = this.state;

    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch("/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpEmail: "",
            signUpPassword: ""
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false
          });
        }
      });
  }
  
   onSignIn() {
    // Grab state
     
    const { signInEmail, signInPassword } = this.state;
   
    this.setState({
      isLoading: true
    });

    // Post request to backend
    fetch("/api/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword
      })
    })
      .then(res => res.json())
      .then(json => {
        console.log("json", json);
        if (json.success) {
          setInStorage("the_main_app", { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: "",
            signInEmail: "",
            token: json.token
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch("/api/account/logout?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }
 /* handleClickOpen() {
    this.setState({
      open: true
    })
  }*/

 /* handleClose(){
    this.setState({
      open: false
    })
  }*/

  sForm(){
    this.setState({
      show:! this.state.show,
      show1:false,
      open :! this.state.open
      
    })
  }
  
  sForm1(){
    this.setState({
      show1: !this.state.show1,
      show:false,
      open1:!this.state.open
    })
  }
  handleClickShowPassword(){
    this.setState( {
      showPass: !this.state.showPass
    })
  }
   
  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
      signUpEmail,
      signUpPassword,
      signUpError,
      signUpPassword1
    } = this.state;
   var signin = <div>
            {signInError ? <p>{signInError}</p> : null}
            <p>Sign In</p>
            <Input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextboxChangeSignInEmail}/> 
         
             
            <br/>
            <br/>
        
           <Input
            id="adornment-password"
            
            value={signInPassword}
           onChange={this.onTextboxChangeSignInPassword}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={()=>this.handleClickShowPassword()}
                >
                  {this.state.showPass? <Visibility/> : <VisibilityOff/>}
                </IconButton>
              </InputAdornment>
            }
            type={this.state.showPass ? 'text' : 'password'}
          />
            <br/>
            <br/>
            <Button variant="contained" color="primary"  onClick={()=>this.onSignIn()}>Sign In</Button>
          </div>
          
    var signup = <div>
            {signUpError ? <p>{signUpError}</p> : null}
          {this.state.passComp }          
            <Input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextboxChangeSignUpEmail}
            />
            <br/>
             <br/>
             
               <Input
            id="adornment-password"
            
              value={signUpPassword}
                placeholder="Password"
              onChange={this.onTextboxChangeSignUpPassword}
             type=  'password'
          />
          <br/><br/>
           <Input
            id="adornment-password"
            
              value={signUpPassword1}
                placeholder="Password"
              onChange={this.onTextboxChangeSignUpPassword1}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={()=>this.handleClickShowPassword()}
                >
                  {this.state.showPass? <Visibility/> : <VisibilityOff/>}
                </IconButton>
              </InputAdornment>
            }
            type={this.state.showPass ? 'text' : 'password'}
          />
            <br/><br/>
            <Button color= "primary" variant="contained" onClick={()=>this.onSignUp()}>Sign Up</Button>
          </div>

    var msignin = 
       <Dialog
          open={this.state.open}
          onClose={this.sForm}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">SignIn</DialogTitle>
          <DialogContent>
             {signin}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.sForm()} color="primary">
              Cancel
            </Button>
             
          </DialogActions>
        </Dialog>  
var msignup = 
       <Dialog
          open={this.state.open1}
          onClose={this.sForm1}
          aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">SignUp</DialogTitle>
          <DialogContent>
             {signup}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>this.sForm1()} color="primary">
              Cancel
            </Button>
             
          </DialogActions>
        </Dialog>  

        

    if (isLoading) {
      return (
        <div>
          < img src = "https://static-steelkiwi-dev.s3.amazonaws.com/media/filer_public/2b/3b/2b3b2d3a-437b-4e0a-99cc-d837b5177baf/7d707b62-bb0c-4828-8376-59c624b2937b.gif"/>
        </div>
      );
    }

    if (!token) {
      return (
        <div>
           <Button className="btn-up in" variant="outlined" color="primary" onClick={()=>this.sForm()}>
          SignIn
        </Button>
          {this.state.show? msignin:null}
          
          
            <Button variant="outlined" className="btn-up up" color="primary" onClick={()=>this.sForm1()}>
         SignUp </Button>
          {this.state.show1? msignup:null}
          
        </div>
      );
    }

    return (
      <div>
       
        <Button className="btn-log" variant="outlined" color="primary" onClick={this.logout}>Logout</Button>
       
      </div>
    );
  }
}

export default Home;
