import { Button } from "react-bootstrap";
import jsPDF from "jspdf";
import { Link } from "react-router-dom";
import React, { Fragment } from "react";

export default function OrderSuccess({ cartItems = [], user = {}, shippingInfo = {}, prices = {} }) {
    // Assuming prices object contains all the required prices: itemsPrice, shippingPrice, taxPrice, totalPrice
    const { itemsPrice, shippingPrice, taxPrice, totalPrice } = prices;

    const downloadReceipt = () => {
        const doc = new jsPDF();

        // Add order summary text
        doc.text("Order Receipt", 20, 20);
        doc.text(`Subtotal: ₹${itemsPrice}`, 20, 30);
        doc.text(`Shipping: ₹${shippingPrice}`, 20, 40);
        doc.text(`Tax: ₹${taxPrice}`, 20, 50);
        doc.text(`Total: ₹${totalPrice}`, 20, 60);

        // Add shipping info
        doc.text(`Name: ${user.name}`, 20, 70);
        doc.text(`Phone: ${shippingInfo.phoneNo}`, 20, 80);
        doc.text(
            `Address: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}`, 20, 90
        );

        // Add cart items
        cartItems.forEach((item, index) => {
            doc.text(`${index + 1}. ${item.name} - ${item.quantity} x ₹${item.price}`, 20, 100 + index * 10);
        });

        // Save the PDF
        doc.save("receipt.pdf");
    };

    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <img src="https://i.gifer.com/7efs.gif" alt="success animation" className="mx-auto" />
                        <p className="text-green-500 text-center mt-4">
                            Your Payment is successful. Thank you for your purchase.
                        </p>
                    </div>
                </div>
                <Link to="/orders">Go to Orders</Link>

                <div className="mt-4">
                    <Button onClick={downloadReceipt} variant="primary">
                        Download Receipt as PDF
                    </Button>
                </div>
            </div>
        </Fragment>
    );
}
