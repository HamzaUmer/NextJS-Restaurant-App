import { useState } from "react";
import styles from "../styles/OrderInfo.module.css";

const OrderInfo = ({total, createOrder}) => {
    const [customer,setCustomer] = useState("");
    const [address,setAddress] = useState("");
    const handleClick = () => {
        createOrder({customer, address, total, method: 0})
      };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>You will pay Rs.{total} after delivery.</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Name Surname</label>
                    <input placeholder="Mirza Hamza Umer" type="text" className={styles.input} onChange={(e)=> setCustomer(e.target.value)}/>
                </div>
                <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+923442300123"
            className={styles.input}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <textarea
            rows={5}
            placeholder="Saddar Town, Karachi"
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleClick}>
          Order
        </button>
      </div>
    </div>
    )
}

export default OrderInfo
