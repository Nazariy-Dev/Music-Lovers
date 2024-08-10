export default function InfoBlock({ direction, number, imageUrl, title, description, className }:
    {
        direction?: undefined | "reverse",
        imageUrl: string,
        title: string,
        description?: string,
        number: number,
        className?: string
    }) {
    return (
        <div className={"flex md:flex-row items-center md:gap-10 gap-6" + (direction == "reverse" ? " flex-col md:flex-row-reverse" : ' flex-col') + (className ? ' ' + className : ' ')}>
            <div className="w-4/5 sm:w-1/2 gap-4 flex flex-col items-center">
                <div className="border border-white rounded-full p-4">
                    {number}
                </div>
                <div className="text-xl font-bold text-center">
                    {title}
                </div>
                {description && <div className="text-center">
                    {description}
                </div>}
            </div>
            <div className="w-1/2 sm:min-w-[360px] min-w-full h-72 ">
                <img
                    className="rounded-lg border border-secondary h-full w-full object-cover"
                    src={imageUrl}
                    alt="LogIn Image" />
            </div>
        </div>
    )
}
