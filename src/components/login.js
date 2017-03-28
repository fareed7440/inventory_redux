import React,{Component} from  'react'
import {signin} from '../store/action/auth' 
import {connect} from 'react-redux'
import FirebaseConfigration from '../firebase/firebaseConfig'
import {LoginComponent} from '../container/login'
//import App from '../App/App'

class Login extends Component {
    constructor() {
        super();
        this.state = {

            email: '',
            password: ''
        }
        this.signin = this.signin.bind(this);
        this.inputHandler = this.inputHandler.bind(this);
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    signin(e) {
        e.preventDefault()
        FirebaseConfigration.customLogin(this.state)
            .then((user) => {
                this.props.signInUser(user)
                localStorage.setItem('currentUser', user.uid);
                this.context.router.push({
                    pathname: '/dashboard',
                
                })
            })
            .catch((error) => alert(error.message))
        console.log(this.props)
    }
    render() {
        return (
            <div className="col-sm-6 col-sm-offset-3">
                <LoginComponent inputHandler={this.inputHandler} submit={this.signin} />
            </div>
        )
    }
}

Login.contextTypes = {
    router: React.PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        authReducer: state
    }
}
const mapDispatchToProps = (dispatch) => { 
    return {
        signInUser: (data) => {
            dispatch(signin(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);