const MobileMenu = {
    init:function(){
        this.$navbarBurgers = $('.navbar-burger');
        this.$navbar = $('#navbar-mobile');
        this.$body = $('body');
        this.behavior();
    },
    behavior:function(){
        this.$navbarBurgers.each((index, el)=>{            
            $(el).on('click',()=>{                                    
                const isOpened = this.$body.hasClass('mobile-menu-opened');
                if(isOpened){
                    this.hide_menu();
                }else{
                    this.show_menu();
                }                
            })
        });
        this.$navbar.find('li').each((index, el)=>{
            $(el).on('click',()=>{
                $(el).addClass('is-active');
                $(el).siblings().removeClass('is-active');
                this.hide_menu();
            })
        })
    },
    hide_menu:function(){
        this.$body.toggleClass('mobile-menu-opened');
        setTimeout(()=>{
            this.$navbar.hide();
        },300);        
    },
    show_menu:function(){
        this.$navbar.show();
        setTimeout(()=>{
            this.$body.toggleClass('mobile-menu-opened');
        },0);          
    }
} 