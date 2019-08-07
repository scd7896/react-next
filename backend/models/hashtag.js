module.exports = (sequelize, DataTypes) =>{
    const Hashtag = sequelize.define('Hashtag', {
        name:{
            type : DataTypes.STRING(20), //TEXT는 그냥 긴글
            allowNull : false
        },
    },
    {
        charset : 'utf8mb4', //한글에 이모티콘까지 사용가능
        collate: 'utf8mb4_general_ci', //한글 저장됨
    });

    Hashtag.associate = (db)=>{
        db.Hashtag.belongsToMany(db.Post ,{through : 'PostHashtag'});
        
    };
    
    return Hashtag
}