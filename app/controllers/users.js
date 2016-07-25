
/*!
 * Module dependencies.
 */
var mongoose = require('mongoose')
var wrap = require('co-express')
var User = mongoose.model('User')
// var cloudinary = require().v2;

var cloudinary = require('cloudinary');
//console.log('@users.js   __dirname'+__dirname);


exports.login = function (req, res) {
    res.render('login', { title: 'Login' });
};
exports.get_pop_up = function (req, res){
   console.log('@ get_pop_up  @ users.js');
   console.log('req.params  is ' + JSON.stringify(req.params));
 
   //console.log('req.params  is ' + req.params.req_msg);
   console.log('typeof ' +  typeof req.params);
   var friend_req_info = {'username':req.params.username_0,
                          'user_id': req.params.request_id
                         };
   //console.log('typeof  req.params is ' +  typeof req.params.req_msg);
   //var friend_req_info =  JSON.parse(req.params);
   //console.log('friend_req_info  (After parsed )  :' +friend_req_info + ' typeof is :' + typeof friend_req_info);
   //console.log('req.params  is ' + req.params.req_msg._id);
   //console.log('user_1_name' + JSON.stringify(user_1_name) );
   //console.log('req.params :::'    + JSON.stringify(req.params));
    res.render('pop-up', {friend_req_info : friend_req_info });


};
// The following function allows username_0 to add username_1
// remove usename_1 from username_0's pendingFriendList and 
// Move it to friendList
// After that redirect to userprofile page 

exports.acceptfriend = function(req, res){
    console.log('@ users :: acceptfriend ');
    console.log('req.params :::'    + JSON.stringify(req.params));
    console.log('req.params.accept_user_id is :'+ JSON.stringify(req.params.accept_user_id));
    var doc = req.user.awaitingFridendList.id(req.params.accept_user_id);
    console.log('From list '   + JSON.stringify(doc));
    console.log('**');
    console.log('**');
    console.log('**');
    console.log('**');
    console.log(' Before :req.user.friendList' + JSON.stringify(req.user.friendList) );
    // Steps ::
    //         1. findOne this user, get profile picture link 
    //         2. Save retrived data and push it into req.user.friendList ==>  save
    //         3. Remove this user from awaitingFridendList  ==> save 
    //         4. Inform the user has been accpeted pendingFriendList to friendList 
        User.find({username: doc.userName},function(err, result_user){
            var date_since_friend = Date.now();
           console.log('result_user :  ' + JSON.stringify(result_user));
           req.user.friendList.push({
                                     friend_profile_photo: result_user.user_profile_photo,
                                     username: doc.userName,
                                     date: date_since_friend

        
                                    });
        // save 
        req.user.save(function (err){
           if (err) console.log('@ users  @ acceptfriend  failed when save user ');
           console.log('Success');
           console.log('**');
           console.log('**');
           var check_id; 
           // Implemente ref later  
           var arrayLength = result_user.pendingFriendList.length;
            for (var i = 0; i < arrayLength; i ++ ){
               if(   req.user.username === result_user.pendingFriendList[i].userName ) {
                    check_id = result_user.pendingFriendList[i]._id;
                    console.log('check_id ::' + check_id);
                    break;

               }
            }
            // If check_id !== undefined
            // Reverse to insert into result_user 
            result_user.friendList.push({
                                            friend_profile_photo: req.user.user_profile_photo,
                                            username: req.user.username,
                                            date: date_since_friend

        
                                    });

            
           



        });
        // Remove from 

        


    });





}; 





//  This routing is used to test flat-ui
exports.testui = function (req, res){
   console.log(' @users.js This routing is used to test flat-ui::');
   res.render('testuipage');
};
exports.testone = function(req, res){
  console.log(' @testone ');
  res.render('testone');
};

// req.user add user 
// exports.addfriend = wrap (function* (req, res, next, user_1_info){

//      console.log('@ addfriend  @ users.js');
//      console.log('user_1_info' + user_1_info);
//      console.log('req  ::');
//      console.log('req  ::');
//      console.log('req.parmas  ::');
//      console.log(JSON.stringify(req.params));

// });
exports.addfriend =  function(req, res){

   console.log('@ addfriend  @ users.js');
   //console.log('user_1_name' + JSON.stringify(user_1_name) );
   console.log('req.body :::'    + JSON.stringify(req.params));
   console.log('req.user :::'    + JSON.stringify(req.user));
   // addfriend(user_0_name, user_1_name) user_0 is whoever make request, user_1 is who are going to accept request 


//    User.addfriend();
 // Following line is disbaled 
  // req.user.pendingFriendList.push({userName: req.params.username_1});
   //req.user.save();
   // Send Request
   
   sendRequest(req.params.username_0,req.params.username_1);
   console.log('req.user :::'    + JSON.stringify(req.user));


};
// // accept as a friend 
// exports.acceptfriend = function(req, res){
//   console.log('@ acceptuser @ users.js  ');

// };
// How I hdndled pending user 
// Created another array can 
exports.get_search_results = function(req, res){
    // console.log('req.body.content   is');
    // console.log(req.body.content);
           console.log('req.isAuthenticated) ::'+ JSON.stringify(req.isAuthenticated));
           var names = [];
           console.log('req.user'+JSON.stringify(req.user));
     if ( typeof req.user != 'undefined'){
           var arrayLength = req.user.pendingFriendList.length;
            for (var i = 0; i < arrayLength; i ++ ){
              names.push(req.user.pendingFriendList[i].userName);
              console.log(names[i]);
              console.log('In the loop');
            }
     }

    console.log(req.body.query_input);
    var key_word_for_search = req.body.query_input;
    User.find({username: new RegExp(key_word_for_search, "i")},function(err, result_user_by_keyword){
         console.log('@ testReq              result_user_by_keyword    ');
         console.log(JSON.stringify(result_user_by_keyword));
         var title = 'Display search results';
         //console.log('TYPEOF      '+JSON.stringify(typeof(result_user_by_keyword)));
         //if (result_user_by_keyword == '') console.log('NULL')
         if(result_user_by_keyword == null) console.log('NULL')
         res.render('searchresults', 
         {    
             title: title,
             names: names,
             results:result_user_by_keyword 

         }
        );
    });
    //res.render('searchbar');
};

exports.session = login;

function login(req, res) {
    console.log('users.session at users.js');
    console.log('req.body.username  :::: '+ req.body.username)
    res.redirect('/users/'+ req.body.username);
}

exports.signup = function(req, res){
    console.log('@users.js :: req.baseUrl for signup   '+ req.baseUrl);
    console.log('---->signup page');
    res.render('signup',{
        title: 'create a new account'
        // user: new User()
    });
    
};
exports.testten = wrap(function* (req, res){
    console.log();
    console.log();
    console.log();
    console.log('@ users @ testten');
    test15();
    console.log('Back to testten now');
    
});
function sendRequest(username_0, username_1){
   
    console.log('sendRequest' + JSON.stringify(username_0));
    //var options =  {username:username_1};
   User.findOne({'username':username_1},function(err, result_user){
     console.log(JSON.stringify(result_user));
     result_user.awaitingFridendList.push({userName: username_0} );
   console.log('++++++++++++++++++++++++++');
   console.log('++++++++++++++++++++++++++');
   console.log('++++++++++++++++++++++++++');
   console.log('++++++++++++++++++++++++++');
   console.log('++++++++++++++++++++++++++');
   console.log('++++++++++++++++++++++++++');

     console.log(JSON.stringify(result_user));
     result_user.save();
   });
    //User.findOne({username:username_1 });
    //var thisUser = User.load();
    //console.log('thisUser    is'+ JSON.stringify(thisUser));
    //thisUser.awaitingFridendList.push({userName: username_0});
    //thisUser.save();
       // 
   // console.log('After saved thisUser   :');
   // console.log(JSON.stringify(thisUser));
    return; 


}




// Using passort logout



exports.logout = wrap ( function* (req, res){
    console.log('@users.js:: users.logout');
    req.logout();
    res.redirect('/');

});

exports.getUpload = wrap( function*(req, res){
    res.render('uploadprofile',{title: 'Upload new profile photo'});
     


});
exports.displayUser = wrap( function* (req, res, next){
    if (!req.isAuthenticated()) {
      //console.log('@displayUser  @users.js ::' +'PLZ LOGIN');
      res.redirect('/login');
    };
    console.log('@users.displayUser ---> req.user  :' + JSON.stringify(req.user));
    console.log('@users.displayUser ---> req.profile  :: '+ JSON.stringify(req.profile));
     var user = req.user;
    //var user = req.profile;
    console.log('@users.loadUser :: user.username:::'+ user.username);
    //Horizontal Access Control::
    console.log('user._id is :::'+user._id);
    console.log('req.user._id  is ::'+req.user._id);

    if (req.user.username   ===  user.username ){
        console.log('req.user.username   ==  user.username ');
       res.render('userprofile',{user:user});
    }
    
        console.log('@displayUser @users.js   '+'NOT SAME USER ');
        //const another_user_profile = [{"email":user.email, "user_profile_photo":user.user_profile_photo}];
        //console.log('another_user_profile @displayUser    ');
        //console.log();
        //console.log();
        //console.log(JSON.stringify(another_user_profile));

});
exports.uploadPhoto = wrap(function *(req, res, next){
     console.log('@ users.uploadPhoto');

     cloudinary.uploader.upload(req.file.path, function(result) { 
       var new_profile_URL = result.secure_url;
       console.log('new_profile_URL    ::'+new_profile_URL);

       console.log('_user_id     :'+req.user._id);
       User.findByIdAndUpdate(req.user._id, { $set: {user_profile_photo:new_profile_URL}}, function(err, result_user){
           console.log('AFTER UPDATE::'+result_user.user_profile_photo);
           res.redirect('/users/'+result_user.username);

       });
     });

});
exports.loadUser = wrap (function*(req, res, next, username ){
    const criteria = {username: username};
    console.log('username is at users.loadUser :: ' + username);
    User.findOne(criteria, function(err, result_user){
        req.profile = result_user
        if (!req.profile){
            console.log('!req.profile')
            return next(new Error('User not found'));
        }
        console.log('result_user is at users.loadUser ::'+JSON.stringify(result_user));
        next();
        

    });
});



exports.createuser = wrap (function* (req, res) {
  console.log('users.ts ::==> createuser')
   console.log('req.body.unhashed_passowrd is'+ JSON.stringify(req.body.unhashed_password))
   const user = new User(req.body)
   user.provider = 'local';
   yield user.save()
   console.log(JSON.stringify(user))
   console.log('Try to find this user from db');
   console.log('Now user._id ::'+ user._id)
   User.findOne({'_id':user._id},function(err, result_user){
     console.log(JSON.stringify(result_user))
   });
   
       req.logIn(user, err => {
        if (err)
            req.flash('info', 'Sorry! We are not able to log you in!');
        return res.redirect('/');
    });
  
});
