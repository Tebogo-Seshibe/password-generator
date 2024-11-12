import React, { useRef } from 'react';
import './GeneratedPassword.css';

export function GeneratedPassword(props) {
    const copiedRef = useRef(null);
    const copyRef = useRef(null);
    const isMobile = props.isMobile;
    const password = props.password;

    const messageLifetime = 2500;
    const disabled = 'disabled';
    const visible = 'visible';
    
    const displayText = password || 'P4$5W0rD!';
    const placeholderClass = !password ? 'placeholder' : '';
    const passwordClasses = [
        'password-text',
        isMobile ? 'text__heading-medium' : 'text__heading-large',
    ].join(' ');

    function copyPassword() {
        if (!password || copyRef.current.classList.contains(disabled)) {
            return;
        }

        navigator.clipboard.writeText(password)
            .then(() =>  {
                copiedRef.current.classList.add(visible);
                copyRef.current.classList.add(disabled);
                setTimeout(() => {
                        copiedRef.current.classList.remove(visible);
                        copyRef.current.classList.remove(disabled);
                    },
                    messageLifetime
                );
            })
            .catch(() => {
                alert('Failed to copy to clipboard.')
            })
    }

    return (
        <div id='generated-container' className={ placeholderClass }>
            <span className={ passwordClasses }>{ displayText }</span>
            <span ref={ copiedRef } className='copied text__body'>Copied</span>
            <img ref={ copyRef } className='copy' alt='Copy' src='/assets/images/icon-copy.svg' onClick={() => copyPassword()}/>
        </div>
    );
}
