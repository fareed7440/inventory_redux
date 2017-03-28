import React, { Component } from 'react';
import FirebaseConfigration  from '../firebase/firebaseConfig'
import { CreateStore, CreateProduct } from '../store/action/auth'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar'; 
import DatePicker from 'material-ui/DatePicker';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';

class ViewSale extends Component{
    constructor(props) {
        super(props)
        this.state = {
            productData: []
            
        }
    }

  handleRequiredTypeChange = (event, index, value) => { this.setState({ availabilityRequired: value }); console.log(value) };

    testtype(availability) {
        if (availability >= this.state.timeDelay.getTime() && this.state.timeDelayEnd.getTime() >= availability) {
            return true;
        } else {
            return false;
        }
    }

    handleDateChange = (event, date) => {
        this.setState({
            timeDelay: date,
        });
        console.log(date);
    };

    handleDateEndChange = (event, date) => {
        date.setHours("23");
        date.setMinutes("59");
        this.setState({
            timeDelayEnd: date,
        });
        console.log(date);
    }; 
    componentWillMount() {
        let productArray = []
        FirebaseConfigration.ref.child('/sales').on('child_added', (snapshot) => {
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
           // padding: '10px',
            textAlign: 'center',
            width:'900',
            height:'600'
        };
        return(
  <div>
                <div style={center}>
                    <br />
                    <br />

  <DatePicker
                        ref="salesDate"
                        hintText="Start Date"
                        className="full-width-container"
                        floatingLabelText="Start Date"
                        value={this.state.timeDelay}
                        onChange={this.handleDateChange}
                        />
                    <DatePicker
                        ref="endDate"
                        hintText="End Date"
                        className="full-width-container"
                        floatingLabelText="End Date"
                        value={this.state.timeDelayEnd}
                        onChange={this.handleDateEndChange}
                        />

                    <center> <h2><label style={{color:'Light Blue', margin:'auto'}}>VIEW SALE</label></h2></center>
                    <Paper style={style} zDepth={3}>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    
                                    <TableHeaderColumn>Date</TableHeaderColumn>
                                    <TableHeaderColumn>Product</TableHeaderColumn>
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
                                                <TableRowColumn> {v.date}</TableRowColumn>
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewSale);

