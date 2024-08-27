const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { encrypt } = require('../utils');

require('dotenv').config();

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (user) return res.status(400).json({ message: 'Usuário já existe' });

    const passCrypto =  encrypt(password, process.env.JWT_SECRET)

    const newUser = { email, password: passCrypto };

    const userId = await User.create(newUser);
    
    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET);

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Erro no servidor', error: err.message });
  }
};

