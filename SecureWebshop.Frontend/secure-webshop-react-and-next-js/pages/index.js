import axios from "axios";
import { useState, useEffect } from "react";
import ProductList from "../components/products/product-list/ProductList";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { getProducts } from "../utils/product-services";

const TEMP_PRODUCTS = [
  {
    id: "S54645SEF-4FSE56FS-46SF9G49SDR",
    name: "Klassiske Danske Jordbær",
    price: 54,
    thumbnail: "https://cdn.pixabay.com/photo/2016/04/15/08/04/strawberry-1330459_960_720.jpg",
    rating: 4.4,
    totalReviews: 37
  },
  {
    id: "S54SEF-4FS2342346FS-46SF9G49SDR",
    name: "Højkvalitet Kaffebønner fra Mt. Fuji",
    price: 195,
    thumbnail: "https://cdn.pixabay.com/photo/2021/09/17/12/12/coffee-6632524_960_720.jpg",
    rating: 3.2,
    totalReviews: 21
  },
  {
    id: "S5464GFSD5SEF-4FSE56FS-46SF9SDR",
    name: "Dr. Iwani Pære-Banan Yoghurt",
    price: 25,
    thumbnail: "https://cdn.pixabay.com/photo/2016/06/07/17/15/yogurt-1442034_960_720.jpg",
    rating: 5,
    totalReviews: 1
  },
  {
    id: "S54645FSEFSEF-4FS56FS-46SF9SDR",
    name: "Triple-krydret Olivenolie",
    price: 142,
    thumbnail: "https://cdn.pixabay.com/photo/2015/10/02/15/59/olive-oil-968657_960_720.jpg",
    rating: 1.1,
    totalReviews: 1000
  },
];

export default function HomePage() {

  const [ products, setProducts ] = useState([]);

  useEffect(() => {
    getProducts()
      .then(response => setProducts(response.data))
      .catch(function(error) {
        setProducts(null);
      });
  }, []);

  console.log(products);

  if (products === null) return <p className="center">Kunne ikke hente produkter ned...</p>
  if (products.length === 0) return <LoadingSpinner />

  return (
    <section>
      <ProductList products={products}/>
    </section>
  )
}