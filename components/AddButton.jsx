import styles from "../styles/AddButton.module.css"

const AddButton = ({setClose}) => {
    return (
        <div onClick={()=> setClose(false)} className={styles.main}>
            Add New Item
        </div>
    )
}

export default AddButton
