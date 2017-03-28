import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { store } from './store/store'
import App from './App';
import AddSaleDetails from './components/sales';
import Login from './components/login';
import Dashboard from './components/dashboard';
import AddProducts from './components/addproducts';
import CreateStore from './components/createStore';
import AddPurchaseDetails from './components/addPurchaseDetail';
import ViewStock from './components/stock'
import ViewSale from './components/viewSale'
import ViewStockDet from './components/viewStock'
//import Home from './components/home';
//import storeComponent from './components/createStore';
//import AddProduct fromAddPurchaseDetails './components/addProduct';
//import AddPurchaseDetails from './components/purchase';
//import AddSaleDetails from './components/sales';
//import ViewStockDetails from './components/viewStock';
//import ViewSalesDetails from './components/viewSales';
//import StockData from './components/stock';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

ReactDOM.render((
    <MuiThemeProvider>
        <Provider store={store}>
            <Router history={browserHistory}>
              <Route path='/' component ={Login}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/dashboard" component={Dashboard}>
                <Route path="addproducts" component={AddProducts}></Route>
                <Route path="createStore" component={CreateStore}></Route>
                <Route path="addPurchaseDetail" component={AddPurchaseDetails}></Route>
                <Route path="sales" component={AddSaleDetails}></Route>
                <Route path="stock" component={ViewStock}></Route>
                <Route path="viewSale" component={ViewSale}></Route>
                <Route path="viewStock" component={ViewStockDet}></Route>
                </Route>
                 <Route path="/App" component={App}></Route>
                {/*<Route path="/home" component={Home}>
                    <Route path="/create_store" component={storeComponent}></Route>
                    <Route path="/product" component={AddProduct}></Route>
                    <Route path="/purchase" component={AddPurchaseDetails}></Route>
                    <Route path="/sale" component={AddSaleDetails}></Route>
                    <Route path="/view_stock" component={ViewStockDetails}></Route>
                    <Route path="/view_sale" component={ViewSalesDetails}></Route>
                    <Route path="/view_stocks" component={StockData}></Route>
                </Route>

                <Route path="/" component={App}>*/}
                    
               
            </Router>
        </Provider>
    </MuiThemeProvider>
),
    document.getElementById('root')
);
