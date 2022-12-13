import CheckoutForm from "./CheckoutForm";
import { useState } from "react";

export default function ButtonCheckout({
  price,
  className,
  name,
  handleCoingate,
  image,
  data,
  id,
}) {
  const [isBuying, setIsBuying] = useState(false);
  return isBuying ? (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        zIndex: "1",
      }}
    >
      <CheckoutForm
        price={price}
        name={name}
        setIsBuying={setIsBuying}
        handleCoingate={handleCoingate}
        photo={image}
        data={data}
        id={id}
      />
    </div>
  ) : (
    <div>
      <button
        className={className}
        onClick={() => {
          setIsBuying(true);
        }}
        style={{
          backgroundColor: "var(--azul)",
        }}
      >
        R${price}
      </button>
    </div>
  );
}
