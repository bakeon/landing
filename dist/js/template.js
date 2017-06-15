(function () {

    let templating = [
        {
            type : 'video',
            url : '',
            title:'',
            pictogramme:''
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
    function loadTemplate() {
        console.log(context.length);
        $.get('views/header.mst', function(template) {
            let rendered = Mustache.render(template);
            $('#header').html(rendered);
        });
        for(let i=0 ; i<= templating.length-1 ; i=i+1 ){
            $('#main').append('<div id="'+templating[i].type+i+'" class="'+templating[i].type+'"></div>');
        }
        for(let i=0 ; i<= templating.length-1 ; i=i+1 ){
            $.get('views/'+templating[i].type+'.mst',function(template){
                let view = templating[i];
                console.log(view);
                let rendered = Mustache.render(template,view);
                $('#'+templating[i].type+i+'').html(rendered);
            });
        }
    }
})(jQuery);