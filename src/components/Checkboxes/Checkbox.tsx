type CheckboxProps = {
    isChecked: boolean,
    setIsChecked: (s: boolean) => void,
    label: string
}

const Checkbox = (props: CheckboxProps) => {

  return (
    <div>
      <label
        className="flex cursor-pointer select-none items-center"
      >
        <div className="relative">
          <input
            type="checkbox"
            className="sr-only"
            onChange={() => {
              props.setIsChecked(!props.isChecked);
            }}
          />
          <div
            className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                props.isChecked && "border-primary bg-gray dark:bg-transparent"
            }`}
          >
            <span
              className={`h-2.5 w-2.5 rounded-sm ${props.isChecked && "bg-primary"}`}
            ></span>
          </div>
        </div>
        {props.label}
      </label>
    </div>
  );
};

export default Checkbox;
