//import jsonwebtoken

const jwt=require('jsonwebtoken')


userDeatiles = {
  1000: { acno: 1000, username: "anu", password: 123, balance: 0, transation: [] },
  1001: { acno: 1001, username: "amal", password: 123, balance: 0, transation: [] },
  1002: { acno: 1002, username: "arun", password: 123, balance: 0, transation: [] },
  1003: { acno: 1003, username: "mega", password: 123, balance: 0, transation: [] }
}

//register
register = (acno, uname, psw) => {
  if (acno in userDeatiles) {
    return {
      statusCode: 401,
      status: false,
      message: "user already success"
    }
  }
  else {
    userDeatiles[acno] = { acno, username: uname, password: psw, balance: 0, transation: [] }
    console.log(userDeatiles);
    return {
      statusCode: 200,
      status: true,
      message: "registration success"
    }
  }

}

login = (acno, psw) => {
  if (acno in userDeatiles) {
    if (psw == userDeatiles[acno]["password"]) {
      const token=jwt.sign({currentAcno:acno},'secrectkey123') 
      return {
        statusCode: 200,
        status: true,
        message: "login success",
        token
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "incurrect password"
      }
    }
  }
  else {
    return {
      statusCode: 401,
      status: false,
      message: "incurrect acno"
    }
  }
}

deposite = (acno, password, amount) => {

  var amnt = parseInt(amount)

  if (acno in userDeatiles) {
    if (password == userDeatiles[acno]["password"]) {
      userDeatiles[acno]["balance"] += amnt
      userDeatiles[acno]["transation"].push({ type: 'CREDIT', amount: amnt })
      return {
        statusCode: 200,
        status: false,
        message: userDeatiles[acno]["balance"]
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "incurrect password"
      }
    }

  }
  else {
    return {
      statusCode: 401,
      status: false,
      message: "incurrect acno"
    }
  }
}

withdraw = (acno, password, amount) => {
  var amnt = parseInt(amount)
  if (acno in userDeatiles) {
    if (password == userDeatiles[acno]["password"]) {
      if (amnt <= userDeatiles[acno]["balance"]) {
        userDeatiles[acno]["balance"] -= amnt
        userDeatiles[acno]['transation'].push({ type: 'DEPIT', amount: amnt })
        return {
          statusCode: 200,
          status: true,
          message: userDeatiles[acno]["balance"]
        }
      }
      else {
        return {
          statusCode: 401,
          status: false,
          message:"insufficient balance"
        }
      }
    }
    else {
      return {
        statusCode: 401,
        status: false,
        message: "insufficient balance"
      }
    }
  }
  else {
    return {
      statusCode: 401,
      status: false,
      message: "insufficient password"
    }
  }
}

gettransation=(acno)=>{
  if(acno in userDeatiles){
    return {
      statusCode: 200,
      status: true,
      message: userDeatiles[acno]["transation"]
    }
  }
  else{
    return {
      statusCode: 401,
      status: false,
      message: "incurrote acno"
    }
  }
}

module.exports = {
  register,
  login,
  deposite,
  withdraw,
  gettransation
}