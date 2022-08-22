import React, {useState} from 'react'
import bicjson from '../jsondata/bic.json' 
import {useNavigate} from 'react-router-dom'


const Reciver = () => {
    const navigate = useNavigate();
    const[data,setData] = useState({
        bic : '',
        accountHolderName : '',
        accountHolderNumber : '',
    })
    const[accountHolderNameError,setAccountHolderNameError] = useState('')
    const[accountHolderNumberError,setAccountHolderNumberError] = useState('')
    const[bicError,setBicError] = useState('')
    const[instituteName,setInstituteName] = useState('')
    const[verfiedUser, setVerifiedUser] = useState(false)

    const {bic,accountHolderName,accountHolderNumber} = data
    const handleChange = (e) => {
        // if(name === 'accountHolderName'){
        //     setAccountHolderNameError(null)
        // }
        // if(name === 'accountHolderNumber'){
        //     setAccountHolderNumberError(null)
        // }
        //setVerifiedUser(false)
        setBicError(null)
        setAccountHolderNameError(null)
        setAccountHolderNumberError(null)
        setData({...data,[e.target.name]:e.target.value})
    }
    const onVerify = () => {

        let count=0;
        if(bic !== ''){
            for(let i=0;i<bicjson.length;i++){
                if(bicjson[i].bic === bic){
                    console.log(bicjson[i].instituteName)
                    setInstituteName(bicjson[i].instituteName)
                    setVerifiedUser(true)
                    count++;
                    break;
                }
                else{
                    continue;
                }
            }
            if(count===0){
                setBicError('Please check you bic')
                setInstituteName('')
                setVerifiedUser(false)
            }
        }
        else{
            console.log('error field')
            setBicError('Enter valid bic')
            setInstituteName('')
            setVerifiedUser(false)
        }

    }
    const onConfirm = () => {
        if(bic === ''){
            setBicError('Verify the bic')
            console.log('Verify the bic')
        }
        else{
            if(accountHolderName !== '' && accountHolderNumber !== ''){
                console.log("Success")
                navigate('/transactionhistory')
            }
            else{
                if(accountHolderName === ''){
                    setAccountHolderNameError('Please enter account holder name')
                }
                if(accountHolderNumber === ''){
                    setAccountHolderNumberError('Please enter account holder number')
                }
            }
        }
    }
    return (
        <div style={styles.mainContainer}>
            <div style={styles.formBox}>
                <div style={styles.reciverBox}>
                    <h1 style={styles.reciverTxt}>Reciver</h1>
                </div>
                <div style={styles.inputBoxContainer}>
                    <p style={styles.bic}>BIC : </p>
                    <div style={styles.inputBoxInnerContainer}>
                        <input 
                            type={"text"}
                            placeholder={"BIC"}
                            style={styles.inputBox}
                            name="bic"
                            onChange={handleChange}
                            value={bic}
                        />
                        {bicError ?
                            <p style={styles.errorTxt}>Enter valid bic</p> : 
                        null}
                    </div>
                </div>
                {verfiedUser ? <>
                <div style={styles.inputBoxContainer}>
                    <p style={styles.bic}>Institute Name : </p>
                    <input 
                        type={"text"}
                        placeholder={"Institute Name"}
                        defaultValue={instituteName}
                        style={styles.accountNameBox}
                        readOnly={true}
                    />
                </div>
                <div style={styles.inputBoxContainer}>
                    <p style={styles.bic}>Account Holder Number : </p>
                    <div style={styles.inputBoxInnerContainer}>
                        <input 
                            type={"text"}
                            placeholder={"Account Holder Number"}
                            style={styles.inputBox}
                            name="accountHolderNumber"
                            value={accountHolderNumber}
                            onChange={handleChange}
                        />
                        {accountHolderNumberError ?
                            <p style={styles.errorTxt}>{accountHolderNumberError}</p> : 
                        null}
                    </div>
                </div>
                <div style={styles.inputBoxContainer}>
                    <p style={styles.bic}>Account Holder Name : </p>
                    <div style={styles.inputBoxInnerContainer}>
                        <input 
                            type={"text"}
                            placeholder={"Account Holder Name"}
                            style={styles.inputBox}
                            name="accountHolderName"
                            value={accountHolderName}
                            onChange={handleChange}
                        />
                        {accountHolderNameError ?
                            <p style={styles.errorTxt}>{accountHolderNameError}</p> : 
                        null}
                    </div>
                </div>
                </> : null}
                <div style={styles.btnContainer}>
                    <button style={styles.verifyBtn} onClick={onVerify}>{verfiedUser?'Verifed':'Verify'}</button>
                    <button style={styles.nextBtn} onClick={onConfirm}>Confirm</button>
                </div>
            </div>
        </div>
    )
}

export default Reciver


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
    reciverBox : {
        display : 'flex',
        alignItems : 'center',
        justifyContent : 'center',
        width : '100%',
        height : '10vh'
    },
    reciverTxt : {
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
    bic : {
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