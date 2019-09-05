module.exports = (sequelize, DataTypes) =>{
    const Post = sequelize.define('Post', {
        content:{
            type : DataTypes.TEXT, //TEXT는 그냥 긴글
            allowNull : false
        },
    },
    {
        charset : 'utf8mb4', //한글에 이모티콘까지 사용가능
        collate: 'utf8mb4_general_ci', //한글 저장됨
    });

    Post.associate = (db)=>{
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsTo(db.Post, {as : 'Retweet'});
        db.Post.belongsToMany(db.Hashtag ,{through : 'PostHashtag'});
        db.Post.belongsToMany(db.User, {through : 'Like', as: 'Likers' });
    };
    
    return Post
}