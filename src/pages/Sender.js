import React from 'react'
import customerid from '../jsondata/customerid.json'
import {useNavigate} from 'react-router-dom'

class Sender extends React.Component {
    constructor(props){
        console.log('props',props)
        super(props);
        this.state={
            CustomerId : '',
            customerIdErrorTxt : '',
            accountHolderName : '',
            accountBalance  : '',
            verfiedUser : false,
        }
    }

    handleChange = e => {
        //console.log('yes')
        this.setState({
            customerIdErrorTxt : '',
            CustomerId : e.target.value,
            verfiedUser : false
        })
    }
    onVerify = () => {
        console.log(this.state.CustomerId)
        let count=0;
        if(this.state.CustomerId !== ''){
            for(let i=0;i<customerid.length;i++){
                if(customerid[i].customerId === this.state.CustomerId){
                    count++;
                    this.setState({
                        accountHolderName : customerid[i].name,
                        accountBalance : customerid[i].accountBalance,
                        verfiedUser : true
                    })
                    break;
                }
                else{
                    continue;
                }
            }
            if(count===0){
                this.setState({
                    customerIdErrorTxt : 'Please check your creditionals.',
                    accountHolderName : '',
                    accountBalance : '',
                    verfiedUser:false
                })
            }
        }
        else{
            this.setState({
                customerIdErrorTxt : 'Please enter valid creditionals.',
                accountHolderName:'',
                accountBalance:'',
                verfiedUser:false
            })
        }
    }

    onNext = () => {
        if(this.state.verfiedUser){
            console.log('Go to next page')
           this.props.navigate('/reciver')
        }
        else{
            this.setState({
                customerIdErrorTxt : 'Please verify the creditionals.'
            })
        }

    }
    render(){
        return (
            <div style={styles.mainContainer}>
                <div style={styles.formBox}>
                    <div style={styles.senderBox}>
                        <h1 style={styles.senderTxt}>Sender</h1>
                    </div>
                    <div style={styles.inputBoxContainer}>
                        <p style={styles.customerId}>Customer ID : </p>
                        <div style={styles.inputBoxInnerContainer}>
                            <input 
                                type={"text"}
                                placeholder={"Customer ID"}
                                style={styles.inputBox}
                                onChange={this.handleChange}
                                name="customerid"
                                value={this.state.CustomerId}
                            />
                            {this.state.customerIdErrorTxt ? <p style={styles.errorTxt}>{this.state.customerIdErrorTxt}</p> : null}
                        </div>
                    </div>
                    {this.state.verfiedUser ? <>
                    <div style={styles.inputBoxContainer}>
                        <p style={styles.customerId}>Name : </p>
                        <input 
                            type={"text"}
                            placeholder={"Account Holder Name"}
                            defaultValue={this.state.accountHolderName}
                            style={styles.accountNameBox}
                            readOnly={true}
                        />
                    </div>
                    <div style={styles.inputBoxContainer}>
                        <p style={styles.customerId}>Account Balance : </p>
                        <input 
                            type={"text"}
                            placeholder={"Account Balance"}
                            defaultValue={this.state.accountBalance}
                            style={styles.accountNameBox}
                            readOnly={true}
                        />
                    </div></> : null}
                    <div style={styles.btnContainer}>
                        <button style={styles.verifyBtn} onClick={() => this.onVerify()}>{this.state.verfiedUser?'Verifed':'Verify'}</button>
                        <button style={styles.nextBtn} onClick={() => this.onNext()}>Next</button>
                    </div>
                </div>
            </div>
        )
    }
}

export function SenderRouter(props){
    const navigate = useNavigate();
    return(
        <Sender navigate={navigate}></Sender>
    )
}

export default Sender

const styles = {
    mainContainer : {
        display : 'flex',
        width : '100%',
        height : '100vh',
        alignItems : 'center',
        justifyContent : 'center'
    },
    formBox : {
        display : 'flex',
        width : '40%',
        flexDirection : 'column',
        border : '0.5px solid lightgrey',
        borderRadius : '5px',
        boxShadow : '1px 1px 5px grey',
        padding : '20px'
    },
    senderBox : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        width : '100%',
        height : '10vh'
    },
    senderTxt : {
        fontSize : 25,
        fontFamily : 'cursive',
        color : 'red',
        fontWeight : 'bold'
    },
    inputBoxContainer : {
        display : 'flex',
        flexDirection : 'row',
        width : '100%',
        marginTop : '10px'
    },
    customerId : {
        fontSize : 14,
        marginTop : '10px',
        fontWeight : 'bold',
        width : '30%',
    },
    inputBoxInnerContainer : {
        display : 'flex',
        flexDirection : 'column',
        width : '70%',
        marginRight:10
    },
    inputBox : {
        width : '99%',
        height : '7vh',
        border : '1px solid lightgrey',
        borderRadius : '3px',
        fontSize : 15,
        outline : 'none',
        paddingLeft:10
    },
    errorTxt : {
        fontSize : 12,
        color : 'red',
        fontWeight:'bold',
        marginTop : '5px'
    },
    accountNameBox : {
        width : '70%',
        height : '7vh',
        border : '1px solid lightgrey',
        borderRadius : '3px',
        fontSize : 15,
        color : 'green',
        fontWeight : 'bold',
        outline : 'none',
        paddingLeft : 10
    },
    btnContainer : {
        display : 'flex',
        marginTop : '15px',
        alignItems : 'center',
        width : '100%',
        justifyContent:'space-evenly',
        flexDirection : 'row',
    },
    verifyBtn : {
        width : '40%',
        height : 40,
        border : '1px solid red',
        backgroundColor : 'red',
        color : 'white',
        fontSize : 12,
        fontWeight : 'bold',
        borderRadius : '5px',
        cursor : 'pointer',
        boxShadow : '1px 2px 3px grey',
        outline : 'none',
    },
    nextBtn : {
        width : '40%',
        height : 40,
        border : '1px solid lightgrey',
        //backgroundColor : 'red',
        color : 'black',
        fontSize : 12,
        fontWeight : 'bold',
        borderRadius : '5px',
        cursor : 'pointer',
        boxShadow : '1px 2px 3px grey',
        outline : 'none',
    }
}