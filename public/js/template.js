(function () {

    let templating = [
        {
            type : 'video',
            url : 'https://www.youtube.com/watch?v=_KztNIg4cvE',
            title:'The video Title',
            pictogramme:'play'
        },
        {
            type:'doubleArticle',
            titleSection:'titre de la section',
            direction:'row',
            articles: {
                first:{
                    titre:'',
                    paragraphe:'',
                    pictogramme:''
                },
                second:{
                    titre:'',
                    paragraphe: '',
                    pictogramme: ''
                }
            }
        },
        {
            type : 'subscribe'
        }
    ];


    var windowHeight = $(window).height();
    var sectionHeight = windowHeight - 100;

    var resizePage = function () {

    };

    var loadTemplate = function() {
        console.log(templating.length);
        $.get('views/header.mst', function(template) {
            let rendered = Mustache.render(template);
            $('header').html(rendered);
        });
        for(let i=0 ; i<= templating.length-1 ; i=i+1 ){
            $('main').append('<div id="'+templating[i].type+i+'" class="'+templating[i].type+' section"></div>');
        }
        for(let i=0 ; i<= templating.length-1 ; i=i+1 ){
            $.get('views/'+context[i].type+'.mst',function(template){
                let view = context[i];
                console.log(view);
                let rendered = Mustache.render(template,view);
                $('#'+context[i].type+i+'').html(rendered);
            });
        }
    }
    loadTemplate();
})(jQuery);