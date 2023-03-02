import { useField } from "remix-validated-form";
import clsx from "clsx";

interface TextFieldProps extends Partial<HTMLInputElement> {
  name: string;
  label?: string;
  multiline?: boolean;
}

export default function TextField({
  name,
  label,
  className,
  multiline,
}: TextFieldProps) {
  const { error, getInputProps } = useField(name);
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      {!multiline ? (
        <input
          {...getInputProps({ id: name })}
          className={clsx(
            "w-full rounded border border-gray-500 px-2 py-1 text-lg",
            className
          )}
        />
      ) : (
        <textarea
          {...getInputProps({ id: name })}
          rows={20}
          className={clsx(
            "w-full rounded border border-gray-500 px-2 py-1 text-lg",
            className
          )}
        />
      )}
      {error && <span className="">{error}</span>}
    </div>
  );
}
