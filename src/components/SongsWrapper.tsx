export default function SongsWrapper({ children, className }: any) {
    return (
        <div className={'flex gap-3 flex-col flex-1 w-full overflow-auto' + (className ? ' ' + className : '')}>
            {children}
        </div>
    )
}
