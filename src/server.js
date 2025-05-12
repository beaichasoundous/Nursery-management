import express from 'express'
import path from 'path'
import {dirname} from 'path'
import { fileURLToPath } from 'url'
import mysql from 'mysql2/promise'

const app = express()
const PORT = process.env.PORT 


    //to get the files from the in same project file
    const __filename = fileURLToPath(import.meta.url);

    //to select the folder that contine the file name 
    const __dirname = dirname(__filename)


    app.use(express.json())//Middleware to parse 

    //middleware to select the directory public
    app.use(express.static(path.join(__dirname,'../public')));


    // endpoint to uploading the homePage 
    app.get('/',(req,res)=>{
      try{  
        res.sendFile(path.join(__dirname,'../public','homePage.html'))
      }catch (err) {
        console.error('Error serving homePage.html:', err);
        res.status(500).send('Error loading  the page');
    }})

    // endpoint to uploading the programs page  
    app.get('/programs',(req,res)=>{
        try{
            res.sendFile(path.join(__dirname,'../public','programs.html'))
        }catch (err) {
            console.error('Error serving programs.html:', err);
            res.status(500).send('Error loading the page');}
    })

    // endpoint to uploading the gallery page
    app.get('/gallery',(req,res)=>{
       try{
        res.sendFile(path.join(__dirname,'../public','gallery.html'))
       }catch (err) {
        console.error('Error serving gallery.html:', err);
        res.status(500).send('Error loading  the page');}
    })

    // endpoint to uploading the apply now page
    app.get('/applynow',(req,res)=>{
        try{
        res.sendFile(path.join(__dirname,'../public','applyNow.html'))
        }catch (err) {
            console.error('Error serving applyNow.html:', err);
            res.status(500).send('Error loading  the page');}
    })

    // endpoint to uploading the about us page 
    app.get('/aboutUs',(req,res)=>{
        try{
        res.sendFile(path.join(__dirname,'../public','aboutUs.html'))
    }catch (err) {
        console.error('Error serving aboutUs.html:', err);
        res.status(500).send('Error loading  the page');}
    })


    
    //-----------------------the admin related pages -----------------
        
        // endpoint to uploading the admin login page 
        app.get('/ytdfkz',(req,res)=>{
            try{
            res.sendFile(path.join(__dirname,'../public','adminLogin.html'))
            }catch (err) {
                res.status(500).send('Error loading the page');}
        })

        // endpoint to uploading the admin Page 
        app.get('/ytdfkz/apage',(req,res)=>{
            try{
            res.sendFile(path.join(__dirname,'../public','adminPage.html'))
            }catch (err) {
                res.status(500).send('Error loading loading the page');}
        })

        // endpoint to uploading the children manegement Page 
        app.get('/ytdfkz/childrenmanagement',(req,res)=>{
            try{
            res.sendFile(path.join(__dirname,'../public','childrenManegement.html'))
            }catch (err) {
                res.status(500).send('Error loading loading the page');}
        })

        // endpoint to uploading the admin password reset Page 
        app.get('/ytdfkz/reset',(req,res)=>{
            try{
            res.sendFile(path.join(__dirname,'../public','adminResetPsw.html'))
            }catch (err) {
            res.status(500).send('Error loading loading the page');}
        })

    //---------------------------USER RELATED PAGES ---------------------------
        
        // endpoint to uploading the login page 
        app.get('/login',(req,res)=>{
            try{
            res.sendFile(path.join(__dirname,'../public','login.html'))
            }catch (err) {
                res.status(500).send('Error loading loading the page');}
        })
        // endpoint to uploading the child info page
        app.get('/login/childinfo',(req,res)=>{
            try{
            res.sendFile(path.join(__dirname,'../public','childInfo.html'))
            }catch (err) {
                res.status(500).send('Error loading loading the page');}
        })
    
        // endpoint to uploading the user message dashboard 
        app.get('/login/messagesdashboard',(req,res)=>{
            try{
            res.sendFile(path.join(__dirname,'../public','messagesDashboard.html'))
            }catch (err) {
                res.status(500).send('Error loading loading the page');}
        })

        // endpoint to uploading the  events page
        app.get('/login/events',(req,res)=>{
            try{
            res.sendFile(path.join(__dirname,'../public','events.html'))
            }catch (err) {
                res.status(500).send('Error loading loading the page');}
        })

        // endpoint to uploading the payment page
        app.get('/login/payment',(req,res)=>{
            try{
            res.sendFile(path.join(__dirname,'../public','payment.html'))
            }catch (err) {
                res.status(500).send('Error loading loading the page');}
        })

        



    app.listen(PORT,()=>{
        console.log(`\n Server running on port ${PORT}`)
    })