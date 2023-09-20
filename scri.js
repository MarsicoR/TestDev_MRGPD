function affCateg(span) {
        
    var menuapps = document.getElementById('menu-apps');
    
    
    if(span.className == 'categ-open')
    {
        // catégorie ouverte = on ferme
        span.className = 'categ';
        menuapps.className = '';
    }
    else
    {
        // Si déjà autre ouvert, reset de la categ
        var appscat = document.getElementsByClassName('categ-open');
        if(appscat && appscat[0])
        {
            appscat[0].className = '';
        }
        
        span.className = 'categ-open';
        menuapps.className = 'aff';
    
        // Affichage du contenu du menu 
        var appscat = document.getElementsByClassName('apps-categ-aff');
        if(appscat && appscat[0])
            appscat[0].className = 'apps-categ';
            
        if(document.getElementById('apps-'+span.id))
            document.getElementById('apps-'+span.id).className = 'apps-categ-aff';
    }
    
}


function selectOrga(select) 
{
    loader(true);
    window.location.href = select.value;
    
}



function switchMenu()
{
    var page = document.getElementsByClassName('page')[0];
    
    if(page.getAttribute('minimenu'))
    {
        page.removeAttribute('minimenu');
    }
    else
    {
        page.setAttribute('minimenu', '1');
    }
}




function affSection(btn)
{
  var sects = document.getElementsByClassName('ssection');  
  
  var btns = document.getElementsByClassName('button-progress');    
  
  if(btn.hasAttribute('sel')) // Si déjà selectionné : on affiche tout
  {
    for(var i=0; i<btns.length; i++)
    {  
      btns[i].style.background = '';
      btns[i].style.color = '';
      btns[i].removeAttribute('sel');
    }
  
    for(var i=0; i<sects.length; i++)
      sects[i].style.display = '';
  
    btn_sel = null;
  }
  else // Sinon on filtre sur cette section
  {
    for(var i=0; i<btns.length; i++)
    {  
      btns[i].style.background = '';
      btns[i].style.color = '';
      btns[i].removeAttribute('sel');
    }
        
    for(var i=0; i<sects.length; i++)
      sects[i].style.display = 'none';
    
    document.getElementsByClassName(btn.id.replace('btn_',''))[0].style.display = '';
          
    btn.setAttribute('sel','1');
  
    btn_sel = btn.id;
  }
}


function refreshProg()
{
    try 
    {
        let fields = document.getElementsByClassName('fields-prog');
        if(fields && fields[0])
        {
            let inputs = fields[0].getElementsByTagName('input');
            
            if(inputs.length>0)
            {
                for(let i=0; i<inputs.length; i++)
                {  
                    let id = inputs[i].getAttribute('data-vdp-sysname');
                    
                    let prog = document.getElementById(id);
                    
                    prog.innerText = (inputs[i].value == '' ? 0 : inputs[i].value) + '%';
                    
                    prog.parentNode.getElementsByClassName('progressbar')[0].style.width = inputs[i].value + '%';
                }
            }
            else	// en lecture seule c'est des div		
            {
                let divs = fields[0].getElementsByTagName('div');
                
                for(let i=0; i<divs.length; i++)
                {  
                    let id = divs[i].getAttribute('data-vdp-sysname');
                    if(id)
                    {
                        let prog = document.getElementById(id);
                        
                        prog.innerText = (divs[i].innerText == '' ? 0 : divs[i].innerText) + '%';
                        
                        prog.parentNode.getElementsByClassName('progressbar')[0].style.width = divs[i].innerText + '%';
                    }
                }
            }
        }
    }
    catch(e)
    {
        console.error(e);
    }
}


function AffParams() 
{
    try 
    {
        let menu = document.getElementById('params-admin');
        
        if(menu.style.maxHeight == '0px' || menu.style.maxHeight == '')
        {
            document.getElementById('params-bell').style.maxHeight = '0px';
            document.getElementById('params-bell').style.overflow = 'hidden';
            menu.style.maxHeight = '800px';
            menu.style.overflow = 'visible';
        }
        else
        {
            menu.style.maxHeight = '0px';
            menu.style.overflow = 'hidden';
        }
    }
    catch(e)
    {
        console.error(e);
    }
}

function AffNotifs() 
{
    try 
    {
        // Affichage
        let menu = document.getElementById('params-bell');
        
        if(menu.style.maxHeight == '0px' || menu.style.maxHeight == '')
        {
            if(document.getElementById('params-admin'))
            {
                document.getElementById('params-admin').style.maxHeight = '0px';
                document.getElementById('params-admin').style.overflow = 'hidden';
            }
            menu.style.maxHeight = '300px';
            menu.style.overflow = 'auto';
        }
        else
        {
            menu.style.maxHeight = '0px';
            menu.style.overflow = 'hidden';
        }
    }
    catch(e)
    {
        console.error(e);
    }
}



function InitNotifs()
{
    try 
    {		
        console.log('InitNotifs');
        let notifs = false;
        let menuapp = document.getElementById('menu-apps');
        
        if(document.getElementById('params-bell').innerText == '')
        {
            // Récupération des tuiles avec notifs pour la cloche
            let tiles = menuapp.getElementsByClassName('tile');
            
            for(let i=0; i<tiles.length; i++)
            {
                let counter = tiles[i].getElementsByClassName('notif-counter');
                if(counter && counter[0] && counter[0].innerText != '' && counter[0].innerText != '0')
                {
                    document.getElementById('params-bell').appendChild(tiles[i].cloneNode(true));
                    notifs = true;
                }
            }
        }

        if(notifs)
        {
            document.getElementById('bell-notif').style.display = 'block';
        }
        else
        {
            document.getElementById('btn-bell').onclick = '';
        }
    }
    catch(e)
    {
        console.error(e);
    }
}




function InitMenu()
{
    try 
    {
        // mode mini auto sous les 1200px
        if(window.innerWidth < 1200 
            && document.getElementsByClassName('page') 
                && document.getElementsByClassName('page')[0]
                    && !document.getElementsByClassName('page')[0].getAttribute('minimenu'))
            switchMenu();
            
    }
    catch(e)
    {
        console.error(e);
    }
}




 window.addEventListener('resize', InitMenu);

 InitMenu();





function InitTabs() 
{

    //Documents "new"
    var elts = document.getElementsByClassName('lien-doc');
    var date7 = Date.now() - (7 * 24 * 60 * 60 * 1000);

    for(var i=0; i<elts.length; i++)
    {
        if(elts[i].getAttribute('ts') > date7)
            elts[i].setAttribute('class', 'lien-doc new');
    }

    /////////////////// RIPPLE EFFECT ///////////////////
    $('.ripple').on('click', function (e) 
    {
        $(this).find('.ripple-after').remove();
        $(this).append('<div class="ripple-after"></div>');
        var ripple = $(this).find('.ripple-after');
        ripple.removeClass('animate');
        var x = parseInt(e.pageX - $(this).offset().left) - (ripple.width() / 2);
        var y = parseInt(e.pageY - $(this).offset().top) - (ripple.height() / 2);
        ripple.css({top: y, left: x}).addClass('animate');
    });


    /////////////////// TABS  ///////////////////
    $('.tabgroup > div').hide();
    
    $('.tabgroup > div:first-of-type').show();
    
    $('.mi-tabs span').click(function(e)
    {
        e.preventDefault();
        var $this = $(this),
        tabgroup = '#'+$this.parents('.mi-tabs').data('tabgroup'),
        others = $this.closest('li').siblings().children('span'),
        target = $this.attr('tab');
        others.removeClass('link-active');
        $this.addClass('link-active');
        $('.tabgroup').children('div').hide();
        $(target).show();
    });

    document.getElementsByClassName('sidebar-link')[0].click();


}


function AdminDemoBtn(btn)
{
    let input = btn.parentNode.getElementsByTagName('input')[0];
    input.click();
    return false;
}




function InitBiblio()
{
    try
    {
        let menu = document.getElementsByClassName('folders')[0];
        let lis = menu.getElementsByTagName('li');
        
        for(let i=0; i<lis.length; i++)
        {
            let li = lis[i];
            let span = li.getElementsByTagName('span')[0];
            
            if(li.hasAttribute('files'))
            {
                span.addEventListener('click', ClickFolder);
            }
            
            if(li.hasAttribute('collapsed'))
            {
                let uls = li.getElementsByTagName('ul');
                if(!uls || uls.length == 0 || uls[0].childNodes.length == 0) // Pas de sous-dossiers
                {
                    if(li.hasAttribute('files'))
                        li.removeAttribute('collapsed');
                    else // Pas de sous-dossiers ou de fichiers : on désactive
                        li.style.display = 'none';
                }
                else
                    span.addEventListener('click', CollapseFolder);
            }
        }
    }
    catch(e)
    {
        console.error(e.stack);
    }
}