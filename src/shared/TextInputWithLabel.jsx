export const TextInputWithLabel = ({
  elementId,
  label,
  ref,
  onChange,
  value,
}) => {
  return (
    <>
      <label htmlFor={elementId}>{label}</label>
      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
      />
    </>
  );
};
