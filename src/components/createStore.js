    import React,{Component} from 'react'
    import FirebaseConfigration from '../firebase/firebaseConfig'
    import RaisedButton from 'material-ui/RaisedButton';
    import TextField from 'material-ui/TextField';
    import Paper from 'material-ui/Paper';
    import AppBar from 'material-ui/AppBar';    

    class CreateStore extends Component{
        constructor(props){
            super(props);
            this.state={
                storename:'',
                storeLocation:''
            }

    this.inputHandler=this.inputHandler.bind(this);
    this.submit = this.submit.bind(this);
        }
        
inputHandler(e){
    this.setState({
        [e.target.name]:e.target.value
    })
}

submit(e){
e.preventDefault()

let storeRef = FirebaseConfigration.ref.child('/store').push(this.state)
storeRef.then(()=>{
    alert('successfuly create store')
    this.context.router.push({
        pathname:'/dashboard'
    })
})
.catch((error)=>{
    alert(error.message)
})
}

render(){

     const center = {
            width: '50%',
            margin: '0 auto'
        }
        const style = {
            padding: '10px',
            textAlign: 'center',
            height:'300'
        };
       
    return(
 <div>
                <div style={center}>
                    <br />
                    <br />
                    <AppBar
                        title="Create Store"
                        showMenuIconButton={false} />
                    <Paper style={style} zDepth={3}>
                        <form onSubmit={this.submit}>
                            <TextField
                                placeholder="Store name"
                                name="storename"
                                style={{margin:'30'}}
                                onChange={this.inputHandler}
                                required
                            /><br />

                            <TextField
                                placeholder="Location"
                                name="storeLocation"
                                onChange={this.inputHandler}
                                required
                            /><br />
                            <RaisedButton style={{margin:'20'}} type="submit" label="Add" primary={true} />
                        </form>
                    </Paper>
                </div>
            </div>


        );
    }
}
CreateStore.contextTypes = {
    router: React.PropTypes.object.isRequired
}
export default CreateStore


