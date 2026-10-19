type checkboxProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Checkbox({className, ...props}:checkboxProps){
    return(
        <input className={className} {...props}/>
    )
}