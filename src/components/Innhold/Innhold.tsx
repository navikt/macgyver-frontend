import React, { PropsWithChildren } from 'react'

import styles from './Innhold.module.css'

const Innhold = ({ children }: PropsWithChildren): JSX.Element => {
    return <div className={styles.innhold}>{children}</div>
}

export default Innhold
