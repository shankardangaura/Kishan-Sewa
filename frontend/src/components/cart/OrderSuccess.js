import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

const OrderSuccess = () => {
    return (
        <Fragment>

            <MetaData title={'Order Success'} />

            <div className="row justify-content-center">
         

                
                <div className="col-6 mt-5 text-center">
                    <img className="my-5 img-fluid d-block mx-auto" src="./images/Orderscss.gif" alt="Order Success" width="160" height="100" />
                    <img className="my-5 img-fluid d-block mx-auto" src="./images/Ordersc.gif" alt="Order Success" width="150" height="200" />
                    <h2>Your Order has been placed successfully.</h2>

                    <Link to="/orders/me">Go to My Orders</Link>
                </div>

            </div>

        </Fragment>
    )
}

export default OrderSuccess
