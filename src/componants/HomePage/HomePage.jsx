import axios from "axios";
import { Header } from "../Header/Header";
import { useEffect, useState } from "react";
import { Product } from "./Product";
import "./homePage.css";
export function HomePage({ cart, getCartData }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsData = async () => {
      const response = await axios.get(`/api/products`);
      setProducts(response.data);
    };
    getProductsData();
  }, []);

  return (
    <>
      <Header cart={cart} />
      <div className="home-page">
        <div className="products-grid">
          {products.map((product) => {
            return (
              <Product
                key={product.id}
                getCartData={getCartData}
                product={product}
              />
            );
          })}
        </div>
      </div>
      <p className="conact-me">
        By{" "}
        <a href="mailto:firassrachid2000@gmail.com" target="_blank">
          Firass Rachid
        </a>
        {" _ "}
        <a
          href="https://api.whatsapp.com/send?phone=963937898507"
          target="_blank"
        >
          whatsapp
        </a>
      </p>
    </>
  );
}
