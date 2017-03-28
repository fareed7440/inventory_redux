import React, { Component } from 'react';
import FirebaseConfigration  from '../firebase/firebaseConfig'
import { CreateStore, CreateProduct } from '../store/action/auth'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar'; 
import { ViewStocks } from '../store/action/auth'
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
class ViewStockDet extends Component {
    constructor(props) {
        super(props)
        this.state = { arr: [] }
    }
   
componentWillMount(){
    let StockArray=[];
    FirebaseConfigration.ref.child('/products').on('child_added',(snapshot)=>{
StockArray.push(snapshot.val())
this.props.viewStore(StockArray)
this.setState({
   arr:StockArray
   //arr:this.props.mainReducer:viewPurchase
})
    })
}


    render() {
        const center = {
            width: '50%',
            margin: '0 auto'
        }
        const style = {
            padding: '10px',
            height:'600',
            width:'700',
            textAlign: 'center'
        };
        return (
            <div>
                <div style={center}>
                    <br />
                    <br />
                   <center> <h2><label style={{color:'#03A9F4', margin:'auto'}}>VIEW STOCK</label></h2></center>
                    <Paper style={style} zDepth={3}>
                        
                        <Table>
                            <TableHeader displayRowCheckbox={false}>
                                <TableRow>
                                    <TableHeaderColumn>Product </TableHeaderColumn>
                                    <TableHeaderColumn>Quantity</TableHeaderColumn>
                                    <TableHeaderColumn>store</TableHeaderColumn>
                                    <TableHeaderColumn>company</TableHeaderColumn>
                                    <TableHeaderColumn>Unit Price</TableHeaderColumn>
                                    
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    this.state.arr.map((v, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableRowColumn> {i+1}</TableRowColumn>
                                                <TableRowColumn> {v.productName}</TableRowColumn>
                                                <TableRowColumn> {v.quantity}</TableRowColumn>
                                                <TableRowColumn> {v.store}</TableRowColumn>
                                                <TableRowColumn> {v.company}</TableRowColumn>
                                                <TableRowColumn> {v.unitPrice}</TableRowColumn>
                                                
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => { // mapStateToProps ye iska apna function he
    return {
        mainReducer: state.MainReducer
    }
}
const mapDispatchToProps = (dispatch) => { // mapDispatchToProps ye iska apna function he
    return {
        viewStore: (data) => {
            dispatch(ViewStocks(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewStockDet);
