import Label from "./Label";

function TextareaItem({id, label, register = {}, ...inputProps}) {
    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}
            <textarea
                id={id}
                {...inputProps}
                {...register}
            />
        </div>
    )
    };
  
export default TextareaItem;
  