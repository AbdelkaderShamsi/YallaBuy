import React from "react";
import { Container } from "react-bootstrap";
import "../index.css";

function ReturnPolicy() {
  return (
    <Container className="py-4">
      <article className="terms-article">
        <h1 className="mb-4 text-center">Refund Policy</h1>

        <section className="mb-4">
          <p>
            Our policy is valid for a period of 4 calendar days from the date of
            the purchase. If you receive your order and are not satisfied for
            any reason, you can return the product for a refund. If the period
            of 4 days has lapsed since the purchase, we can’t, unfortunately,
            offer you a refund.
          </p>
        </section>

        <section className="mb-4">
          <h4>Refund Requirements</h4>
          <p>
            <p>- Product is defective </p>
            <p>- Product is not as described </p>
            <p>- Product must be unopened </p>
            <p>- Product must be in original packaging </p>
            <p>- Product must be unused </p>
            <p>- Product must not be damaged </p>
            <p>
              - In order to ensure the above criteria have been met, all returns
              will be inspected. If the product does not meet the listed
              criteria, we reserve the right not to issue a refund. Perishable
              goods are completely exempt from being returned.
            </p>
          </p>
        </section>

        <section className="mb-4">
          <h4>Proof of Purchase</h4>
          <p>
            To complete your refund, we require a receipt, purchase order, or
            other proof of purchase. Please note that without the aforementioned
            proof of purchase, we will not issue a refund.
          </p>
        </section>

        <section className="mb-4">
          <h4>Sale and Clearance Items</h4>
          <p>
            Visit any of our retail locations to return the items you purchased
            through our online store. Our staff member will process your return
            or exchange for you. You must take care to ensure that the goods are
            properly packaged so that they will not be damaged while in transit.
            If the product is found damaged or used beyond what it takes for us
            to inspect it reasonably, then we may reject a refund.
          </p>
        </section>

        <section className="mb-4">
          <h4>Shipped Products</h4>
          <p>
            Please visit any of our retail stores to return the products you
            purchased from our online store. Our staff will return or replace
            your relevant products. You must ensure that the goods have been
            properly packaged so that they are not damaged during transport. If
            the product reaches us damaged or used beyond what is necessary for
            us to examine it reasonably, we may refuse to return it.
          </p>
        </section>

        <section className="mb-4">
          <h4>Contacting Us</h4>
          <p>
            If you would like to contact us to understand more about this
            Agreement or wish to contact us concerning any matter relating to
            it, you may do so via the contact form. This document was last
            updated on September 01, 2025 YallaBuy
          </p>
        </section>
      </article>
    </Container>
  );
}

export default ReturnPolicy;
