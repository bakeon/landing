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
    let database = firebase.database();

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
            let uid = result.user.uid;
            let mail = result.user.email;
            $('.cta-content').html('<p>Bravo, vous êtes inscrits chez GuideBook. A bientôt pour la sortie officiel du site.</p>');
            /*Send email*/


        }).catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log(error.code);
            console.log(error.message);
        });
    }

    let facebookProvider = new firebase.auth.FacebookAuthProvider();
    function fbSignin(){
        firebase.auth().signInWithPopup(facebookProvider).then(function(result) {

            let token = result.credential.accessToken;
            let user = result.user;
            //Sign with Google add Beta User in firebase
            let uid = result.user.uid;
            let mail = result.user.email;
            $('.cta-content').html('<p>Bravo, vous êtes inscrits chez GuideBook. A bientôt pour la sortie officiel du site.</p>');
            /*Send mail*/

        }).catch(function(error) {

            let errorCode = error.code;
            let errorMessage = error.message;

            console.log(error.code);
            console.log(error.message)
        });
    }

    $('.content').on('click', "#fb-connect", function (e) {

        e.preventDefault();
        fbSignin();
    });
    $('.content').on('click', '#google-connect', function (e) {
        e.preventDefault();
        googleSignin();
    });

    let body = $('body');

    body.on('click','#playVideo',function () {
       $('#lightboxVideo').removeClass('hide');
    });
    body.on('click','#closeLightboxVideo,.lightbox-container',function () {
        $('#lightboxVideo').addClass('hide');
        $('video')[0].pause();
    });


    /*Number of users*/
    //Ajout d'un visiteur dans la base
    let countVisit = setTimeout(function(){
        //Save in firebase number of visitors
        let visitStats = database.ref("totalVisitors");
        visitStats.once('value').then(function (snapshot) {
            let nVisitors = snapshot.val();
            visitStats.set(nVisitors + 1);
        })
    },5000);

})(jQuery);