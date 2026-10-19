type InputProps = React.InputHTMLAttributes<HTMLInputElement>

export default function Input({className, ...props  }: InputProps){
    return(
        <input className={className} {...props}/>
    )


}