const nodemailer = require('nodemailer');
const cryptoJS = require("crypto-js");

const config = require("../config/const");

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ghostshashank@gmail.com',
        pass: '101@Shashank'         //if security error, login to https://myaccount.google.com/lesssecureapps and set on....
    }
});

module.exports.welcomeEmail = function(newUser){

    let ciphertext = cryptoJS.AES.encrypt(newUser.email,  config.emailKey)+'';
    console.log("1 : ",ciphertext);
    ciphertext = ciphertext.replace(/\+/g, 'aFaFa').replace(/\//g, 'bFbFb').replace(/=+$/, 'cFcFc');    //URL friendly string//Use same pattern while decrypt// Convert '+' to '%%22FF', Convert '/' to '%%33FF', Convert ending '=' to %%44FF
    let url = 'http://localhost:4000/api/loginStatus/'+ciphertext;
    console.log(url);

    let mailOptions = {
        from: '"Social Network 👻" <foo@blurdybloop.com>', // sender address
        to: newUser.email, // list of receivers eg: 'bar@blurdybloop.com, baz@blurdybloop.com'
        subject: 'Welcome '+ newUser.name , // Subject line
        text: 'Hello '+ newUser.name+ ', Thank you for signing with us. ' , // plain text body
        html: "Please click  <a target='_blank' href='"+url+"'>here</a> to get started!" // html body
    };

    try{
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            //console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
    catch(err){
        console.log(err);
    }
}
