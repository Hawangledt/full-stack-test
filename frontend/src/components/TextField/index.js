import './TextField.css'

const TextField = ({field, label, placeholder, value, onChange, name}) => {
    return (
        <div className="text-field">
            <label>{label}</label>
            <input
                key={field}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                type="text"
                name={name}
            />
        </div>
    );
}

export default TextField