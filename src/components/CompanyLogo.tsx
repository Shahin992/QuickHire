import { cloneElement, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'

interface LogoConfig {
    bgClass: string
    textClass: string
    content: string | ReactElement<{ className?: string }>
}

interface CompanyLogoProps {
    companyName?: string
    className?: string
}

const logoRegistry: Record<string, LogoConfig> = {
    revolut: {
        bgClass: 'bg-white border border-[#D6DDEB]',
        textClass: 'text-[#202430] italic font-black',
        content: 'R',
    },
    dropbox: {
        bgClass: 'bg-white',
        textClass: 'text-[#1967F2]',
        content: (
            <svg viewBox="0 0 48 48" className="h-9 w-9 fill-current" aria-hidden="true">
                <path d="M14 8 6 13.5 14 19 22 13.5 14 8Z" />
                <path d="M34 8 26 13.5 34 19 42 13.5 34 8Z" />
                <path d="M14 22 6 27.5 14 33 22 27.5 14 22Z" />
                <path d="M34 22 26 27.5 34 33 42 27.5 34 22Z" />
                <path d="M24 20 16 25.5 24 31 32 25.5 24 20Z" />
            </svg>
        ),
    },
    pitch: {
        bgClass: 'bg-[#0F0F10] rounded-full',
        textClass: 'text-white text-[10px] font-bold tracking-tight',
        content: 'Pitch',
    },
    blinkist: {
        bgClass: 'bg-[#4CD07B] rounded-full',
        textClass: 'text-[#0F172A]',
        content: (
            <svg viewBox="0 0 48 48" className="h-7 w-7 fill-current" aria-hidden="true">
                <path d="M24 10c4.8 5 9 9.3 9 15.1A9 9 0 1 1 15 25.1C15 19.3 19.2 15 24 10Z" />
                <circle cx="24" cy="25" r="4.8" fill="#0F172A" />
            </svg>
        ),
    },
    classpass: {
        bgClass: 'bg-[#1967F2] rounded-full',
        textClass: 'text-white',
        content: (
            <svg viewBox="0 0 48 48" className="h-7 w-7 stroke-current" aria-hidden="true" fill="none" strokeWidth="4.2" strokeLinecap="round">
                <path d="M14 24h20" />
                <path d="M24 14a10 10 0 1 1 0 20" />
            </svg>
        ),
    },
    canva: {
        bgClass: 'bg-[#5AC8C8] rounded-full',
        textClass: 'text-white italic font-semibold',
        content: 'Canva',
    },
    godaddy: {
        bgClass: 'bg-white',
        textClass: 'text-[#111111]',
        content: (
            <svg viewBox="0 0 48 48" className="h-8 w-8 stroke-current" aria-hidden="true" fill="none" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 16c-4-5-11-4.5-14-.2-2.8 3.8-1.6 9.9 3.6 13.7 4.2 3 9.4 6.7 12 11.5 1.8-5.1 6.3-8.4 10.2-11.4 4.4-3.4 5.8-8.9 3.1-12.9-2.8-4.1-9.1-4.4-12.9-.7Z" />
                <path d="M20 18c-4.8.8-7.4 5.3-6.2 9.7 1.2 4.5 5.4 6.7 9.1 6.4" />
            </svg>
        ),
    },
    twitter: {
        bgClass: 'bg-[#1D9BF0] rounded-full',
        textClass: 'text-white',
        content: (
            <svg viewBox="0 0 48 48" className="h-7 w-7 fill-current" aria-hidden="true">
                <path d="M38 14.8c-1 .5-2.1.8-3.2 1A5.4 5.4 0 0 0 37.2 13a10.7 10.7 0 0 1-3.4 1.3 5.3 5.3 0 0 0-9.1 4.8 15.1 15.1 0 0 1-11-5.6 5.3 5.3 0 0 0 1.6 7.1c-.9 0-1.7-.3-2.4-.7v.1a5.3 5.3 0 0 0 4.3 5.2c-.8.2-1.7.2-2.5.1a5.3 5.3 0 0 0 4.9 3.7A10.8 10.8 0 0 1 12 32.3 15.2 15.2 0 0 0 20.2 35c9.8 0 15.2-8.3 15.2-15.5v-.7c1-.7 1.9-1.7 2.6-2.8Z" />
            </svg>
        ),
    },
    nomad: {
        bgClass: 'bg-white',
        textClass: 'text-[#56CDAD]',
        content: (
            <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
                <path d="M9 14.5 24 6l15 8.5v19L24 42 9 33.5v-19Z" fill="#56CDAD" />
                <path d="M17 15.5v17h5.2v-8.7l6.6 4v-17h-5.2v8.6l-6.6-3.9Z" fill="#E7F6EA" />
            </svg>
        ),
    },
    netlify: {
        bgClass: 'bg-white',
        textClass: 'text-[#34B6C8]',
        content: (
            <svg viewBox="0 0 48 48" className="h-10 w-10 fill-current" aria-hidden="true">
                <path d="M24 5 31.5 12.5 24 20 16.5 12.5 24 5Z" />
                <path d="M8 21 15.5 13.5 23 21 15.5 28.5 8 21Z" />
                <path d="M25 21 32.5 13.5 40 21 32.5 28.5 25 21Z" />
                <path d="M24 22 31.5 29.5 24 37 16.5 29.5 24 22Z" />
            </svg>
        ),
    },
    maze: {
        bgClass: 'bg-[#1967F2] rounded-full',
        textClass: 'text-white',
        content: (
            <svg viewBox="0 0 48 48" className="h-7 w-7 stroke-current" aria-hidden="true" fill="none" strokeWidth="3.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 29c4-8 8-8 12 0 4-8 8-8 12 0 2.6 5.2 6 5.2 6 0" />
                <path d="M9 29c0 5 4 8 8 8 5.5 0 8-4.3 9-8" />
                <path d="M39 29c0 5-4 8-8 8-5.5 0-8-4.3-9-8" />
            </svg>
        ),
    },
    terraform: {
        bgClass: 'bg-white',
        textClass: 'text-[#2EC5E8]',
        content: (
            <svg viewBox="0 0 48 48" className="h-10 w-10 fill-current" aria-hidden="true">
                <path d="M8 11 20 18v14L8 25V11Z" />
                <path d="M22 18 34 25v14L22 32V18Z" />
                <path d="M22 4 34 11 22 18 10 11 22 4Z" />
                <path d="M36 11 40 13.5v12L36 23V11Z" />
            </svg>
        ),
    },
    udacity: {
        bgClass: 'bg-[#17AADC] rounded-full',
        textClass: 'text-white',
        content: (
            <svg viewBox="0 0 48 48" className="h-7 w-7 stroke-current" aria-hidden="true" fill="none" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 12v16c0 4.4 2.8 8 8 8s8-3.6 8-8V12" />
                <path d="M34 12v16c0 4.4-2.8 8-8 8" />
            </svg>
        ),
    },
    packer: {
        bgClass: 'bg-white',
        textClass: 'text-[#FF6B57]',
        content: (
            <svg viewBox="0 0 48 48" className="h-10 w-10 fill-current" aria-hidden="true">
                <path d="M10 8 22 12v28l-12-4V8Z" />
                <path d="M24 8 36 12v22l-12-4V8Z" />
            </svg>
        ),
    },
    webflow: {
        bgClass: 'bg-[#4353FF]',
        textClass: 'text-white italic font-black',
        content: 'W',
    },
}

const CompanyLogo = ({ companyName, className = 'h-12 w-12 text-[22px]' }: CompanyLogoProps) => {
    const key = (companyName || '').trim().toLowerCase()
    const config = logoRegistry[key]

    if (!config) {
        return (
            <div className={`flex items-center justify-center overflow-hidden rounded-[0px] bg-[#F8F8FD] text-dark font-bold ${className}`}>
                {companyName ? companyName.charAt(0).toUpperCase() : 'C'}
            </div>
        )
    }

    const content: string | ReactNode = typeof config.content === 'string'
        ? <span className="leading-none">{config.content}</span>
        : config.content

    return (
        <div className={`flex items-center justify-center shrink-0 overflow-hidden ${config.bgClass} ${config.textClass} ${className}`}>
            {isValidElement(content)
                ? cloneElement(content, {
                    className: `${content.props.className || ''} max-h-full max-w-full`,
                })
                : content}
        </div>
    )
}

export default CompanyLogo
