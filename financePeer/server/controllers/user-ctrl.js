const { GenerateJWT, DecodeJWT, ValidateJWT } = require('./dec-enc.js');



getUsers = async (req, res) => {
    await User.find((err, users) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!users.length) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        return res.status(200).json({ success: true, data: users })
    }).catch(err => console.log(err))
}



validateUser = (req, res) => {
    const {email, password} = req.body

    if(email === "a@b.com" && password === "123")
    {
        const claims = {
          email,
          password
        };

        const header = {
          alg: "HS512",
          typ: "JWT"
        };

        return res.status(200).json({
            success: true,
            message: 'Successfully Signed In!',
            JWT: GenerateJWT(header, claims, "thisisdefaultkey"),
        })
    }
    else {
        return res.status(400).json({
            success: false,
            error: 'Invalid Login Details!',
        })
    }
}



module.exports = {
    getUsers,
    validateUser,
}