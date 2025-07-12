import React from 'react'
import Modal from './ui/Modal'
import { IoIosHelpCircle } from 'react-icons/io'

const CookieHelpModal = ({ helpModal, handleToggleHelpModal }) => {
    return (
        <>
            <button className='text-sm w-fit bg-primary font-normal flex items-center gap-1 border rounded-lg px-4 p-1.5 border-border hover:bg-primaryHover' type='button' onClick={() => handleToggleHelpModal(true)}>How to get cookie <IoIosHelpCircle className='text-lg' /></button>

            {helpModal && 
                <Modal title={"How to get cookie."} onClose={() => handleToggleHelpModal(false)}>
                    <div className='w-full justify-center flex text-center'>
                        <span className='text-textSecondary'><strong className='text-red-500'>NOTE:</strong> You must use a pc or laptop to update the leaderboard.</span>
                    </div>
                    <div className='flex flex-col gap-8 mt-8'>
                        <div className='flex items-center gap-4 w-full'>
                            <div className='w-1/6 flex justify-center'> 
                                <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                    <span className='text-xs font-bold'>1</span>
                                </div>
                            </div>
                            <div className='w-5/6'>
                                <span>Sign in to your CSGO Empire Account.</span> <a className='text-tertiary font-semibold underline' target='_blank' href="https://csgoempire.com/">CSGO Empire</a>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 w-full'>
                            <div className='w-1/6 flex justify-center'> 
                                <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                    <span className='text-xs font-bold'>2</span>
                                </div>
                            </div>
                            <div className='w-5/6'>
                                <span>Visit this page</span> <a className='text-tertiary text-wrap font-semibold underline' href="https://csgoempire.com/api/v2/referrals/referred-users?per_page=100&page=1" target='_blank'>CSGO Empire Referred Users</a>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 w-full'>
                            <div className='w-1/6 flex justify-center'> 
                                <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                    <span className='text-xs font-bold'>3</span>
                                </div>
                            </div>
                            <div className='w-5/6 flex flex-col'>
                                <span>
                                    Right-click anywhere on the page and choose Inspect, or press:
                                </span>
                                <div className='flex flex-col'>
                                    <span>
                                        <strong>Windows/Linux:</strong> Ctrl + Shift + I  
                                    </span>
                                    <span>
                                        <strong>macOS:</strong> Cmd + Option + I
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 w-full'>
                            <div className='w-1/6 flex justify-center'> 
                                <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                    <span className='text-xs font-bold'>4</span>
                                </div>
                            </div>
                            <div className='w-5/6'>
                                <span>Go to <strong>Network Tab</strong> and refresh the page.</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 w-full'>
                            <div className='w-1/6 flex justify-center'> 
                                <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                    <span className='text-xs font-bold'>5</span>
                                </div>
                            </div>
                            <div className='w-5/6'>
                                <span>On the table below click <strong className='text-primary'>referred-users?per_page=100&page=1</strong></span>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 w-full'>
                            <div className='w-1/6 flex justify-center'> 
                                <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                    <span className='text-xs font-bold'>6</span>
                                </div>
                            </div>
                            <div className='w-5/6'>
                                <span>Go to Headers Tab and Find Request Headers</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 w-full'>
                            <div className='w-1/6 flex justify-center'> 
                                <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                    <span className='text-xs font-bold'>7</span>
                                </div>
                            </div>
                            <div className='w-5/6'>
                                <span>Find the Cookie and copy it. It usually starts with <span className='text-green-500'>"_ga=GA*********************"</span></span>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 w-full'>
                            <div className='w-1/6 flex justify-center'> 
                                <div className='w-5 h-5 flex rounded-full border-2 items-center justify-center'>
                                    <span className='text-xs font-bold'>7</span>
                                </div>
                            </div>
                            <div className='w-5/6'>
                                <span><button className='text-accent font-bold' onClick={() => handleToggleHelpModal(false)}>Close this modal</button> and paste the cookie on the cookie input in the Leaderboard Settings.</span>
                            </div>
                        </div>
                    </div>
                </Modal>}
        </>
    )
}

export default CookieHelpModal
