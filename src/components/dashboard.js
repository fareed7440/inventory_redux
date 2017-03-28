import React,{component} from 'react'
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import{ Link }from 'react-router'

const styles ={ 
 appBar : {
   // backgroundColor: '#009688',
    //backgroundColor: '#3F51B5',
     //minHeight:50,
     //height:300
  },

  drawer: {
    //backgroundColor: '#3F51B5',
    //color: "green",
    //width: 200
   // margin:80
  },


 }

export default class Dashboard extends React.Component{
    constructor(){
        super();
         this.state = {open: false};
    }

  handleToggle = () => this.setState({open: !this.state.open});
// handleToggle1 = () => this.setState({close: !this.state.close});


render(){
    return(
        <div>

<div>
    <AppBar
    title="inventory App"
     onTouchTap={this.handleToggle}
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  >
          <Link to='/login'> <RaisedButton
        fullWidth
          style={styles}
          onTouchTap={this.handleTouchTap}
  // style={{backgroundColor:'transparent'}}
          label="log Out"
          secondary={false}
        /></ Link>

        
        </AppBar>
{this.props.children}

        <Drawer width={300} openSecondary={false} open={this.state.open} >
          <AppBar title="Dashboard" />

    <img src="http://www.wendia.com/wp-content/uploads/2015/07/purchase-guy.png" height='200' width='260' alt="invent"/>
    <br/>
    <br/>         <Link to='/dashboard/addproducts'> <RaisedButton
        fullWidth
          style={styles}
          onTouchTap={this.handleTouchTap}
       
          label="Add Products"
          primary={false}
        /></ Link><br /><br /><br />
        

        <Link to='/dashboard/createStore'> <RaisedButton
        fullWidth
          style={styles}
          onTouchTap={this.handleTouchTap}
       
          label="create store"
          primary={false}
        /></ Link><br /><br /><br />
        <Link to='/dashboard/addpurchaseDetail'> <RaisedButton
        fullWidth
          style={styles}
          onTouchTap={this.handleTouchTap}

          label="add purchase detail"
          primary={false}
        /></ Link><br /><br /><br />

 <Link to='/dashboard/sales'> <RaisedButton
        fullWidth
          style={styles}
          onTouchTap={this.handleTouchTap}
              
          label="sales "
          primary={false}
        /></ Link><br /><br /><br />
      <Link to='/dashboard/stock'> <RaisedButton
        fullWidth
          style={styles}
          onTouchTap={this.handleTouchTap}
              
          label="view purchase"
          primary={false}
        /></ Link><br /><br /><br />
  
 <Link to='/dashboard/viewSale'> <RaisedButton
        fullWidth
          style={styles}
          onTouchTap={this.handleTouchTap}
              
          label="view sale "
          primary={false}
        /></ Link><br /><br /><br />
  
<Link to='/dashboard/viewStock'> <RaisedButton
        fullWidth
          style={styles}
          onTouchTap={this.handleTouchTap}
              
          label="view Stock "
          primary={false}
        /></ Link><br /><br /><br />
 

        </Drawer>
      </div>


        </div>
    )
}


}//main