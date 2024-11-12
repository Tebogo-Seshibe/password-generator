import { useState } from "react";
import RCSclider from 'rc-slider';
import './Slider.css';
import 'rc-slider/assets/index.css';

export function Slider(props) {
    const title = props.title;
    const onSliderChange = props.onSliderChange;
    const [ length, setLength ] = useState(10);

    function onChange(value) {
        onSliderChange(value);
        setLength(value);
    }

    return (
        <div id="slider-container">
            <span className='title text__body'>{ title }</span>
            <span className='length text__heading-medium'>{ length }</span>

            <RCSclider min={ 1 } max={ 20 } step={ 1 } value={ length } onChange={ onChange }/>
        </div>
    );
}