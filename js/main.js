/**
 * Created by POL on 12/06/2017.
 */
(function($){
    /**
     * Firebase initialization
     */
    let config = {
        apiKey: "AIzaSyD-GvA3P8duVu7xi1xCfHnKy8lRU3fowWA",
        authDomain: "bakeon-landing.firebaseapp.com",
        databaseURL: "https://bakeon-landing.firebaseio.com",
        projectId: "bakeon-landing",
        storageBucket: "bakeon-landing.appspot.com",
        messagingSenderId: "260657155203"
    };
    firebase.initializeApp(config);

    /**
     * Google Firebase Auth
     * @type {firebase.auth.GoogleAuthProvider}
     */
    let googleProvider = new firebase.auth.GoogleAuthProvider();
    function googleSignin() {
        firebase.auth()
            .signInWithPopup(googleProvider).then(function(result) {
            let token = result.credential.accessToken;
            let user = result.user;
            //Sign with Google add Beta User in firebase
            let uid = result.user.uid
            let mail = result.user.email;
            let from = "Google";
            writeUserSubscribe(uid, mail, from);
            $('.cta-content').html('<p>Bravo, vous êtes inscrits chez GuideBook. A bientôt pour la sortie officiel du site.</p>');


        }).catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log(error.code)
            console.log(error.message)
        });
    }

    let facebookProvider = new firebase.auth.FacebookAuthProvider();
    function fbSignin(){
        firebase.auth().signInWithPopup(facebookProvider).then(function(result) {

            let token = result.credential.accessToken;
            let user = result.user;
            //Sign with Google add Beta User in firebase
            let uid = result.user.uid
            let mail = result.user.email;
            let from = "Facebook    ";
            writeUserSubscribe(uid, mail, from);
            $('.cta-content').html('<p>Bravo, vous êtes inscrits chez GuideBook. A bientôt pour la sortie officiel du site.</p>');

        }).catch(function(error) {

            let errorCode = error.code;
            let errorMessage = error.message;

            console.log(error.code)
            console.log(error.message)
        });
    }

    $('#fb-connect').on('click',function (e) {
        console.log('ok');
        e.preventDefault();
        fbSignin();
    });

    $('#google-connect').on('click',function (e) {
        e.preventDefault();
        googleSignin();
    });

    function writeUserSubscribe(uid,mail,from){
        firebase.database().ref('subscribers/' + uid).set({
            mail: mail,
            from: from
        });
    }

    /*Number of users*/


})(jQuery);