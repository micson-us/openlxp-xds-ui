import React from 'react';

import Navbar from '../../components/Navigation/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';

const layout = (props) => {

    return (
        <>
            <Navbar />
            <main>
                {props.children}
            </main>
            <Footer />
        </>
    )

}

export default layout;