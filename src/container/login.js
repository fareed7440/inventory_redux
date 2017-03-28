import * as React from "react";
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';

 const style = {
            padding: '10px',
            textAlign: 'center',
            height:'300',
            width:'600',
            margin:'30'
        };
        const style1={
            margin:'40'
        }
       
        const style2={
            margin:'30 auto'
        }
export class LoginComponent extends React.Component {


    render() {
        const center = {
            width: '90%',
            margin: '20 auto'
        }
        return (
            <div style={center}>
                <AppBar
                    title="Login"
               style={{width:'1350',textAlign:'center'}}
                    showMenuIconButton={false} />
                    <center>
                    <Paper style={style} zDepth={3}>
                <form onSubmit={this.props.submit}>
                    <TextField
                        type="email"
                        hintText="email"
                        name="email"
                        style={style2}
                        onChange={this.props.inputHandler}
                        required fullWidth
                    /><br /><br/><br/>

                    <TextField
                        type="password"
                        hintText="password"
                        name="password"
                        style={style2}
                        onChange={this.props.inputHandler}
                        required fullWidth
                    /><br />
                    <RaisedButton style={style1} type="submit" label="Sign in" primary={true} />
                </form>
                </Paper>
                </center>
            </div>
        )
    }
}