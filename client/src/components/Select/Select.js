const Select = ({ options = [], name, value, label, onChange, ...rest }) => (
  <>
    <label htmlFor={name}>{label}</label>

    <select id={name} name={name} value={value} onChange={onChange} {...rest}>
      {options?.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </>
);

export default Select;
