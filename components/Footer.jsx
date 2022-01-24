import Image from "next/image"
import styles from "../styles/Footer.module.css"
const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
             <Image src="/img/bg.jpg" layout="fill" alt=""/>
            </div>
            <div className={styles.item}>
                <div className={styles.card}>
                    <h2 className={styles.slogan}>
                    YESSS, HAR DAAWAT KI SHAAN, BRIYANI!!!
                    </h2>
                </div>
                <div className={styles.card}>
                <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
                    <p className={styles.text}>
                    Katrak Mansions, Machhi Miani Rd.
                        <br />  Karachi City, Sindh 74000
                        <br /> +923442345986
                    </p>
                    <p className={styles.text}>
                        Saddar, Main Bazaar.
                        <br />  Karachi City, Sindh 74000
                        <br /> +923442345987
                    </p>
                    <p className={styles.text}>
                        Azizabad Block 9 Near Malik Sweet.
                        <br /> Karachi City, Sindh 74000
                        <br /> +923442345988
                    </p>
                    <p className={styles.text}>
                        malir Cantt Station.
                        <br /> Karachi City, Sindh 74000
                        <br /> +923442345989
                    </p>
                </div>
                <div className={styles.card}>
                <h1 className={styles.title}>WORKING HOURS</h1>
                    <p className={styles.text}>
                        MONDAY To FRIDAY
                        <br /> 11:00 A.M - 10:00 P.M
                    </p>
                    <p className={styles.text}>
                        SATURDAY - SUNDAY
                        <br /> 12:00 P.M - 9:00 P.M
                    </p>
                </div>
                </div>
        </div>
    )
}

export default Footer
