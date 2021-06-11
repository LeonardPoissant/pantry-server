


const register = async (req, res) => {
    var db = req.db.db('test');
    user = req.body

    console.log(user)
    try {

    } catch (err) {
        console.log('err---', err)
    }

}


module.exports = {
    register
}