import { useState } from "react"
import styles from "./Task.module.css"

import {FiTrash2} from "react-icons/fi"
interface TaskType{
    id: string
    title: string,
    isDone: boolean,
    deleteItem: any,
    checkItem:any
}

export function Task({id, title, isDone=false, deleteItem, checkItem}: TaskType){

    return(

        <div className={styles.listContainer}>
            <div className={styles.checkboxContainer}>
                <input className={styles.inputCheckBox} type="checkbox" checked={isDone} onChange={() => checkItem(!isDone, id)} />
            </div>
            <p className={styles.content}>
                {title}
            </p>
            <div style={{cursor: "pointer"}} onClick={() => deleteItem(id)}>
                <FiTrash2 color="#808080"/>
            </div>

        </div>
    )

}