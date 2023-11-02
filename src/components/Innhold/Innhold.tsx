import React, { PropsWithChildren } from 'react'

const Innhold = ({ children }: PropsWithChildren): JSX.Element => {
    return <div className="my-10 px-10">{children}</div>
}

export default Innhold
