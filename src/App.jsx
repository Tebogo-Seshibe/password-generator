import { useEffect, useState } from 'react';
import './App.css';
import { GeneratedPassword } from './components/GeneratedPassword/GeneratedPassword';
import { PasswordStrength, StrengthDisplayType } from './components/PasswordStrength/PasswordStrength';
import { Slider } from './components/Slider/Slider';

const MAX_MOBILE_WIDTH = 768;
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const NUMBERS = '0123456789';
const SYMBOLS = '~!@#$%^&*()_+/*-.`[]{}\\;:\'\",.<>?';

function App() {    
    const [ isMobile, setIsMobile ] = useState(false);
    const [ passwordStrength, setPasswordStrength ] = useState(StrengthDisplayType.TOO_WEAK)
    const [ passwordLength, setPasswordLength ] = useState(10);
    const [ generatedPassword, setGeneratedPassword ] = useState(undefined);
    const [ passwordParameters, setPasswordParameters ] = useState({
        uppercase: true,
        lowercase: true,
        numbers: false,
        symbols: false
    });

    
    function createNextPassword() {
        let characters = '';
        if (passwordParameters.lowercase) {
            characters += LOWERCASE;
        }
        if (passwordParameters.uppercase) {
            characters += UPPERCASE;
        }
        if (passwordParameters.numbers) {
            characters += NUMBERS;
        }
        if (passwordParameters.symbols) {
            characters += SYMBOLS;
        }

        let password = '';
        for (let i = 0; i < passwordLength; ++i) {
            const index = Math.floor(Math.random() * characters.length);
            password += characters[index];
        }

        setGeneratedPassword(password);
        gradePasswordStrength(password);
    }

    function gradePasswordStrength(password) {
        let score = 0;
        let lowerPortion = 0;
        let upperPortion = 0;
        let numbersPortion = 0;
        let symbolPortion = 0;

        for (let i = 0; i < password.length; ++i) {
            if (LOWERCASE.includes(password[i])) {
                lowerPortion = 25;
            }
            if (UPPERCASE.includes(password[i])) {
                upperPortion = 25;
            }
            if (NUMBERS.includes(password[i])) {
                numbersPortion = 25;
            }
            if (SYMBOLS.includes(password[i])) {
                symbolPortion = 25;
            }
        }

        score = (lowerPortion + upperPortion + numbersPortion + symbolPortion) * password.length / 10;

        if (score <= 25) {
            setPasswordStrength(StrengthDisplayType.TOO_WEAK)
        } else if (score <= 50) {
            setPasswordStrength(StrengthDisplayType.WEAK)
        } else if (score <= 75) {
            setPasswordStrength(StrengthDisplayType.MEDIUM)
        } else {
            setPasswordStrength(StrengthDisplayType.STRONG)
        }
    }
    
    function updateParameter(field, enable) {
        setPasswordParameters({
            ...passwordParameters,
            [field]: enable
        });
    }
    
    useEffect(() => {
        function onResize() {
            setIsMobile(window.innerWidth <= MAX_MOBILE_WIDTH);
        }

        window.addEventListener('resize', onResize);
        return () => window.addEventListener('resize', onResize);
    }, [ setIsMobile ]);

  return (
    <div id='generator-container'>
        <div className='title text_heading-large'>Password Generator</div>
        
        <div className='panel'>
            <GeneratedPassword isMobile={ isMobile } password={ generatedPassword } />
        </div>

        <div className='panel content'>
            <Slider title={ 'Character Length' } onSliderChange={ value => setPasswordLength(value) }/>

            <div style={{rowGap: 16, display: 'flex', flexDirection: 'column'}}>
                <div className='checkbox-primary'>
                    <input id='uppercase' checked={ passwordParameters.uppercase } type='checkbox' onChange={ e => updateParameter('uppercase', e.target.checked)}/>
                    <label htmlFor='uppercase'>Include Uppercase Letters</label>
                </div>
                <div className='checkbox-primary'>
                    <input id='lowercase' checked={ passwordParameters.lowercase } type='checkbox' onChange={ e => updateParameter('lowercase', e.target.checked)}/>
                    <label htmlFor='lowercase'>Include Lowercase Letters</label>
                </div>
                <div className='checkbox-primary'>
                    <input id='numbers' checked={ passwordParameters.numbers } type='checkbox' onChange={ e => updateParameter('numbers', e.target.checked)}/>
                    <label htmlFor='numbers'>Include Numbers</label>
                </div>
                <div className='checkbox-primary'>
                    <input id='symbols' checked={ passwordParameters.symbols } type='checkbox' onChange={ e => updateParameter('symbols', e.target.checked)}/>
                    <label htmlFor='symbols'>Include Symbols</label>
                </div>
            </div>

            <PasswordStrength isMobile={ isMobile } strength={ passwordStrength }/>

            <button className='button-primary' onClick={ createNextPassword }>
                <span>GENERATE</span>
                <img alt='→' src='./assets/images/icon-arrow-right.svg' />
            </button>
        </div>
    </div>
  );
}

export default App;
