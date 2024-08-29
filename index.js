import express from 'express';
import bodyParser from 'body-parser';
var app = express();

const port = 3000;
var i = 0;
var home_list = [];
var edit_post_id ;
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

function randomnumber() {
    return Math.floor(Math.random() * 3);
}
function item(id, user_picture, textp) {
    this.id = id;
    this.user_picture = user_picture;
    this.textp = textp;

}
function delete_item(postid){
    for(var j = 0 ; j < home_list.length ; j++){
        if(postid == home_list[j].id){
            home_list.splice(j, 1); // Remove 1 item at index j
            break;
        }
    }
}

function edit_post(targetedpostid , replaced){
    for(var j = 0 ; j < home_list.length ; j++){
        if(targetedpostid == home_list[j].id){
            home_list[j].textp = replaced;
            break;
        }
    }
}

function find(userpostid) {
    for(var j = 0 ; j < home_list.length ; j++){
        if(userpostid == home_list[j].id){
            return home_list[j].textp;
        }
    }
  }



app.get("/", (req, res) => {
    res.render("index.ejs", {
        list: home_list,
    });
});

app.post("/New_post", (req, res) => {
    res.render("New_Post.ejs");
});

app.post("/", (req, res) => {
    res.render("index.ejs", {
        list: home_list,
    });
});

app.post("/submit-text", (req, res) => {    
    home_list.push(new item(i,randomnumber(),req.body["userInput"]));
    i++;
    res.redirect("/");
});


app.post("/remove", (req, res) => {
    var postid = req.body["postId"];
    delete_item(postid);
    res.redirect("/");
});

app.post("/edit", (req, res) => {
    edit_post_id = req.body["postId"];
    var previous_text =  find(edit_post_id);
    res.render("edit-post.ejs" , {
        current_text : previous_text
    });
});


app.post("/edit-result", (req, res) => {
    var new_text = req.body["userInput"];
    edit_post(edit_post_id , new_text);
    res.redirect("/");
});


app.listen(process.env.PORT|| port, () => {
    console.log(`server working guud at port : ${port}`);
})
