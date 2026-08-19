const Input = ({
  type,
  name,
  value,
  label,
  placeholder,
  onChange,
  ...rest
}) => (
  <>
    <label htmlFor={name}>{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </>
);

export default Input;
