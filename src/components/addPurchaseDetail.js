import React, { Component } from 'react';
import FirebaseConfigration from '../firebase/firebaseConfig'
import { CreateStore, CreateProduct } from '../store/action/auth'
import { connect } from 'react-redux'
//import * as mat from 'material-ui';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import * as firebase from 'firebase'


class AddPurchaseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            unitPrice: '',
            quantity: '',
            storeData: [],
            productData: []
        }
        this.inputHandler = this.inputHandler.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentDidMount() {
        let storeArray = []
        FirebaseConfigration.ref.child('/store').on('child_added', (snapshot) => {
            storeArray.push(snapshot.val())
            console.log(storeArray);
            this.props.createStore(storeArray);
            console.log(this.props, "this.props");
            this.setState({ storeData: storeArray })
        })
        let productArray = []
        FirebaseConfigration.ref.child('/products').on('child_added', (snapshot) => {
            productArray.push({ value: snapshot.val(), id: snapshot.key })
            console.log('sfsfgsgfsg', productArray)
            this.props.createProduct(productArray)
            this.setState({ productData: productArray })
        })
    }
    inputHandler(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    submit(e) {
        e.preventDefault()
        let obj = {
            store: this.refs.store.value,
            product: JSON.parse(this.refs.product.value),
            unitPrice: parseInt(this.state.unitPrice),
            quantity: parseInt(this.state.quantity)
        }
        let refRoot = FirebaseConfigration.ref.child(`/products/${obj.product.id}`).once('value', (snapshot) => {
            let total = {
                quantity: parseInt(snapshot.val().quantity) + obj.quantity,
                unitPrice: parseInt(snapshot.val().unitPrice) + obj.unitPrice,
                store: obj.store
            }
            let refRoot = FirebaseConfigration.ref.child(`/products/${obj.product.id}`).update(total);
        })
        let purchaseObj = {
            store: obj.store,
            product: obj.product,
            quantity: obj.quantity,
            unitPrice: obj.unitPrice,
            product: obj.product.value,
            //dec: obj.product.value.dec
        }
        FirebaseConfigration.ref.child('/purchase').push(purchaseObj)
            .then(() => {
                alert("Succsessfully created")
                this.context.router.push({
                    pathname: '/dashboard'
                })
            })
            .catch((error) => alert(error.message))
    }

    render() {
       // console.log("222", this.state.storeData)
        { console.log('aghazzz', this.state.storeData) }
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
                        title="Add Purchase Details"
                        showMenuIconButton={false} />
                    <Paper style={style} zDepth={3}>
                        <form onSubmit={this.submit}>
                            <TextField
                                hintText="Quantity"
                                name="quantity"

                                onChange={this.inputHandler}
                                required
                            /><br />

                            <TextField
                                hintText="Unit Rs"
                                type='number'
                                name="unitPrice"
                                onChange={this.inputHandler}

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
                                        console.log("1111", this.state.productData)

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
}//main
AddPurchaseDetails.contextTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(AddPurchaseDetails);

