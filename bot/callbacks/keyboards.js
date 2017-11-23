var voteItemsDB = require("../../Schema/voteItems");

var keyboards = {}
//types:      0:mainMenueKeys   ,   1:voteItemKeys   ,   2:scoreKeys
keyboards.mainMenueKeys = [
    [{
            text: "ثبت نظر درمورد کانال",
            callback_data: JSON.stringify({
                type: 0,
                action: "channelVoting"
            })
        },
        {
            text: "ثبت نظر درمورد برنامه ها",
            callback_data: JSON.stringify({
                type: 0, //mainMenueKeys
                action: "programsVoting"
            })
        }
    ]
];

keyboards.fillVoteItems = function (callback) {
    voteItemsDB.find({}).exec(function (err, result) {
        var voteItemKeys = []
        if (err) throw err;

        result.forEach(function (item) {
            voteItemKeys.push([{
                text: item.title,
                callback_data: JSON.stringify({
                    type: 1,    //voteItemKeys
                    //voteItemId: 1,
                    voteItemId: item._id,
                    //voteItemName: item.title
                })
            }]);
        })
        callback(voteItemKeys)
    });
}
keyboards.fillScoreKeys = function (scoreCount, voteItemId, callback) {
    var scoreKeys = [];
    for (var i = 1; i < scoreCount + 1; i++) {
        scoreKeys.push(
                [{
                    text: i,
                    callback_data: JSON.stringify({
                        type: 2,    //scoreKeys
                        score: i,
                        voteItemId: voteItemId
                    })
                }]
            
        );
    }
    callback(scoreKeys);
    console.log(scoreKeys);
}
// keyboards.scoreKeys = [
//     [{
//         text: "1",
//         callback_data: JSON.stringify({
//             type: "scoreKeys",
//             score: "1",
//             voteItemId:""
//         })
//     }, {
//         text: "2",
//         callback_data: JSON.stringify({
//             type: "scoreKeys",
//             score: "2",
//             voteItemId:""            
//         })
//     }, {
//         text: "3",
//         callback_data: JSON.stringify({
//             type: "scoreKeys",
//             score: "3",
//             voteItemId:""            
//         })
//     }, {
//         text: "4",
//         callback_data: JSON.stringify({
//             type: "scoreKeys",
//             score: "4",
//             voteItemId:""            
//         })
//     }, {
//         text: "5",
//         callback_data: JSON.stringify({
//             type: "scoreKeys",
//             score: "5",
//             voteItemId:""            
//         })
//     }]
// ]

console.log(keyboards);
console.log(keyboards.mainMenueKeys);
console.log(keyboards.scoreKeys);

module.exports = keyboards;