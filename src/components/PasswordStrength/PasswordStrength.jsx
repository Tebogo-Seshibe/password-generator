import React from 'react';
import './PasswordStrength.css';

export const StrengthDisplayType = {
    TOO_WEAK: 'too_weak',
    WEAK: 'weak',
    MEDIUM: 'medium',
    STRONG: 'strong',
};

export function PasswordStrength(props) {
    const strength = props.strength;
    
    let message = '';
    switch (strength) {
        case StrengthDisplayType.TOO_WEAK:
            message = 'TOO WEAK!';
            break;
            
        case StrengthDisplayType.WEAK:
            message = 'WEAK';
            break;
            
        case StrengthDisplayType.MEDIUM:
            message = 'MEDIUM';
            break;
            
        case StrengthDisplayType.STRONG:
            message = 'STRONG';
            break;
    }

    return (
        <div id='strength-container' className={ strength }>
            <span className='title text__body'>STRENGTH</span>

            <span className='message text__body'>{ message }</span>

            <div className="levels">
                <div className="level"></div>
                <div className="level"></div>
                <div className="level"></div>
                <div className="level"></div>
            </div>
        </div>
    );
}
