export default function HeroWrapper({ children }: any) {
    return (
        <div className='px-4 flex flex-col mx-auto max-w-[716px] w-full max-h-[600px] h-full fixed bottom-0 -translate-x-1/2 left-1/2'>
            {children}
        </div>
    )
}
