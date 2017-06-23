/**
 * Created by POL on 12/06/2017.
 */
(function ($) {
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
            .signInWithPopup(googleProvider).then(function (result) {
            let token = result.credential.accessToken;
            let user = result.user;
            let uid = result.user.uid;
<<<<<<< HEAD
            let email = result.user.email;
            let displayName = result.user.displayName;
            $('.cta-content').html('<p>Bravo, vous êtes inscrits dans la Ruuche. A bientôt pour la sortie officielle du site.</p>');
            /*Add to firebase database*/
            writeUserNews(uid, email, displayName);
=======
            let mail = result.user.email;
            $('.cta-content').html('<p>Bravo, vous êtes inscrits chez La Ruuche. A bientôt pour la sortie officiel du site.</p>');
            /*Send email*/
>>>>>>> dev/edouard


        }).catch(function (error) {
            let errorCode = error.code;
            let errorMessage = error.message;

            console.log(error.code);
            console.log(error.message);
        });
    }

    let facebookProvider = new firebase.auth.FacebookAuthProvider();
<<<<<<< HEAD
    facebookProvider.addScope('email');
    function fbSignin(){
        firebase.auth().signInWithPopup(facebookProvider).then(function(result) {
=======

    function fbSignin() {
        firebase.auth().signInWithPopup(facebookProvider).then(function (result) {
>>>>>>> dev/edouard

            let token = result.credential.accessToken;
            let user = result.user;
            //Sign with Google add Beta User in firebase
            let uid = result.user.uid;
<<<<<<< HEAD
            let email = result.user.email;
            let displayName = result.user.displayName;

            $('.cta-content').html('<p>Bravo, vous êtes inscrits dans la Ruuche. A bientôt pour la sortie officielle du site.</p>');
            /*Add to firebase database*/
            writeUserNews(uid, email, displayName);
        }).catch(function(error) {
=======
            let mail = result.user.email;
            $('.cta-content').html('<p>Bravo, vous êtes inscrits chez La Ruuche. A bientôt pour la sortie officielle du site.</p>');
            /*Send mail*/

        }).catch(function (error) {
>>>>>>> dev/edouard

            let errorCode = error.code;
            let errorMessage = error.message;

            console.log(error.code);
            console.log(error.message)
        });
    }

    let connectDatabaseApi = function () {
        $.ajax({
            type: "POST",
            url: "https://api.opendata.onisep.fr/api/1.0/login",
            data: {email: 'e.thieffry62930@gmail.com', password: 'BakeOn_2'},
            dataType: 'json',
            success: function (json) {
                console.log(json);
                let token = database.ref("token");
                token.set(json.token);
            }
        });
    };

    let checkTokenDatabase = function () {
        let dateToken = database.ref("dateAccesToken");
        dateToken.once('value').then(function (snapshot) {
            let date = snapshot.val();
            if (!date) {
                connectDatabaseApi();
                var a = moment().add(1, 'day').toJSON();
                dateToken.set(a);
            } else {
                if (moment().isBefore(date)) {
                } else {
                    connectDatabaseApi();
                }
            }
        })
    };

    $('.content').on('click', "#fb-connect", function (e) {
        e.preventDefault();
        fbSignin();
    });
    $('.content').on('click', '#google-connect', function (e) {
        e.preventDefault();
        googleSignin();
    });

    let body = $('body');

    body.on('click', '.playVideoInLightbox, #closeLightboxVideo, .lightbox-shadow', function () {
        body.toggleClass('lightbox-open');
        var currentVideo = $('.lightbox-container video')[0];
        console.log(currentVideo);
        if (currentVideo.paused) {
            currentVideo.play();
        } else {
            currentVideo.pause();
        }
    });

    body.on('click', '.get-more', function () {
        console.log('get more');
        var target = $(this).data('target');
        console.log(target);
        $(this).toggleClass('open');
        $('.school-' + target + '').toggleClass('open');
        $('.school-' + target + ' .more').toggleClass('hide');
    });

    body.on('click', '#search', function () {
        checkTokenDatabase();
    });
    body.on('click', '#recherche', function () {
        var a = $('#search').val();
        let token = database.ref("token");
        token.once('value').then(function (snapshot) {
            let tokenNumber = snapshot.val();
            console.log(tokenNumber);
            $.ajax({
                type: "GET",
                headers: {
                    Accept: 'application/json',
                    Authorization: tokenNumber
                },
                url: 'https://api.opendata.onisep.fr/api/1.0/dataset/57daa4c40a4e7/search',
                data: {
                    q: a,
                    size: 10,
                },
                dataType: 'json',
                success: function (json) {
                    console.log(json);
                    var html = '';
                    if (json.results.length > 0) {
                        for (var i = 0; i < json.results.length; i++) {
                            var b = json.results[i].code_rome;
                            console.log(b);
                            $.ajax({
                                type: "GET",
                                headers: {Accept: 'application/json'},
                                url: 'https://api.opendata.onisep.fr/api/1.0/dataset/lheo/search?q=' + b + '&size=10',
                                dataType: 'json',
                                success: function (json) {
                                    html += '<div>formation' + i + '</div>';
                                }
                            });
                        }
                    }
                    else {
                        $('#results').html('<h1>no results</h1>');
                    }

                }
            });
        })
    });

    /*Number of users*/
    //Ajout d'un visiteur dans la base
    let countVisit = setTimeout(function () {
        //Save in firebase number of visitors
        let visitStats = database.ref("totalVisitors");
        visitStats.once('value').then(function (snapshot) {
            let nVisitors = snapshot.val();
            visitStats.set(nVisitors + 1);
        })
    }, 5000);

    /*Add users in newsletter*/
    function writeUserNews(uid,email,displayName){
        firebase.database().ref('users/' + uid).set({
            email: email,
            displayName: displayName
        });
    }

})(jQuery);