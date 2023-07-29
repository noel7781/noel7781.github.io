import React from 'react';
import Layout from '@theme/Layout';
import styles from './index.module.css';

const Books = () => {
    return (
        <div>
            <Layout
                title={'독서기록'}
            >
                <main className={styles.root}>
                    <div className={styles.container}>
                        <h1>독서기록 📚</h1>
                    </div>
                </main>
            </Layout>
        </div>
    );
};

export default Books;