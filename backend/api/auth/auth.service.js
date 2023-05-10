const Cryptr = require('cryptr')
const bcrypt = require('bcrypt')
const userService = require('../user/user.service')
const logger = require('../../services/logger.service')
const cryptr = new Cryptr(process.env.SECRET1 || 'Secret-Puk-1234')
// const cryptr = new Cryptr(process.env.SECRET1)

module.exports = {
    signup,
    login,
    getLoginToken,
    validateToken
}

async function login(email, password) {
    logger.debug(`auth.service - login with email: ${email}`)

    const user = await userService.getByEmail(email)
    console.log('user12331212',user)
    if (!user) return Promise.reject('Invalid email or password')
    // TODO: un-comment for real login
    const match = await bcrypt.compare(password, user.password)
    if (!match) return Promise.reject('Invalid email or password')

    delete user.password
    user._id = user._id.toString()
    return user
}
   

async function signup({email ,accountName, password }) {
    const saltRounds = 10

    logger.debug(`auth.service - signup with account name: ${accountName}`)
    if (!email || !accountName || !password) return Promise.reject('Missing required signup information')

    const userExist = await userService.getByAccountName(accountName)
    if (userExist) return Promise.reject('Username already taken')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({email, accountName, password: hash })
}


function getLoginToken(user) {
    const userInfo = {_id : user._id, fullname: user.fullname,email:user.email,accountName:user.accountName, isAdmin: user.isAdmin}
    console.log('use1231231223r',user)
    return cryptr.encrypt(JSON.stringify(userInfo))    
}

function validateToken(loginToken) {
    try {
        logger.debug('GOT:', loginToken)
        const json = cryptr.decrypt(loginToken)
        const loggedinUser = JSON.parse(json)
        return loggedinUser

    } catch(err) {
        console.log('Invalid login token')
    }
    return null
}




// ;(async ()=>{
//     await signup('bubu', '123', 'Bubu Bi')
//     await signup('mumu', '123', 'Mumu Maha')
// })()