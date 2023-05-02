const express = require("express");
const router = express.Router();
const session = require("cookie-session");
const Admin = require("../models/myModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { stringify } = require("querystring");


router.use(
  session({
      login: false,
      cerrar:false,
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true },
  })
);

router.get("/", async (req, res, next) => {
  return res.status(200).render("home",{session:req.session.login});
});

router.get("/login", async (req, res, next) => {
  return res.status(200).render("login",{session:req.session.login});
});

router.post("/login", (req, res) => {
  Admin.find({ apellido :1  }, (err, docs) => {
      if(req.body.usuario != docs[0].usuario){
        console.log("USUARIO INCORRECTO");
        return res.status(200).render("login",{session:req.session.login});
      }
      else{
          bcrypt.compare(req.body.contraseña,bcrypt.hashSync(docs[0].contraseña, 5),(err, resul) => {
            
              if (err) throw console.log(err);;
              
              if (resul) {
                req.session.login = true;
                    res.status(200).redirect("/");         
              }     
              else {
                  req.session.login = false;
                  onsole.log("CONTRASEÑA INCORRECTA");
                  return res.status(200).render("login",{session:req.session.login});
              }
          });
      }
  }); 
});

router.get("/cerrarsesion", async (req, res, next) => {
  if(req.session.login){
    req.session.login = false;
    res.status(200).redirect("/");  
  }
});

router.get("/carrito", async (req, res, next) => {
  if(req.session.login){
  Admin.find({ apellido :1  }, (err, docs) => {
  return res.status(200).render("carrito",{carro:docs[0].carrito,session:req.session.login});
  });
  }
  else{
    return res.status(200).render("carrito",{carro:"No hay productos en tu carrito",session:req.session.login});
  }
});

router.get("/favoritos", async (req, res, next) => {
  if(req.session.login){
    Admin.find({ apellido :1  }, (err, docs) => {
    return res.status(200).render("favoritos",{favoritos:docs[0].favoritos,session:req.session.login});
    });
    }
    else{
      return res.status(200).render("favoritos",{favoritos:"No hay productos en favoritos",session:req.session.login});
    }
});

module.exports = router;
