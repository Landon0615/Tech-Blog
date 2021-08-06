const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username } });

        if (!userData) {
            res
                .status(400)                
                .json({ message: 'Incorrect email , please try again' });
            return;
        }

        const validPassword = /* req.body.password */ await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/register', async (req, res) => {
    console.log('I AM HIT!!', req.body);
try {
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
    });

    if (newUser) {
       return res.status(200).json({ success: true });
}

res.json(401).json({message: 'Bad request' });
}
catch (e) {
    res.status(401).json(e);
}
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;