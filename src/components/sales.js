import React, { Component } from 'react';
import  FirebaseConfigration  from '../firebase/firebaseConfig'
import  {CreateProduct}  from '../store/action/auth'
import {CreateStore} from '../store/action/auth'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar'; 
import RaisedButton from 'material-ui/RaisedButton';
    import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';


class AddSaleDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            unitPrice: '',
            quantity: '',
            date: '',
            storeData: [],
            productData: []
        }
        this.inputHandler = this.inputHandler.bind(this)
        this.dateHandler = this.dateHandler.bind(this)
        this.submit = this.submit.bind(this)
    }
    componentDidMount() {
        let storeArray = []
    FirebaseConfigration.ref.child('/store').on('child_added', (snapshot) => {
            storeArray.push(snapshot.val())
            console.log(storeArray);
            this.props.createStore(storeArray);
            console.log(this.props,"this.props");
            this.setState({ storeData: storeArray })
        })
        let productArray = []
        FirebaseConfigration.ref.child('/products').on('child_added', (snapshot) => {
            productArray.push({ value: snapshot.val(), id: snapshot.key })
            console.log('sfsfgsgfsg',productArray)
            this.props.createProduct(productArray)
            this.setState({ productData: productArray })
        })
    }

    dateHandler(e, date) {
        this.setState({
            date: new Date(),
        })
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submit(e) {
      //  const month=["Jan",'Feb','Mar',"April",'May','Jun','July','Aug','Sep','Oct','Nov','Dec'];
      //  const months = month[getmonth];
//        const getmonth = this.state.getMonth();

       // const timeconvention = this.state.date.getHours()>12 ? 'PM' : "AM"
        e.preventDefault()
        let newObj = {
            store: this.refs.store.value,
            product: JSON.parse(this.refs.product.value),//this.refs.product.value,
            quantity: parseInt(this.state.quantity),
            unitPrice: parseInt(this.state.unitPrice),
            date: this.state.date.getDate() + "/" + this.state.date.getMonth() + "/" + this.state.date.getFullYear()+'/'+ this.state.date.getHours()+'/'+ this.state.date.getMinutes()+'/'+this.state.date.getSeconds()

        }
        let refRoot = FirebaseConfigration.ref.child(`/products/${newObj.product.id}`).once('value', (snapshot) => {
            if (parseInt(snapshot.val().quantity) < newObj.quantity || parseInt(snapshot.val().unitPrice) < newObj.unitPrice) {
                alert("Your Prodect quantity/Price is less then Your input")
                return
            }
            else {
                let total = {
                    quantity: parseInt(snapshot.val().quantity) - newObj.quantity,
                    unitPrice: parseInt(snapshot.val().unitPrice) - newObj.unitPrice,
                    store: newObj.store
                }
               let refRoot = FirebaseConfigration.ref.child(`/products/${newObj.product.id}`).update(total);
            }
        })
        let purchaseObject = {
            store: newObj.store,
            product: newObj.product,
            quantity: newObj.quantity,
            unitPrice: newObj.unitPrice,
            product: newObj.product.value,
            //dec: newObj.product.value.dec,
            date: newObj.date
        }
        FirebaseConfigration.ref.child('/sales').push(purchaseObject)
            .then(() => {
                alert("Succsessfully created")
                this.context.router.push({
                    pathname: '/dashboard'
                })
            })
            .catch((error) => alert(error.message))
    }
    
render() {
    console.log('sssss',this.state.storeData)
        const center = {
            width: '50%',
            margin: '0 auto'
        }
        const style = {
            padding: '10px',
            textAlign: 'center'
        };
        return (
            <div>
                <div style={center}>
                    <br />
                    <br />
                    <AppBar
                        title="Add Sales Invoice"
                        showMenuIconButton={false} />
                    <Paper style={style} zDepth={3}>
                        <form onSubmit={this.submit}>
                           
                           
                         
                
                           
                            <TextField
                                hintText="Quantity"
                                name="quantity"
                                onChange={this.inputHandler}
                                required
                            /><br />
                            <DatePicker hintText="Sale Date"
                                onChange={this.dateHandler}
                            />
                            <TextField
                                hintText="Unit Rs"
                                name="unitPrice"
                                onChange={this.inputHandler}
                                required
                            /><br />
                            <select style={style}
                                required
                                ref="store">
                                {
                                    this.state.storeData.map((v, i) => {
                                        return (
                                            <option value={v.storename} key={i}> {v.storename} </option>
                                        )
                                    })}
                            </select>
                            <br />
                            <br />
                            <select style={style}
                                required
                                ref="product">
                                {
                                    this.state.productData.map((v, i) => {
                                        return (
                                            <option value={JSON.stringify(v)} key={i}> {v.value.productName} </option>
                                        )
                                    })}
                            </select>
                            <br />
                            <br />
                            <RaisedButton type="submit" label="Add" primary={true} />
                        </form>
                    </Paper>
                </div>
            </div>
        );
    }
}
AddSaleDetails.contextTypes = {
    router: React.PropTypes.object.isRequired
}
const mapStateToProps = (state) => { 
    return {
        mainReducer: state.MainReducer
    }
}
const mapDispatchToProps = (dispatch) => { 
    return {
        createStore: (data) => {
            dispatch(CreateStore(data))
        },
        createProduct: (data) => {
            dispatch(CreateProduct(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddSaleDetails);



