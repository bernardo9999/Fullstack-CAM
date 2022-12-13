import FormField from "./FormField";

const BillingDetailsFields = () => {
  return (
    <>
      <FormField name="name" label="Nome" type="text" required />
      <FormField name="email" label="Email" type="email" required />
      <FormField name="address" label="Endereço" type="text" required />
      <FormField name="city" label="Cidade" type="text" required />
      <FormField name="state" label="Estado" type="text" required />
      <FormField name="zip" label="CEP" type="text" required />
    </>
  );
};

export default BillingDetailsFields;
