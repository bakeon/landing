(function () {

    let templating = [
        {
            type : 'video',
            url : 'https://www.youtube.com/watch?v=_KztNIg4cvE',
            title:'The video Title',
            icon:'play'
        },
        {
            type:'doubleArticle',
            titleSection:'titre de la section',
            direction:'row',
            articles: {
                first:{
                    titre:'un titre',
                    paragraphe:'un paragraphe',
                    icon:''
                },
                second:{
                    titre:'un titre2',
                    paragraphe: 'un paragraphe 2',
                    icon: ''
                }
            }
        },
        {
            type : 'subscribe',
            title: 'Subscribe to our newsletter'
        }
    ];


    let sectionHeight;

    let loadTemplate = function() {
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
    loadTemplate();
})(jQuery);