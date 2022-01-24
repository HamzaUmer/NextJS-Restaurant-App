import axios from "axios";
import styles  from "../../styles/Admin.module.css";
import Image from "next/image";
import { useState } from "react";

const Index = ({orders, products}) => {
    const [productList, setProductList] = useState(products);
    const [orderList, setOrderList] = useState(orders);
    const status = ["Preparing", "On the way", "Delivered"];

    const handleDelete = async (id) => {
        try {
          const res = await axios.delete("https://jsonplaceholder.typicode.com/api/products/" + id);
          setProductList(productList.filter((product) => product._id !== id))
        } catch(err) {
            console.log(err)
        }
    }

    const handleStatus = async (id) => {
        const items = orderList.filter(order => order._id===id)[0];
        const curStatus = items.status;
        try{
            const res = await axios.put("https://jsonplaceholder.typicode.com/api/orders/"+ id, {status: curStatus+1});
            setOrderList([
                res.data,
                ...orderList.filter((order)=> order._id !== id),
            ])
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {productList.map((product) => (
                    <tbody key={product._id}>
                        <tr className={styles.trTitle}>
                            <td>
                           <Image src={product.img} width={50} height={50} objectFit="cover" alt=""/>
                            </td>
                            <td>{product._id.slice(0,5)}...</td>
                            <td>{product.title}</td>
                            <td>Rs.{product.prices[0]}</td>
                            <td>
                                <button className={styles.button}>Edit</button>
                                <button className={styles.button} onClick={()=> handleDelete(product._id)}>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                    ))}
                </table>
            </div>
            <div className={styles.item}>
            <h1 className={styles.title}>Orders</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {orderList.map((order)=> (
                    <tbody key={order._id}>
                        <tr className={styles.trTitle}>
                            <td>{order._id.slice(0,5)}...</td>
                            <td>{order.customer}</td>
                            <td>Rs.{order.total}</td>
                            <td>{order.method === 0 ? (<span>Cash</span>): (<span>Paid</span>)}</td>
                            <td>{status[order.status]}</td>
                            <td>
                                <button className={styles.button1} onClick={()=>handleStatus(order._id)}>Next Stage</button>
                            </td>
                        </tr>
                    </tbody>
                    ))}
                </table>
                </div>         
        </div>
    );
};
export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

    if (myCookie.token !== process.env.TOKEN){
        return{
            redirect: {
                destination:"/admin/login",
                permanent: false,
            },
        };
    }
    const productRes = await axios.get("https://jsonplaceholder.typicode.com/api/products");
    const orderRes = await axios.get("https://jsonplaceholder.typicode.com/api/orders");
     return {
         props:{
             orders: orderRes.data,
             products: productRes.data,
         },
     };
};


export default Index;
