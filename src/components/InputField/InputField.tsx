import { InputFieldProps } from "@/types";

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  placeholder,
  register,
  error,
}) => (
  <div className="my-2">
    <label>{label}</label>
    <br />
    <input
      type={type}
      placeholder={placeholder}
      {...register}
      className="border rounded-md p-2 w-full"
    />
    {error && <p className="text-red-700">{error}</p>}
  </div>
);

export default InputField;
