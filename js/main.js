/**
 * Created by POL on 12/06/2017.
 */
(function($){
    /**
     * Firebase initialization
     */
    let config = {
        apiKey: "AIzaSyAVWhbN4iOGAFi_jOHntgcX42_UIR9bgIk",
        authDomain: "laruuche.firebaseapp.com",
        databaseURL: "https://laruuche.firebaseio.com",
        projectId: "laruuche",
        storageBucket: "laruuche.appspot.com",
        messagingSenderId: "566779256624"
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
            let email = result.user.email;
            let displayName = result.user.displayName;
            $('.cta-content').html('<p>Bravo, vous êtes inscrits dans la Ruuche. A bientôt pour la sortie officielle du site.</p>');
            /*Add to firebase database*/
            writeUserNews(uid, email, displayName);


        }).catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log(error.code);
            console.log(error.message);
        });
    }

    let facebookProvider = new firebase.auth.FacebookAuthProvider();
    facebookProvider.addScope('email');
    function fbSignin(){
        firebase.auth().signInWithPopup(facebookProvider).then(function(result) {

            let token = result.credential.accessToken;
            let user = result.user;
            //Sign with Google add Beta User in firebase
            let uid = result.user.uid;
            let email = result.user.email;
            let displayName = result.user.displayName;

            $('.cta-content').html('<p>Bravo, vous êtes inscrits dans la Ruuche. A bientôt pour la sortie officielle du site.</p>');
            /*Add to firebase database*/
            writeUserNews(uid, email, displayName);
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

    /*Add users in newsletter*/
    function writeUserNews(uid,email,displayName){
        firebase.database().ref('users/' + uid).set({
            email: email,
            displayName: displayName
        });
    }

})(jQuery);