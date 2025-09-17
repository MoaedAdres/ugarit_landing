import React from 'react'
import MyImage from '../Reusable-components/MyImage'
import { IPartner } from '@/interfaces/partners'

function SinglePartner({ Icon, name }: IPartner) {
    return (
        <div className="flex items-center justify-center p-4 group h-20">
            <div
                className={`
                       rounded-xl flex items-center justify-center px-4 py-3 whitespace-nowrap
                      transition-all duration-300 group-hover:scale-105 shadow-lg
                      border border-border/20 group-hover:border-primary/30
                      min-w-0 flex-shrink-0
                    `}
            >
                <div className=" flex items-center space-x-2 min-w-0">
                    {Icon && <MyImage
                        className={`h-5 w-5 transition-colors duration-300 flex-shrink-0`}
                        src={Icon} alt={name} />}
                    <span
                        className={`font-medium transition-colors duration-300 truncate`}
                    >
                        {name}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SinglePartner