import Label from "./Label";
import styles from "./TextareaItem.module.css"

function TextareaItem({id, label, register = {}, ...inputProps}) {
    return (
        <div>
            {label && <Label htmlFor={id}>{label}</Label>}
            <textarea className={styles.textarea}
                id={id}
                {...inputProps}
                {...register}
            />
        </div>
    )
    };
  
export default TextareaItem;
  