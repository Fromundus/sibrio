import React from 'react'
import Button from './ui/Button';
import { FaCheck, FaLink, FaRegCopy } from 'react-icons/fa';

const CodeLink = ({ settings }) => {
    const [copied, setCopied] = React.useState(false);

    const handleCopy = () => {
        settings?.referral_code && navigator.clipboard.writeText(settings?.referral_code).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 10000); // Reset after 2s
        });
    };

    return (
        <>
            <Button
                className={"bg-primary text-white w-full flex justify-center"}
                label={<span className="flex items-center gap-2 uppercase">CODE: {settings?.referral_code} {!copied ? <FaRegCopy /> : <FaCheck className="text-green-200" />}</span>}
                onClick={handleCopy}
            />
            <a href={`${settings?.referral_link}`} target="_blank" className='w-full h-11 justify-center bg-accent text-white font-[700] px-5 hover:opacity-90 transition text-[14px] rounded-md py-2 font-nunito flex items-center gap-1.5' style={{boxShadow: "rgba(0, 0, 0, 0.25) 0px -2px 0px inset, rgba(255, 255, 255, 0.25) 0px 1.5px 0px inset", padding: "0.5rem 1rem"}}>
                <FaLink /> JOIN CSGOEMPIRE
            </a>
        </>
    )
}

export default CodeLink
