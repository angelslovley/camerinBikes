import React from 'react'

interface Props {
    height?: string
    width?: string
    fill?: string
}

export const Editicon: React.FC<Props> = ({ fill="black", height="12", width="12", ...rest }) => {
    return (
        <svg {...rest} width={width} height={height} viewBox="0 0 12 12" fill="none">
            <path d="M7.20167 4.26167L7.73833 4.79833L2.45333 10.0833H1.91667V9.54667L7.20167 4.26167V4.26167ZM9.30167 0.75C9.15583 0.75 9.00417 0.808333 8.89333 0.919167L7.82583 1.98667L10.0133 4.17417L11.0808 3.10667C11.3083 2.87917 11.3083 2.51167 11.0808 2.28417L9.71583 0.919167C9.59917 0.8025 9.45333 0.75 9.30167 0.75V0.75ZM7.20167 2.61083L0.75 9.0625V11.25H2.9375L9.38917 4.79833L7.20167 2.61083V2.61083Z" fill={fill} />
        </svg>

    )
}
