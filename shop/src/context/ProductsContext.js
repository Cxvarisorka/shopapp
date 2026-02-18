import { createContext, useContext, useEffect, useState } from "react";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

const API_URL = 'http://192.168.100.3:3000/api';

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/products`)
            .then((res) => res.json())
            .then((data) => setProducts(data));
    }, []);

    return (
        <ProductsContext.Provider value={{products}}>
            {children}
        </ProductsContext.Provider>
    )
}