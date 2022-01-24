import styles from "../styles/BriyaniList.module.css"
import BriyaniCard from "./BriyaniCard"
const BriyaniList = ({briyaniList}) => {
    return (
        <div className={styles.container}>
           <h1 className={styles.title}>THE BEST BRIYANI IN TOWN</h1> 
           <p className={styles.desc}>Biryani is a spiced mix of meat and 
           rice, traditionally cooked over an open fire in a leather pot. 
           It is combined in different ways with a variety of components to 
           create a number of highly tasty and unique flavor combinations.</p>   
           <div className={styles.wrapper}>
               {briyaniList.map((briyani)=> (
                <BriyaniCard key={briyani._id} briyani={briyani}/>
               ))}
           </div>
        </div>
    )
}

export default BriyaniList
