import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./BLL/store";
import {ProductType} from "./DAL/JsonApi";
import {fetchProductsTC} from "./BLL/ProductsReducer";
import {MainPage} from "./UI/Components/MainPage/MainPage";
import styled from "styled-components";

import {ButtonComponent} from "./UI/Components/ButtonComponent/ButtonComponent";
import {fetchReasonsTC} from "./BLL/ReasonsReducer";
import {Navigate, NavLink, Route, Routes} from "react-router-dom";
import {HistoryComponent} from "./UI/Components/HistoryComponent/HistoryComponent";

export let productsDetailContext = React.createContext<Array<ProductType>>([]);

// npx json-server --watch data/db.json --port 8000
function App() {
    const products = useSelector<AppRootStateType, Array<ProductType>>(state => state.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchProductsTC())
        dispatch(fetchReasonsTC())
    }, [dispatch])

    return (
        <div>
            <Header style={{textDecoration: "none", color: "white"}}>
                <NavLink style={{textDecoration: "none", color: "black", marginRight: "30px"}} to={"/"}>Home</NavLink>
                <NavLink style={{textDecoration: "none", color: "black"}} to={"/history/"}>History</NavLink>
            </Header>
            <Routes>
                <Route path={"/"} element={
                    <productsDetailContext.Provider value={products}>
                        <MainPage/>
                    </productsDetailContext.Provider>}/>
                <Route path={"/history/"} element={<HistoryComponent/>}/>
                <Route path="404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                <Route path="*" element={<Navigate to='/404'/>}/>
            </Routes>
        </div>
    );
}

const Header = styled.div`
  background-color: aquamarine;
  height: 15vh;
`

export default App;
