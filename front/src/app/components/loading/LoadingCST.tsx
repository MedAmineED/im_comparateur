"use client";
import React, { FC } from 'react'
import styles from './Loading.module.css'

const LoadingCST : FC = () => {
  return (
    <div className={styles.loadingContainer}>

    <div className={styles.bar}>
    <div className={styles.circle}></div>
    <p className={styles.loadingText}>Loading</p>
    </div>
    </div>
  )
}

export default LoadingCST
