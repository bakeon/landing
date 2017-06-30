'use strict';

/*Node API*/
const functions = require('firebase-functions');
const admin = require('firebase-admin');

const nodemailer = require('nodemailer');
const mcapi = require('mailchimp-api');
var mysql = require('mysql');


admin.initializeApp(functions.config().firebase);

/*Var*/
const gmailEmail = encodeURIComponent(functions.config().gmail.email);
const gmailPassword = encodeURIComponent(functions.config().gmail.password);
const mailTransport = nodemailer.createTransport(
    `smtps://${gmailEmail}:${gmailPassword}@smtp.gmail.com`);

const APP_NAME = 'La Ruuche';

const con = mysql.createConnection({
    host: "35.187.66.1",
    port:"3306",
    user: "root",
    password: "root"
});


exports.basicTest = functions.database.ref('kpi/search').onWrite( event => {
    let db = admin.database();
    let kpiSearch = db.ref('kpi/search');
    kpiSearch.on('child_added', function(snapshot){
            let job=snapshot.val().input;
            con.connect(function(err) {
                con.query('SELECT rome_code FROM laruuche.jobs where name_job = '+job+'; ', function (error, results, fields) {
                    if (error) throw error;
                    console.log('results : '+results);
                });
                console.log("job research");
                if(err){

                }
            });



    });
});


// [START sendWelcomeEmail]
/**
 * Sends a welcome email to new user.
 */
// [START onCreateTrigger]
exports.sendWelcomeEmail = functions.auth.user().onCreate(event => {
// [END onCreateTrigger]
    // [START eventAttributes]
    const user = event.data; // The Firebase user.

    const email = user.email; // The email of the user.
    const displayName = user.displayName; // The display name of the user.
    // [END eventAttributes]

    return sendWelcomeEmail(email, displayName);
});
// [END sendWelcomeEmail]

// Sends a welcome email to the given user.
function sendWelcomeEmail(email, displayName) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@firebase.com>`,
        to: email
    };

    // The user subscribed to the newsletter.
    mailOptions.subject = `Welcome to ${APP_NAME}!`;
    mailOptions.text = `Hey ${displayName || ''}! Welcome to ${APP_NAME}. I hope you will enjoy our service.`;
    return mailTransport.sendMail(mailOptions).then(() => {
        console.log('New welcome email sent to:', email);
    });
}

exports.addToMailChimp = functions.database.ref('users').onWrite( event => {
    let db = admin.database();
    let usersRef = db.ref('users');
    usersRef.on('child_added', function(snapshot){
       let user = snapshot.val();
       let key = snapshot.key;
       if(user && user.email){
           let apiKey = '50a9a12336d3f994069d33e076dee01f-us16';
           let listId = '8a1915b98c';
           let name = user.displayName || '';
           let fname = name.split(' ')[0];
           let lname = name.split(' ').slice(1).join(' ');


           let mc = new mcapi.Mailchimp(apiKey);
           mc.lists.subscribe({
                   id: listId,
                   email: {email: user.email},
                   merge_vars: {FNAME: fname, LNAME: lname},
                   'double_optin': false,
                   'send_welcome': false
                   },
               function (data) {
                   console.log("Successfully Subscribed");
               },
               function (error) {
                   console.log(error)
                   if (error.error) {
                       console.log(error.code + ": " + error.error);
                   } else {
                       console.log('There was an error subscribing that user');
                   }
               });

       }
    });

});

