import styles  from "../styles/Navbar.module.css"
import Image from "next/image"
import Link from "next/link";
import { useSelector } from "react-redux";
const Navbar = () => {
    const quantity = useSelector((state) => state.cart.quantity);
    return (
        <div className={styles.container}>
        <div className={styles.item}>
            <div className={styles.phoneButton}>
            <Image src="/img/telephone.png" alt="" width = "32px" height="32px"/>
            </div>
            <div className={styles.texts}>
                <div className={styles.text}>ORDER NOW!</div>
                <div className={styles.text}>0900 78601</div>
            </div>
        </div>
        <div className={styles.item}>
            <ul className={styles.list}>
                <Link href="/" passHref><li className={styles.listItem}>Home</li></Link>
                <li className={styles.listItem}>Items</li>
                <li className={styles.listItem}>Menu</li>
                <Link href={`/`} passHref><div className={styles.logo}>AL-REHMAN</div></Link>
                <li className={styles.listItem}>Events</li>
                <li className={styles.listItem}>Blog</li>
                <li className={styles.listItem}>Contact</li>
            </ul>
        </div>
        <Link href="/cart" passHref>
        <div className={styles.item}>
            <div className={styles.cart}>
            <Image src="/img/cart.png" alt="" width = "30px" height="30px"/>
            <div className={styles.counter}>{quantity}</div>
            </div>
        </div>
        </Link>
        </div>
    )
}

export default Navbar
