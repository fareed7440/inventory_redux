    import React,{Component} from 'react'
    import FirebaseConfigration from '../firebase/firebaseConfig'
    import AutoComplete from 'material-ui/AutoComplete';
    import TextField from 'material-ui/TextField'
    import RaisedButton from 'material-ui/RaisedButton';
    import { connect } from 'react-redux'
    import { CreateStore, CreateProduct } from '../store/action/auth'
    import AppBar from 'material-ui/AppBar'; 
    import * as firebase from 'firebase'
    import Paper from 'material-ui/Paper';
       

    const fruit = [
    'Apple', 'Apricot', 'Avocado',
    'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry',
    'Boysenberry', 'Blood Orange',
    'Cantaloupe', 'Currant', 'Cherry', 'Cherimoya', 'Cloudberry',
    'Coconut', 'Cranberry', 'Clementine',
    'Damson', 'Date', 'Dragonfruit', 'Durian',
    'Elderberry',
    'Feijoa', 'Fig',
    'Goji berry', 'Gooseberry', 'Grape', 'Grapefruit', 'Guava',
    'Honeydew', 'Huckleberry',
    'Jabouticaba', 'Jackfruit', 'Jambul', 'Jujube', 'Juniper berry',
    'Kiwi fruit', 'Kumquat',
    'Lemon', 'Lime', 'Loquat', 'Lychee',
    'Nectarine',
    'Mango', 'Marion berry', 'Melon', 'Miracle fruit', 'Mulberry', 'Mandarine',
    'Olive', 'Orange',
    'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Physalis', 'Plum', 'Pineapple',
    'Pumpkin', 'Pomegranate', 'Pomelo', 'Purple Mangosteen',
    'Quince',
    'Raspberry', 'Raisin', 'Rambutan', 'Redcurrant',
    'Salal berry', 'Satsuma', 'Star fruit', 'Strawberry', 'Squash', 'Salmonberry',
    'Tamarillo', 'Tamarind', 'Tomato', 'Tangerine',
    'Ugli fruit',
    'Watermelon',
    ];

    class AddProducts extends Component{
        constructor(props){
            super(props);
            this.state={
            productName:'',
                company:'',
                quantity:'',
               unitPrice:'',
                description:'',
                storeData:[]
            }
    this.inputHandler=this.inputHandler.bind(this);
    this.submit=this.submit.bind(this);
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
        }

    inputHandler(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }


    

    submit(e){
        e.preventDefault()
        let obj={
    store:this.refs.store.value,
   //product: JSON.parse(this.refs.product.value),
    unitPrice:parseInt(this.state.unitPrice),
    quantity:parseInt(this.state.quantity),
    company:this.state.company,
    description:this.state.description,
       productName:this.state.productName
}

        console.log('11111',this.state)
        console.log("-----------------",FirebaseConfigration)
        // let refUser = firebase.database().ref().child('/products').push(this.state);
    let refRoot = FirebaseConfigration.ref.child('/products').push(obj);
    refRoot.then(()=>{
        alert('successfuly submit')
        this.context.router.push({
            pathname:'/dashboard'
        })
    })
    .catch((error)=>{
        alert(error.message)
    })
    }

    

    render(){

        const style1 = {
          //  padding: '10px',
           margin:'40', 
            textAlign: 'center',
            width:'600',
            height:'550'
        };
 

        const center = {
                width: '50%',
                margin: '40 auto'
            }
            const style = {
                padding: '10px',
                textAlign: 'center'
            };
        
        return(
            <div>
                <center>

<Paper style={style1} zDepth={3}>
               <AppBar
               
                        title="ADD PRODUCTS"
                        showMenuIconButton={false} />

        <form onSubmit={this.submit}>
    <TextField
                                   hintText="Product"
                                    name="productName"
                                    onChange={this.inputHandler}
                                    required
                                /><br /><br />



        <TextField
                                    hintText="Company"
                                    name="company"
                                    onChange={this.inputHandler}
                                    required
                                /><br /><br />


     <TextField
                                hintText="Quantity"
                                name="quantity"
                                type='number'
                                onChange={this.inputHandler}
                                required
                            /><br /><br />
    <TextField
                                 hintText="Unit Price"
                                    name="unitPrice"
                                    onChange={this.inputHandler}
                                    required
                                /><br /><br />
    <TextField
                                    hintText='Description'
                                    name="description"
                                    onChange={this.inputHandler}
                                    required
                                /><br /><br />

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
                          

                                
                                <RaisedButton type="submit" label="Add" primary={true} />
    </form>
    </Paper>
    </center>
            </div>
        )
    }

    }//main

    AddProducts.contextTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(AddProducts);

