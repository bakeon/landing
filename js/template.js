(function () {

    let templatingUs = [
        {
            type:'firstCTA',
            title:'Bienvenue dans la RUUCHE',
            paragraphe:'Connecte toi à ton avenir',
            action:'Découvrir'
        },
        {
            type : 'video',
            url : 'https://www.youtube.com/watch?v=_KztNIg4cvE',
            title:'The video Title',
            icon:'play'
        },
        {
            type:'sixArticle',
            titleSection:'En quelques points...',
            direction:'row',
            articles: {
                first:{
                    titre:'Le concept',
                    paragraphe:'La ruuche te permet de prendre contact directement avec un mentor qui te conseillera sur les futurs études que tu compte entreprendre.',
                    icon:'desktop'
                },
                second:{
                    titre:'Découvrir ce quil te plait',
                    paragraphe: 'La Ruuche est le meilleurs moyen de choisir sereinement ses études supérieurs. ',
                    icon: 'pencil'
                },
                third:{
                    titre:'Même sur ton réseau social préféré',
                    paragraphe:'Tu seras connecté à ton mentor même sur Snapchat pour être en immersion total dans ta futur école.',
                    icon:'phone'
                },
                fourth:{
                    titre:'Les résultats',
                    paragraphe: 'La vie étudiante est bien remplie... La Ruuche se charge de vous simplifier la vie.',
                    icon: 'cheese'
                },
                fifth:{
                    titre:'laspect ludique',
                    paragraphe:'Qui a dit que la Ruuche était compliqué ? Un jeu denfant',
                    icon:'game'
                },
                sixth:{
                    titre:'Les témoignages',
                    paragraphe: 'Apportez une pierre à l’edifice de La Ruuche. Que du love ! ',
                    icon: 'heart'
                }
            }
        },
        {
            type : 'subscribe',
            title: 'Subscribe to our newsletter'
        }
    ];
    let templatingSearch =[
        {
            type:'search'
        }
    ];


    let sectionHeight;

    let loadTemplate = function(templating) {
        $.get('views/header.mst', function(template) {
            let rendered = Mustache.render(template);
            $('header').html(rendered);
        });
        for(let i=0 ; i<= templating.length-1 ; i=i+1 ){
            $('main').append('<div id="'+templating[i].type+i+'" class="'+templating[i].type+' section"></div>');
        }
        for(let i=0 ; i<= templating.length-1 ; i=i+1 ){
            $.get('views/'+templating[i].type+'.mst',function(template){
                let view = templating[i];
                let rendered = Mustache.render(template,view);
                $('#'+templating[i].type+i+'').html(rendered);
            });
        }
    };
    loadTemplate(templatingSearch);
})(jQuery);