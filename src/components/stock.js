import React, { Component } from 'react';
import FirebaseConfigration  from '../firebase/firebaseConfig'
import { CreateStore, CreateProduct } from '../store/action/auth'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar'; 
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

class ViewStock extends Component{
    constructor(props) {
        super(props)
        this.state = {
            productData: []
        }
    }
    componentWillMount() {
        let productArray = []
        FirebaseConfigration.ref.child('/purchase').on('child_added', (snapshot) => {
            productArray.push(snapshot.val())
            this.props.createProduct(productArray)
            this.setState({ productData: productArray })
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
            width:'600',
            height:'600'
        };
        return(
  <div>
                <div style={center}>
                    <br />
                    <br />
                    <center> <h2><label style={{color:'Light Blue', margin:'auto'}}>VIEW PURCHASE</label></h2></center>
                    <Paper style={style} zDepth={3}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHeaderColumn>product</TableHeaderColumn>
                                    <TableHeaderColumn>Quantity</TableHeaderColumn>
                                    <TableHeaderColumn>Store</TableHeaderColumn>
                                    <TableHeaderColumn>Unit Price</TableHeaderColumn>
                                   
                                </TableRow>
                            </TableHeader>
                            <TableBody displayRowCheckbox={false}>
                                {
                                    this.state.productData.map((v, i) => {
                                        return (
                                            <TableRow key={i}>
                                                <TableRowColumn> {i+1}</TableRowColumn>
                                                <TableRowColumn> {v.product.productName}</TableRowColumn>
                                                <TableRowColumn> {v.quantity}</TableRowColumn>
                                                <TableRowColumn> {v.store}</TableRowColumn>
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
        
}//main


const mapStateToProps = (state) => { // mapStateToProps ye iska apna function he
    return {
        stockReducer: state.MainReducer
    }
}
const mapDispatchToProps = (dispatch) => { // mapDispatchToProps ye iska apna function he
    return {
        createStore: (data) => {
            dispatch(CreateStore(data))
        },
        createProduct: (data) => {
            dispatch(CreateProduct(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ViewStock);

