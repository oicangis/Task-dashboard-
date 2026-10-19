type textareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

export default function Textarea({className, ...props  }: textareaProps){
    return(
        <textarea className={className} {...props}/>
    )


}