(function () {

    let templateKnow = [
        {
            type:'fourthArticle',
            titleSection:'étapes',
            titleNumber:'big-four',
            direction:'layout-column-flex-start-center',
            articles: {
                first:{
                    title:'1',
                    paragraphe:'compare un grand nombre d\'écoles et compare les à tes critères',
                    icon:'search',
                    class:'layout-row-flex-start-end order-1'
                },
                second:{
                    title:'2',
                    paragraphe: 'Le mentor le plus adéquat à votre profil vous est présenté ',
                    icon: 'people',
                    class:'layout-row-flex-end-end order-2'

                },
                third:{
                    title:'3',
                    paragraphe:'Discuter et rester en contact avec lui pour partager son expérience et vous recommander sur la formation',
                    icon:'bubble',
                    class:'layout-row-flex-start-end order-1'

                },
                fourth:{
                    title:'4',
                    paragraphe: 'Trouver votre fomation idéale grâce à des avis privilégiés et concrets',
                    icon: 'smiley',
                    class:'layout-row-flex-end-end order-2'
                }
            }
        }
    ];
    let templatingSearch =[
        {
            type:'search'
        },
        {
            type:'school'
        }
    ];


    let sectionHeight;

    let loadTemplate = function(templating,header) {
        $('main').html('');
        $('header').html('');
        if(header=='know'){
            $.get('views/headerKnow.mst', function (template) {
                let rendered = Mustache.render(template);
                $('header').html(rendered);
            });
        }else{
            $.get('views/header.mst', function (template) {
                let rendered = Mustache.render(template);
                $('header').html(rendered);
            });
        }
        for (let i = 0; i <= templating.length - 1; i = i + 1) {
            $('main').append('<div id="' + templating[i].type + i + '" class="' + templating[i].type + ' section"></div>');
        }
        for (let i = 0; i <= templating.length - 1; i = i + 1) {
            $.get('views/' + templating[i].type + '.mst', function (template) {
                let view = templating[i];
                let rendered = Mustache.render(template, view);
                $('#' + templating[i].type + i + '').html(rendered);
            });
        }
    };
    var body=$('body');
    loadTemplate(templatingSearch);

    body.on('click','.know',function () {
       loadTemplate(templateKnow,'know');
    });
    body.on('click','.home',function () {
        loadTemplate(templatingSearch,'home');
    });

    let $window = $(window);
    var stopheight;
    var resizePage = function () {
        stopheight=($window.height()/2)-25;
        console.log(stopheight);
    };
    resizePage();
    $window.resize(function () {
        resizePage();
    });
    $window.scroll(function () {
        var scrollFromTop = $window.scrollTop();
        console.log(scrollFromTop);
        if(scrollFromTop>=stopheight){
            $('.extend-header').removeClass('no-scrolled');
            $('.search-bar').addClass('open');
        }else{
            $('.extend-header').addClass('no-scrolled');
            $('.search-bar').removeClass('open');
        }
    });

})(jQuery);