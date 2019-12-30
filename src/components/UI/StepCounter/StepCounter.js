import React from 'react';
import Aux from '../../hoc/Aux';
import classes from './StepCounter.module.scss';

const stepCounter = (props) => {

    const output = [];

    for (let i = 1; i < props.stepsNumber + 1; i++) {
        let activeClass = props.currentStep === i ? `${classes.active_step}` : null;
        output.push(<li className={activeClass} key={i}>{i}</li>)
    }

    return (
        <Aux>
            <ul className={classes.step_counter}>
                {output}
            </ul>
        </Aux>
    );
}

export default stepCounter;
