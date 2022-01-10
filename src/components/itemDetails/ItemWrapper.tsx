import React from 'react'

interface IProps {
  id?: string
  label?: React.ReactNode
  additionalLabel?: React.ReactNode
  type: 'input' | 'input large' | 'input number' | 'textarea'
  subtitle?: React.ReactNode
  value: string | number | readonly string[] | undefined
  onChange: (value: string | number | undefined) => void
  placeholder?: string
  allowsMin?: number
}

const ItemWrapper = ({
  id,
  label,
  additionalLabel,
  type,
  subtitle,
  value,
  onChange,
  placeholder,
  allowsMin
}: IProps) => (
  <div className="item-wrapper" id={id}>
    {(label || additionalLabel) && (
      <label>
        {label}
        {additionalLabel}
      </label>
    )}
    {type === 'input large' ? (
      <input
        className="input large"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ) : type === 'textarea' ? (
      <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    ) : type === 'input number' ? (
      <input
        value={value}
        type="number"
        onChange={e => {
          const parsedValue = e.target.value ? parseInt(e.target.value, 10) : 0
          onChange(
            parsedValue > 999999999 ? 999999999 : !allowsMin && parsedValue < 0 ? 0 : parsedValue
          )
        }}
        placeholder={placeholder}
        min={allowsMin || 0}
        max={999999999}
      />
    ) : (
      <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} />
    )}
    {subtitle && <label className="subtitle">{subtitle}</label>}
  </div>
)

export default ItemWrapper
