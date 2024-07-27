import React from 'react'

export default function SongsWrapper({children}: any) {
    return (
        <div className='flex gap-3 flex-col flex-1 w-full overflow-auto'>
            {children}
        </div>
    )
}
