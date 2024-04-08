import React from "react";
import styles from './NotFoundBlock.module.scss';


export const NotFoundBlock = () => {

    return (
        <div className={styles.notFoundBlock}>
            <h1>Ничего не  найдено <span> 😕 </span></h1>
            <p>К сожалению данная страница отсутствует в интернет ресурсе</p>
        </div>
    )
}

export default NotFoundBlock;
