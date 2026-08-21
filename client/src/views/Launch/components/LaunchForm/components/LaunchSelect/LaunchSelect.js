const LaunchSelect = ({
  options = [],
  name,
  value,
  label,
  onChange,
  ...rest
}) => (
  <>
    <label htmlFor={name}>{label}</label>

    <select id={name} name={name} value={value} onChange={onChange} {...rest}>
      {options?.map((option) => (
        <option value={option.kepler_name} key={option.kepid}>
          {option.kepler_name}
        </option>
      ))}
    </select>
  </>
);

export default LaunchSelect;
