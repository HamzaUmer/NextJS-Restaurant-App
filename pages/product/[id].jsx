import styles from "../../styles/Product.module.css"
import Image from "next/image"
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/cartSlice";

const Product = ({briyani}) => {
    const [weigh, setWeigh] = useState(0);
    const [price, setPrice] = useState(briyani.prices[0]);
    const [extras, setextras] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();

    const changePrice = (num) => {
        setPrice(price + num);
    }

    const handleWeigh = (weighIndex) => {
       const diff  = briyani.prices[weighIndex] - briyani.prices[weigh];
       setWeigh(weighIndex);
       changePrice(diff);
    }

    const handleChange = (e, option) => {
        const checked = e.target.checked;

        if(checked){
            changePrice(option.price);
            setextras((prev) => [...prev, option]);
        }
        else {
            changePrice(-option.price);
            setextras(extras.filter((extra)=> extra._id !== option._id));
        }
    }

    const handleClick = () => {
          dispatch(addProduct({...briyani, extras, price, quantity}));
    }
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={briyani.img} alt="" layout= "fill" objectFit="contain"/>
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{briyani.title}</h1>
                <span className={styles.price}>Rs.{price}</span>
                <p className={styles.desc}>{briyani.desc}</p>
                <h3 className={styles.select}>Choose the Weight of Briyani</h3>
                <div className={styles.weight}>
                <div className={styles.weigh} onClick={()=> handleWeigh(0)}>
                    <Image src="/img/briyaniA.png" layout="fill" alt=""/>
                    <span className={styles.numbers}>0.5KG</span>
                    </div>
                    <div className={styles.weigh} onClick={()=> handleWeigh(1)}>
                    <Image src="/img/briyaniA.png" layout="fill" alt=""/>
                    <span className={styles.number}>1KG</span>
                    </div>
                    <div className={styles.weigh} onClick={()=> handleWeigh(2)}>
                    <Image src="/img/briyaniA.png" layout="fill" alt=""/>
                    <span className={styles.number}>2KG</span>
                    </div>
                </div>
                <h3 className={styles.select}>Choose additional items</h3>
                <div className={styles.items}>
                    {briyani.extraOptions.map((option)=> (
                                 <div className={styles.options} key={option._id}>
                                 <input 
                                 type = "checkbox" 
                                 id={option.text}
                                 name={option.text}
                                 className={styles.checkbox}
                                 onChange={(e)=> handleChange(e,option)}
                                 />
                                 <label htmlFor="raita">{option.text}</label> 
                              </div>           
                    ))}
                </div>
                <div className={styles.add}>
                    <input onChange={(e)=> setQuantity(e.target.value)} type="number" defaultValue={1} className={styles.quantity}/>
                    <button className={styles.button} onClick={handleClick}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async ({params}) => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/api/products/${params.id}`);
    return {
      props: {
        briyani: res.data,
      },
    }
  }


export default Product;
