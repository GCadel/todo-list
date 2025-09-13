export const TextInputWithLabel = ({
  elementId,
  label,
  ref,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <label htmlFor={elementId} className="text-label">
      <span>{label}</span>

      <input
        type="text"
        id={elementId}
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
};
