import React from "react";
import styles from './Search.module.scss';


const Search = ({searchValue, setSearchValue}) => {
    return (
        <div className={styles.root} >
            <svg className={styles.iconSearch} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width='24px'>
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/>
            </svg>
            <input
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                className={styles.input}
                placeholder='Поиск пиццы...'
            />
            {
                searchValue && (
                <svg
                    onClick={() => setSearchValue('')}
                    className={styles.iconClose}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512">
                    <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z"/>
                </svg> )
            }

        </div>
    )
}

export default Search;
