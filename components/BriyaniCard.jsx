import styles from "../styles/BriyaniCard.module.css"
import Image from "next/image"
import Link from "next/link";

const BriyaniCard = ({briyani}) => {
    return (
        <div className={styles.container}>
          <Link href={`/product/${briyani._id}`} passHref>
          <Image src={briyani.img} alt="" width="500" height="500"/>
          </Link>
            <h1 className={styles.title}>{briyani.title}</h1>
      <span className={styles.price}>Rs.{briyani.prices[0]}</span>
      <p className={styles.desc}>
        {briyani.desc}
      </p>
        </div>
    )
}

export default BriyaniCard
