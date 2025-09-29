import styled from 'styled-components';

const StyledInput = styled.input`
  display: block;
  width: 100%;
  height: 100%;
  padding-left: var(--padding-sm);
  min-height: 40px;
`;

const StyledSpan = styled.span`
  display: none;
`;

export const TextInputWithLabel = ({
  elementId,
  label,
  ref,
  onChange,
  value,
  placeholder,
}) => {
  return (
    <label className="text-label" htmlFor={elementId}>
      <StyledSpan>{label}</StyledSpan>
      <StyledInput
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
