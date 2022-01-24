import { useState } from "react"
import styles from "../styles/Add.module.css"
import axios from "axios"
import { useRouter } from "next/router"


const Add = ({setClose}) => {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [prices, setPrices] = useState([]);
    const [extraOptions, setExtraOptions] = useState([]);
    const [extra, setExtra] = useState(null);
    
    const changePrice = (e, index) => {
        const curPrices = prices;
        curPrices[index] = e.target.value;
        setPrices(curPrices);
    }

    const handleExtraInput = (e) => {
        setExtra({...extra, [e.target.name]: e.target.value });
    };

    const handleExtra = (e) => {
        setExtraOptions((prev)=>[...prev, extra]);
    };

    const handleCreate = async () => {
         const data = new FormData();
         data.append("file", file);
         data.append("upload_preset", "briyani");
         try {
           const uploadPic = await axios.post("https://api.cloudinary.com/v1_1/hmn/image/upload", data);
           
           const { url } = uploadPic.data;
           const newItem = {
               title,
               desc,
               prices,
               extraOptions,
               img:url
           };
           await axios.post("https://jsonplaceholder.typicode.com/api/products", newItem);
           setClose(true);
         } catch(err) {
             console.log(err)
         }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={()=>setClose(true)} className={styles.close}>X</span>
                <h1>Add New Item</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Choose an Image</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
                </div>
                <div className={styles.item}>
                    <label className={styles.desc}>Title</label>
                    <input 
                    className={styles.input}
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.desc}>Desc</label>
                    <textarea 
                    rows={4}
                    type="text"
                    onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Prices</label>
                    <div className={styles.priceContainer}>
                    <input
                    className={`${styles.input} ${styles.inputH}`}
                    type="number"
                    placeholder="0.5KG"
                    onChange={(e)=> changePrice(e, 0)}
                    />
                    <input
                    className={`${styles.input} ${styles.inputH}`}
                    type="number"
                    placeholder="1KG"
                    onChange={(e)=> changePrice(e, 1)}
                    />
                    <input
                    className={`${styles.input} ${styles.inputH}`}
                    type="number"
                    placeholder="2KG"
                    onChange={(e)=> changePrice(e, 2)}
                    />
                    </div>
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Extra</label>
                    <div className={styles.extra}>
                    <input
                    className={`${styles.input} ${styles.inputH}`}
                    type="text"
                    placeholder="item"
                    name="text"
                    onChange={handleExtraInput}
                    />
                    <input
                    className={`${styles.input} ${styles.inputH}`}
                    type="number"
                    placeholder="price"
                    name="price"
                    onChange={handleExtraInput}
                    />
                    <button className={styles.extraButton} onClick={handleExtra}>
                        Add
                    </button>
                    </div>
                    <div className={styles.extraItems}>
                        {extraOptions.map((option)=>(
                            <span key={option.text} className={styles.extraSub}>{option.text}</span>
                        ))}
                    </div>
                </div>
                <button className={styles.addButton} onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    )
}

export default Add
