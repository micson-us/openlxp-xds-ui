import React from 'react';

import Header from '../../components/Header/Header'
import Navbar from '../../components/Navigation/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const layout = (props) => {

    return (
        <>
            <Header />
            <Navbar />
            <main>
                {props.children}
            </main>
            <Footer />
        </>
    )

}

export default layout;