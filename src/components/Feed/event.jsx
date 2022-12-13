/* eslint-disable @next/next/no-img-element */

import ButtonCheckout from "../Checkout/ButtonCheckout";
import { ModalEvent } from "./modalEvent";
import styles from "./styles/Feed.module.css";
import { useState } from "react";

export const FeedEvent = ({
  id,
  name,
  description,
  date,
  local,
  image,
  data,
  price,
  quantity,
}) => {
  const [show, setShow] = useState(false);
  const event = {
    id,
    name,
    description,
    date,
    local,
    image,
    data,
    price,
    quantity,
  };

  return (
    <div className={styles.container}>
      <img
        src={image}
        alt={name}
        className={styles.container__photo}
        style={{
          borderRadius: "50%",
          border: "1px solid var(--rosaEscuro)",
          height: "85px",
          width: "85px",
          cursor: "pointer",
          objectFit: "contain",
          objectPosition: "center",
        }}
        onClick={() => setShow(true)}
      />

      <span className={styles.container__name}>{name}</span>
      <ButtonCheckout
        className={styles.buyButton}
        data={data}
        id={id}
        name={name}
        description={description}
        date={date}
        local={local}
        image={image}
        price={price}
        quantity={quantity}
      />
      {show && (
        <div
          style={{
            position: "absolute",
          }}
        >
          <ModalEvent show={show} setShow={setShow} event={event} />
        </div>
      )}
    </div>
  );
};
