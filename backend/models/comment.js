module.exports = (sequelize, DataTypes) =>{
    const Comment = sequelize.define('Comment', {
        content:{
            type : DataTypes.TEXT, //TEXT는 그냥 긴글
            allowNull : false
        },
    },
    {
        charset : 'utf8mb4', //한글에 이모티콘까지 사용가능
        collate: 'utf8mb4_general_ci', //한글 저장됨
    });

    Comment.associate = (db)=>{
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
        
    };
    
    return Comment
}