exports.get404 = (req,resp,next)=>{
    resp.status(404).render('404',{pagetitle:'Page Not Found',path:'/404'});
    }