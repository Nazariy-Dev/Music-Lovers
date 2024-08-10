export default function Container({ children, extraClass }: any) {

    return (
        <div className={"container mx-auto " + (extraClass ? (' ' + extraClass) : '')}>
            {children}
        </div>
    )
}
