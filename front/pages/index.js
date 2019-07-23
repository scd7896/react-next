import React from 'react';
import Link from 'next/link'


const Home = ()=>{
    return(
        <div>

            <Link href = '/about'><a>about</a></Link>
            <div>hellow next</div>
         
        </div>
    );
};

export default Home;