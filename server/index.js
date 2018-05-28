    let express = require("express");
    let graphqlHTTP = require("express-graphql");
    let { buildSchema } = require("graphql");
    let cors = require("cors");

    let Pusher = require("pusher");
    let bodyParser = require("body-parser");
    let Multipart = require("connect-multiparty");

    let pusher = new Pusher({
                    appId: '532934',
                    key: 'c89c7d0f075322c08deb',
                    secret: 'e096e05bdd3b4cde6f45',
                    cluster: 'us2',
                    encrypted: true
                  });
    let multipartMiddleware = new Multipart();



      let schema = buildSchema(`
      type User {
        id : String!
        nickname : String!
        avatar : String!
      }
      type Post {
          id: String!
          user: User!
          caption : String!
          image : String!
      }
      type Query{
        user(id: String) : User!
        post(user_id: String, post_id: String) : Post!
        posts(user_id: String) : [Post]
      }
    `);

// Maps id to User object
let userslist = {
  a: {
    id: "a",
    nickname: "Deivbid",
    avatar: "https://scontent-mia3-2.cdninstagram.com/vp/eea88e8d0f70e5ef2157d9d71aad194c/5BA38EEB/t51.2885-19/s150x150/22157587_510506482616537_5881063010054701056_n.jpg"
  },
  b: {
    id: "b",
    nickname: "crismarycastellanos",
    avatar:
      "https://scontent-mia3-2.cdninstagram.com/vp/b446c44706ee88ad65a75425cec1f6f0/5B8F15B8/t51.2885-19/s150x150/18723230_1712102959082450_8351748977212784640_a.jpg"
  }
};

    let postslist = {
      a: {
        a: {
          id: "a",
          user: userslist["a"],
          caption: "Yoka",
          image: "https://i.imgur.com/7KWMenL.jpg"
        },
        b: {
          id: "b",
          user: userslist["a"],
          caption: "Oro pls",
          image:
            "https://i.imgur.com/MBPWZUw.jpg"
        },
        c: {
          id: "c",
          user: userslist["a"],
          caption: "@crismarycastellanos Regalame una Pls",
          image: "https://vangogh.teespring.com/v3/image/dFJEFk0QNNTKVaEuz6fZ_gH5NX8/480/560.jpg"
        },
        d: {
          id: "d",
          user: userslist["b"],
          caption: "Ready to the party",
          image: "https://i.imgur.com/B83JO49.jpg"
        }
      }
    };


    let root = {
      user: function({ id }) {
        return userslist[id];
      },
      post: function({ user_id , post_id }) {
        return postslist[user_id][post_id];
      },
      posts: function({ user_id }){
        return Object.values(postslist[user_id]);
      }
    };


    let app = express();
    app.use(cors());
    app.use(
      "/graphql",
      graphqlHTTP({
        schema: schema,
        rootValue: root,
        graphiql: true
      })
    );

    // trigger add a new post 
    app.post('/newpost', multipartMiddleware, (req,res) => {
      // create a sample post
      console.log(req.body.name)
      let post = {
        user : {
          nickname : req.body.name,
          avatar : req.body.avatar
        },
        image : req.body.image,
        caption : req.body.caption
      }

      // trigger pusher event 
      pusher.trigger("posts-channel", "new-post", { 
        post 
      });

      return res.json({status : "Post created"});
    });


app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");