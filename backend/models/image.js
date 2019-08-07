module.exports = (sequelize, DataTypes) =>{
    const Image = sequelize.define('Image', {
        src:{
            type : DataTypes.TEXT, //TEXT는 그냥 긴글
            allowNull : false
        },
    },
    {
        charset : 'utf8', //한글에 이모티콘까지 사용가능
        collate: 'utf8_general_ci', //한글 저장됨
    });

    Image.associate = (db)=>{
        db.Image.belongsTo(db.Post)
    };
    
    return Image
}