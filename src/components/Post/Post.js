  import React, { Component } from "react";
  import './Post.css'

    class Post extends Component {
      render() {

        let nickName  = this.props.nickname,
            image     = this.props.image,
            avatar    = this.props.avatar,
            caption   = this.props.caption
        return <article className="Post" ref="Post">
            <header>
              <div className="Post-user">
                <div className="Post-user-avatar">
                  <img src={avatar} alt={nickName} />
                </div>
                <div className="Post-user-nickname">
                  <span>{nickName}</span>
                </div>
              </div>
            </header>
            <div className="Post-image">
              <div className="Post-image-bg">
                <img alt={nickName} src={image} />
              </div>
            </div>
            <div className="Post-caption">
              <strong>@{nickName}</strong> {caption}
            </div>
          </article>
        }
    }
    export default Post;