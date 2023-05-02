const express = require("express");
const router = express.Router();
const session = require("cookie-session");
const Admin = require("../models/myModel");
const User = require("../models/userModel");
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
                  console.log("CONTRASEÑA INCORRECTA");
                  return res.status(200).render("login",{session:req.session.login});
              }
          });
      }
  }); 
});

router.get("/register", async (req, res, next) => {
  return res.status(200).render("register",{session:req.session.login});
});

router.post("/register", (req, res) => {
  let fecha=req.body.fecha;
  let titulo= req.body.titulo;
  let descripcion = req.body.descripcion;
  let imagen;
  let enlace = req.body.enlace;
  let tag = req.body.tag;

  User.findOne().sort({id: -1}).exec(function(err, post) {   
    let posteo = new PostModel({
      id:idPosts+1,
      fecha: fecha,
      titulo: titulo,
      descripcion: descripcion,
      imagen: result.url,
      enlace: enlace,
      tags: tag,
    });  
    posteo.save((err,db)=>{
      if(err){
        console.log(err);
        res.status(200).render("index", {isLogin: 8,login: req.session.login, cerrar:0, contactSweet:false }); 
      } 
      else{
        res.status(200).render("index", {isLogin: 7,login: req.session.login, cerrar:0, contactSweet:false }); 
      } 
    })
  }); 

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
                  console.log("CONTRASEÑA INCORRECTA");
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
