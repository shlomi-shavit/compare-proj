import React, {Component} from 'react';
import Aux from '../../components/hoc/Aux';
import Steps from '../Steps/Steps';
import Popup from '../../components/UI/Popup/Popup';
import FormSummary from '../../components/formSummary/formSummary';
import classes from './MasterForm.module.scss';
import StepCounter from '../../components/UI/StepCounter/StepCounter';

class MasterForm extends Component {

    state = {
        steps: [
            {
                step: 1,
                stepInfo: [
                    {
                        question: 'מיקומה של הדירה',
                        answer: '',
                        placeholder: 'לדוגמא: תל אביב',
                        iconId: '',
                        inputType: 'text',
                        className: '',
                        tag: 'select',
                        id: 'location'
                    },
                    {
                        question: 'מחיר הדירה',
                        answer: '',
                        placeholder: 'מחיר הדירה',
                        iconId: '',
                        inputType: 'text',
                        className: '',
                        tag: 'input',
                        id: 'price',
                    }
                ]
            },
            {
                step: 2,
                stepInfo: [
                    {
                        question: 'האם זו תהיה הדירה הראשונה שלך?',
                        answerOption: [
                            'כן',
                            'לא, אני רוצה לרכוש דירה נוספת',
                            {question:'אני קונה דירה ואמכור דירה בשנתיים הקרובות'}
                        ],
                        answer: '',
                        secondQuestion: 'יש לך משכנתא על הדירה הנמכרת?',
                        thirdQuestion: ['כן', 'לא'],
                        secondAnswer:'',
                        horizontalStyle: false,
                        tag: 'select',
                        id: 'which-apartment'
                    }
                ]
            },
            {
                step: 3,
                stepInfo: [
                    {
                        question: 'האם חתמת על חוזה לרכישת הדירה?',
                        answerOption: [
                            'כן, חתמתי',
                            'אחתום בשלושת החודשים הקרובים',
                            'לא חתמתי'
                        ],
                        answer: '',
                        horizontalStyle: true,
                        tag: 'select',
                        id: 'apartment_contract'
                    }
                ]
            },
            {
                step: 4,
                stepInfo: [
                    {
                        question: 'מחיר רכישת הנכס',
                        tag: 'slider',
                        rangeValue: 100000,
                        minValue: 100000,
                        maxValue: 10000000,
                        stepRange: 100000,
                        id: 'purchase-price'
                    },
                    {
                        question: 'הון עצמי',
                        tag: 'slider',
                        rangeValue: 100000,
                        minValue: 100000,
                        maxValue: 5000000,
                        stepRange: 10000,
                        id: 'equity'
                    },
                    {
                        question: 'ברצוני לשלם החזר חודשי של כ –',
                        tag: 'slider',
                        rangeValue: 500,
                        minValue: 500,
                        maxValue: 25000,
                        stepRange: 50,
                        id: 'monthly-repayments'
                    },
                    {
                        question: 'מספר שנים',
                        answer: '',
                        minValue: 2,
                        maxValue: 30,
                        stepRange: 0.1,
                        placeholder: 'מספר שנים',
                        iconId: '',
                        inputType: 'number',
                        className: 'how-many-years',
                        tag: 'input',
                        id: 'how-many-years'
                    }
                ]
            },
            {
                step: 5,
                stepInfo: [
                    {
                        question: 'Please type your full name',
                        answer: '',
                        placeholder: 'your full name',
                        tag: 'input',
                        inputType: 'text',
                        id: 'name',
                        className: ''
                    },
                    {
                        question: 'Please type your mail',
                        answer: '',
                        placeholder: 'your mail',
                        tag: 'input',
                        inputType: 'mail',
                        id: 'mail',
                        className: ''
                    },
                    {
                        question: 'Please type your phone',
                        answer: '',
                        placeholder: 'your phone',
                        tag: 'input',
                        inputType: 'phone',
                        id: 'phone',
                        className: ''
                    }
                ]
            }
        ],
        allDataArray: [],
        currentStep: 4,
        maxSteps: 0,
        totalState: 1,
        equity: 100000,
        purchasePrice: 0,
        wantedMortgage: 0,
        monthlyRepayments: 0,
        mortgageYears: 0,
        formFilled: false,
        nextBtn: false
    };

    static getDerivedStateFromProps(props, state){
        const maxSteps = Object.keys(state.steps).length;
        state.maxSteps = maxSteps;
        return maxSteps;
    };

    nextStepHandler = () => {
        let currentStep = this.state.currentStep;
        const maxSteps = this.state.maxSteps;
        if(currentStep < maxSteps){
            currentStep++;
            this.setState({currentStep: currentStep});
        }
    }

    prevStepHandler = () => {
        let currentStep = this.state.currentStep;
        if(currentStep > 1){
            currentStep--;
            this.setState({currentStep: currentStep})
        }
    }

    setAnswerHandler = (answer, id, secondAnswer) => {
        //console.log(secondAnswer);

        const steps = this.state.steps;
        const stepsDataArray = [];

        // creating steps data array
        steps.map(step => {
            return step.stepInfo.map(info => {
                return stepsDataArray.push(info)
            })
        });

        const stepIdIndex = stepsDataArray.findIndex(stepData => stepData.id === id);
        const currentStep = stepsDataArray[stepIdIndex];
        currentStep.answer = answer;

        if (id === 'which-apartment') {

            if(secondAnswer !== null && typeof currentStep.answer === 'object'){
                currentStep.secondAnswer = secondAnswer;
            }
            else if(typeof currentStep.answer === 'object'){
                currentStep.answer = currentStep.answer.question
            }
            else{
                currentStep.secondAnswer = '';
            }
        }
        else if(id === 'price'){
            const numFormat = this.addCommasToNums(currentStep.answer);
            currentStep.answer = numFormat;
        }
        else if(currentStep.tag === 'slider'){

            const numFormat = this.addCommasToNums(answer);
            currentStep.rangeValue = numFormat;

            const mortgageResult = () => {
                const equity = this.removeCommasfromNums(this.state.equity);
                const purchasePrice = this.removeCommasfromNums(this.state.purchasePrice);
                const wantedMortgage = this.calculateMortgage(this.state.purchasePrice, this.state.equity);
                const currentRangeInputMinValue = currentStep.minValue + 1;

                if (equity > currentRangeInputMinValue && purchasePrice > 0 && purchasePrice > equity){
                    this.setState({wantedMortgage: wantedMortgage});
                    console.log('a');
                }
                else if(purchasePrice < equity) {
                    console.log('c');
                    console.log(this.state);

                    const maxMortgage = currentStep.rangeValue = this.state.purchasePrice;
                    console.log(currentStep.rangeValue);
                    this.setState({equity: maxMortgage});
                }
                else{
                    console.log('b');
                    this.setState({wantedMortgage: 0});
                }
            };

            if(currentStep.id === 'equity'){
                this.setState({equity: numFormat}, mortgageResult.bind(this));
            }
            else if (currentStep.id === 'purchase-price'){
                this.setState({purchasePrice: numFormat}, mortgageResult.bind(this));
            }
        }

        this.setState({
                steps: steps,
                allDataArray: stepsDataArray
        });

    };


    formFilledHandler = () => {
        const formFilled = this.state.formFilled;
        this.setState({formFilled: !formFilled});
    }

    moveToNextStep = () => {

    }

    addCommasToNums = (number) => {
        const numFormat = number.toString().replace(/,/g, "");
        return numFormat.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    removeCommasfromNums = (number) => {
        return parseInt(number.toString().replace(/,/g, ""));
    };

    calculateMortgage = (purchasePrice, equity) => {
        const equityNum = this.removeCommasfromNums(equity);
        const purchasePriceNum = this.removeCommasfromNums(purchasePrice);
        const wantedMortgage = this.addCommasToNums(purchasePriceNum - equityNum);
        return wantedMortgage;
    }

    calculateMortgageYears = () => {
        // continue from here <------------------------------------------------------------------------------------------------
        const wantedMortgage = this.state.wantedMortgage;
        const mortgageYears = wantedMortgage / mortgageYears / 12;

    }

    render(){
        return (
            <Aux>

                {/*-- Step container --*/}
                <Steps
                    allSteps={this.state.steps}
                    currentStep={this.state.currentStep}
                    getAnswer={this.setAnswerHandler}
                    wantedMortgage={this.state.wantedMortgage}
                />

                {/*-- Summary popup --*/}
                {this.state.formFilled ?
                    <Popup
                        formFilled={this.formFilledHandler}
                        show={this.state.purchasing}>
                        <FormSummary
                            formData={this.state.allDataArray}
                        />
                    </Popup> : null}

                {/*-- Step navigation --*/}
                <div className={classes.step_navigation}>

                    <StepCounter currentStep={this.state.currentStep} stepsNumber={this.state.maxSteps}/>

                    <div className={classes.navigation_btn}>
                    {this.state.currentStep > 1 ? <button className={[classes.btn, classes.prev_btn].join(' ')} onClick={this.prevStepHandler}>&#60; חזור</button> : null}
                    {this.state.currentStep === this.state.maxSteps ?
                        <button className={[classes.btn, classes.end_btn].join(' ')} onClick={this.formFilledHandler}>that's it!</button>
                        :
                        <button disabled={this.state.nextBtn} className={[classes.btn, classes.next_btn].join(' ')} onClick={this.nextStepHandler}>הבא &#62;</button>}
                    </div>

                </div>

            </Aux>
        )
    }
}

export default MasterForm;